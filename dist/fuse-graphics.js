import * as THREE from './vendor/three.module.js';
import {quality} from './performance.js';
import {CUP_RADIUS} from './cup.js';
import {Fn,Discard,positionWorld,uniform} from './vendor/three.tsl.js';
const cupPosition=uniform(new THREE.Vector3());
export function setCupPosition(pin){cupPosition.value.copy(pin);}
function cutCup(material){const color=material.colorNode;material.colorNode=Fn(()=>{Discard(positionWorld.xz.sub(cupPosition.xz).length().lessThan(CUP_RADIUS));return color;})();}
import {PMREMGenerator} from './vendor/three.webgpu.js';
import {GrassSurface,GrassBlades,SandMaterial,LakeSurface,PuttingGridMaterial,HDRLoader} from './vendor/fuse/fuse.js';
let textures={},blades=[],waters=[],grid=null;let gridVisible=false,grassTick=0,gridTick=0;
const textureLoader=new THREE.TextureLoader();
const url=name=>new URL('./assets/'+name,import.meta.url).href;
export async function initFuseGraphics(renderer,scene,mats){

 const [grass,normal,sand,noise,hdr]=await Promise.all([textureLoader.loadAsync(url('fuse/fairway.jpg')),textureLoader.loadAsync(url('fuse/fairway-normal.jpg')),textureLoader.loadAsync(url('fuse/sand.jpg')),textureLoader.loadAsync(url('fuse/noise.webp')),new HDRLoader().loadAsync(url('coastal-sky.hdr'))]);
 for(const t of [grass,normal,sand,noise]){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=Math.min(8,renderer.getMaxAnisotropy());}grass.colorSpace=sand.colorSpace=THREE.SRGBColorSpace;
 hdr.mapping=THREE.EquirectangularReflectionMapping;scene.background=hdr;scene.backgroundIntensity=.85;scene.backgroundRotation.y=.8;
 const pmrem=new PMREMGenerator(renderer);const environment=pmrem.fromEquirectangular(hdr);scene.environment=environment.texture;scene.environmentIntensity=.35;scene.environmentRotation.y=.8;pmrem.dispose();
 textures={grass,normal,sand,noise};
 for(const [key,repeat,tint]of [['grass',[1,1],'#88966e'],['fair',[1,1],'#d4dfbe'],['green',[1,1],'#c4dbab']]){const map=grass.clone();map.repeat.set(...repeat);const bump=normal.clone();bump.repeat.set(...repeat);mats[key].map=map;mats[key].normalMap=bump;mats[key].normalScale=new THREE.Vector2(.18,.18);mats[key].color.set(tint);mats[key].needsUpdate=true;}
 const sandMap=sand.clone();sandMap.repeat.set(8,8);mats.sand.map=sandMap;mats.sand.color.set('#ffffff');mats.sand.needsUpdate=true;
}
export function clearFuseGraphics(){for(const b of blades)b.dispose();blades=[];for(const w of waters){w.water.parent?.remove(w.water);w.water.geometry.dispose();w.material.dispose();}waters=[];grid?.dispose();grid=null;gridVisible=false;}
export function turf(mesh,type='fairway',withBlades=false,contains=null){
 const positions=mesh.geometry.attributes.position,uvs=new Float32Array(positions.count*2);for(let i=0;i<positions.count;i++){uvs[i*2]=positions.getX(i)/3;uvs[i*2+1]=positions.getZ(i)/3;}mesh.geometry.setAttribute('uv',new THREE.BufferAttribute(uvs,2));
 const material=mesh.material;mesh.material=new GrassSurface(material,{fadeStart:35,fadeEnd:180,flatColor:type==='rough'?new THREE.Color('#82926b'):new THREE.Color('#9eb875'),mowLines:type==='fairway'?{direction:90,width:10,strength:.07,wobble:.45,fadeVariation:.35}:undefined,discolor:{patchScale:40,dryColor:'#ab996d',strength:type==='rough'?.23:.10,coverage:.7},distantDetail:{noiseTexture:textures.noise,scale:2.5,strength:.08,nearAmount:.1}});
 cutCup(mesh.material);mesh.material.fog=false;mesh.castShadow=false;
 if(withBlades&&quality.tier==='high'){const b=new GrassBlades(mesh,{noiseTexture:textures.noise},{density:quality.grassDensity,bladeCount:quality.grassBlades,bladeWidth:.008,bladeHeight:type==='rough'?.20:.035,renderDistance:quality.grassRange,cellSize:6,maxNewCellsPerFrame:1,shadows:false,groundMatch:.85,terrainTexture:material.map,terrainTint:material.color,terrainBlur:5,clumpSpread:.45});b._material.fog=false;mesh.parent.add(b.object);if(contains){const generate=b._generateCell.bind(b);b._generateCell=key=>{const data=generate(key);if(!data)return data;const filtered=[];for(let i=0;i<data.length;i+=16)if(contains(data[i+12],data[i+14]))for(let j=0;j<16;j++)filtered.push(data[i+j]);return new Float32Array(filtered);};}blades.push(b);}
}
export function sandSurface(mesh){mesh.material=new SandMaterial(mesh,textures.noise,undefined,undefined,{sandVariationStrength:.23,sandLowDarken:.07,sandNoiseFreq:.25}).material;mesh.material.fog=false;}
export function lakeSurface(mesh,isOcean=false){mesh.updateMatrixWorld(true);const geometry=mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);const proxy=new THREE.Mesh(geometry);const water=new LakeSurface(proxy,{qualityLevel:0,uvTiling:isOcean?[65,65]:[10,10],normalStrength:isOcean?.65:.4,shallowColor:new THREE.Color('#6daca7'),deepColor:new THREE.Color(isOcean?'#195f78':'#376e6c'),roughness:.12,opacity:.93,envMapIntensity:.7,flowStrength:.18});water.material.fog=false;mesh.parent.add(water.water);mesh.visible=false;waters.push(water);geometry.dispose();return water.water;}
export function puttingGrid(mesh,pin){const p=mesh.geometry.attributes.position,uv=new Float32Array(p.count*2);for(let i=0;i<p.count;i++){uv[i*2]=p.getX(i)/3;uv[i*2+1]=p.getZ(i)/3;}mesh.geometry.setAttribute('uv',new THREE.BufferAttribute(uv,2));grid=new PuttingGridMaterial(mesh,{holeWorldPos:pin,gridSize:2,lineWidth:.01,lineOpacity:.18,dotRadius:.026,dotOpacity:.4,lineColor:new THREE.Color('#fff1c6'),surfaceOptions:{fadeStart:25,fadeEnd:100}});cutCup(grid.material);grid.material.fog=false;grid.setEnabled(false,true);}
export function setGraphicsBudget(){for(const b of blades){b._renderDistance=quality.grassRange;b._uniforms.uRenderDistance.value=quality.grassRange;}}
export function updateFuseGraphics(dt,camera,showGrid){
 grassTick+=dt;gridTick+=dt;if(grassTick>=.1){for(const b of blades)b.update(grassTick,camera);grassTick=0;}
 for(const w of waters)w.update(dt);
 if(grid){if(showGrid!==gridVisible){gridVisible=showGrid;grid.setEnabled(showGrid,true);}if(showGrid&&gridTick>=1/30){grid.update(gridTick,camera);gridTick=0;}}
}
