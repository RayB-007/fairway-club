import assert from 'node:assert/strict';
import * as THREE from '../dist/vendor/three.module.js';
import {FuseShotEngine} from '../dist/fuse-physics.js';
const sample=lie=>()=>({lie,height:0});
const origin=new THREE.Vector3(),farPin=new THREE.Vector3(10000,0,10000);
function run(club,power=1,lie='fairway',shape=0,pin=farPin){const e=new FuseShotEngine(sample(lie));e.launch(origin,pin,club,power,0,shape);let steps=0;while(e.active&&steps++<9000)e.update(1/120);assert(!e.active,'Shot must stop');return e;}
const drive=run(0);assert(drive.stats.carry>225&&drive.stats.carry<255);assert(drive.stats.roll>5&&drive.stats.roll<40);assert(drive.stats.bounces>0);assert(drive.stats.apex>20&&drive.stats.apex<40);
assert(run(0,.5).stats.total<drive.stats.total);
const wedge=run(4);assert(wedge.stats.carry>50&&wedge.stats.carry<70);assert(wedge.stats.roll<drive.stats.roll);
assert(run(0,1,'rough').stats.total<drive.stats.total);assert(run(0,1,'bunker').stats.total<drive.stats.total);
const draw=run(0,1,'fairway',-12),fade=run(0,1,'fairway',12);assert(draw.position().x*fade.position().x<0,'Draw and fade must curve in opposite directions');assert(Math.abs(draw.position().x)>2);
for(const target of[3,10,20,30]){const p=run(5,target/30,'green');assert(Math.abs(p.stats.total-target)<.15,`Putt ${target} yd calibration`);assert.equal(p.stats.bounces,0);}
const cup=run(5,4/30,'green',0,new THREE.Vector3(0,0,-3.9));assert(cup.result?.isHoled,'Correctly paced putt should drop into the cup');
const fastPass=new FuseShotEngine(sample('green'));fastPass.physics.setPin(origin);fastPass.physics._checkHole(new THREE.Vector3(0,.021335,.05),0,-.05,new THREE.Vector3(0,0,-9),0);assert.notEqual(fastPass.physics.holeState,'falling','A very fast first crossing should lip out rather than drop immediately');
const water=run(4,1,'water');assert(water.result?.isInWater);
const slope=new FuseShotEngine((x,z)=>({lie:'green',height:x*.018,normal:new THREE.Vector3(-.018,1,0).normalize()}));slope.launch(origin,farPin,5,.3,0);for(let i=0;i<9000&&slope.active;i++)slope.update(1/120);assert(Math.abs(slope.position().x)>.03,'Sloped putt should break');
const reused=new FuseShotEngine(sample('green'));reused.launch(origin,farPin,4,1,0);for(let i=0;i<9000&&reused.active;i++)reused.update(1/120);reused.launch(origin,farPin,5,10/30,0);for(let i=0;i<9000&&reused.active;i++)reused.update(1/120);assert(Math.abs(reused.stats.total-10)<.15,'Spin from an earlier wedge must not affect the following putt');
const resting=run(5,0,'green',0,origin);assert(resting.result?.isHoled,'A stationary ball in the opening must drop');
const casual=run(5,.75,'green',0,new THREE.Vector3(0,0,-4));assert(casual.result?.isHoled,'A centered casual putt must enter rather than skim over the cup');
console.log(JSON.stringify({passed:16,driver:{carry:drive.stats.carry,roll:drive.stats.roll,apex:drive.stats.apex,bounces:drive.stats.bounces},wedge:{carry:wedge.stats.carry,roll:wedge.stats.roll},draw:draw.position().x,fade:fade.position().x,greenBreak:slope.position().x},null,2));
