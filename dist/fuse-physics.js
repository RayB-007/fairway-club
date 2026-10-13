import * as THREE from './vendor/three.module.js';
import {BallPhysics,CourseSurfaces} from './vendor/fuse/fuse.js';
import {CUP_RADIUS,YARD_TO_METERS} from './cup.js';
const METERS=.9144,RADIUS=.021335;
const surfaceKey={green:'green',fairway:'fairway',rough:'rough',bunker:'sand',water:'plane_lake',out:'base'};
export const clubLaunches=[{mph:156,angle:12,spin:2500},{mph:137,angle:15,spin:3600},{mph:113,angle:19,spin:5200},{mph:87,angle:29,spin:7600},{mph:59,angle:42,spin:9200},{mph:0,angle:0,spin:0}];
class CourseBallPhysics extends BallPhysics{
 constructor(object,sample){super(object,RADIUS,[]);this.sample=sample;this.stimpLevel=9.5;this.holeRadius=CUP_RADIUS*YARD_TO_METERS;this.cupDepth=.22;}
 _checkHole(pos,newX,newZ,velocity,terrainY){
  if(pos.y>terrainY+this.ballRadius+.10)return false;
  const dx=newX-pos.x,dz=newZ-pos.z,lengthSq=dx*dx+dz*dz;
  const t=lengthSq>1e-12?THREE.MathUtils.clamp(((this.holeCenter.x-pos.x)*dx+(this.holeCenter.y-pos.z)*dz)/lengthSq,0,1):0;
  const distance=Math.hypot(pos.x+t*dx-this.holeCenter.x,pos.z+t*dz-this.holeCenter.y);
  // Casual putting: catch the visible opening, including a ball coming to rest over it.
  if(distance<=this.holeRadius&&Math.hypot(velocity.x,velocity.z)<=6.5){this._enterCup(terrainY);return true;}
  return super._checkHole(pos,newX,newZ,velocity,terrainY);
 }
 getTerrainInfo(x,z){const s=this.sample(x/METERS,z/METERS),key=surfaceKey[s.lie]||'base';const surface={...CourseSurfaces[key],type:key};if(key==='rough')surface.rollResistance=.18;return {height:s.height*METERS,normal:s.normal||new THREE.Vector3(0,1,0),surface,friction:surface.friction,restitution:surface.restitution};}
 getTerrainHeight(x,z){return this.getTerrainInfo(x,z).height;}
}
export class FuseShotEngine{
 constructor(sample){this.sample=sample;this.object=new THREE.Object3D();this.physics=new CourseBallPhysics(this.object,sample);this.result=null;this.started=new THREE.Vector3();this.last=new THREE.Vector3();this.landed=false;this.stats={carry:0,roll:0,apex:0,bounces:0,total:0};this.bindEvents();}
 bindEvents(){this.physics.on('landed',()=>{this.stats.bounces++;this.onLanding?.();});this.physics.on('shotEnded',event=>{this.result=event;});}
 launch(position,pin,club,power,aim,shape=0,puttDistance=30){
  // Fuse's internal surface spin survives reset(), so start each shot with a fresh physics state.
  this.physics.removeAllListeners();this.physics=new CourseBallPhysics(this.object,this.sample);this.bindEvents();
  const sample=this.sample(position.x,position.z);this.result=null;this.started.copy(position);this.started.y=sample.height;this.last.copy(this.started);this.stats={carry:0,roll:0,apex:0,bounces:0,total:0};this.landed=club===5;
  this.object.position.set(position.x*METERS,sample.height*METERS+RADIUS,position.z*METERS);this.object.quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI-aim);
  this.physics.reset(this.object.position.clone(),new THREE.Vector3(pin.x*METERS,pin.y*METERS,pin.z*METERS));
  const preset=clubLaunches[club];const lieFactor=sample.lie==='rough'?.87:sample.lie==='bunker'?(club===4?.87:.57):1;
  // Stimp-based putt calibration includes Fuse's speed-dependent green braking.
  const distance=puttDistance*power*METERS,baseDecel=1.83**2/(2*9.5*.3048);
  const A=1-.3*1.83,B=.3;let low=0,high=20;for(let i=0;i<35;i++){const v=(low+high)/2,d=(v/B-A/(B*B)*Math.log((A+B*v)/A))/baseDecel;if(d<distance)low=v;else high=v;}const puttSpeed=(low+high)/2;
  const shot={ballSpeed:club===5?puttSpeed/.44704:preset.mph*Math.sqrt(Math.max(.02,power))*lieFactor,verticalLaunchAngle:preset.angle,horizontalLaunchAngle:0,spinSpeed:club===5?0:preset.spin*(.65+.35*power),spinAxis:shape};
  this.physics.launchShot(shot,club===5);this.shot=shot;return shot;
 }
 update(dt){if(!this.physics.isShotActive)return;this.physics.update(dt);const p=this.position();this.stats.apex=Math.max(this.stats.apex,p.y-this.started.y);if(this.physics.isLanded&&!this.landed){this.landed=true;this.stats.carry=Math.hypot(p.x-this.started.x,p.z-this.started.z);}if(this.landed)this.stats.roll+=Math.hypot(p.x-this.last.x,p.z-this.last.z);this.stats.total=Math.hypot(p.x-this.started.x,p.z-this.started.z);this.last.copy(p);}
 position(){return this.object.position.clone().multiplyScalar(1/METERS);}
 get phase(){return this.physics.isLanded?'ground':'air';}
 get active(){return this.physics.isShotActive;}
 preview(position,pin,club,power,aim,shape=0,puttDistance=30){this.launch(position,new THREE.Vector3(9999,0,9999),club,power,aim,shape,puttDistance);const points=[];for(let i=0;i<7200&&this.active;i++){this.update(1/120);if(i%24===0)points.push(this.position());}return {points,stats:{...this.stats},end:this.position()};}
}
