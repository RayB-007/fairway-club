import * as THREE from './vendor/three.module.js';
import {mergeGeometries} from './vendor/fuse/fuse.js';
function smoothIcosahedron(detail){const g=new THREE.IcosahedronGeometry(1,detail),p=g.attributes.position,n=g.attributes.normal;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),length=Math.hypot(x,y,z);n.setXYZ(i,x/length,y/length,z/length);}return g;}
// Consolidate authored trees into spatial batches instead of submitting every branch separately.
export function batchForest(parent,trunkMat,leafMat){
 parent.updateMatrixWorld(true);const chunks=new Map();for(const tree of [...parent.children]){if(!tree.userData.isTree)continue;const key=Math.floor(tree.position.z/70);if(!chunks.has(key))chunks.set(key,[]);chunks.get(key).push(tree);}
 const nearGeo=smoothIcosahedron(1),farGeo=smoothIcosahedron(0),instance=new THREE.Matrix4(),world=new THREE.Matrix4(),offset=new THREE.Matrix4(),color=new THREE.Color();
 for(const [key,trees]of chunks){const centerZ=key*70+35,chunk=new THREE.Group();chunk.position.z=centerZ;chunk.name='Batched coastal trees';parent.add(chunk);offset.makeTranslation(0,0,-centerZ);const trunks=[],foliage=[];
  for(const tree of trees){tree.traverse(o=>{if(!o.isMesh)return;if(o.isInstancedMesh){if(o.geometry.parameters?.detail!==2)return;for(let i=0;i<o.count;i++){o.getMatrixAt(i,instance);world.multiplyMatrices(o.matrixWorld,instance).premultiply(offset);o.getColorAt(i,color);foliage.push({matrix:world.clone(),color:color.clone()});}}else if(o.material===trunkMat)trunks.push(o.geometry.clone().applyMatrix4(o.matrixWorld).translate(0,0,-centerZ));});parent.remove(tree);tree.traverse(o=>o.geometry?.dispose());}
  const trunkGeo=mergeGeometries(trunks);trunks.forEach(g=>g.dispose());if(trunkGeo){const trunk=new THREE.Mesh(trunkGeo,trunkMat);trunk.castShadow=true;trunk.receiveShadow=false;chunk.add(trunk);}
  const lod=new THREE.LOD();chunk.add(lod);for(const [geometry,distance,shadow]of [[nearGeo.clone(),0,true],[farGeo.clone(),70,false]]){const leaves=new THREE.InstancedMesh(geometry,leafMat,foliage.length);foliage.forEach((f,i)=>{leaves.setMatrixAt(i,f.matrix);leaves.setColorAt(i,f.color);});leaves.castShadow=shadow;leaves.receiveShadow=false;leaves.computeBoundingSphere();lod.addLevel(leaves,distance);}
 }
 nearGeo.dispose();farGeo.dispose();
}
