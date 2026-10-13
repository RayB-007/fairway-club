// Ground motion uses rolling resistance in yards/second²; shorter grass rolls farther.
export const resistance={green:1.25,fairway:2.1,rough:6.2,bunker:16,water:20,out:20};
export function puttingSpeed(distance,lie){return Math.sqrt(2*(resistance[lie]||2.1)*Math.max(0,distance));}
export function stepGround(state,dt,lie){
 const drag=resistance[lie]||2.1,speed=Math.hypot(state.vx,state.vz),newSpeed=Math.max(0,speed-drag*dt);
 const travel=(speed+newSpeed)*.5*dt;if(speed>0){state.x+=state.vx/speed*travel;state.z+=state.vz/speed*travel;state.vx*=newSpeed/speed;state.vz*=newSpeed/speed;}
 state.vy-=18*dt;state.y+=state.vy*dt;
 if(state.y<=.3){state.y=.3;if(state.vy<-1.2&&lie!=='bunker'){state.vy=-state.vy*.3;state.vx*=.8;state.vz*=.8;state.bounces++;}else state.vy=0;}
 return {travel,stopped:newSpeed<.08&&state.y<=.301&&Math.abs(state.vy)<.1};
}
