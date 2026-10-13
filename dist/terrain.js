import * as THREE from './vendor/three.module.js';
export function elevation(x,z,h){
 const teeFade=THREE.MathUtils.smoothstep(-z,5,45);
 const base=(.55*Math.sin(-z*.024)+.3*Math.sin(x*.032)*Math.sin(-z*.015))*teeFade;
 const greenDist=Math.hypot(x-h.pinX,z+h.length),blend=1-THREE.MathUtils.smoothstep(greenDist,19,30);
 const greenBase=.55*Math.sin(h.length*.024)+.3*Math.sin(h.pinX*.032)*Math.sin(h.length*.015);
 const green=greenBase+.004*(x-h.pinX)+.003*(z+h.length)+.06*Math.sin((x-h.pinX)*.16);
 return THREE.MathUtils.lerp(base,green,blend);
}
export function conformSurface(mesh,h){mesh.updateMatrixWorld(true);const g=mesh.geometry;g.applyMatrix4(mesh.matrixWorld);mesh.position.set(0,0,0);mesh.rotation.set(0,0,0);mesh.scale.set(1,1,1);const p=g.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,p.getY(i)+elevation(p.getX(i),p.getZ(i),h));p.needsUpdate=true;g.computeVertexNormals();g.computeBoundingSphere();mesh.updateMatrixWorld(true);return mesh;}
export function ellipseGeometry(rx,rz,segments=64,rings=10){const v=[0,0,0],uv=[.5,.5],index=[];for(let r=1;r<=rings;r++)for(let i=0;i<segments;i++){const a=i/segments*Math.PI*2,t=r/rings;v.push(Math.cos(a)*rx*t,0,Math.sin(a)*rz*t);uv.push(.5+Math.cos(a)*t*.5,.5+Math.sin(a)*t*.5);}for(let i=0;i<segments;i++)index.push(0,1+(i+1)%segments,1+i);for(let r=1;r<rings;r++)for(let i=0;i<segments;i++){const a=1+(r-1)*segments+i,b=1+(r-1)*segments+(i+1)%segments,c=a+segments,d=b+segments;index.push(a,b,c,b,d,c);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(index);g.computeVertexNormals();return g;}
export function surfaceAt(x,z,h){if(x>103||Math.abs(x)>150||z>40||z<-h.length-70)return 'out';if(((x-h.pond.x)/h.pond.rx)**2+((z-h.pond.z)/h.pond.rz)**2<1)return 'water';if(h.sand.some(([sx,sz,rx,rz])=>((x-sx)/rx)**2+((z-sz)/rz)**2<1))return 'bunker';if(Math.hypot(x-h.pinX,z+h.length)<24)return 'green';const center=Math.sin(-z/h.length*Math.PI)*h.bend;return Math.abs(x-center)<24?'fairway':'rough';}
