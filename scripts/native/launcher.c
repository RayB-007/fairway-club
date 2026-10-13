#include <arpa/inet.h>
#include <errno.h>
#include <limits.h>
#include <mach-o/dyld.h>
#include <pthread.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <unistd.h>

static char site_root[PATH_MAX];
static void send_all(int fd,const void *bytes,size_t len){const char *p=bytes;while(len){ssize_t n=send(fd,p,len,0);if(n<=0)return;p+=n;len-=n;}}
static void reply(int fd,int status,const char *type,const void *body,size_t length,int head){char h[512];int n=snprintf(h,sizeof h,"HTTP/1.1 %d %s\r\nContent-Type: %s\r\nContent-Length: %zu\r\nCache-Control: no-store\r\nX-Content-Type-Options: nosniff\r\nConnection: close\r\n\r\n",status,status==200?"OK":"Error",type,length);send_all(fd,h,(size_t)n);if(!head&&length)send_all(fd,body,length);}
static const char *mime(const char *p){const char *x=strrchr(p,'.');if(!x)return "application/octet-stream";if(!strcmp(x,".html"))return "text/html; charset=utf-8";if(!strcmp(x,".js"))return "text/javascript; charset=utf-8";if(!strcmp(x,".css"))return "text/css";if(!strcmp(x,".json")||!strcmp(x,".map"))return "application/json";if(!strcmp(x,".jpg"))return "image/jpeg";if(!strcmp(x,".png"))return "image/png";if(!strcmp(x,".webp"))return "image/webp";if(!strcmp(x,".svg"))return "image/svg+xml";if(!strcmp(x,".wav"))return "audio/wav";if(!strcmp(x,".md")||!strcmp(x,".txt"))return "text/plain; charset=utf-8";return "application/octet-stream";}
static int hex(char c){if(c>='0'&&c<='9')return c-'0';if(c>='A'&&c<='F')return c-'A'+10;if(c>='a'&&c<='f')return c-'a'+10;return -1;}
static void *client(void *arg){int fd=*(int*)arg;free(arg);char req[8192]={0},method[16],url[2048];size_t count=0;struct timeval timeout={5,0};setsockopt(fd,SOL_SOCKET,SO_RCVTIMEO,&timeout,sizeof timeout);
 while(count<sizeof(req)-1){ssize_t n=recv(fd,req+count,sizeof(req)-count-1,0);if(n<=0)goto done;count+=(size_t)n;req[count]=0;if(strstr(req,"\r\n\r\n"))break;}
 if(sscanf(req,"%15s %2047s",method,url)!=2)goto done;int head=!strcmp(method,"HEAD");if(strcmp(method,"GET")&&!head){reply(fd,405,"text/plain","Method not allowed",18,0);goto done;}
 char *query=strchr(url,'?');if(query)*query=0;char decoded[2048];size_t j=0;for(size_t i=0;url[i]&&j<sizeof(decoded)-1;i++){if(url[i]=='%'&&url[i+1]&&url[i+2]){int a=hex(url[i+1]),b=hex(url[i+2]);if(a<0||b<0)goto invalid;char c=(char)(a*16+b);if(!c)goto invalid;decoded[j++]=c;i+=2;}else decoded[j++]=url[i];}decoded[j]=0;
 if(!strcmp(decoded,"/__launcher")){const char *json="{\"native\":true,\"app\":\"Fairway Club\"}";reply(fd,200,"application/json",json,strlen(json),head);goto done;}
 char path[PATH_MAX],resolved[PATH_MAX];snprintf(path,sizeof path,"%s%s",site_root,!strcmp(decoded,"/")?"/index.html":decoded);if(!realpath(path,resolved))goto missing;size_t root_len=strlen(site_root);if(strncmp(resolved,site_root,root_len)||resolved[root_len]!='/')goto invalid;
 struct stat st;if(stat(resolved,&st)||!S_ISREG(st.st_mode)||st.st_size>32*1024*1024)goto missing;FILE *f=fopen(resolved,"rb");if(!f)goto missing;
 if(head){reply(fd,200,mime(resolved),NULL,(size_t)st.st_size,1);fclose(f);goto done;}
 char header[512];int h=snprintf(header,sizeof header,"HTTP/1.1 200 OK\r\nContent-Type: %s\r\nContent-Length: %lld\r\nCache-Control: no-store\r\nX-Content-Type-Options: nosniff\r\nConnection: close\r\n\r\n",mime(resolved),(long long)st.st_size);send_all(fd,header,(size_t)h);char buf[65536];size_t got;while((got=fread(buf,1,sizeof buf,f)))send_all(fd,buf,got);fclose(f);goto done;
 invalid:reply(fd,403,"text/plain","Forbidden",9,head);goto done;
 missing:reply(fd,404,"text/plain","Not found",9,head);
 done:close(fd);return NULL;}
int main(int argc,char **argv){signal(SIGPIPE,SIG_IGN);int headless=argc>1&&!strcmp(argv[1],"--serve");char executable[PATH_MAX],resolved[PATH_MAX];uint32_t size=sizeof executable;if(_NSGetExecutablePath(executable,&size)||!realpath(executable,resolved))return 1;char *dir=strrchr(resolved,'/');if(!dir)return 1;*dir=0;char resources[PATH_MAX];snprintf(resources,sizeof resources,"%s/../Resources/site",resolved);if(!realpath(resources,site_root)){fprintf(stderr,"Missing game resources. Keep Fairway Club.app together.\n");return 1;}
 int sock=socket(AF_INET,SOCK_STREAM,0),port=4188,one=1;setsockopt(sock,SOL_SOCKET,SO_REUSEADDR,&one,sizeof one);struct sockaddr_in address={0};address.sin_family=AF_INET;address.sin_addr.s_addr=htonl(INADDR_LOOPBACK);
 for(;port<4288;port++){address.sin_port=htons((uint16_t)port);if(!bind(sock,(struct sockaddr*)&address,sizeof address))break;if(errno!=EADDRINUSE){perror("bind");return 1;}}if(port==4288||listen(sock,64))return 1;
 printf("Fairway Club running at http://127.0.0.1:%d\n",port);fflush(stdout);
 if(!headless&&!fork()){char url[128];snprintf(url,sizeof url,"http://127.0.0.1:%d/?v=mac",port);execl("/usr/bin/open","open","-a","Safari",url,(char*)NULL);_exit(1);}signal(SIGCHLD,SIG_IGN);
 for(;;){int fd=accept(sock,NULL,NULL);if(fd<0){if(errno==EINTR)continue;break;}int *value=malloc(sizeof(int));if(!value){close(fd);continue;}*value=fd;pthread_t thread;if(!pthread_create(&thread,NULL,client,value))pthread_detach(thread);else{free(value);close(fd);}}
 close(sock);return 0;}
