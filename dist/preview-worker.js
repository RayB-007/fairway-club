var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// scripts/preview-worker.js
import * as THREE4 from "./vendor/three.module.js";

// dist/fuse-physics.js
import * as THREE2 from "./vendor/three.module.js";

// upstream/fuse/src/physics/ballPhysics.ts
import * as THREE from "./vendor/three.module.js";

// node_modules/three-mesh-bvh/src/core/BVH.js
import { Box3 as Box33 } from "./vendor/three.module.js";

// node_modules/three-mesh-bvh/src/core/Constants.js
var CENTER = 0;
var AVERAGE = 1;
var SAH = 2;
var CONTAINED = 2;
var PRIMITIVE_INTERSECT_COST = 1.25;
var TRAVERSAL_COST = 1;
var BYTES_PER_NODE = 6 * 4 + 4 + 4;
var UINT32_PER_NODE = BYTES_PER_NODE / 4;
var IS_LEAFNODE_FLAG = 65535;
var LEAFNODE_MASK_32 = IS_LEAFNODE_FLAG << 16;
var FLOAT32_EPSILON = Math.pow(2, -24);
var SKIP_GENERATION = /* @__PURE__ */ Symbol("SKIP_GENERATION");
var DEFAULT_OPTIONS = {
  strategy: CENTER,
  maxDepth: 40,
  maxLeafSize: 10,
  useSharedArrayBuffer: false,
  setBoundingBox: true,
  onProgress: null,
  indirect: false,
  verbose: true,
  range: null,
  [SKIP_GENERATION]: false
};

// node_modules/three-mesh-bvh/src/utils/ArrayBoxUtilities.js
function arrayToBox(nodeIndex32, array, target) {
  target.min.x = array[nodeIndex32];
  target.min.y = array[nodeIndex32 + 1];
  target.min.z = array[nodeIndex32 + 2];
  target.max.x = array[nodeIndex32 + 3];
  target.max.y = array[nodeIndex32 + 4];
  target.max.z = array[nodeIndex32 + 5];
  return target;
}
function getLongestEdgeIndex(bounds) {
  let splitDimIdx = -1;
  let splitDist = -Infinity;
  for (let i = 0; i < 3; i++) {
    const dist = bounds[i + 3] - bounds[i];
    if (dist > splitDist) {
      splitDist = dist;
      splitDimIdx = i;
    }
  }
  return splitDimIdx;
}
function copyBounds(source, target) {
  target.set(source);
}
function unionBounds(a, b, target) {
  let aVal, bVal;
  for (let d = 0; d < 3; d++) {
    const d3 = d + 3;
    aVal = a[d];
    bVal = b[d];
    target[d] = aVal < bVal ? aVal : bVal;
    aVal = a[d3];
    bVal = b[d3];
    target[d3] = aVal > bVal ? aVal : bVal;
  }
}
function expandByPrimitiveBounds(startIndex, primitiveBounds, bounds) {
  for (let d = 0; d < 3; d++) {
    const tCenter = primitiveBounds[startIndex + 2 * d];
    const tHalf = primitiveBounds[startIndex + 2 * d + 1];
    const tMin = tCenter - tHalf;
    const tMax = tCenter + tHalf;
    if (tMin < bounds[d]) {
      bounds[d] = tMin;
    }
    if (tMax > bounds[d + 3]) {
      bounds[d + 3] = tMax;
    }
  }
}
function computeSurfaceArea(bounds) {
  const d0 = bounds[3] - bounds[0];
  const d1 = bounds[4] - bounds[1];
  const d2 = bounds[5] - bounds[2];
  return 2 * (d0 * d1 + d1 * d2 + d2 * d0);
}

// node_modules/three-mesh-bvh/src/core/utils/nodeBufferUtils.js
function IS_LEAF(n16, uint16Array2) {
  return uint16Array2[n16 + 15] === IS_LEAFNODE_FLAG;
}
function OFFSET(n32, uint32Array2) {
  return uint32Array2[n32 + 6];
}
function COUNT(n16, uint16Array2) {
  return uint16Array2[n16 + 14];
}
function LEFT_NODE(n32) {
  return n32 + UINT32_PER_NODE;
}
function RIGHT_NODE(n32, uint32Array2) {
  const relativeOffset = uint32Array2[n32 + 6];
  return n32 + relativeOffset * UINT32_PER_NODE;
}
function SPLIT_AXIS(n32, uint32Array2) {
  return uint32Array2[n32 + 7];
}
function BOUNDING_DATA_INDEX(n32) {
  return n32;
}

// node_modules/three-mesh-bvh/src/core/build/computeBoundsUtils.js
function getBounds(primitiveBounds, offset, count, target, centroidTarget) {
  let minx = Infinity;
  let miny = Infinity;
  let minz = Infinity;
  let maxx = -Infinity;
  let maxy = -Infinity;
  let maxz = -Infinity;
  let cminx = Infinity;
  let cminy = Infinity;
  let cminz = Infinity;
  let cmaxx = -Infinity;
  let cmaxy = -Infinity;
  let cmaxz = -Infinity;
  const boundsOffset = primitiveBounds.offset || 0;
  for (let i = (offset - boundsOffset) * 6, end = (offset + count - boundsOffset) * 6; i < end; i += 6) {
    const cx = primitiveBounds[i + 0];
    const hx = primitiveBounds[i + 1];
    const lx = cx - hx;
    const rx = cx + hx;
    if (lx < minx) minx = lx;
    if (rx > maxx) maxx = rx;
    if (cx < cminx) cminx = cx;
    if (cx > cmaxx) cmaxx = cx;
    const cy = primitiveBounds[i + 2];
    const hy = primitiveBounds[i + 3];
    const ly = cy - hy;
    const ry = cy + hy;
    if (ly < miny) miny = ly;
    if (ry > maxy) maxy = ry;
    if (cy < cminy) cminy = cy;
    if (cy > cmaxy) cmaxy = cy;
    const cz = primitiveBounds[i + 4];
    const hz = primitiveBounds[i + 5];
    const lz = cz - hz;
    const rz = cz + hz;
    if (lz < minz) minz = lz;
    if (rz > maxz) maxz = rz;
    if (cz < cminz) cminz = cz;
    if (cz > cmaxz) cmaxz = cz;
  }
  target[0] = minx;
  target[1] = miny;
  target[2] = minz;
  target[3] = maxx;
  target[4] = maxy;
  target[5] = maxz;
  centroidTarget[0] = cminx;
  centroidTarget[1] = cminy;
  centroidTarget[2] = cminz;
  centroidTarget[3] = cmaxx;
  centroidTarget[4] = cmaxy;
  centroidTarget[5] = cmaxz;
}

// node_modules/three-mesh-bvh/src/core/build/splitUtils.js
var BIN_COUNT = 32;
var binsSort = (a, b) => a.candidate - b.candidate;
var sahBins = /* @__PURE__ */ new Array(BIN_COUNT).fill().map(() => {
  return {
    count: 0,
    bounds: new Float32Array(6),
    rightCacheBounds: new Float32Array(6),
    leftCacheBounds: new Float32Array(6),
    candidate: 0
  };
});
var leftBounds = /* @__PURE__ */ new Float32Array(6);
function getOptimalSplit(nodeBoundingData, centroidBoundingData, primitiveBounds, offset, count, strategy) {
  let axis = -1;
  let pos = 0;
  if (strategy === CENTER) {
    axis = getLongestEdgeIndex(centroidBoundingData);
    if (axis !== -1) {
      pos = (centroidBoundingData[axis] + centroidBoundingData[axis + 3]) / 2;
    }
  } else if (strategy === AVERAGE) {
    axis = getLongestEdgeIndex(nodeBoundingData);
    if (axis !== -1) {
      pos = getAverage(primitiveBounds, offset, count, axis);
    }
  } else if (strategy === SAH) {
    const rootSurfaceArea = computeSurfaceArea(nodeBoundingData);
    let bestCost = PRIMITIVE_INTERSECT_COST * count;
    const boundsOffset = primitiveBounds.offset || 0;
    const cStart = (offset - boundsOffset) * 6;
    const cEnd = (offset + count - boundsOffset) * 6;
    for (let a = 0; a < 3; a++) {
      const axisLeft = centroidBoundingData[a];
      const axisRight = centroidBoundingData[a + 3];
      const axisLength = axisRight - axisLeft;
      const binWidth = axisLength / BIN_COUNT;
      if (count < BIN_COUNT / 4) {
        const truncatedBins = [...sahBins];
        truncatedBins.length = count;
        let b = 0;
        for (let c = cStart; c < cEnd; c += 6, b++) {
          const bin = truncatedBins[b];
          bin.candidate = primitiveBounds[c + 2 * a];
          bin.count = 0;
          const {
            bounds,
            leftCacheBounds,
            rightCacheBounds
          } = bin;
          for (let d = 0; d < 3; d++) {
            rightCacheBounds[d] = Infinity;
            rightCacheBounds[d + 3] = -Infinity;
            leftCacheBounds[d] = Infinity;
            leftCacheBounds[d + 3] = -Infinity;
            bounds[d] = Infinity;
            bounds[d + 3] = -Infinity;
          }
          expandByPrimitiveBounds(c, primitiveBounds, bounds);
        }
        truncatedBins.sort(binsSort);
        let splitCount = count;
        for (let bi = 0; bi < splitCount; bi++) {
          const bin = truncatedBins[bi];
          while (bi + 1 < splitCount && truncatedBins[bi + 1].candidate === bin.candidate) {
            truncatedBins.splice(bi + 1, 1);
            splitCount--;
          }
        }
        for (let c = cStart; c < cEnd; c += 6) {
          const center = primitiveBounds[c + 2 * a];
          for (let bi = 0; bi < splitCount; bi++) {
            const bin = truncatedBins[bi];
            if (center >= bin.candidate) {
              expandByPrimitiveBounds(c, primitiveBounds, bin.rightCacheBounds);
            } else {
              expandByPrimitiveBounds(c, primitiveBounds, bin.leftCacheBounds);
              bin.count++;
            }
          }
        }
        for (let bi = 0; bi < splitCount; bi++) {
          const bin = truncatedBins[bi];
          const leftCount = bin.count;
          const rightCount = count - bin.count;
          const leftBounds2 = bin.leftCacheBounds;
          const rightBounds = bin.rightCacheBounds;
          let leftProb = 0;
          if (leftCount !== 0) {
            leftProb = computeSurfaceArea(leftBounds2) / rootSurfaceArea;
          }
          let rightProb = 0;
          if (rightCount !== 0) {
            rightProb = computeSurfaceArea(rightBounds) / rootSurfaceArea;
          }
          const cost = TRAVERSAL_COST + PRIMITIVE_INTERSECT_COST * (leftProb * leftCount + rightProb * rightCount);
          if (cost < bestCost) {
            axis = a;
            bestCost = cost;
            pos = bin.candidate;
          }
        }
      } else {
        for (let i = 0; i < BIN_COUNT; i++) {
          const bin = sahBins[i];
          bin.count = 0;
          bin.candidate = axisLeft + binWidth + i * binWidth;
          const bounds = bin.bounds;
          for (let d = 0; d < 3; d++) {
            bounds[d] = Infinity;
            bounds[d + 3] = -Infinity;
          }
        }
        for (let c = cStart; c < cEnd; c += 6) {
          const triCenter = primitiveBounds[c + 2 * a];
          const relativeCenter = triCenter - axisLeft;
          let binIndex = ~~(relativeCenter / binWidth);
          if (binIndex >= BIN_COUNT) binIndex = BIN_COUNT - 1;
          const bin = sahBins[binIndex];
          bin.count++;
          expandByPrimitiveBounds(c, primitiveBounds, bin.bounds);
        }
        const lastBin = sahBins[BIN_COUNT - 1];
        copyBounds(lastBin.bounds, lastBin.rightCacheBounds);
        for (let i = BIN_COUNT - 2; i >= 0; i--) {
          const bin = sahBins[i];
          const nextBin = sahBins[i + 1];
          unionBounds(bin.bounds, nextBin.rightCacheBounds, bin.rightCacheBounds);
        }
        let leftCount = 0;
        for (let i = 0; i < BIN_COUNT - 1; i++) {
          const bin = sahBins[i];
          const binCount = bin.count;
          const bounds = bin.bounds;
          const nextBin = sahBins[i + 1];
          const rightBounds = nextBin.rightCacheBounds;
          if (binCount !== 0) {
            if (leftCount === 0) {
              copyBounds(bounds, leftBounds);
            } else {
              unionBounds(bounds, leftBounds, leftBounds);
            }
          }
          leftCount += binCount;
          let leftProb = 0;
          let rightProb = 0;
          if (leftCount !== 0) {
            leftProb = computeSurfaceArea(leftBounds) / rootSurfaceArea;
          }
          const rightCount = count - leftCount;
          if (rightCount !== 0) {
            rightProb = computeSurfaceArea(rightBounds) / rootSurfaceArea;
          }
          const cost = TRAVERSAL_COST + PRIMITIVE_INTERSECT_COST * (leftProb * leftCount + rightProb * rightCount);
          if (cost < bestCost) {
            axis = a;
            bestCost = cost;
            pos = bin.candidate;
          }
        }
      }
    }
  } else {
    console.warn(`BVH: Invalid build strategy value ${strategy} used.`);
  }
  return { axis, pos };
}
function getAverage(primitiveBounds, offset, count, axis) {
  let avg = 0;
  const boundsOffset = primitiveBounds.offset;
  for (let i = offset, end = offset + count; i < end; i++) {
    avg += primitiveBounds[(i - boundsOffset) * 6 + axis * 2];
  }
  return avg / count;
}

// node_modules/three-mesh-bvh/src/core/BVHNode.js
var BVHNode = class {
  constructor() {
    this.boundingData = new Float32Array(6);
  }
};

// node_modules/three-mesh-bvh/src/core/build/sortUtils.js
function partition(buffer, stride, primitiveBounds, offset, count, split) {
  let left = offset;
  let right = offset + count - 1;
  const pos = split.pos;
  const axisOffset = split.axis * 2;
  const boundsOffset = primitiveBounds.offset || 0;
  while (true) {
    while (left <= right && primitiveBounds[(left - boundsOffset) * 6 + axisOffset] < pos) {
      left++;
    }
    while (left <= right && primitiveBounds[(right - boundsOffset) * 6 + axisOffset] >= pos) {
      right--;
    }
    if (left < right) {
      for (let i = 0; i < stride; i++) {
        let t0 = buffer[left * stride + i];
        buffer[left * stride + i] = buffer[right * stride + i];
        buffer[right * stride + i] = t0;
      }
      for (let i = 0; i < 6; i++) {
        const l = left - boundsOffset;
        const r = right - boundsOffset;
        const tb = primitiveBounds[l * 6 + i];
        primitiveBounds[l * 6 + i] = primitiveBounds[r * 6 + i];
        primitiveBounds[r * 6 + i] = tb;
      }
      left++;
      right--;
    } else {
      return left;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/build/buildUtils.js
var float32Array;
var uint32Array;
var uint16Array;
var uint8Array;
var MAX_POINTER = Math.pow(2, 32);
function countNodes(node) {
  if ("count" in node) {
    return 1;
  } else {
    return 1 + countNodes(node.left) + countNodes(node.right);
  }
}
function populateBuffer(byteOffset, node, buffer) {
  float32Array = new Float32Array(buffer);
  uint32Array = new Uint32Array(buffer);
  uint16Array = new Uint16Array(buffer);
  uint8Array = new Uint8Array(buffer);
  return _populateBuffer(byteOffset, node);
}
function _populateBuffer(byteOffset, node) {
  const node32Index = byteOffset / 4;
  const node16Index = byteOffset / 2;
  const isLeaf = "count" in node;
  const boundingData = node.boundingData;
  for (let i = 0; i < 6; i++) {
    float32Array[node32Index + i] = boundingData[i];
  }
  if (isLeaf) {
    if (node.buffer) {
      uint8Array.set(new Uint8Array(node.buffer), byteOffset);
      return byteOffset + node.buffer.byteLength;
    } else {
      uint32Array[node32Index + 6] = node.offset;
      uint16Array[node16Index + 14] = node.count;
      uint16Array[node16Index + 15] = IS_LEAFNODE_FLAG;
      return byteOffset + BYTES_PER_NODE;
    }
  } else {
    const { left, right, splitAxis } = node;
    const leftByteOffset = byteOffset + BYTES_PER_NODE;
    let rightByteOffset = _populateBuffer(leftByteOffset, left);
    const currentNodeIndex = byteOffset / BYTES_PER_NODE;
    const rightNodeIndex = rightByteOffset / BYTES_PER_NODE;
    const relativeRightIndex = rightNodeIndex - currentNodeIndex;
    if (relativeRightIndex > MAX_POINTER) {
      throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");
    }
    uint32Array[node32Index + 6] = relativeRightIndex;
    uint32Array[node32Index + 7] = splitAxis;
    return _populateBuffer(rightByteOffset, right);
  }
}

// node_modules/three-mesh-bvh/src/core/build/buildTree.js
function buildTree(bvh, primitiveBounds, offset, count, options, loadRange) {
  const {
    maxDepth,
    verbose,
    maxLeafSize,
    strategy,
    onProgress
  } = options;
  const partitionBuffer = bvh.primitiveBuffer;
  const partitionStride = bvh.primitiveBufferStride;
  const cacheCentroidBoundingData = new Float32Array(6);
  let reachedMaxDepth = false;
  const root = new BVHNode();
  getBounds(primitiveBounds, offset, count, root.boundingData, cacheCentroidBoundingData);
  splitNode(root, offset, count, cacheCentroidBoundingData);
  return root;
  function triggerProgress(primitivesProcessed) {
    if (onProgress) {
      onProgress((primitivesProcessed - loadRange.offset) / loadRange.count);
    }
  }
  function splitNode(node, offset2, count2, centroidBoundingData = null, depth = 0) {
    if (!reachedMaxDepth && depth >= maxDepth) {
      reachedMaxDepth = true;
      if (verbose) {
        console.warn(`BVH: Max depth of ${maxDepth} reached when generating BVH. Consider increasing maxDepth.`);
      }
    }
    if (count2 <= maxLeafSize || depth >= maxDepth) {
      triggerProgress(offset2 + count2);
      node.offset = offset2;
      node.count = count2;
      return node;
    }
    const split = getOptimalSplit(node.boundingData, centroidBoundingData, primitiveBounds, offset2, count2, strategy);
    if (split.axis === -1) {
      triggerProgress(offset2 + count2);
      node.offset = offset2;
      node.count = count2;
      return node;
    }
    const splitOffset = partition(partitionBuffer, partitionStride, primitiveBounds, offset2, count2, split);
    if (splitOffset === offset2 || splitOffset === offset2 + count2) {
      triggerProgress(offset2 + count2);
      node.offset = offset2;
      node.count = count2;
    } else {
      node.splitAxis = split.axis;
      const left = new BVHNode();
      const lstart = offset2;
      const lcount = splitOffset - offset2;
      node.left = left;
      getBounds(primitiveBounds, lstart, lcount, left.boundingData, cacheCentroidBoundingData);
      splitNode(left, lstart, lcount, cacheCentroidBoundingData, depth + 1);
      const right = new BVHNode();
      const rstart = splitOffset;
      const rcount = count2 - lcount;
      node.right = right;
      getBounds(primitiveBounds, rstart, rcount, right.boundingData, cacheCentroidBoundingData);
      splitNode(right, rstart, rcount, cacheCentroidBoundingData, depth + 1);
    }
    return node;
  }
}
function buildPackedTree(bvh, options) {
  const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
  const rootRanges = bvh.getRootRanges(options.range);
  const firstRange = rootRanges[0];
  const lastRange = rootRanges[rootRanges.length - 1];
  const fullRange = {
    offset: firstRange.offset,
    count: lastRange.offset + lastRange.count - firstRange.offset
  };
  const primitiveBounds = new Float32Array(6 * fullRange.count);
  primitiveBounds.offset = fullRange.offset;
  bvh.computePrimitiveBounds(fullRange.offset, fullRange.count, primitiveBounds);
  bvh._roots = rootRanges.map((range) => {
    const root = buildTree(bvh, primitiveBounds, range.offset, range.count, options, fullRange);
    const nodeCount = countNodes(root);
    const buffer = new BufferConstructor(BYTES_PER_NODE * nodeCount);
    populateBuffer(0, root, buffer);
    return buffer;
  });
}

// node_modules/three-mesh-bvh/src/core/cast/shapecast.js
import { Box3 } from "./vendor/three.module.js";

// node_modules/three-mesh-bvh/src/utils/PrimitivePool.js
var PrimitivePool = class {
  constructor(getNewPrimitive) {
    this._getNewPrimitive = getNewPrimitive;
    this._primitives = [];
  }
  getPrimitive() {
    const primitives = this._primitives;
    if (primitives.length === 0) {
      return this._getNewPrimitive();
    } else {
      return primitives.pop();
    }
  }
  releasePrimitive(primitive) {
    this._primitives.push(primitive);
  }
};

// node_modules/three-mesh-bvh/src/core/utils/BufferStack.js
var _BufferStack = class {
  constructor() {
    this.float32Array = null;
    this.uint16Array = null;
    this.uint32Array = null;
    const stack = [];
    let prevBuffer = null;
    this.setBuffer = (buffer) => {
      if (prevBuffer) {
        stack.push(prevBuffer);
      }
      prevBuffer = buffer;
      this.float32Array = new Float32Array(buffer);
      this.uint16Array = new Uint16Array(buffer);
      this.uint32Array = new Uint32Array(buffer);
    };
    this.clearBuffer = () => {
      prevBuffer = null;
      this.float32Array = null;
      this.uint16Array = null;
      this.uint32Array = null;
      if (stack.length !== 0) {
        this.setBuffer(stack.pop());
      }
    };
  }
};
var BufferStack = /* @__PURE__ */ new _BufferStack();

// node_modules/three-mesh-bvh/src/core/cast/shapecast.js
var _box1;
var _box2;
var boxStack = [];
var boxPool = /* @__PURE__ */ new PrimitivePool(() => new Box3());
function shapecast(bvh, root, intersectsBounds, intersectsRange, boundsTraverseOrder, nodeOffset) {
  _box1 = boxPool.getPrimitive();
  _box2 = boxPool.getPrimitive();
  boxStack.push(_box1, _box2);
  BufferStack.setBuffer(bvh._roots[root]);
  const result = shapecastTraverse(0, bvh.geometry, intersectsBounds, intersectsRange, boundsTraverseOrder, nodeOffset);
  BufferStack.clearBuffer();
  boxPool.releasePrimitive(_box1);
  boxPool.releasePrimitive(_box2);
  boxStack.pop();
  boxStack.pop();
  const length = boxStack.length;
  if (length > 0) {
    _box2 = boxStack[length - 1];
    _box1 = boxStack[length - 2];
  }
  return result;
}
function shapecastTraverse(nodeIndex32, geometry, intersectsBoundsFunc, intersectsRangeFunc, nodeScoreFunc = null, nodeIndexOffset = 0, depth = 0) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  let nodeIndex16 = nodeIndex32 * 2;
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    arrayToBox(BOUNDING_DATA_INDEX(nodeIndex32), float32Array2, _box1);
    return intersectsRangeFunc(offset, count, false, depth, nodeIndexOffset + nodeIndex32 / UINT32_PER_NODE, _box1);
  } else {
    let getLeftOffset = function(nodeIndex322) {
      const { uint16Array: uint16Array3, uint32Array: uint32Array3 } = BufferStack;
      let nodeIndex162 = nodeIndex322 * 2;
      while (!IS_LEAF(nodeIndex162, uint16Array3)) {
        nodeIndex322 = LEFT_NODE(nodeIndex322);
        nodeIndex162 = nodeIndex322 * 2;
      }
      return OFFSET(nodeIndex322, uint32Array3);
    }, getRightEndOffset = function(nodeIndex322) {
      const { uint16Array: uint16Array3, uint32Array: uint32Array3 } = BufferStack;
      let nodeIndex162 = nodeIndex322 * 2;
      while (!IS_LEAF(nodeIndex162, uint16Array3)) {
        nodeIndex322 = RIGHT_NODE(nodeIndex322, uint32Array3);
        nodeIndex162 = nodeIndex322 * 2;
      }
      return OFFSET(nodeIndex322, uint32Array3) + COUNT(nodeIndex162, uint16Array3);
    };
    const left = LEFT_NODE(nodeIndex32);
    const right = RIGHT_NODE(nodeIndex32, uint32Array2);
    let c1 = left;
    let c2 = right;
    let score1, score2;
    let box1, box2;
    if (nodeScoreFunc) {
      box1 = _box1;
      box2 = _box2;
      arrayToBox(BOUNDING_DATA_INDEX(c1), float32Array2, box1);
      arrayToBox(BOUNDING_DATA_INDEX(c2), float32Array2, box2);
      score1 = nodeScoreFunc(box1);
      score2 = nodeScoreFunc(box2);
      if (score2 < score1) {
        c1 = right;
        c2 = left;
        const temp5 = score1;
        score1 = score2;
        score2 = temp5;
        box1 = box2;
      }
    }
    if (!box1) {
      box1 = _box1;
      arrayToBox(BOUNDING_DATA_INDEX(c1), float32Array2, box1);
    }
    const isC1Leaf = IS_LEAF(c1 * 2, uint16Array2);
    const c1Intersection = intersectsBoundsFunc(box1, isC1Leaf, score1, depth + 1, nodeIndexOffset + c1 / UINT32_PER_NODE);
    let c1StopTraversal;
    if (c1Intersection === CONTAINED) {
      const offset = getLeftOffset(c1);
      const end = getRightEndOffset(c1);
      const count = end - offset;
      c1StopTraversal = intersectsRangeFunc(offset, count, true, depth + 1, nodeIndexOffset + c1 / UINT32_PER_NODE, box1);
    } else {
      c1StopTraversal = c1Intersection && shapecastTraverse(
        c1,
        geometry,
        intersectsBoundsFunc,
        intersectsRangeFunc,
        nodeScoreFunc,
        nodeIndexOffset,
        depth + 1
      );
    }
    if (c1StopTraversal) return true;
    box2 = _box2;
    arrayToBox(BOUNDING_DATA_INDEX(c2), float32Array2, box2);
    const isC2Leaf = IS_LEAF(c2 * 2, uint16Array2);
    const c2Intersection = intersectsBoundsFunc(box2, isC2Leaf, score2, depth + 1, nodeIndexOffset + c2 / UINT32_PER_NODE);
    let c2StopTraversal;
    if (c2Intersection === CONTAINED) {
      const offset = getLeftOffset(c2);
      const end = getRightEndOffset(c2);
      const count = end - offset;
      c2StopTraversal = intersectsRangeFunc(offset, count, true, depth + 1, nodeIndexOffset + c2 / UINT32_PER_NODE, box2);
    } else {
      c2StopTraversal = c2Intersection && shapecastTraverse(
        c2,
        geometry,
        intersectsBoundsFunc,
        intersectsRangeFunc,
        nodeScoreFunc,
        nodeIndexOffset,
        depth + 1
      );
    }
    if (c2StopTraversal) return true;
    return false;
  }
}

// node_modules/three-mesh-bvh/src/core/cast/bvhcast.js
import { Box3 as Box32, Matrix4 } from "./vendor/three.module.js";
var _bufferStack1 = /* @__PURE__ */ new BufferStack.constructor();
var _bufferStack2 = /* @__PURE__ */ new BufferStack.constructor();
var _boxPool = /* @__PURE__ */ new PrimitivePool(() => new Box32());
var _leftBox1 = /* @__PURE__ */ new Box32();
var _rightBox1 = /* @__PURE__ */ new Box32();
var _leftBox2 = /* @__PURE__ */ new Box32();
var _rightBox2 = /* @__PURE__ */ new Box32();
var _active = false;
function bvhcast(bvh, otherBvh, matrixToLocal, intersectsRanges) {
  if (_active) {
    throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");
  }
  _active = true;
  const roots = bvh._roots;
  const otherRoots = otherBvh._roots;
  let result;
  let nodeOffset1 = 0;
  let nodeOffset2 = 0;
  const invMat = new Matrix4().copy(matrixToLocal).invert();
  for (let i = 0, il = roots.length; i < il; i++) {
    _bufferStack1.setBuffer(roots[i]);
    nodeOffset2 = 0;
    const localBox = _boxPool.getPrimitive();
    arrayToBox(BOUNDING_DATA_INDEX(0), _bufferStack1.float32Array, localBox);
    localBox.applyMatrix4(invMat);
    for (let j = 0, jl = otherRoots.length; j < jl; j++) {
      _bufferStack2.setBuffer(otherRoots[j]);
      result = _traverse(
        0,
        0,
        matrixToLocal,
        invMat,
        intersectsRanges,
        nodeOffset1,
        nodeOffset2,
        0,
        0,
        localBox
      );
      _bufferStack2.clearBuffer();
      nodeOffset2 += otherRoots[j].byteLength / BYTES_PER_NODE;
      if (result) {
        break;
      }
    }
    _boxPool.releasePrimitive(localBox);
    _bufferStack1.clearBuffer();
    nodeOffset1 += roots[i].byteLength / BYTES_PER_NODE;
    if (result) {
      break;
    }
  }
  _active = false;
  return result;
}
function _traverse(node1Index32, node2Index32, matrix2to1, matrix1to2, intersectsRangesFunc, node1IndexOffset = 0, node2IndexOffset = 0, depth1 = 0, depth2 = 0, currBox = null, reversed = false) {
  let bufferStack1, bufferStack2;
  if (reversed) {
    bufferStack1 = _bufferStack2;
    bufferStack2 = _bufferStack1;
  } else {
    bufferStack1 = _bufferStack1;
    bufferStack2 = _bufferStack2;
  }
  const float32Array1 = bufferStack1.float32Array, uint32Array1 = bufferStack1.uint32Array, uint16Array1 = bufferStack1.uint16Array, float32Array2 = bufferStack2.float32Array, uint32Array2 = bufferStack2.uint32Array, uint16Array2 = bufferStack2.uint16Array;
  const node1Index16 = node1Index32 * 2;
  const node2Index16 = node2Index32 * 2;
  const isLeaf1 = IS_LEAF(node1Index16, uint16Array1);
  const isLeaf2 = IS_LEAF(node2Index16, uint16Array2);
  let result = false;
  if (isLeaf2 && isLeaf1) {
    if (reversed) {
      result = intersectsRangesFunc(
        OFFSET(node2Index32, uint32Array2),
        COUNT(node2Index32 * 2, uint16Array2),
        OFFSET(node1Index32, uint32Array1),
        COUNT(node1Index32 * 2, uint16Array1),
        depth2,
        node2IndexOffset + node2Index32 / UINT32_PER_NODE,
        depth1,
        node1IndexOffset + node1Index32 / UINT32_PER_NODE
      );
    } else {
      result = intersectsRangesFunc(
        OFFSET(node1Index32, uint32Array1),
        COUNT(node1Index32 * 2, uint16Array1),
        OFFSET(node2Index32, uint32Array2),
        COUNT(node2Index32 * 2, uint16Array2),
        depth1,
        node1IndexOffset + node1Index32 / UINT32_PER_NODE,
        depth2,
        node2IndexOffset + node2Index32 / UINT32_PER_NODE
      );
    }
  } else if (isLeaf2) {
    const newBox = _boxPool.getPrimitive();
    arrayToBox(BOUNDING_DATA_INDEX(node2Index32), float32Array2, newBox);
    newBox.applyMatrix4(matrix2to1);
    const cl1 = LEFT_NODE(node1Index32);
    const cr1 = RIGHT_NODE(node1Index32, uint32Array1);
    arrayToBox(BOUNDING_DATA_INDEX(cl1), float32Array1, _leftBox1);
    arrayToBox(BOUNDING_DATA_INDEX(cr1), float32Array1, _rightBox1);
    const intersectCl1 = newBox.intersectsBox(_leftBox1);
    const intersectCr1 = newBox.intersectsBox(_rightBox1);
    result = intersectCl1 && _traverse(
      node2Index32,
      cl1,
      matrix1to2,
      matrix2to1,
      intersectsRangesFunc,
      node2IndexOffset,
      node1IndexOffset,
      depth2,
      depth1 + 1,
      newBox,
      !reversed
    ) || intersectCr1 && _traverse(
      node2Index32,
      cr1,
      matrix1to2,
      matrix2to1,
      intersectsRangesFunc,
      node2IndexOffset,
      node1IndexOffset,
      depth2,
      depth1 + 1,
      newBox,
      !reversed
    );
    _boxPool.releasePrimitive(newBox);
  } else {
    const cl2 = LEFT_NODE(node2Index32);
    const cr2 = RIGHT_NODE(node2Index32, uint32Array2);
    arrayToBox(BOUNDING_DATA_INDEX(cl2), float32Array2, _leftBox2);
    arrayToBox(BOUNDING_DATA_INDEX(cr2), float32Array2, _rightBox2);
    const leftIntersects = currBox.intersectsBox(_leftBox2);
    const rightIntersects = currBox.intersectsBox(_rightBox2);
    if (leftIntersects && rightIntersects) {
      result = _traverse(
        node1Index32,
        cl2,
        matrix2to1,
        matrix1to2,
        intersectsRangesFunc,
        node1IndexOffset,
        node2IndexOffset,
        depth1,
        depth2 + 1,
        currBox,
        reversed
      ) || _traverse(
        node1Index32,
        cr2,
        matrix2to1,
        matrix1to2,
        intersectsRangesFunc,
        node1IndexOffset,
        node2IndexOffset,
        depth1,
        depth2 + 1,
        currBox,
        reversed
      );
    } else if (leftIntersects) {
      if (isLeaf1) {
        result = _traverse(
          node1Index32,
          cl2,
          matrix2to1,
          matrix1to2,
          intersectsRangesFunc,
          node1IndexOffset,
          node2IndexOffset,
          depth1,
          depth2 + 1,
          currBox,
          reversed
        );
      } else {
        const newBox = _boxPool.getPrimitive();
        newBox.copy(_leftBox2).applyMatrix4(matrix2to1);
        const cl1 = LEFT_NODE(node1Index32);
        const cr1 = RIGHT_NODE(node1Index32, uint32Array1);
        arrayToBox(BOUNDING_DATA_INDEX(cl1), float32Array1, _leftBox1);
        arrayToBox(BOUNDING_DATA_INDEX(cr1), float32Array1, _rightBox1);
        const intersectCl1 = newBox.intersectsBox(_leftBox1);
        const intersectCr1 = newBox.intersectsBox(_rightBox1);
        result = intersectCl1 && _traverse(
          cl2,
          cl1,
          matrix1to2,
          matrix2to1,
          intersectsRangesFunc,
          node2IndexOffset,
          node1IndexOffset,
          depth2,
          depth1 + 1,
          newBox,
          !reversed
        ) || intersectCr1 && _traverse(
          cl2,
          cr1,
          matrix1to2,
          matrix2to1,
          intersectsRangesFunc,
          node2IndexOffset,
          node1IndexOffset,
          depth2,
          depth1 + 1,
          newBox,
          !reversed
        );
        _boxPool.releasePrimitive(newBox);
      }
    } else if (rightIntersects) {
      if (isLeaf1) {
        result = _traverse(
          node1Index32,
          cr2,
          matrix2to1,
          matrix1to2,
          intersectsRangesFunc,
          node1IndexOffset,
          node2IndexOffset,
          depth1,
          depth2 + 1,
          currBox,
          reversed
        );
      } else {
        const newBox = _boxPool.getPrimitive();
        newBox.copy(_rightBox2).applyMatrix4(matrix2to1);
        const cl1 = LEFT_NODE(node1Index32);
        const cr1 = RIGHT_NODE(node1Index32, uint32Array1);
        arrayToBox(BOUNDING_DATA_INDEX(cl1), float32Array1, _leftBox1);
        arrayToBox(BOUNDING_DATA_INDEX(cr1), float32Array1, _rightBox1);
        const intersectCl1 = newBox.intersectsBox(_leftBox1);
        const intersectCr1 = newBox.intersectsBox(_rightBox1);
        result = intersectCl1 && _traverse(
          cr2,
          cl1,
          matrix1to2,
          matrix2to1,
          intersectsRangesFunc,
          node2IndexOffset,
          node1IndexOffset,
          depth2,
          depth1 + 1,
          newBox,
          !reversed
        ) || intersectCr1 && _traverse(
          cr2,
          cr1,
          matrix1to2,
          matrix2to1,
          intersectsRangesFunc,
          node2IndexOffset,
          node1IndexOffset,
          depth2,
          depth1 + 1,
          newBox,
          !reversed
        );
        _boxPool.releasePrimitive(newBox);
      }
    }
  }
  return result;
}

// node_modules/three-mesh-bvh/src/core/BVH.js
var _tempBox = /* @__PURE__ */ new Box33();
var _tempBuffer = /* @__PURE__ */ new Float32Array(6);
var BVH = class {
  constructor() {
    this._roots = null;
    this.primitiveBuffer = null;
    this.primitiveBufferStride = null;
  }
  init(options) {
    options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
    buildPackedTree(this, options);
  }
  getRootRanges() {
    throw new Error("BVH: getRootRanges() not implemented");
  }
  // write the i-th primitive bounds in a 6-value min / max format to the buffer
  // starting at the given "writeOffset"
  writePrimitiveBounds() {
    throw new Error("BVH: writePrimitiveBounds() not implemented");
  }
  // writes the union bounds of all primitives in the given range in a min / max format
  // to the buffer
  writePrimitiveRangeBounds(offset, count, targetBuffer, baseIndex) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (let i = offset, end = offset + count; i < end; i++) {
      this.writePrimitiveBounds(i, _tempBuffer, 0);
      const [lx, ly, lz, rx, ry, rz] = _tempBuffer;
      if (lx < minX) minX = lx;
      if (rx > maxX) maxX = rx;
      if (ly < minY) minY = ly;
      if (ry > maxY) maxY = ry;
      if (lz < minZ) minZ = lz;
      if (rz > maxZ) maxZ = rz;
    }
    targetBuffer[baseIndex + 0] = minX;
    targetBuffer[baseIndex + 1] = minY;
    targetBuffer[baseIndex + 2] = minZ;
    targetBuffer[baseIndex + 3] = maxX;
    targetBuffer[baseIndex + 4] = maxY;
    targetBuffer[baseIndex + 5] = maxZ;
    return targetBuffer;
  }
  computePrimitiveBounds(offset, count, targetBuffer) {
    const boundsOffset = targetBuffer.offset || 0;
    for (let i = offset, end = offset + count; i < end; i++) {
      this.writePrimitiveBounds(i, _tempBuffer, 0);
      const [lx, ly, lz, rx, ry, rz] = _tempBuffer;
      const cx = (lx + rx) / 2;
      const cy = (ly + ry) / 2;
      const cz = (lz + rz) / 2;
      const hx = (rx - lx) / 2;
      const hy = (ry - ly) / 2;
      const hz = (rz - lz) / 2;
      const baseIndex = (i - boundsOffset) * 6;
      targetBuffer[baseIndex + 0] = cx;
      targetBuffer[baseIndex + 1] = hx + (Math.abs(cx) + hx) * FLOAT32_EPSILON;
      targetBuffer[baseIndex + 2] = cy;
      targetBuffer[baseIndex + 3] = hy + (Math.abs(cy) + hy) * FLOAT32_EPSILON;
      targetBuffer[baseIndex + 4] = cz;
      targetBuffer[baseIndex + 5] = hz + (Math.abs(cz) + hz) * FLOAT32_EPSILON;
    }
    return targetBuffer;
  }
  /**
   * Adjusts all primitive offsets stored in the BVH leaf nodes by the given value. Useful when
   * geometry buffers have been shifted or compacted (e.g. when merging geometries).
   * @param {number} offset
   */
  shiftPrimitiveOffsets(offset) {
    const indirectBuffer = this._indirectBuffer;
    if (indirectBuffer) {
      for (let i = 0, l = indirectBuffer.length; i < l; i++) {
        indirectBuffer[i] += offset;
      }
    } else {
      const roots = this._roots;
      for (let rootIndex = 0; rootIndex < roots.length; rootIndex++) {
        const root = roots[rootIndex];
        const uint32Array2 = new Uint32Array(root);
        const uint16Array2 = new Uint16Array(root);
        const totalNodes = root.byteLength / BYTES_PER_NODE;
        for (let node = 0; node < totalNodes; node++) {
          const node32Index = UINT32_PER_NODE * node;
          const node16Index = 2 * node32Index;
          if (IS_LEAF(node16Index, uint16Array2)) {
            uint32Array2[node32Index + 6] += offset;
          }
        }
      }
    }
  }
  /**
   * Traverses all nodes of the BVH, invoking a callback for each node.
   *
   * For leaf nodes the callback receives `( depth, isLeaf, boundingData, offset, count )`.
   * For internal nodes it receives `( depth, isLeaf, boundingData, splitAxis )` and may
   * return `true` to stop descending into that node's children.
   *
   * @param {Function} callback
   * @param {number} [rootIndex=0]
   */
  traverse(callback, rootIndex = 0) {
    const buffer = this._roots[rootIndex];
    const uint32Array2 = new Uint32Array(buffer);
    const uint16Array2 = new Uint16Array(buffer);
    _traverse2(0);
    function _traverse2(node32Index, depth = 0) {
      const node16Index = node32Index * 2;
      const isLeaf = IS_LEAF(node16Index, uint16Array2);
      if (isLeaf) {
        const offset = uint32Array2[node32Index + 6];
        const count = uint16Array2[node16Index + 14];
        callback(depth, isLeaf, new Float32Array(buffer, node32Index * 4, 6), offset, count);
      } else {
        const left = LEFT_NODE(node32Index);
        const right = RIGHT_NODE(node32Index, uint32Array2);
        const splitAxis = SPLIT_AXIS(node32Index, uint32Array2);
        const stopTraversal = callback(depth, isLeaf, new Float32Array(buffer, node32Index * 4, 6), splitAxis);
        if (!stopTraversal) {
          _traverse2(left, depth + 1);
          _traverse2(right, depth + 1);
        }
      }
    }
  }
  /**
   * Refits all BVH node bounds to reflect the current primitive positions. Faster than
   * rebuilding the BVH but produces a less optimal tree after large vertex deformations.
   */
  refit() {
    const roots = this._roots;
    for (let rootIndex = 0, rootCount = roots.length; rootIndex < rootCount; rootIndex++) {
      const buffer = roots[rootIndex];
      const uint32Array2 = new Uint32Array(buffer);
      const uint16Array2 = new Uint16Array(buffer);
      const float32Array2 = new Float32Array(buffer);
      const totalNodes = buffer.byteLength / BYTES_PER_NODE;
      for (let nodeIndex = totalNodes - 1; nodeIndex >= 0; nodeIndex--) {
        const nodeIndex32 = nodeIndex * UINT32_PER_NODE;
        const nodeIndex16 = nodeIndex32 * 2;
        const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
        if (isLeaf) {
          const offset = OFFSET(nodeIndex32, uint32Array2);
          const count = COUNT(nodeIndex16, uint16Array2);
          this.writePrimitiveRangeBounds(offset, count, _tempBuffer, 0);
          float32Array2.set(_tempBuffer, nodeIndex32);
        } else {
          const left = LEFT_NODE(nodeIndex32);
          const right = RIGHT_NODE(nodeIndex32, uint32Array2);
          for (let i = 0; i < 3; i++) {
            const leftMin = float32Array2[left + i];
            const leftMax = float32Array2[left + i + 3];
            const rightMin = float32Array2[right + i];
            const rightMax = float32Array2[right + i + 3];
            float32Array2[nodeIndex32 + i] = leftMin < rightMin ? leftMin : rightMin;
            float32Array2[nodeIndex32 + i + 3] = leftMax > rightMax ? leftMax : rightMax;
          }
        }
      }
    }
  }
  /**
   * Computes the axis-aligned bounding box of all primitives in the BVH.
   * @param {Box3} target - Target box to write the result into.
   * @returns {Box3}
   */
  getBoundingBox(target) {
    target.makeEmpty();
    const roots = this._roots;
    roots.forEach((buffer) => {
      arrayToBox(0, new Float32Array(buffer), _tempBox);
      target.union(_tempBox);
    });
    return target;
  }
  /**
   * A generalized traversal function for performing spatial queries against the BVH. Returns
   * `true` as soon as a primitive has been reported as intersected. The tree is traversed
   * depth-first; `boundsTraverseOrder` controls which child is visited first. Returning
   * `CONTAINED` from `intersectsBounds` skips further child traversal and intersects all
   * primitives in that subtree immediately.
   *
   * @param {Object} callbacks
   * @param {IntersectsBoundsCallback} callbacks.intersectsBounds
   * @param {IntersectsRangeCallback} [callbacks.intersectsRange]
   * @param {BoundsTraverseOrderCallback} [callbacks.boundsTraverseOrder]
   * @returns {boolean}
   */
  // TODO: see if we can get rid of "iterateFunc" here as well as the primitive so the function
  // API aligns with the "shapecast" implementation
  shapecast(callbacks) {
    let {
      boundsTraverseOrder,
      intersectsBounds,
      intersectsRange,
      intersectsPrimitive,
      scratchPrimitive,
      iterate
    } = callbacks;
    if (intersectsRange && intersectsPrimitive) {
      const originalIntersectsRange = intersectsRange;
      intersectsRange = (offset, count, contained, depth, nodeIndex) => {
        if (!originalIntersectsRange(offset, count, contained, depth, nodeIndex)) {
          return iterate(offset, count, this, intersectsPrimitive, contained, depth, scratchPrimitive);
        }
        return true;
      };
    } else if (!intersectsRange) {
      if (intersectsPrimitive) {
        intersectsRange = (offset, count, contained, depth) => {
          return iterate(offset, count, this, intersectsPrimitive, contained, depth, scratchPrimitive);
        };
      } else {
        intersectsRange = (offset, count, contained) => {
          return contained;
        };
      }
    }
    let result = false;
    let nodeOffset = 0;
    const roots = this._roots;
    for (let i = 0, l = roots.length; i < l; i++) {
      const root = roots[i];
      result = shapecast(this, i, intersectsBounds, intersectsRange, boundsTraverseOrder, nodeOffset);
      if (result) {
        break;
      }
      nodeOffset += root.byteLength / BYTES_PER_NODE;
    }
    return result;
  }
  /**
   * Simultaneously traverses two BVH structures to find intersecting primitive pairs. Returns
   * `true` as soon as any intersection is reported. Both trees are traversed depth-first with
   * alternating descent. `matrixToLocal` transforms `otherBvh` into the local space of this BVH.
   *
   * @param {BVH} otherBvh
   * @param {Matrix4} matrixToLocal
   * @param {Object} callbacks
   * @param {IntersectsRangesCallback} callbacks.intersectsRanges
   * @returns {boolean}
   */
  bvhcast(otherBvh, matrixToLocal, callbacks) {
    let { intersectsRanges } = callbacks;
    return bvhcast(this, otherBvh, matrixToLocal, intersectsRanges);
  }
};

// node_modules/three-mesh-bvh/src/core/GeometryBVH.js
import { Box3 as Box34 } from "./vendor/three.module.js";

// node_modules/three-mesh-bvh/src/utils/BufferUtils.js
function isSharedArrayBufferSupported() {
  return typeof SharedArrayBuffer !== "undefined";
}

// node_modules/three-mesh-bvh/src/core/build/geometryUtils.js
import { BufferAttribute } from "./vendor/three.module.js";
function getVertexCount(geo) {
  return geo.index ? geo.index.count : geo.attributes.position.count;
}
function getTriCount(geo) {
  return getVertexCount(geo) / 3;
}
function getIndexArray(vertexCount, BufferConstructor = ArrayBuffer) {
  if (vertexCount > 65535) {
    return new Uint32Array(new BufferConstructor(4 * vertexCount));
  } else {
    return new Uint16Array(new BufferConstructor(2 * vertexCount));
  }
}
function ensureIndex(geo, options) {
  if (!geo.index) {
    const vertexCount = geo.attributes.position.count;
    const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
    const index = getIndexArray(vertexCount, BufferConstructor);
    geo.setIndex(new BufferAttribute(index, 1));
    for (let i = 0; i < vertexCount; i++) {
      index[i] = i;
    }
  }
}
function getFullPrimitiveRange(geo, range, stride) {
  const primitiveCount = getVertexCount(geo) / stride;
  const drawRange = range ? range : geo.drawRange;
  const start = drawRange.start / stride;
  const end = (drawRange.start + drawRange.count) / stride;
  const offset = Math.max(0, start);
  const count = Math.min(primitiveCount, end) - offset;
  return {
    offset: Math.floor(offset),
    count: Math.floor(count)
  };
}
function getPrimitiveGroupRanges(geo, stride) {
  return geo.groups.map((group) => ({
    offset: group.start / stride,
    count: group.count / stride
  }));
}
function getRootPrimitiveRanges(geo, range, stride) {
  const drawRange = getFullPrimitiveRange(geo, range, stride);
  const primitiveRanges = getPrimitiveGroupRanges(geo, stride);
  if (!primitiveRanges.length) {
    return [drawRange];
  }
  const ranges = [];
  const drawRangeStart = drawRange.offset;
  const drawRangeEnd = drawRange.offset + drawRange.count;
  const primitiveCount = getVertexCount(geo) / stride;
  const events = [];
  for (const group of primitiveRanges) {
    const { offset, count } = group;
    const groupStart = offset;
    const groupCount = isFinite(count) ? count : primitiveCount - offset;
    const groupEnd = offset + groupCount;
    if (groupStart < drawRangeEnd && groupEnd > drawRangeStart) {
      events.push({ pos: Math.max(drawRangeStart, groupStart), isStart: true });
      events.push({ pos: Math.min(drawRangeEnd, groupEnd), isStart: false });
    }
  }
  events.sort((a, b) => {
    if (a.pos !== b.pos) {
      return a.pos - b.pos;
    } else {
      return a.type === "end" ? -1 : 1;
    }
  });
  let activeGroups = 0;
  let lastPos = null;
  for (const event of events) {
    const newPos = event.pos;
    if (activeGroups !== 0 && newPos !== lastPos) {
      ranges.push({
        offset: lastPos,
        count: newPos - lastPos
      });
    }
    activeGroups += event.isStart ? 1 : -1;
    lastPos = newPos;
  }
  return ranges;
}

// node_modules/three-mesh-bvh/src/core/GeometryBVH.js
function generateIndirectBuffer(ranges, useSharedArrayBuffer) {
  const lastRange = ranges[ranges.length - 1];
  const useUint32 = lastRange.offset + lastRange.count > 2 ** 16;
  const length = ranges.reduce((acc, val) => acc + val.count, 0);
  const byteCount = useUint32 ? 4 : 2;
  const buffer = useSharedArrayBuffer ? new SharedArrayBuffer(length * byteCount) : new ArrayBuffer(length * byteCount);
  const indirectBuffer = useUint32 ? new Uint32Array(buffer) : new Uint16Array(buffer);
  let index = 0;
  for (let r = 0; r < ranges.length; r++) {
    const { offset, count } = ranges[r];
    for (let i = 0; i < count; i++) {
      indirectBuffer[index + i] = offset + i;
    }
    index += count;
  }
  return indirectBuffer;
}
var GeometryBVH = class extends BVH {
  /**
   * Whether the BVH was built in indirect mode.
   * @type {boolean}
   * @readonly
   */
  get indirect() {
    return !!this._indirectBuffer;
  }
  get primitiveStride() {
    return null;
  }
  get primitiveBufferStride() {
    return this.indirect ? 1 : this.primitiveStride;
  }
  set primitiveBufferStride(v) {
  }
  get primitiveBuffer() {
    return this.indirect ? this._indirectBuffer : this.geometry.index.array;
  }
  set primitiveBuffer(v) {
  }
  constructor(geometry, options = {}) {
    if (!geometry.isBufferGeometry) {
      throw new Error("BVH: Only BufferGeometries are supported.");
    } else if (geometry.index && geometry.index.isInterleavedBufferAttribute) {
      throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.");
    }
    if (options.useSharedArrayBuffer && !isSharedArrayBufferSupported()) {
      throw new Error("BVH: SharedArrayBuffer is not available.");
    }
    super();
    this.geometry = geometry;
    this.resolvePrimitiveIndex = options.indirect ? (i) => this._indirectBuffer[i] : (i) => i;
    this.primitiveBuffer = null;
    this.primitiveBufferStride = null;
    this._indirectBuffer = null;
    options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
    if (!options[SKIP_GENERATION]) {
      this.init(options);
    }
  }
  init(options) {
    const { geometry, primitiveStride } = this;
    if (options.indirect) {
      const ranges = getRootPrimitiveRanges(geometry, options.range, primitiveStride);
      const indirectBuffer = generateIndirectBuffer(ranges, options.useSharedArrayBuffer);
      this._indirectBuffer = indirectBuffer;
    } else {
      ensureIndex(geometry, options);
    }
    super.init(options);
    if (!geometry.boundingBox && options.setBoundingBox) {
      geometry.boundingBox = this.getBoundingBox(new Box34());
    }
  }
  // Abstract methods to be implemented by subclasses
  getRootRanges(range) {
    if (this.indirect) {
      return [{ offset: 0, count: this._indirectBuffer.length }];
    } else {
      return getRootPrimitiveRanges(this.geometry, range, this.primitiveStride);
    }
  }
  raycastObject3D() {
    throw new Error("BVH: raycastObject3D() not implemented");
  }
};

// node_modules/three-mesh-bvh/src/core/MeshBVH.js
import { BufferAttribute as BufferAttribute2, FrontSide, Ray, Vector3 as Vector310, Matrix4 as Matrix47 } from "./vendor/three.module.js";

// node_modules/three-mesh-bvh/src/math/OrientedBox.js
import { Vector3 as Vector34, Matrix4 as Matrix42, Line3 as Line33 } from "./vendor/three.module.js";

// node_modules/three-mesh-bvh/src/math/SeparatingAxisBounds.js
import { Vector3 } from "./vendor/three.module.js";
var SeparatingAxisBounds = class {
  constructor() {
    this.min = Infinity;
    this.max = -Infinity;
  }
  setFromPointsField(points, field) {
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0, l = points.length; i < l; i++) {
      const p = points[i];
      const val = p[field];
      min = val < min ? val : min;
      max = val > max ? val : max;
    }
    this.min = min;
    this.max = max;
  }
  setFromPoints(axis, points) {
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0, l = points.length; i < l; i++) {
      const p = points[i];
      const val = axis.dot(p);
      min = val < min ? val : min;
      max = val > max ? val : max;
    }
    this.min = min;
    this.max = max;
  }
  isSeparated(other) {
    return this.min > other.max || other.min > this.max;
  }
};
SeparatingAxisBounds.prototype.setFromBox = /* @__PURE__ */ (function() {
  const p = /* @__PURE__ */ new Vector3();
  return function setFromBox(axis, box) {
    const boxMin = box.min;
    const boxMax = box.max;
    let min = Infinity;
    let max = -Infinity;
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        for (let z = 0; z <= 1; z++) {
          p.x = boxMin.x * x + boxMax.x * (1 - x);
          p.y = boxMin.y * y + boxMax.y * (1 - y);
          p.z = boxMin.z * z + boxMax.z * (1 - z);
          const val = axis.dot(p);
          min = Math.min(val, min);
          max = Math.max(val, max);
        }
      }
    }
    this.min = min;
    this.max = max;
  };
})();

// node_modules/three-mesh-bvh/src/math/ExtendedTriangle.js
import { Triangle, Vector3 as Vector33, Vector2 as Vector22, Line3 as Line32, Plane as Plane2 } from "./vendor/three.module.js";

// node_modules/three-mesh-bvh/src/math/MathUtilities.js
import { Vector3 as Vector32, Vector2, Plane, Line3 } from "./vendor/three.module.js";
var closestPointLineToLine = /* @__PURE__ */ (function() {
  const dir1 = /* @__PURE__ */ new Vector32();
  const dir2 = /* @__PURE__ */ new Vector32();
  const v02 = /* @__PURE__ */ new Vector32();
  return function closestPointLineToLine2(l1, l2, result) {
    const v0 = l1.start;
    const v10 = dir1;
    const v2 = l2.start;
    const v32 = dir2;
    v02.subVectors(v0, v2);
    dir1.subVectors(l1.end, l1.start);
    dir2.subVectors(l2.end, l2.start);
    const d0232 = v02.dot(v32);
    const d3210 = v32.dot(v10);
    const d3232 = v32.dot(v32);
    const d0210 = v02.dot(v10);
    const d1010 = v10.dot(v10);
    const denom = d1010 * d3232 - d3210 * d3210;
    let d, d2;
    if (denom !== 0) {
      d = (d0232 * d3210 - d0210 * d3232) / denom;
    } else {
      d = 0;
    }
    d2 = (d0232 + d * d3210) / d3232;
    result.x = d;
    result.y = d2;
  };
})();
var closestPointsSegmentToSegment = /* @__PURE__ */ (function() {
  const paramResult = /* @__PURE__ */ new Vector2();
  const temp14 = /* @__PURE__ */ new Vector32();
  const temp23 = /* @__PURE__ */ new Vector32();
  return function closestPointsSegmentToSegment2(l1, l2, target1, target2) {
    closestPointLineToLine(l1, l2, paramResult);
    let d = paramResult.x;
    let d2 = paramResult.y;
    if (d >= 0 && d <= 1 && d2 >= 0 && d2 <= 1) {
      l1.at(d, target1);
      l2.at(d2, target2);
      return;
    } else if (d >= 0 && d <= 1) {
      if (d2 < 0) {
        l2.at(0, target2);
      } else {
        l2.at(1, target2);
      }
      l1.closestPointToPoint(target2, true, target1);
      return;
    } else if (d2 >= 0 && d2 <= 1) {
      if (d < 0) {
        l1.at(0, target1);
      } else {
        l1.at(1, target1);
      }
      l2.closestPointToPoint(target1, true, target2);
      return;
    } else {
      let p;
      if (d < 0) {
        p = l1.start;
      } else {
        p = l1.end;
      }
      let p2;
      if (d2 < 0) {
        p2 = l2.start;
      } else {
        p2 = l2.end;
      }
      const closestPoint = temp14;
      const closestPoint2 = temp23;
      l1.closestPointToPoint(p2, true, temp14);
      l2.closestPointToPoint(p, true, temp23);
      if (closestPoint.distanceToSquared(p2) <= closestPoint2.distanceToSquared(p)) {
        target1.copy(closestPoint);
        target2.copy(p2);
        return;
      } else {
        target1.copy(p);
        target2.copy(closestPoint2);
        return;
      }
    }
  };
})();
var sphereIntersectTriangle = /* @__PURE__ */ (function() {
  const closestPointTemp = /* @__PURE__ */ new Vector32();
  const projectedPointTemp = /* @__PURE__ */ new Vector32();
  const planeTemp = /* @__PURE__ */ new Plane();
  const lineTemp = /* @__PURE__ */ new Line3();
  return function sphereIntersectTriangle2(sphere, triangle4) {
    const { radius, center } = sphere;
    const { a, b, c } = triangle4;
    lineTemp.start = a;
    lineTemp.end = b;
    const closestPoint1 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
    if (closestPoint1.distanceTo(center) <= radius) return true;
    lineTemp.start = a;
    lineTemp.end = c;
    const closestPoint2 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
    if (closestPoint2.distanceTo(center) <= radius) return true;
    lineTemp.start = b;
    lineTemp.end = c;
    const closestPoint3 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
    if (closestPoint3.distanceTo(center) <= radius) return true;
    const plane = triangle4.getPlane(planeTemp);
    const dp = Math.abs(plane.distanceToPoint(center));
    if (dp <= radius) {
      const pp = plane.projectPoint(center, projectedPointTemp);
      const cp = triangle4.containsPoint(pp);
      if (cp) return true;
    }
    return false;
  };
})();

// node_modules/three-mesh-bvh/src/math/ExtendedTriangle.js
var componentKeys = ["x", "y", "z"];
var ZERO_EPSILON = 1e-15;
var ZERO_EPSILON_SQR = ZERO_EPSILON * ZERO_EPSILON;
function isNearZero(value) {
  return Math.abs(value) < ZERO_EPSILON;
}
var ExtendedTriangle = class extends Triangle {
  constructor(...args) {
    super(...args);
    this.isExtendedTriangle = true;
    this.satAxes = new Array(4).fill().map(() => new Vector33());
    this.satBounds = new Array(4).fill().map(() => new SeparatingAxisBounds());
    this.points = [this.a, this.b, this.c];
    this.plane = new Plane2();
    this.isDegenerateIntoSegment = false;
    this.isDegenerateIntoPoint = false;
    this.degenerateSegment = new Line32();
    this.needsUpdate = true;
  }
  /**
   * Returns whether the triangle intersects the given sphere.
   * @param {Sphere} sphere
   * @returns {boolean}
   */
  intersectsSphere(sphere) {
    return sphereIntersectTriangle(sphere, this);
  }
  update() {
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const points = this.points;
    const satAxes = this.satAxes;
    const satBounds = this.satBounds;
    const axis0 = satAxes[0];
    const sab0 = satBounds[0];
    this.getNormal(axis0);
    sab0.setFromPoints(axis0, points);
    const axis1 = satAxes[1];
    const sab1 = satBounds[1];
    axis1.subVectors(a, b);
    sab1.setFromPoints(axis1, points);
    const axis2 = satAxes[2];
    const sab2 = satBounds[2];
    axis2.subVectors(b, c);
    sab2.setFromPoints(axis2, points);
    const axis3 = satAxes[3];
    const sab3 = satBounds[3];
    axis3.subVectors(c, a);
    sab3.setFromPoints(axis3, points);
    const lengthAB = axis1.length();
    const lengthBC = axis2.length();
    const lengthCA = axis3.length();
    this.isDegenerateIntoPoint = false;
    this.isDegenerateIntoSegment = false;
    if (lengthAB < ZERO_EPSILON) {
      if (lengthBC < ZERO_EPSILON || lengthCA < ZERO_EPSILON) {
        this.isDegenerateIntoPoint = true;
      } else {
        this.isDegenerateIntoSegment = true;
        this.degenerateSegment.start.copy(a);
        this.degenerateSegment.end.copy(c);
      }
    } else if (lengthBC < ZERO_EPSILON) {
      if (lengthCA < ZERO_EPSILON) {
        this.isDegenerateIntoPoint = true;
      } else {
        this.isDegenerateIntoSegment = true;
        this.degenerateSegment.start.copy(b);
        this.degenerateSegment.end.copy(a);
      }
    } else if (lengthCA < ZERO_EPSILON) {
      this.isDegenerateIntoSegment = true;
      this.degenerateSegment.start.copy(c);
      this.degenerateSegment.end.copy(b);
    }
    this.plane.setFromNormalAndCoplanarPoint(axis0, a);
    this.needsUpdate = false;
  }
};
ExtendedTriangle.prototype.closestPointToSegment = /* @__PURE__ */ (function() {
  const point1 = /* @__PURE__ */ new Vector33();
  const point2 = /* @__PURE__ */ new Vector33();
  const edge = /* @__PURE__ */ new Line32();
  return function distanceToSegment(segment, target1 = null, target2 = null) {
    const { start, end } = segment;
    const points = this.points;
    let distSq;
    let closestDistanceSq = Infinity;
    for (let i = 0; i < 3; i++) {
      const nexti = (i + 1) % 3;
      edge.start.copy(points[i]);
      edge.end.copy(points[nexti]);
      closestPointsSegmentToSegment(edge, segment, point1, point2);
      distSq = point1.distanceToSquared(point2);
      if (distSq < closestDistanceSq) {
        closestDistanceSq = distSq;
        if (target1) target1.copy(point1);
        if (target2) target2.copy(point2);
      }
    }
    this.closestPointToPoint(start, point1);
    distSq = start.distanceToSquared(point1);
    if (distSq < closestDistanceSq) {
      closestDistanceSq = distSq;
      if (target1) target1.copy(point1);
      if (target2) target2.copy(start);
    }
    this.closestPointToPoint(end, point1);
    distSq = end.distanceToSquared(point1);
    if (distSq < closestDistanceSq) {
      closestDistanceSq = distSq;
      if (target1) target1.copy(point1);
      if (target2) target2.copy(end);
    }
    return Math.sqrt(closestDistanceSq);
  };
})();
ExtendedTriangle.prototype.intersectsTriangle = /* @__PURE__ */ (function() {
  const saTri2 = /* @__PURE__ */ new ExtendedTriangle();
  const cachedSatBounds = /* @__PURE__ */ new SeparatingAxisBounds();
  const cachedSatBounds2 = /* @__PURE__ */ new SeparatingAxisBounds();
  const tmpVec = /* @__PURE__ */ new Vector33();
  const dir1 = /* @__PURE__ */ new Vector33();
  const dir2 = /* @__PURE__ */ new Vector33();
  const tempDir = /* @__PURE__ */ new Vector33();
  const edge1 = /* @__PURE__ */ new Line32();
  const edge2 = /* @__PURE__ */ new Line32();
  const tempPoint = /* @__PURE__ */ new Vector33();
  const bounds1 = /* @__PURE__ */ new Vector22();
  const bounds2 = /* @__PURE__ */ new Vector22();
  function coplanarIntersectsTriangle(self2, other, target, suppressLog) {
    const planeNormal = tmpVec;
    if (!self2.isDegenerateIntoPoint && !self2.isDegenerateIntoSegment) {
      planeNormal.copy(self2.plane.normal);
    } else {
      planeNormal.copy(other.plane.normal);
    }
    const satBounds1 = self2.satBounds;
    const satAxes1 = self2.satAxes;
    for (let i = 1; i < 4; i++) {
      const sb = satBounds1[i];
      const sa = satAxes1[i];
      cachedSatBounds.setFromPoints(sa, other.points);
      if (sb.isSeparated(cachedSatBounds)) return false;
      tempDir.copy(planeNormal).cross(sa);
      cachedSatBounds.setFromPoints(tempDir, self2.points);
      cachedSatBounds2.setFromPoints(tempDir, other.points);
      if (cachedSatBounds.isSeparated(cachedSatBounds2)) return false;
    }
    const satBounds2 = other.satBounds;
    const satAxes2 = other.satAxes;
    for (let i = 1; i < 4; i++) {
      const sb = satBounds2[i];
      const sa = satAxes2[i];
      cachedSatBounds.setFromPoints(sa, self2.points);
      if (sb.isSeparated(cachedSatBounds)) return false;
      tempDir.crossVectors(planeNormal, sa);
      cachedSatBounds.setFromPoints(tempDir, self2.points);
      cachedSatBounds2.setFromPoints(tempDir, other.points);
      if (cachedSatBounds.isSeparated(cachedSatBounds2)) return false;
    }
    if (target) {
      if (!suppressLog) {
        console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.");
      }
      target.start.set(0, 0, 0);
      target.end.set(0, 0, 0);
    }
    return true;
  }
  function findSingleBounds(a, b, c, aProj, bProj, cProj, aDist, bDist, cDist, bounds, edge) {
    let t = aDist / (aDist - bDist);
    bounds.x = aProj + (bProj - aProj) * t;
    edge.start.subVectors(b, a).multiplyScalar(t).add(a);
    t = aDist / (aDist - cDist);
    bounds.y = aProj + (cProj - aProj) * t;
    edge.end.subVectors(c, a).multiplyScalar(t).add(a);
  }
  function findIntersectionLineBounds(self2, aProj, bProj, cProj, abDist, acDist, aDist, bDist, cDist, bounds, edge) {
    if (abDist > 0) {
      findSingleBounds(self2.c, self2.a, self2.b, cProj, aProj, bProj, cDist, aDist, bDist, bounds, edge);
    } else if (acDist > 0) {
      findSingleBounds(self2.b, self2.a, self2.c, bProj, aProj, cProj, bDist, aDist, cDist, bounds, edge);
    } else if (bDist * cDist > 0 || aDist != 0) {
      findSingleBounds(self2.a, self2.b, self2.c, aProj, bProj, cProj, aDist, bDist, cDist, bounds, edge);
    } else if (bDist != 0) {
      findSingleBounds(self2.b, self2.a, self2.c, bProj, aProj, cProj, bDist, aDist, cDist, bounds, edge);
    } else if (cDist != 0) {
      findSingleBounds(self2.c, self2.a, self2.b, cProj, aProj, bProj, cDist, aDist, bDist, bounds, edge);
    } else {
      return true;
    }
    return false;
  }
  function intersectTriangleSegment(triangle4, degenerateTriangle, target, suppressLog) {
    const segment = degenerateTriangle.degenerateSegment;
    const startDist = triangle4.plane.distanceToPoint(segment.start);
    const endDist = triangle4.plane.distanceToPoint(segment.end);
    if (isNearZero(startDist)) {
      if (isNearZero(endDist)) {
        return coplanarIntersectsTriangle(triangle4, degenerateTriangle, target, suppressLog);
      } else {
        if (target) {
          target.start.copy(segment.start);
          target.end.copy(segment.start);
        }
        return triangle4.containsPoint(segment.start);
      }
    } else if (isNearZero(endDist)) {
      if (target) {
        target.start.copy(segment.end);
        target.end.copy(segment.end);
      }
      return triangle4.containsPoint(segment.end);
    } else {
      if (triangle4.plane.intersectLine(segment, tmpVec) != null) {
        if (target) {
          target.start.copy(tmpVec);
          target.end.copy(tmpVec);
        }
        return triangle4.containsPoint(tmpVec);
      } else {
        return false;
      }
    }
  }
  function intersectTrianglePoint(triangle4, degenerateTriangle, target) {
    const point = degenerateTriangle.a;
    if (isNearZero(triangle4.plane.distanceToPoint(point)) && triangle4.containsPoint(point)) {
      if (target) {
        target.start.copy(point);
        target.end.copy(point);
      }
      return true;
    } else {
      return false;
    }
  }
  function intersectSegmentPoint(segmentTri, pointTri, target) {
    const segment = segmentTri.degenerateSegment;
    const point = pointTri.a;
    segment.closestPointToPoint(point, true, tmpVec);
    if (point.distanceToSquared(tmpVec) < ZERO_EPSILON_SQR) {
      if (target) {
        target.start.copy(point);
        target.end.copy(point);
      }
      return true;
    } else {
      return false;
    }
  }
  function handleDegenerateCases(self2, other, target, suppressLog) {
    if (self2.isDegenerateIntoSegment) {
      if (other.isDegenerateIntoSegment) {
        const segment1 = self2.degenerateSegment;
        const segment2 = other.degenerateSegment;
        const delta1 = dir1;
        const delta2 = dir2;
        segment1.delta(delta1);
        segment2.delta(delta2);
        const startDelta = tmpVec.subVectors(segment2.start, segment1.start);
        const denom = delta1.x * delta2.y - delta1.y * delta2.x;
        if (isNearZero(denom)) {
          return false;
        }
        const t = (startDelta.x * delta2.y - startDelta.y * delta2.x) / denom;
        const u = -(delta1.x * startDelta.y - delta1.y * startDelta.x) / denom;
        if (t < 0 || t > 1 || u < 0 || u > 1) {
          return false;
        }
        const z1 = segment1.start.z + delta1.z * t;
        const z2 = segment2.start.z + delta2.z * u;
        if (isNearZero(z1 - z2)) {
          if (target) {
            target.start.copy(segment1.start).addScaledVector(delta1, t);
            target.end.copy(segment1.start).addScaledVector(delta1, t);
          }
          return true;
        } else {
          return false;
        }
      } else if (other.isDegenerateIntoPoint) {
        return intersectSegmentPoint(self2, other, target);
      } else {
        return intersectTriangleSegment(other, self2, target, suppressLog);
      }
    } else if (self2.isDegenerateIntoPoint) {
      if (other.isDegenerateIntoPoint) {
        if (other.a.distanceToSquared(self2.a) < ZERO_EPSILON_SQR) {
          if (target) {
            target.start.copy(self2.a);
            target.end.copy(self2.a);
          }
          return true;
        } else {
          return false;
        }
      } else if (other.isDegenerateIntoSegment) {
        return intersectSegmentPoint(other, self2, target);
      } else {
        return intersectTrianglePoint(other, self2, target);
      }
    } else {
      if (other.isDegenerateIntoPoint) {
        return intersectTrianglePoint(self2, other, target);
      } else if (other.isDegenerateIntoSegment) {
        return intersectTriangleSegment(self2, other, target, suppressLog);
      }
    }
  }
  return function intersectsTriangle(other, target = null, suppressLog = false) {
    if (this.needsUpdate) {
      this.update();
    }
    if (!other.isExtendedTriangle) {
      saTri2.copy(other);
      saTri2.update();
      other = saTri2;
    } else if (other.needsUpdate) {
      other.update();
    }
    const res = handleDegenerateCases(this, other, target, suppressLog);
    if (res !== void 0) {
      return res;
    }
    const plane1 = this.plane;
    const plane2 = other.plane;
    let a1Dist = plane2.distanceToPoint(this.a);
    let b1Dist = plane2.distanceToPoint(this.b);
    let c1Dist = plane2.distanceToPoint(this.c);
    if (isNearZero(a1Dist))
      a1Dist = 0;
    if (isNearZero(b1Dist))
      b1Dist = 0;
    if (isNearZero(c1Dist))
      c1Dist = 0;
    const a1b1Dist = a1Dist * b1Dist;
    const a1c1Dist = a1Dist * c1Dist;
    if (a1b1Dist > 0 && a1c1Dist > 0) {
      return false;
    }
    let a2Dist = plane1.distanceToPoint(other.a);
    let b2Dist = plane1.distanceToPoint(other.b);
    let c2Dist = plane1.distanceToPoint(other.c);
    if (isNearZero(a2Dist))
      a2Dist = 0;
    if (isNearZero(b2Dist))
      b2Dist = 0;
    if (isNearZero(c2Dist))
      c2Dist = 0;
    const a2b2Dist = a2Dist * b2Dist;
    const a2c2Dist = a2Dist * c2Dist;
    if (a2b2Dist > 0 && a2c2Dist > 0) {
      return false;
    }
    dir1.copy(plane1.normal);
    dir2.copy(plane2.normal);
    const intersectionLine = dir1.cross(dir2);
    let componentIndex = 0;
    let maxComponent = Math.abs(intersectionLine.x);
    const comp1 = Math.abs(intersectionLine.y);
    if (comp1 > maxComponent) {
      maxComponent = comp1;
      componentIndex = 1;
    }
    const comp2 = Math.abs(intersectionLine.z);
    if (comp2 > maxComponent) {
      componentIndex = 2;
    }
    const key = componentKeys[componentIndex];
    const a1Proj = this.a[key];
    const b1Proj = this.b[key];
    const c1Proj = this.c[key];
    const a2Proj = other.a[key];
    const b2Proj = other.b[key];
    const c2Proj = other.c[key];
    if (findIntersectionLineBounds(this, a1Proj, b1Proj, c1Proj, a1b1Dist, a1c1Dist, a1Dist, b1Dist, c1Dist, bounds1, edge1)) {
      return coplanarIntersectsTriangle(this, other, target, suppressLog);
    }
    if (findIntersectionLineBounds(other, a2Proj, b2Proj, c2Proj, a2b2Dist, a2c2Dist, a2Dist, b2Dist, c2Dist, bounds2, edge2)) {
      return coplanarIntersectsTriangle(this, other, target, suppressLog);
    }
    if (bounds1.y < bounds1.x) {
      const tmp = bounds1.y;
      bounds1.y = bounds1.x;
      bounds1.x = tmp;
      tempPoint.copy(edge1.start);
      edge1.start.copy(edge1.end);
      edge1.end.copy(tempPoint);
    }
    if (bounds2.y < bounds2.x) {
      const tmp = bounds2.y;
      bounds2.y = bounds2.x;
      bounds2.x = tmp;
      tempPoint.copy(edge2.start);
      edge2.start.copy(edge2.end);
      edge2.end.copy(tempPoint);
    }
    if (bounds1.y < bounds2.x || bounds2.y < bounds1.x) {
      return false;
    }
    if (target) {
      if (bounds2.x > bounds1.x) {
        target.start.copy(edge2.start);
      } else {
        target.start.copy(edge1.start);
      }
      if (bounds2.y < bounds1.y) {
        target.end.copy(edge2.end);
      } else {
        target.end.copy(edge1.end);
      }
    }
    return true;
  };
})();
ExtendedTriangle.prototype.distanceToPoint = /* @__PURE__ */ (function() {
  const target = /* @__PURE__ */ new Vector33();
  return function distanceToPoint(point) {
    this.closestPointToPoint(point, target);
    return point.distanceTo(target);
  };
})();
ExtendedTriangle.prototype.distanceToTriangle = /* @__PURE__ */ (function() {
  const point = /* @__PURE__ */ new Vector33();
  const point2 = /* @__PURE__ */ new Vector33();
  const cornerFields = ["a", "b", "c"];
  const line1 = /* @__PURE__ */ new Line32();
  const line2 = /* @__PURE__ */ new Line32();
  return function distanceToTriangle(other, target1 = null, target2 = null) {
    const lineTarget = target1 || target2 ? line1 : null;
    if (this.intersectsTriangle(other, lineTarget, true)) {
      if (target1 || target2) {
        if (target1) lineTarget.getCenter(target1);
        if (target2) lineTarget.getCenter(target2);
      }
      return 0;
    }
    let closestDistanceSq = Infinity;
    for (let i = 0; i < 3; i++) {
      let dist;
      const field = cornerFields[i];
      const otherVec = other[field];
      this.closestPointToPoint(otherVec, point);
      dist = otherVec.distanceToSquared(point);
      if (dist < closestDistanceSq) {
        closestDistanceSq = dist;
        if (target1) target1.copy(point);
        if (target2) target2.copy(otherVec);
      }
      const thisVec = this[field];
      other.closestPointToPoint(thisVec, point);
      dist = thisVec.distanceToSquared(point);
      if (dist < closestDistanceSq) {
        closestDistanceSq = dist;
        if (target1) target1.copy(thisVec);
        if (target2) target2.copy(point);
      }
    }
    for (let i = 0; i < 3; i++) {
      const f11 = cornerFields[i];
      const f12 = cornerFields[(i + 1) % 3];
      line1.set(this[f11], this[f12]);
      for (let i2 = 0; i2 < 3; i2++) {
        const f21 = cornerFields[i2];
        const f22 = cornerFields[(i2 + 1) % 3];
        line2.set(other[f21], other[f22]);
        closestPointsSegmentToSegment(line1, line2, point, point2);
        const dist = point.distanceToSquared(point2);
        if (dist < closestDistanceSq) {
          closestDistanceSq = dist;
          if (target1) target1.copy(point);
          if (target2) target2.copy(point2);
        }
      }
    }
    return Math.sqrt(closestDistanceSq);
  };
})();

// node_modules/three-mesh-bvh/src/math/OrientedBox.js
var OrientedBox = class {
  constructor(min, max, matrix) {
    this.isOrientedBox = true;
    this.min = new Vector34();
    this.max = new Vector34();
    this.matrix = new Matrix42();
    this.invMatrix = new Matrix42();
    this.points = new Array(8).fill().map(() => new Vector34());
    this.satAxes = new Array(3).fill().map(() => new Vector34());
    this.satBounds = new Array(3).fill().map(() => new SeparatingAxisBounds());
    this.alignedSatBounds = new Array(3).fill().map(() => new SeparatingAxisBounds());
    this.needsUpdate = false;
    if (min) this.min.copy(min);
    if (max) this.max.copy(max);
    if (matrix) this.matrix.copy(matrix);
  }
  /**
   * Sets the oriented box parameters.
   * @param {Vector3} min
   * @param {Vector3} max
   * @param {Matrix4} matrix
   */
  set(min, max, matrix) {
    this.min.copy(min);
    this.max.copy(max);
    this.matrix.copy(matrix);
    this.needsUpdate = true;
  }
  copy(other) {
    this.min.copy(other.min);
    this.max.copy(other.max);
    this.matrix.copy(other.matrix);
    this.needsUpdate = true;
  }
};
OrientedBox.prototype.update = /* @__PURE__ */ (function() {
  return function update() {
    const matrix = this.matrix;
    const min = this.min;
    const max = this.max;
    const points = this.points;
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        for (let z = 0; z <= 1; z++) {
          const i = (1 << 0) * x | (1 << 1) * y | (1 << 2) * z;
          const v = points[i];
          v.x = x ? max.x : min.x;
          v.y = y ? max.y : min.y;
          v.z = z ? max.z : min.z;
          v.applyMatrix4(matrix);
        }
      }
    }
    const satBounds = this.satBounds;
    const satAxes = this.satAxes;
    const minVec = points[0];
    for (let i = 0; i < 3; i++) {
      const axis = satAxes[i];
      const sb = satBounds[i];
      const index = 1 << i;
      const pi = points[index];
      axis.subVectors(minVec, pi);
      sb.setFromPoints(axis, points);
    }
    const alignedSatBounds = this.alignedSatBounds;
    alignedSatBounds[0].setFromPointsField(points, "x");
    alignedSatBounds[1].setFromPointsField(points, "y");
    alignedSatBounds[2].setFromPointsField(points, "z");
    this.invMatrix.copy(this.matrix).invert();
    this.needsUpdate = false;
  };
})();
OrientedBox.prototype.intersectsBox = /* @__PURE__ */ (function() {
  const aabbBounds = /* @__PURE__ */ new SeparatingAxisBounds();
  return function intersectsBox(box) {
    if (this.needsUpdate) {
      this.update();
    }
    const min = box.min;
    const max = box.max;
    const satBounds = this.satBounds;
    const satAxes = this.satAxes;
    const alignedSatBounds = this.alignedSatBounds;
    aabbBounds.min = min.x;
    aabbBounds.max = max.x;
    if (alignedSatBounds[0].isSeparated(aabbBounds)) return false;
    aabbBounds.min = min.y;
    aabbBounds.max = max.y;
    if (alignedSatBounds[1].isSeparated(aabbBounds)) return false;
    aabbBounds.min = min.z;
    aabbBounds.max = max.z;
    if (alignedSatBounds[2].isSeparated(aabbBounds)) return false;
    for (let i = 0; i < 3; i++) {
      const axis = satAxes[i];
      const sb = satBounds[i];
      aabbBounds.setFromBox(axis, box);
      if (sb.isSeparated(aabbBounds)) return false;
    }
    return true;
  };
})();
OrientedBox.prototype.intersectsTriangle = /* @__PURE__ */ (function() {
  const saTri = /* @__PURE__ */ new ExtendedTriangle();
  const pointsArr = /* @__PURE__ */ new Array(3);
  const cachedSatBounds = /* @__PURE__ */ new SeparatingAxisBounds();
  const cachedSatBounds2 = /* @__PURE__ */ new SeparatingAxisBounds();
  const cachedAxis = /* @__PURE__ */ new Vector34();
  return function intersectsTriangle(triangle4) {
    if (this.needsUpdate) {
      this.update();
    }
    if (!triangle4.isExtendedTriangle) {
      saTri.copy(triangle4);
      saTri.update();
      triangle4 = saTri;
    } else if (triangle4.needsUpdate) {
      triangle4.update();
    }
    const satBounds = this.satBounds;
    const satAxes = this.satAxes;
    pointsArr[0] = triangle4.a;
    pointsArr[1] = triangle4.b;
    pointsArr[2] = triangle4.c;
    for (let i = 0; i < 3; i++) {
      const sb = satBounds[i];
      const sa = satAxes[i];
      cachedSatBounds.setFromPoints(sa, pointsArr);
      if (sb.isSeparated(cachedSatBounds)) return false;
    }
    const triSatBounds = triangle4.satBounds;
    const triSatAxes = triangle4.satAxes;
    const points = this.points;
    for (let i = 0; i < 3; i++) {
      const sb = triSatBounds[i];
      const sa = triSatAxes[i];
      cachedSatBounds.setFromPoints(sa, points);
      if (sb.isSeparated(cachedSatBounds)) return false;
    }
    for (let i = 0; i < 3; i++) {
      const sa1 = satAxes[i];
      for (let i2 = 0; i2 < 4; i2++) {
        const sa2 = triSatAxes[i2];
        cachedAxis.crossVectors(sa1, sa2);
        cachedSatBounds.setFromPoints(cachedAxis, pointsArr);
        cachedSatBounds2.setFromPoints(cachedAxis, points);
        if (cachedSatBounds.isSeparated(cachedSatBounds2)) return false;
      }
    }
    return true;
  };
})();
OrientedBox.prototype.closestPointToPoint = /* @__PURE__ */ (function() {
  return function closestPointToPoint2(point, target1) {
    if (this.needsUpdate) {
      this.update();
    }
    target1.copy(point).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix);
    return target1;
  };
})();
OrientedBox.prototype.distanceToPoint = (function() {
  const target = new Vector34();
  return function distanceToPoint(point) {
    this.closestPointToPoint(point, target);
    return point.distanceTo(target);
  };
})();
OrientedBox.prototype.distanceToBox = /* @__PURE__ */ (function() {
  const xyzFields = ["x", "y", "z"];
  const segments1 = /* @__PURE__ */ new Array(12).fill().map(() => new Line33());
  const segments2 = /* @__PURE__ */ new Array(12).fill().map(() => new Line33());
  const point1 = /* @__PURE__ */ new Vector34();
  const point2 = /* @__PURE__ */ new Vector34();
  return function distanceToBox(box, threshold = 0, target1 = null, target2 = null) {
    if (this.needsUpdate) {
      this.update();
    }
    if (this.intersectsBox(box)) {
      if (target1 || target2) {
        box.getCenter(point2);
        this.closestPointToPoint(point2, point1);
        box.closestPointToPoint(point1, point2);
        if (target1) target1.copy(point1);
        if (target2) target2.copy(point2);
      }
      return 0;
    }
    const threshold2 = threshold * threshold;
    const min = box.min;
    const max = box.max;
    const points = this.points;
    let closestDistanceSq = Infinity;
    for (let i = 0; i < 8; i++) {
      const p = points[i];
      point2.copy(p).clamp(min, max);
      const dist = p.distanceToSquared(point2);
      if (dist < closestDistanceSq) {
        closestDistanceSq = dist;
        if (target1) target1.copy(p);
        if (target2) target2.copy(point2);
        if (dist < threshold2) return Math.sqrt(dist);
      }
    }
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let i1 = 0; i1 <= 1; i1++) {
        for (let i2 = 0; i2 <= 1; i2++) {
          const nextIndex = (i + 1) % 3;
          const nextIndex2 = (i + 2) % 3;
          const index = i1 << nextIndex | i2 << nextIndex2;
          const index2 = 1 << i | i1 << nextIndex | i2 << nextIndex2;
          const p1 = points[index];
          const p2 = points[index2];
          const line1 = segments1[count];
          line1.set(p1, p2);
          const f1 = xyzFields[i];
          const f2 = xyzFields[nextIndex];
          const f3 = xyzFields[nextIndex2];
          const line2 = segments2[count];
          const start = line2.start;
          const end = line2.end;
          start[f1] = min[f1];
          start[f2] = i1 ? min[f2] : max[f2];
          start[f3] = i2 ? min[f3] : max[f2];
          end[f1] = max[f1];
          end[f2] = i1 ? min[f2] : max[f2];
          end[f3] = i2 ? min[f3] : max[f2];
          count++;
        }
      }
    }
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        for (let z = 0; z <= 1; z++) {
          point2.x = x ? max.x : min.x;
          point2.y = y ? max.y : min.y;
          point2.z = z ? max.z : min.z;
          this.closestPointToPoint(point2, point1);
          const dist = point2.distanceToSquared(point1);
          if (dist < closestDistanceSq) {
            closestDistanceSq = dist;
            if (target1) target1.copy(point1);
            if (target2) target2.copy(point2);
            if (dist < threshold2) return Math.sqrt(dist);
          }
        }
      }
    }
    for (let i = 0; i < 12; i++) {
      const l1 = segments1[i];
      for (let i2 = 0; i2 < 12; i2++) {
        const l2 = segments2[i2];
        closestPointsSegmentToSegment(l1, l2, point1, point2);
        const dist = point1.distanceToSquared(point2);
        if (dist < closestDistanceSq) {
          closestDistanceSq = dist;
          if (target1) target1.copy(point1);
          if (target2) target2.copy(point2);
          if (dist < threshold2) return Math.sqrt(dist);
        }
      }
    }
    return Math.sqrt(closestDistanceSq);
  };
})();

// node_modules/three-mesh-bvh/src/utils/ExtendedTrianglePool.js
var ExtendedTrianglePoolBase = class extends PrimitivePool {
  constructor() {
    super(() => new ExtendedTriangle());
  }
};
var ExtendedTrianglePool = /* @__PURE__ */ new ExtendedTrianglePoolBase();

// node_modules/three-mesh-bvh/src/core/cast/closestPointToPoint.js
import { Vector3 as Vector35 } from "./vendor/three.module.js";
var temp = /* @__PURE__ */ new Vector35();
var temp1 = /* @__PURE__ */ new Vector35();
function closestPointToPoint(bvh, point, target = {}, minThreshold = 0, maxThreshold = Infinity) {
  const minThresholdSq = minThreshold * minThreshold;
  const maxThresholdSq = maxThreshold * maxThreshold;
  let closestDistanceSq = Infinity;
  let closestDistanceTriIndex = null;
  bvh.shapecast(
    {
      boundsTraverseOrder: (box) => {
        temp.copy(point).clamp(box.min, box.max);
        return temp.distanceToSquared(point);
      },
      intersectsBounds: (box, isLeaf, score) => {
        return score < closestDistanceSq && score < maxThresholdSq;
      },
      intersectsTriangle: (tri, triIndex) => {
        tri.closestPointToPoint(point, temp);
        const distSq = point.distanceToSquared(temp);
        if (distSq < closestDistanceSq) {
          temp1.copy(temp);
          closestDistanceSq = distSq;
          closestDistanceTriIndex = triIndex;
        }
        if (distSq < minThresholdSq) {
          return true;
        } else {
          return false;
        }
      }
    }
  );
  if (closestDistanceSq === Infinity) return null;
  const closestDistance = Math.sqrt(closestDistanceSq);
  if (!target.point) target.point = temp1.clone();
  else target.point.copy(temp1);
  target.distance = closestDistance, target.faceIndex = closestDistanceTriIndex;
  return target;
}

// node_modules/three-mesh-bvh/src/utils/ThreeRayIntersectUtilities.js
import { Vector3 as Vector36, Vector2 as Vector23, Triangle as Triangle2, DoubleSide, BackSide, REVISION } from "./vendor/three.module.js";
var IS_GT_REVISION_169 = parseInt(REVISION) >= 169;
var IS_LT_REVISION_161 = parseInt(REVISION) <= 161;
var _vA = /* @__PURE__ */ new Vector36();
var _vB = /* @__PURE__ */ new Vector36();
var _vC = /* @__PURE__ */ new Vector36();
var _uvA = /* @__PURE__ */ new Vector23();
var _uvB = /* @__PURE__ */ new Vector23();
var _uvC = /* @__PURE__ */ new Vector23();
var _normalA = /* @__PURE__ */ new Vector36();
var _normalB = /* @__PURE__ */ new Vector36();
var _normalC = /* @__PURE__ */ new Vector36();
var _intersectionPoint = /* @__PURE__ */ new Vector36();
function checkIntersection(ray, pA, pB, pC, point, side, near, far) {
  let intersect;
  if (side === BackSide) {
    intersect = ray.intersectTriangle(pC, pB, pA, true, point);
  } else {
    intersect = ray.intersectTriangle(pA, pB, pC, side !== DoubleSide, point);
  }
  if (intersect === null) return null;
  const distance = ray.origin.distanceTo(point);
  if (distance < near || distance > far) return null;
  return {
    distance,
    point: point.clone()
  };
}
function checkBufferGeometryIntersection(ray, position, normal, uv, uv1, a, b, c, side, near, far) {
  _vA.fromBufferAttribute(position, a);
  _vB.fromBufferAttribute(position, b);
  _vC.fromBufferAttribute(position, c);
  const intersection = checkIntersection(ray, _vA, _vB, _vC, _intersectionPoint, side, near, far);
  if (intersection) {
    if (uv) {
      _uvA.fromBufferAttribute(uv, a);
      _uvB.fromBufferAttribute(uv, b);
      _uvC.fromBufferAttribute(uv, c);
      intersection.uv = new Vector23();
      const res = Triangle2.getInterpolation(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, intersection.uv);
      if (!IS_GT_REVISION_169) {
        intersection.uv = res;
      }
    }
    if (uv1) {
      _uvA.fromBufferAttribute(uv1, a);
      _uvB.fromBufferAttribute(uv1, b);
      _uvC.fromBufferAttribute(uv1, c);
      intersection.uv1 = new Vector23();
      const res = Triangle2.getInterpolation(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, intersection.uv1);
      if (!IS_GT_REVISION_169) {
        intersection.uv1 = res;
      }
      if (IS_LT_REVISION_161) {
        intersection.uv2 = intersection.uv1;
      }
    }
    if (normal) {
      _normalA.fromBufferAttribute(normal, a);
      _normalB.fromBufferAttribute(normal, b);
      _normalC.fromBufferAttribute(normal, c);
      intersection.normal = new Vector36();
      const res = Triangle2.getInterpolation(_intersectionPoint, _vA, _vB, _vC, _normalA, _normalB, _normalC, intersection.normal);
      if (intersection.normal.dot(ray.direction) > 0) {
        intersection.normal.multiplyScalar(-1);
      }
      if (!IS_GT_REVISION_169) {
        intersection.normal = res;
      }
    }
    const face = {
      a,
      b,
      c,
      normal: new Vector36(),
      materialIndex: 0
    };
    Triangle2.getNormal(_vA, _vB, _vC, face.normal);
    intersection.face = face;
    intersection.faceIndex = a;
    if (IS_GT_REVISION_169) {
      const barycoord = new Vector36();
      Triangle2.getBarycoord(_intersectionPoint, _vA, _vB, _vC, barycoord);
      intersection.barycoord = barycoord;
    }
  }
  return intersection;
}
function getSide(materialOrSide) {
  return materialOrSide && materialOrSide.isMaterial ? materialOrSide.side : materialOrSide;
}
function intersectTri(geometry, materialOrSide, ray, tri, intersections, near, far) {
  const triOffset = tri * 3;
  let a = triOffset + 0;
  let b = triOffset + 1;
  let c = triOffset + 2;
  const { index, groups } = geometry;
  if (geometry.index) {
    a = index.getX(a);
    b = index.getX(b);
    c = index.getX(c);
  }
  const { position, normal, uv, uv1 } = geometry.attributes;
  if (Array.isArray(materialOrSide)) {
    const firstIndex = tri * 3;
    for (let i = 0, l = groups.length; i < l; i++) {
      const { start, count, materialIndex } = groups[i];
      if (firstIndex >= start && firstIndex < start + count) {
        const side = getSide(materialOrSide[materialIndex]);
        const intersection = checkBufferGeometryIntersection(ray, position, normal, uv, uv1, a, b, c, side, near, far);
        if (intersection) {
          intersection.faceIndex = tri;
          intersection.face.materialIndex = materialIndex;
          if (intersections) {
            intersections.push(intersection);
          } else {
            return intersection;
          }
        }
      }
    }
  } else {
    const side = getSide(materialOrSide);
    const intersection = checkBufferGeometryIntersection(ray, position, normal, uv, uv1, a, b, c, side, near, far);
    if (intersection) {
      intersection.faceIndex = tri;
      intersection.face.materialIndex = 0;
      if (intersections) {
        intersections.push(intersection);
      } else {
        return intersection;
      }
    }
  }
  return null;
}

// node_modules/three-mesh-bvh/src/utils/TriangleUtilities.js
import { Vector2 as Vector24, Vector3 as Vector37, Triangle as Triangle3 } from "./vendor/three.module.js";
function setTriangle(tri, i, index, pos) {
  const ta = tri.a;
  const tb = tri.b;
  const tc = tri.c;
  let i0 = i;
  let i1 = i + 1;
  let i2 = i + 2;
  if (index) {
    i0 = index.getX(i0);
    i1 = index.getX(i1);
    i2 = index.getX(i2);
  }
  ta.x = pos.getX(i0);
  ta.y = pos.getY(i0);
  ta.z = pos.getZ(i0);
  tb.x = pos.getX(i1);
  tb.y = pos.getY(i1);
  tb.z = pos.getZ(i1);
  tc.x = pos.getX(i2);
  tc.y = pos.getY(i2);
  tc.z = pos.getZ(i2);
}

// node_modules/three-mesh-bvh/src/core/utils/iterationUtils.generated.js
function intersectTris(bvh, materialOrSide, ray, offset, count, intersections, near, far) {
  const { geometry, _indirectBuffer } = bvh;
  for (let i = offset, end = offset + count; i < end; i++) {
    intersectTri(geometry, materialOrSide, ray, i, intersections, near, far);
  }
}
function intersectClosestTri(bvh, materialOrSide, ray, offset, count, near, far) {
  const { geometry, _indirectBuffer } = bvh;
  let dist = Infinity;
  let res = null;
  for (let i = offset, end = offset + count; i < end; i++) {
    let intersection;
    intersection = intersectTri(geometry, materialOrSide, ray, i, null, near, far);
    if (intersection && intersection.distance < dist) {
      res = intersection;
      dist = intersection.distance;
    }
  }
  return res;
}
function iterateOverTriangles(offset, count, bvh, intersectsTriangleFunc, contained, depth, triangle4) {
  const { geometry } = bvh;
  const { index } = geometry;
  const pos = geometry.attributes.position;
  for (let i = offset, l = count + offset; i < l; i++) {
    let tri;
    tri = i;
    setTriangle(triangle4, tri * 3, index, pos);
    triangle4.needsUpdate = true;
    if (intersectsTriangleFunc(triangle4, tri, contained, depth)) {
      return true;
    }
  }
  return false;
}

// node_modules/three-mesh-bvh/src/core/cast/refit.generated.js
function refit(bvh, nodeIndices = null) {
  if (nodeIndices && Array.isArray(nodeIndices)) {
    nodeIndices = new Set(nodeIndices);
  }
  const geometry = bvh.geometry;
  const indexArr = geometry.index ? geometry.index.array : null;
  const posAttr = geometry.attributes.position;
  let buffer, uint32Array2, uint16Array2, float32Array2;
  let byteOffset = 0;
  const roots = bvh._roots;
  for (let i = 0, l = roots.length; i < l; i++) {
    buffer = roots[i];
    uint32Array2 = new Uint32Array(buffer);
    uint16Array2 = new Uint16Array(buffer);
    float32Array2 = new Float32Array(buffer);
    _traverse2(0, byteOffset);
    byteOffset += buffer.byteLength;
  }
  function _traverse2(nodeIndex32, byteOffset2, force = false) {
    const nodeIndex16 = nodeIndex32 * 2;
    if (IS_LEAF(nodeIndex16, uint16Array2)) {
      const offset = OFFSET(nodeIndex32, uint32Array2);
      const count = COUNT(nodeIndex16, uint16Array2);
      let minx = Infinity;
      let miny = Infinity;
      let minz = Infinity;
      let maxx = -Infinity;
      let maxy = -Infinity;
      let maxz = -Infinity;
      for (let i = 3 * offset, l = 3 * (offset + count); i < l; i++) {
        let index = indexArr[i];
        const x = posAttr.getX(index);
        const y = posAttr.getY(index);
        const z = posAttr.getZ(index);
        if (x < minx) minx = x;
        if (x > maxx) maxx = x;
        if (y < miny) miny = y;
        if (y > maxy) maxy = y;
        if (z < minz) minz = z;
        if (z > maxz) maxz = z;
      }
      if (float32Array2[nodeIndex32 + 0] !== minx || float32Array2[nodeIndex32 + 1] !== miny || float32Array2[nodeIndex32 + 2] !== minz || float32Array2[nodeIndex32 + 3] !== maxx || float32Array2[nodeIndex32 + 4] !== maxy || float32Array2[nodeIndex32 + 5] !== maxz) {
        float32Array2[nodeIndex32 + 0] = minx;
        float32Array2[nodeIndex32 + 1] = miny;
        float32Array2[nodeIndex32 + 2] = minz;
        float32Array2[nodeIndex32 + 3] = maxx;
        float32Array2[nodeIndex32 + 4] = maxy;
        float32Array2[nodeIndex32 + 5] = maxz;
        return true;
      } else {
        return false;
      }
    } else {
      const left = LEFT_NODE(nodeIndex32);
      const right = RIGHT_NODE(nodeIndex32, uint32Array2);
      let forceChildren = force;
      let includesLeft = false;
      let includesRight = false;
      if (nodeIndices) {
        if (!forceChildren) {
          const leftNodeId = left / UINT32_PER_NODE + byteOffset2 / BYTES_PER_NODE;
          const rightNodeId = right / UINT32_PER_NODE + byteOffset2 / BYTES_PER_NODE;
          includesLeft = nodeIndices.has(leftNodeId);
          includesRight = nodeIndices.has(rightNodeId);
          forceChildren = !includesLeft && !includesRight;
        }
      } else {
        includesLeft = true;
        includesRight = true;
      }
      const traverseLeft = forceChildren || includesLeft;
      const traverseRight = forceChildren || includesRight;
      let leftChange = false;
      if (traverseLeft) {
        leftChange = _traverse2(left, byteOffset2, forceChildren);
      }
      let rightChange = false;
      if (traverseRight) {
        rightChange = _traverse2(right, byteOffset2, forceChildren);
      }
      const didChange = leftChange || rightChange;
      if (didChange) {
        for (let i = 0; i < 3; i++) {
          const left_i = left + i;
          const right_i = right + i;
          const minLeftValue = float32Array2[left_i];
          const maxLeftValue = float32Array2[left_i + 3];
          const minRightValue = float32Array2[right_i];
          const maxRightValue = float32Array2[right_i + 3];
          float32Array2[nodeIndex32 + i] = minLeftValue < minRightValue ? minLeftValue : minRightValue;
          float32Array2[nodeIndex32 + i + 3] = maxLeftValue > maxRightValue ? maxLeftValue : maxRightValue;
        }
      }
      return didChange;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/utils/intersectUtils.js
function intersectsNodeBounds(nodeIndex32, array, ray, near, far) {
  let tmin, tmax, tymin, tymax, tzmin, tzmax;
  const invdirx = 1 / ray.direction.x, invdiry = 1 / ray.direction.y, invdirz = 1 / ray.direction.z;
  const ox = ray.origin.x;
  const oy = ray.origin.y;
  const oz = ray.origin.z;
  let minx = array[nodeIndex32];
  let maxx = array[nodeIndex32 + 3];
  let miny = array[nodeIndex32 + 1];
  let maxy = array[nodeIndex32 + 3 + 1];
  let minz = array[nodeIndex32 + 2];
  let maxz = array[nodeIndex32 + 3 + 2];
  if (invdirx >= 0) {
    tmin = (minx - ox) * invdirx;
    tmax = (maxx - ox) * invdirx;
  } else {
    tmin = (maxx - ox) * invdirx;
    tmax = (minx - ox) * invdirx;
  }
  if (invdiry >= 0) {
    tymin = (miny - oy) * invdiry;
    tymax = (maxy - oy) * invdiry;
  } else {
    tymin = (maxy - oy) * invdiry;
    tymax = (miny - oy) * invdiry;
  }
  if (tmin > tymax || tymin > tmax) return false;
  if (tymin > tmin || isNaN(tmin)) tmin = tymin;
  if (tymax < tmax || isNaN(tmax)) tmax = tymax;
  if (invdirz >= 0) {
    tzmin = (minz - oz) * invdirz;
    tzmax = (maxz - oz) * invdirz;
  } else {
    tzmin = (maxz - oz) * invdirz;
    tzmax = (minz - oz) * invdirz;
  }
  if (tmin > tzmax || tzmin > tmax) return false;
  if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
  if (tzmax < tmax || tmax !== tmax) tmax = tzmax;
  return tmin <= far && tmax >= near;
}

// node_modules/three-mesh-bvh/src/core/utils/iterationUtils_indirect.generated.js
function intersectTris_indirect(bvh, materialOrSide, ray, offset, count, intersections, near, far) {
  const { geometry, _indirectBuffer } = bvh;
  for (let i = offset, end = offset + count; i < end; i++) {
    let vi = _indirectBuffer ? _indirectBuffer[i] : i;
    intersectTri(geometry, materialOrSide, ray, vi, intersections, near, far);
  }
}
function intersectClosestTri_indirect(bvh, materialOrSide, ray, offset, count, near, far) {
  const { geometry, _indirectBuffer } = bvh;
  let dist = Infinity;
  let res = null;
  for (let i = offset, end = offset + count; i < end; i++) {
    let intersection;
    intersection = intersectTri(geometry, materialOrSide, ray, _indirectBuffer ? _indirectBuffer[i] : i, null, near, far);
    if (intersection && intersection.distance < dist) {
      res = intersection;
      dist = intersection.distance;
    }
  }
  return res;
}
function iterateOverTriangles_indirect(offset, count, bvh, intersectsTriangleFunc, contained, depth, triangle4) {
  const { geometry } = bvh;
  const { index } = geometry;
  const pos = geometry.attributes.position;
  for (let i = offset, l = count + offset; i < l; i++) {
    let tri;
    tri = bvh.resolveTriangleIndex(i);
    setTriangle(triangle4, tri * 3, index, pos);
    triangle4.needsUpdate = true;
    if (intersectsTriangleFunc(triangle4, tri, contained, depth)) {
      return true;
    }
  }
  return false;
}

// node_modules/three-mesh-bvh/src/core/cast/raycast.generated.js
function raycast(bvh, root, materialOrSide, ray, intersects, near, far) {
  BufferStack.setBuffer(bvh._roots[root]);
  _raycast(0, bvh, materialOrSide, ray, intersects, near, far);
  BufferStack.clearBuffer();
}
function _raycast(nodeIndex32, bvh, materialOrSide, ray, intersects, near, far) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  const nodeIndex16 = nodeIndex32 * 2;
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    intersectTris(bvh, materialOrSide, ray, offset, count, intersects, near, far);
  } else {
    const leftIndex = LEFT_NODE(nodeIndex32);
    if (intersectsNodeBounds(leftIndex, float32Array2, ray, near, far)) {
      _raycast(leftIndex, bvh, materialOrSide, ray, intersects, near, far);
    }
    const rightIndex = RIGHT_NODE(nodeIndex32, uint32Array2);
    if (intersectsNodeBounds(rightIndex, float32Array2, ray, near, far)) {
      _raycast(rightIndex, bvh, materialOrSide, ray, intersects, near, far);
    }
  }
}

// node_modules/three-mesh-bvh/src/core/cast/raycastFirst.generated.js
var _xyzFields = ["x", "y", "z"];
function raycastFirst(bvh, root, materialOrSide, ray, near, far) {
  BufferStack.setBuffer(bvh._roots[root]);
  const result = _raycastFirst(0, bvh, materialOrSide, ray, near, far);
  BufferStack.clearBuffer();
  return result;
}
function _raycastFirst(nodeIndex32, bvh, materialOrSide, ray, near, far) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  let nodeIndex16 = nodeIndex32 * 2;
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    return intersectClosestTri(bvh, materialOrSide, ray, offset, count, near, far);
  } else {
    const splitAxis = SPLIT_AXIS(nodeIndex32, uint32Array2);
    const xyzAxis = _xyzFields[splitAxis];
    const rayDir = ray.direction[xyzAxis];
    const leftToRight = rayDir >= 0;
    let c1, c2;
    if (leftToRight) {
      c1 = LEFT_NODE(nodeIndex32);
      c2 = RIGHT_NODE(nodeIndex32, uint32Array2);
    } else {
      c1 = RIGHT_NODE(nodeIndex32, uint32Array2);
      c2 = LEFT_NODE(nodeIndex32);
    }
    const c1Intersection = intersectsNodeBounds(c1, float32Array2, ray, near, far);
    const c1Result = c1Intersection ? _raycastFirst(c1, bvh, materialOrSide, ray, near, far) : null;
    if (c1Result) {
      const point = c1Result.point[xyzAxis];
      const isOutside = leftToRight ? point <= float32Array2[c2 + splitAxis] : (
        // min bounding data
        point >= float32Array2[c2 + splitAxis + 3]
      );
      if (isOutside) {
        return c1Result;
      }
    }
    const c2Intersection = intersectsNodeBounds(c2, float32Array2, ray, near, far);
    const c2Result = c2Intersection ? _raycastFirst(c2, bvh, materialOrSide, ray, near, far) : null;
    if (c1Result && c2Result) {
      return c1Result.distance <= c2Result.distance ? c1Result : c2Result;
    } else {
      return c1Result || c2Result || null;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry.generated.js
import { Box3 as Box35, Matrix4 as Matrix43 } from "./vendor/three.module.js";
var boundingBox = /* @__PURE__ */ new Box35();
var triangle = /* @__PURE__ */ new ExtendedTriangle();
var triangle2 = /* @__PURE__ */ new ExtendedTriangle();
var invertedMat = /* @__PURE__ */ new Matrix43();
var obb = /* @__PURE__ */ new OrientedBox();
var obb2 = /* @__PURE__ */ new OrientedBox();
function intersectsGeometry(bvh, root, otherGeometry, geometryToBvh) {
  BufferStack.setBuffer(bvh._roots[root]);
  const result = _intersectsGeometry(0, bvh, otherGeometry, geometryToBvh);
  BufferStack.clearBuffer();
  return result;
}
function _intersectsGeometry(nodeIndex32, bvh, otherGeometry, geometryToBvh, cachedObb = null) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  let nodeIndex16 = nodeIndex32 * 2;
  if (cachedObb === null) {
    if (!otherGeometry.boundingBox) {
      otherGeometry.computeBoundingBox();
    }
    obb.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
    cachedObb = obb;
  }
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const thisGeometry = bvh.geometry;
    const thisIndex = thisGeometry.index;
    const thisPos = thisGeometry.attributes.position;
    const otherIndex = otherGeometry.index;
    const otherPos = otherGeometry.attributes.position;
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    invertedMat.copy(geometryToBvh).invert();
    if (otherGeometry.boundsTree) {
      arrayToBox(BOUNDING_DATA_INDEX(nodeIndex32), float32Array2, obb2);
      obb2.matrix.copy(invertedMat);
      obb2.needsUpdate = true;
      const res = otherGeometry.boundsTree.shapecast({
        intersectsBounds: (box) => obb2.intersectsBox(box),
        intersectsTriangle: (tri) => {
          tri.a.applyMatrix4(geometryToBvh);
          tri.b.applyMatrix4(geometryToBvh);
          tri.c.applyMatrix4(geometryToBvh);
          tri.needsUpdate = true;
          for (let i = offset * 3, l = (count + offset) * 3; i < l; i += 3) {
            setTriangle(triangle2, i, thisIndex, thisPos);
            triangle2.needsUpdate = true;
            if (tri.intersectsTriangle(triangle2)) {
              return true;
            }
          }
          return false;
        }
      });
      return res;
    } else {
      const otherTriangleCount = getTriCount(otherGeometry);
      for (let i = offset * 3, l = (count + offset) * 3; i < l; i += 3) {
        setTriangle(triangle, i, thisIndex, thisPos);
        triangle.a.applyMatrix4(invertedMat);
        triangle.b.applyMatrix4(invertedMat);
        triangle.c.applyMatrix4(invertedMat);
        triangle.needsUpdate = true;
        for (let i2 = 0, l2 = otherTriangleCount * 3; i2 < l2; i2 += 3) {
          setTriangle(triangle2, i2, otherIndex, otherPos);
          triangle2.needsUpdate = true;
          if (triangle.intersectsTriangle(triangle2)) {
            return true;
          }
        }
      }
    }
  } else {
    const left = LEFT_NODE(nodeIndex32);
    const right = RIGHT_NODE(nodeIndex32, uint32Array2);
    arrayToBox(BOUNDING_DATA_INDEX(left), float32Array2, boundingBox);
    const leftIntersection = cachedObb.intersectsBox(boundingBox) && _intersectsGeometry(left, bvh, otherGeometry, geometryToBvh, cachedObb);
    if (leftIntersection) return true;
    arrayToBox(BOUNDING_DATA_INDEX(right), float32Array2, boundingBox);
    const rightIntersection = cachedObb.intersectsBox(boundingBox) && _intersectsGeometry(right, bvh, otherGeometry, geometryToBvh, cachedObb);
    if (rightIntersection) return true;
    return false;
  }
}

// node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry.generated.js
import { Matrix4 as Matrix44, Vector3 as Vector38 } from "./vendor/three.module.js";
var tempMatrix = /* @__PURE__ */ new Matrix44();
var obb3 = /* @__PURE__ */ new OrientedBox();
var obb22 = /* @__PURE__ */ new OrientedBox();
var temp12 = /* @__PURE__ */ new Vector38();
var temp2 = /* @__PURE__ */ new Vector38();
var temp3 = /* @__PURE__ */ new Vector38();
var temp4 = /* @__PURE__ */ new Vector38();
function closestPointToGeometry(bvh, otherGeometry, geometryToBvh, target1 = {}, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
  if (!otherGeometry.boundingBox) {
    otherGeometry.computeBoundingBox();
  }
  obb3.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
  obb3.needsUpdate = true;
  const geometry = bvh.geometry;
  const pos = geometry.attributes.position;
  const index = geometry.index;
  const otherPos = otherGeometry.attributes.position;
  const otherIndex = otherGeometry.index;
  const triangle4 = ExtendedTrianglePool.getPrimitive();
  const triangle23 = ExtendedTrianglePool.getPrimitive();
  let tempTarget1 = temp12;
  let tempTargetDest1 = temp2;
  let tempTarget2 = null;
  let tempTargetDest2 = null;
  if (target2) {
    tempTarget2 = temp3;
    tempTargetDest2 = temp4;
  }
  let closestDistance = Infinity;
  let closestDistanceTriIndex = null;
  let closestDistanceOtherTriIndex = null;
  tempMatrix.copy(geometryToBvh).invert();
  obb22.matrix.copy(tempMatrix);
  bvh.shapecast(
    {
      boundsTraverseOrder: (box) => {
        return obb3.distanceToBox(box);
      },
      intersectsBounds: (box, isLeaf, score) => {
        if (score < closestDistance && score < maxThreshold) {
          if (isLeaf) {
            obb22.min.copy(box.min);
            obb22.max.copy(box.max);
            obb22.needsUpdate = true;
          }
          return true;
        }
        return false;
      },
      intersectsRange: (offset, count) => {
        if (otherGeometry.boundsTree) {
          const otherBvh = otherGeometry.boundsTree;
          return otherBvh.shapecast({
            boundsTraverseOrder: (box) => {
              return obb22.distanceToBox(box);
            },
            intersectsBounds: (box, isLeaf, score) => {
              return score < closestDistance && score < maxThreshold;
            },
            intersectsRange: (otherOffset, otherCount) => {
              for (let i2 = otherOffset, l2 = otherOffset + otherCount; i2 < l2; i2++) {
                setTriangle(triangle23, 3 * i2, otherIndex, otherPos);
                triangle23.a.applyMatrix4(geometryToBvh);
                triangle23.b.applyMatrix4(geometryToBvh);
                triangle23.c.applyMatrix4(geometryToBvh);
                triangle23.needsUpdate = true;
                for (let i = offset, l = offset + count; i < l; i++) {
                  setTriangle(triangle4, 3 * i, index, pos);
                  triangle4.needsUpdate = true;
                  const dist = triangle4.distanceToTriangle(triangle23, tempTarget1, tempTarget2);
                  if (dist < closestDistance) {
                    tempTargetDest1.copy(tempTarget1);
                    if (tempTargetDest2) {
                      tempTargetDest2.copy(tempTarget2);
                    }
                    closestDistance = dist;
                    closestDistanceTriIndex = i;
                    closestDistanceOtherTriIndex = i2;
                  }
                  if (dist < minThreshold) {
                    return true;
                  }
                }
              }
            }
          });
        } else {
          const triCount = getTriCount(otherGeometry);
          for (let i2 = 0, l2 = triCount; i2 < l2; i2++) {
            setTriangle(triangle23, 3 * i2, otherIndex, otherPos);
            triangle23.a.applyMatrix4(geometryToBvh);
            triangle23.b.applyMatrix4(geometryToBvh);
            triangle23.c.applyMatrix4(geometryToBvh);
            triangle23.needsUpdate = true;
            for (let i = offset, l = offset + count; i < l; i++) {
              setTriangle(triangle4, 3 * i, index, pos);
              triangle4.needsUpdate = true;
              const dist = triangle4.distanceToTriangle(triangle23, tempTarget1, tempTarget2);
              if (dist < closestDistance) {
                tempTargetDest1.copy(tempTarget1);
                if (tempTargetDest2) {
                  tempTargetDest2.copy(tempTarget2);
                }
                closestDistance = dist;
                closestDistanceTriIndex = i;
                closestDistanceOtherTriIndex = i2;
              }
              if (dist < minThreshold) {
                return true;
              }
            }
          }
        }
      }
    }
  );
  ExtendedTrianglePool.releasePrimitive(triangle4);
  ExtendedTrianglePool.releasePrimitive(triangle23);
  if (closestDistance === Infinity) {
    return null;
  }
  if (!target1.point) {
    target1.point = tempTargetDest1.clone();
  } else {
    target1.point.copy(tempTargetDest1);
  }
  target1.distance = closestDistance, target1.faceIndex = closestDistanceTriIndex;
  if (target2) {
    if (!target2.point) target2.point = tempTargetDest2.clone();
    else target2.point.copy(tempTargetDest2);
    target2.point.applyMatrix4(tempMatrix);
    tempTargetDest1.applyMatrix4(tempMatrix);
    target2.distance = tempTargetDest1.sub(target2.point).length();
    target2.faceIndex = closestDistanceOtherTriIndex;
  }
  return target1;
}

// node_modules/three-mesh-bvh/src/core/cast/refit_indirect.generated.js
function refit_indirect(bvh, nodeIndices = null) {
  if (nodeIndices && Array.isArray(nodeIndices)) {
    nodeIndices = new Set(nodeIndices);
  }
  const geometry = bvh.geometry;
  const indexArr = geometry.index ? geometry.index.array : null;
  const posAttr = geometry.attributes.position;
  let buffer, uint32Array2, uint16Array2, float32Array2;
  let byteOffset = 0;
  const roots = bvh._roots;
  for (let i = 0, l = roots.length; i < l; i++) {
    buffer = roots[i];
    uint32Array2 = new Uint32Array(buffer);
    uint16Array2 = new Uint16Array(buffer);
    float32Array2 = new Float32Array(buffer);
    _traverse2(0, byteOffset);
    byteOffset += buffer.byteLength;
  }
  function _traverse2(nodeIndex32, byteOffset2, force = false) {
    const nodeIndex16 = nodeIndex32 * 2;
    if (IS_LEAF(nodeIndex16, uint16Array2)) {
      const offset = OFFSET(nodeIndex32, uint32Array2);
      const count = COUNT(nodeIndex16, uint16Array2);
      let minx = Infinity;
      let miny = Infinity;
      let minz = Infinity;
      let maxx = -Infinity;
      let maxy = -Infinity;
      let maxz = -Infinity;
      for (let i = offset, l = offset + count; i < l; i++) {
        const t = 3 * bvh.resolveTriangleIndex(i);
        for (let j = 0; j < 3; j++) {
          let index = t + j;
          index = indexArr ? indexArr[index] : index;
          const x = posAttr.getX(index);
          const y = posAttr.getY(index);
          const z = posAttr.getZ(index);
          if (x < minx) minx = x;
          if (x > maxx) maxx = x;
          if (y < miny) miny = y;
          if (y > maxy) maxy = y;
          if (z < minz) minz = z;
          if (z > maxz) maxz = z;
        }
      }
      if (float32Array2[nodeIndex32 + 0] !== minx || float32Array2[nodeIndex32 + 1] !== miny || float32Array2[nodeIndex32 + 2] !== minz || float32Array2[nodeIndex32 + 3] !== maxx || float32Array2[nodeIndex32 + 4] !== maxy || float32Array2[nodeIndex32 + 5] !== maxz) {
        float32Array2[nodeIndex32 + 0] = minx;
        float32Array2[nodeIndex32 + 1] = miny;
        float32Array2[nodeIndex32 + 2] = minz;
        float32Array2[nodeIndex32 + 3] = maxx;
        float32Array2[nodeIndex32 + 4] = maxy;
        float32Array2[nodeIndex32 + 5] = maxz;
        return true;
      } else {
        return false;
      }
    } else {
      const left = LEFT_NODE(nodeIndex32);
      const right = RIGHT_NODE(nodeIndex32, uint32Array2);
      let forceChildren = force;
      let includesLeft = false;
      let includesRight = false;
      if (nodeIndices) {
        if (!forceChildren) {
          const leftNodeId = left / UINT32_PER_NODE + byteOffset2 / BYTES_PER_NODE;
          const rightNodeId = right / UINT32_PER_NODE + byteOffset2 / BYTES_PER_NODE;
          includesLeft = nodeIndices.has(leftNodeId);
          includesRight = nodeIndices.has(rightNodeId);
          forceChildren = !includesLeft && !includesRight;
        }
      } else {
        includesLeft = true;
        includesRight = true;
      }
      const traverseLeft = forceChildren || includesLeft;
      const traverseRight = forceChildren || includesRight;
      let leftChange = false;
      if (traverseLeft) {
        leftChange = _traverse2(left, byteOffset2, forceChildren);
      }
      let rightChange = false;
      if (traverseRight) {
        rightChange = _traverse2(right, byteOffset2, forceChildren);
      }
      const didChange = leftChange || rightChange;
      if (didChange) {
        for (let i = 0; i < 3; i++) {
          const left_i = left + i;
          const right_i = right + i;
          const minLeftValue = float32Array2[left_i];
          const maxLeftValue = float32Array2[left_i + 3];
          const minRightValue = float32Array2[right_i];
          const maxRightValue = float32Array2[right_i + 3];
          float32Array2[nodeIndex32 + i] = minLeftValue < minRightValue ? minLeftValue : minRightValue;
          float32Array2[nodeIndex32 + i + 3] = maxLeftValue > maxRightValue ? maxLeftValue : maxRightValue;
        }
      }
      return didChange;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/cast/raycast_indirect.generated.js
function raycast_indirect(bvh, root, materialOrSide, ray, intersects, near, far) {
  BufferStack.setBuffer(bvh._roots[root]);
  _raycast2(0, bvh, materialOrSide, ray, intersects, near, far);
  BufferStack.clearBuffer();
}
function _raycast2(nodeIndex32, bvh, materialOrSide, ray, intersects, near, far) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  const nodeIndex16 = nodeIndex32 * 2;
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    intersectTris_indirect(bvh, materialOrSide, ray, offset, count, intersects, near, far);
  } else {
    const leftIndex = LEFT_NODE(nodeIndex32);
    if (intersectsNodeBounds(leftIndex, float32Array2, ray, near, far)) {
      _raycast2(leftIndex, bvh, materialOrSide, ray, intersects, near, far);
    }
    const rightIndex = RIGHT_NODE(nodeIndex32, uint32Array2);
    if (intersectsNodeBounds(rightIndex, float32Array2, ray, near, far)) {
      _raycast2(rightIndex, bvh, materialOrSide, ray, intersects, near, far);
    }
  }
}

// node_modules/three-mesh-bvh/src/core/cast/raycastFirst_indirect.generated.js
var _xyzFields2 = ["x", "y", "z"];
function raycastFirst_indirect(bvh, root, materialOrSide, ray, near, far) {
  BufferStack.setBuffer(bvh._roots[root]);
  const result = _raycastFirst2(0, bvh, materialOrSide, ray, near, far);
  BufferStack.clearBuffer();
  return result;
}
function _raycastFirst2(nodeIndex32, bvh, materialOrSide, ray, near, far) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  let nodeIndex16 = nodeIndex32 * 2;
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    return intersectClosestTri_indirect(bvh, materialOrSide, ray, offset, count, near, far);
  } else {
    const splitAxis = SPLIT_AXIS(nodeIndex32, uint32Array2);
    const xyzAxis = _xyzFields2[splitAxis];
    const rayDir = ray.direction[xyzAxis];
    const leftToRight = rayDir >= 0;
    let c1, c2;
    if (leftToRight) {
      c1 = LEFT_NODE(nodeIndex32);
      c2 = RIGHT_NODE(nodeIndex32, uint32Array2);
    } else {
      c1 = RIGHT_NODE(nodeIndex32, uint32Array2);
      c2 = LEFT_NODE(nodeIndex32);
    }
    const c1Intersection = intersectsNodeBounds(c1, float32Array2, ray, near, far);
    const c1Result = c1Intersection ? _raycastFirst2(c1, bvh, materialOrSide, ray, near, far) : null;
    if (c1Result) {
      const point = c1Result.point[xyzAxis];
      const isOutside = leftToRight ? point <= float32Array2[c2 + splitAxis] : (
        // min bounding data
        point >= float32Array2[c2 + splitAxis + 3]
      );
      if (isOutside) {
        return c1Result;
      }
    }
    const c2Intersection = intersectsNodeBounds(c2, float32Array2, ray, near, far);
    const c2Result = c2Intersection ? _raycastFirst2(c2, bvh, materialOrSide, ray, near, far) : null;
    if (c1Result && c2Result) {
      return c1Result.distance <= c2Result.distance ? c1Result : c2Result;
    } else {
      return c1Result || c2Result || null;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry_indirect.generated.js
import { Box3 as Box36, Matrix4 as Matrix45 } from "./vendor/three.module.js";
var boundingBox2 = /* @__PURE__ */ new Box36();
var triangle3 = /* @__PURE__ */ new ExtendedTriangle();
var triangle22 = /* @__PURE__ */ new ExtendedTriangle();
var invertedMat2 = /* @__PURE__ */ new Matrix45();
var obb4 = /* @__PURE__ */ new OrientedBox();
var obb23 = /* @__PURE__ */ new OrientedBox();
function intersectsGeometry_indirect(bvh, root, otherGeometry, geometryToBvh) {
  BufferStack.setBuffer(bvh._roots[root]);
  const result = _intersectsGeometry2(0, bvh, otherGeometry, geometryToBvh);
  BufferStack.clearBuffer();
  return result;
}
function _intersectsGeometry2(nodeIndex32, bvh, otherGeometry, geometryToBvh, cachedObb = null) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  let nodeIndex16 = nodeIndex32 * 2;
  if (cachedObb === null) {
    if (!otherGeometry.boundingBox) {
      otherGeometry.computeBoundingBox();
    }
    obb4.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
    cachedObb = obb4;
  }
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const thisGeometry = bvh.geometry;
    const thisIndex = thisGeometry.index;
    const thisPos = thisGeometry.attributes.position;
    const otherIndex = otherGeometry.index;
    const otherPos = otherGeometry.attributes.position;
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    invertedMat2.copy(geometryToBvh).invert();
    if (otherGeometry.boundsTree) {
      arrayToBox(BOUNDING_DATA_INDEX(nodeIndex32), float32Array2, obb23);
      obb23.matrix.copy(invertedMat2);
      obb23.needsUpdate = true;
      const res = otherGeometry.boundsTree.shapecast({
        intersectsBounds: (box) => obb23.intersectsBox(box),
        intersectsTriangle: (tri) => {
          tri.a.applyMatrix4(geometryToBvh);
          tri.b.applyMatrix4(geometryToBvh);
          tri.c.applyMatrix4(geometryToBvh);
          tri.needsUpdate = true;
          for (let i = offset, l = count + offset; i < l; i++) {
            setTriangle(triangle22, 3 * bvh.resolveTriangleIndex(i), thisIndex, thisPos);
            triangle22.needsUpdate = true;
            if (tri.intersectsTriangle(triangle22)) {
              return true;
            }
          }
          return false;
        }
      });
      return res;
    } else {
      const otherTriangleCount = getTriCount(otherGeometry);
      for (let i = offset, l = count + offset; i < l; i++) {
        const ti = bvh.resolveTriangleIndex(i);
        setTriangle(triangle3, 3 * ti, thisIndex, thisPos);
        triangle3.a.applyMatrix4(invertedMat2);
        triangle3.b.applyMatrix4(invertedMat2);
        triangle3.c.applyMatrix4(invertedMat2);
        triangle3.needsUpdate = true;
        for (let i2 = 0, l2 = otherTriangleCount * 3; i2 < l2; i2 += 3) {
          setTriangle(triangle22, i2, otherIndex, otherPos);
          triangle22.needsUpdate = true;
          if (triangle3.intersectsTriangle(triangle22)) {
            return true;
          }
        }
      }
    }
  } else {
    const left = LEFT_NODE(nodeIndex32);
    const right = RIGHT_NODE(nodeIndex32, uint32Array2);
    arrayToBox(BOUNDING_DATA_INDEX(left), float32Array2, boundingBox2);
    const leftIntersection = cachedObb.intersectsBox(boundingBox2) && _intersectsGeometry2(left, bvh, otherGeometry, geometryToBvh, cachedObb);
    if (leftIntersection) return true;
    arrayToBox(BOUNDING_DATA_INDEX(right), float32Array2, boundingBox2);
    const rightIntersection = cachedObb.intersectsBox(boundingBox2) && _intersectsGeometry2(right, bvh, otherGeometry, geometryToBvh, cachedObb);
    if (rightIntersection) return true;
    return false;
  }
}

// node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry_indirect.generated.js
import { Matrix4 as Matrix46, Vector3 as Vector39 } from "./vendor/three.module.js";
var tempMatrix2 = /* @__PURE__ */ new Matrix46();
var obb5 = /* @__PURE__ */ new OrientedBox();
var obb24 = /* @__PURE__ */ new OrientedBox();
var temp13 = /* @__PURE__ */ new Vector39();
var temp22 = /* @__PURE__ */ new Vector39();
var temp32 = /* @__PURE__ */ new Vector39();
var temp42 = /* @__PURE__ */ new Vector39();
function closestPointToGeometry_indirect(bvh, otherGeometry, geometryToBvh, target1 = {}, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
  if (!otherGeometry.boundingBox) {
    otherGeometry.computeBoundingBox();
  }
  obb5.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
  obb5.needsUpdate = true;
  const geometry = bvh.geometry;
  const pos = geometry.attributes.position;
  const index = geometry.index;
  const otherPos = otherGeometry.attributes.position;
  const otherIndex = otherGeometry.index;
  const triangle4 = ExtendedTrianglePool.getPrimitive();
  const triangle23 = ExtendedTrianglePool.getPrimitive();
  let tempTarget1 = temp13;
  let tempTargetDest1 = temp22;
  let tempTarget2 = null;
  let tempTargetDest2 = null;
  if (target2) {
    tempTarget2 = temp32;
    tempTargetDest2 = temp42;
  }
  let closestDistance = Infinity;
  let closestDistanceTriIndex = null;
  let closestDistanceOtherTriIndex = null;
  tempMatrix2.copy(geometryToBvh).invert();
  obb24.matrix.copy(tempMatrix2);
  bvh.shapecast(
    {
      boundsTraverseOrder: (box) => {
        return obb5.distanceToBox(box);
      },
      intersectsBounds: (box, isLeaf, score) => {
        if (score < closestDistance && score < maxThreshold) {
          if (isLeaf) {
            obb24.min.copy(box.min);
            obb24.max.copy(box.max);
            obb24.needsUpdate = true;
          }
          return true;
        }
        return false;
      },
      intersectsRange: (offset, count) => {
        if (otherGeometry.boundsTree) {
          const otherBvh = otherGeometry.boundsTree;
          return otherBvh.shapecast({
            boundsTraverseOrder: (box) => {
              return obb24.distanceToBox(box);
            },
            intersectsBounds: (box, isLeaf, score) => {
              return score < closestDistance && score < maxThreshold;
            },
            intersectsRange: (otherOffset, otherCount) => {
              for (let i2 = otherOffset, l2 = otherOffset + otherCount; i2 < l2; i2++) {
                const ti2 = otherBvh.resolveTriangleIndex(i2);
                setTriangle(triangle23, 3 * ti2, otherIndex, otherPos);
                triangle23.a.applyMatrix4(geometryToBvh);
                triangle23.b.applyMatrix4(geometryToBvh);
                triangle23.c.applyMatrix4(geometryToBvh);
                triangle23.needsUpdate = true;
                for (let i = offset, l = offset + count; i < l; i++) {
                  const ti = bvh.resolveTriangleIndex(i);
                  setTriangle(triangle4, 3 * ti, index, pos);
                  triangle4.needsUpdate = true;
                  const dist = triangle4.distanceToTriangle(triangle23, tempTarget1, tempTarget2);
                  if (dist < closestDistance) {
                    tempTargetDest1.copy(tempTarget1);
                    if (tempTargetDest2) {
                      tempTargetDest2.copy(tempTarget2);
                    }
                    closestDistance = dist;
                    closestDistanceTriIndex = i;
                    closestDistanceOtherTriIndex = i2;
                  }
                  if (dist < minThreshold) {
                    return true;
                  }
                }
              }
            }
          });
        } else {
          const triCount = getTriCount(otherGeometry);
          for (let i2 = 0, l2 = triCount; i2 < l2; i2++) {
            setTriangle(triangle23, 3 * i2, otherIndex, otherPos);
            triangle23.a.applyMatrix4(geometryToBvh);
            triangle23.b.applyMatrix4(geometryToBvh);
            triangle23.c.applyMatrix4(geometryToBvh);
            triangle23.needsUpdate = true;
            for (let i = offset, l = offset + count; i < l; i++) {
              const ti = bvh.resolveTriangleIndex(i);
              setTriangle(triangle4, 3 * ti, index, pos);
              triangle4.needsUpdate = true;
              const dist = triangle4.distanceToTriangle(triangle23, tempTarget1, tempTarget2);
              if (dist < closestDistance) {
                tempTargetDest1.copy(tempTarget1);
                if (tempTargetDest2) {
                  tempTargetDest2.copy(tempTarget2);
                }
                closestDistance = dist;
                closestDistanceTriIndex = i;
                closestDistanceOtherTriIndex = i2;
              }
              if (dist < minThreshold) {
                return true;
              }
            }
          }
        }
      }
    }
  );
  ExtendedTrianglePool.releasePrimitive(triangle4);
  ExtendedTrianglePool.releasePrimitive(triangle23);
  if (closestDistance === Infinity) {
    return null;
  }
  if (!target1.point) {
    target1.point = tempTargetDest1.clone();
  } else {
    target1.point.copy(tempTargetDest1);
  }
  target1.distance = closestDistance, target1.faceIndex = closestDistanceTriIndex;
  if (target2) {
    if (!target2.point) target2.point = tempTargetDest2.clone();
    else target2.point.copy(tempTargetDest2);
    target2.point.applyMatrix4(tempMatrix2);
    tempTargetDest1.applyMatrix4(tempMatrix2);
    target2.distance = tempTargetDest1.sub(target2.point).length();
    target2.faceIndex = closestDistanceOtherTriIndex;
  }
  return target1;
}

// node_modules/three-mesh-bvh/src/utils/GeometryRayIntersectUtilities.js
function convertRaycastIntersect(hit, object, raycaster) {
  if (hit === null) {
    return null;
  }
  hit.point.applyMatrix4(object.matrixWorld);
  hit.distance = hit.point.distanceTo(raycaster.ray.origin);
  hit.object = object;
  return hit;
}

// node_modules/three-mesh-bvh/src/core/MeshBVH.js
var _obb = /* @__PURE__ */ new OrientedBox();
var _ray = /* @__PURE__ */ new Ray();
var _direction = /* @__PURE__ */ new Vector310();
var _inverseMatrix = /* @__PURE__ */ new Matrix47();
var _worldScale = /* @__PURE__ */ new Vector310();
var _getters = ["getX", "getY", "getZ"];
var MeshBVH = class _MeshBVH extends GeometryBVH {
  /**
   * Generates a representation of the complete bounds tree and the geometry index buffer which
   * can be used to recreate a bounds tree using the `deserialize` function. The `serialize` and
   * `deserialize` functions can be used to generate a MeshBVH asynchronously in a background web
   * worker to prevent the main thread from stuttering. The BVH roots buffer stored in the
   * serialized representation are the same as the ones used by the original BVH so they should
   * not be modified. If `SharedArrayBuffers` are used then the same BVH memory can be used for
   * multiple BVH in multiple WebWorkers.
   *
   * @static
   * @param {MeshBVH} bvh - The BVH to serialize.
   * @param {Object} [options]
   * @param {boolean} [options.cloneBuffers=true] - If `true`, the index and BVH root buffers
   *   are cloned so the serialized data is independent of the live BVH.
   * @returns {SerializedBVH}
   */
  static serialize(bvh, options = {}) {
    options = {
      cloneBuffers: true,
      ...options
    };
    const geometry = bvh.geometry;
    const rootData = bvh._roots;
    const indirectBuffer = bvh._indirectBuffer;
    const indexAttribute = geometry.getIndex();
    const result = {
      version: 1,
      roots: null,
      index: null,
      indirectBuffer: null
    };
    if (options.cloneBuffers) {
      result.roots = rootData.map((root) => root.slice());
      result.index = indexAttribute ? indexAttribute.array.slice() : null;
      result.indirectBuffer = indirectBuffer ? indirectBuffer.slice() : null;
    } else {
      result.roots = rootData;
      result.index = indexAttribute ? indexAttribute.array : null;
      result.indirectBuffer = indirectBuffer;
    }
    return result;
  }
  /**
   * Returns a new MeshBVH instance from the serialized data. `geometry` is the geometry used
   * to generate the original BVH `data` was derived from. The root buffers stored in `data`
   * are set directly on the new BVH so the memory is shared.
   *
   * @static
   * @param {SerializedBVH} data - Serialized BVH data.
   * @param {BufferGeometry} geometry - The geometry the BVH was originally built from.
   * @param {Object} [options]
   * @param {boolean} [options.setIndex=true] - If `true`, sets `geometry.index` from the
   *   serialized index buffer (creating one if none exists).
   * @returns {MeshBVH}
   */
  static deserialize(data, geometry, options = {}) {
    options = {
      setIndex: true,
      indirect: Boolean(data.indirectBuffer),
      ...options
    };
    const { index, roots, indirectBuffer } = data;
    if (!data.version) {
      console.warn(
        "MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."
      );
      fixupVersion0(roots);
    }
    const bvh = new _MeshBVH(geometry, { ...options, [SKIP_GENERATION]: true });
    bvh._roots = roots;
    bvh._indirectBuffer = indirectBuffer || null;
    if (options.setIndex) {
      const indexAttribute = geometry.getIndex();
      if (indexAttribute === null) {
        const newIndex = new BufferAttribute2(data.index, 1, false);
        geometry.setIndex(newIndex);
      } else if (indexAttribute.array !== index) {
        indexAttribute.array.set(index);
        indexAttribute.needsUpdate = true;
      }
    }
    return bvh;
    function fixupVersion0(roots2) {
      for (let rootIndex = 0; rootIndex < roots2.length; rootIndex++) {
        const root = roots2[rootIndex];
        const uint32Array2 = new Uint32Array(root);
        const uint16Array2 = new Uint16Array(root);
        for (let node = 0, l = root.byteLength / BYTES_PER_NODE; node < l; node++) {
          const node32Index = UINT32_PER_NODE * node;
          const node16Index = 2 * node32Index;
          if (!IS_LEAF(node16Index, uint16Array2)) {
            uint32Array2[node32Index + 6] = uint32Array2[node32Index + 6] / UINT32_PER_NODE - node;
          }
        }
      }
    }
  }
  get primitiveStride() {
    return 3;
  }
  /**
   * Helper function for use when `indirect` is set to true. This function takes a triangle
   * index in the BVH layout and returns the associated triangle index in the geometry index
   * buffer or position attribute.
   * @type {function(number): number}
   * @readonly
   */
  get resolveTriangleIndex() {
    return this.resolvePrimitiveIndex;
  }
  constructor(geometry, options = {}) {
    if (options.maxLeafTris) {
      console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use maxLeafSize, instead.');
      options = {
        ...options,
        maxLeafSize: options.maxLeafTris
      };
    }
    super(geometry, options);
  }
  /**
   * Adjusts all triangle offsets stored in the BVH by the given offset. This is useful when the
   * triangle data has been compacted or shifted in the geometry buffers (e.g. in `BatchedMesh`
   * when geometries are compacted using the 'optimize' function or constructing a 'merged' BVH).
   * This function only adjusts the BVH to point to different triangles in the geometry. The
   * geometry's index buffer and/or position attributes must be updated separately to match.
   *
   * @param {number} offset
   * @returns {void}
   */
  // implement abstract methods from BVH base class
  shiftTriangleOffsets(offset) {
    return super.shiftPrimitiveOffsets(offset);
  }
  // write primitive bounds to the buffer - used only for validateBounds at the moment
  writePrimitiveBounds(i, targetBuffer, baseIndex) {
    const geometry = this.geometry;
    const indirectBuffer = this._indirectBuffer;
    const posAttr = geometry.attributes.position;
    const index = geometry.index ? geometry.index.array : null;
    const tri = indirectBuffer ? indirectBuffer[i] : i;
    const tri3 = tri * 3;
    let ai = tri3 + 0;
    let bi = tri3 + 1;
    let ci = tri3 + 2;
    if (index) {
      ai = index[ai];
      bi = index[bi];
      ci = index[ci];
    }
    for (let el = 0; el < 3; el++) {
      const a = posAttr[_getters[el]](ai);
      const b = posAttr[_getters[el]](bi);
      const c = posAttr[_getters[el]](ci);
      let min = a;
      if (b < min) min = b;
      if (c < min) min = c;
      let max = a;
      if (b > max) max = b;
      if (c > max) max = c;
      targetBuffer[baseIndex + el] = min;
      targetBuffer[baseIndex + el + 3] = max;
    }
    return targetBuffer;
  }
  // precomputes the bounding box for each triangle; required for quickly calculating tree splits.
  // result is an array of size count * 6 where triangle i maps to a
  // [x_center, x_delta, y_center, y_delta, z_center, z_delta] tuple starting at index (i - offset) * 6,
  // representing the center and half-extent in each dimension of triangle i
  computePrimitiveBounds(offset, count, targetBuffer) {
    const geometry = this.geometry;
    const indirectBuffer = this._indirectBuffer;
    const posAttr = geometry.attributes.position;
    const index = geometry.index ? geometry.index.array : null;
    const normalized = posAttr.normalized;
    if (offset < 0 || count + offset - targetBuffer.offset > targetBuffer.length / 6) {
      throw new Error("MeshBVH: compute triangle bounds range is invalid.");
    }
    const posArr = posAttr.array;
    const bufferOffset = posAttr.offset || 0;
    let stride = 3;
    if (posAttr.isInterleavedBufferAttribute) {
      stride = posAttr.data.stride;
    }
    const getters = ["getX", "getY", "getZ"];
    const writeOffset = targetBuffer.offset;
    for (let i = offset, l = offset + count; i < l; i++) {
      const tri = indirectBuffer ? indirectBuffer[i] : i;
      const tri3 = tri * 3;
      const boundsIndexOffset = (i - writeOffset) * 6;
      let ai = tri3 + 0;
      let bi = tri3 + 1;
      let ci = tri3 + 2;
      if (index) {
        ai = index[ai];
        bi = index[bi];
        ci = index[ci];
      }
      if (!normalized) {
        ai = ai * stride + bufferOffset;
        bi = bi * stride + bufferOffset;
        ci = ci * stride + bufferOffset;
      }
      for (let el = 0; el < 3; el++) {
        let a, b, c;
        if (normalized) {
          a = posAttr[getters[el]](ai);
          b = posAttr[getters[el]](bi);
          c = posAttr[getters[el]](ci);
        } else {
          a = posArr[ai + el];
          b = posArr[bi + el];
          c = posArr[ci + el];
        }
        let min = a;
        if (b < min) min = b;
        if (c < min) min = c;
        let max = a;
        if (b > max) max = b;
        if (c > max) max = c;
        const halfExtents = (max - min) / 2;
        const el2 = el * 2;
        targetBuffer[boundsIndexOffset + el2 + 0] = min + halfExtents;
        targetBuffer[boundsIndexOffset + el2 + 1] = halfExtents + (Math.abs(min) + halfExtents) * FLOAT32_EPSILON;
      }
    }
    return targetBuffer;
  }
  /**
   * A convenience function for performing a raycast based on a mesh. Results are formed like
   * three.js raycast results in world frame.
   *
   * @param {Object3D} object
   * @param {Raycaster} raycaster
   * @param {Array<Intersection>} [intersects=[]]
   * @returns {Array<Intersection>}
   */
  raycastObject3D(object, raycaster, intersects = []) {
    const { material } = object;
    if (material === void 0) {
      return;
    }
    _inverseMatrix.copy(object.matrixWorld).invert();
    _ray.copy(raycaster.ray).applyMatrix4(_inverseMatrix);
    _worldScale.setFromMatrixScale(object.matrixWorld);
    _direction.copy(_ray.direction).multiply(_worldScale);
    const scaleFactor = _direction.length();
    const near = raycaster.near / scaleFactor;
    const far = raycaster.far / scaleFactor;
    if (raycaster.firstHitOnly === true) {
      let hit = this.raycastFirst(_ray, material, near, far);
      hit = convertRaycastIntersect(hit, object, raycaster);
      if (hit) {
        intersects.push(hit);
      }
    } else {
      const hits = this.raycast(_ray, material, near, far);
      for (let i = 0, l = hits.length; i < l; i++) {
        const hit = convertRaycastIntersect(hits[i], object, raycaster);
        if (hit) {
          intersects.push(hit);
        }
      }
    }
    return intersects;
  }
  /**
   * Refit the node bounds to the current triangle positions. This is quicker than regenerating
   * a new BVH but will not be optimal after significant changes to the vertices. `nodeIndices`
   * is a set of node indices (provided by the `shapecast` function) that need to be refit
   * including all internal nodes.
   *
   * @param {Set<number>|Array<number>|null} [nodeIndices=null]
   */
  refit(nodeIndices = null) {
    const refitFunc = this.indirect ? refit_indirect : refit;
    return refitFunc(this, nodeIndices);
  }
  /* Core Cast Functions */
  /**
   * Returns all raycast triangle hits in unsorted order. It is expected that `ray` is in the
   * frame of the BVH already. Likewise the returned results are also provided in the local
   * frame of the BVH. The `side` identifier is used to determine the side to check when
   * raycasting or a material with the given side field can be passed. If an array of materials
   * is provided then it is expected that the geometry has groups and the appropriate material
   * side is used per group.
   *
   * Note that unlike three.js' Raycaster results the points and distances in the intersections
   * returned from this function are relative to the local frame of the MeshBVH. When using the
   * `acceleratedRaycast` function as an override for `Mesh.raycast` they are transformed into
   * world space to be consistent with three's results.
   *
   * @param {Ray} ray
   * @param {number|Material|Array<Material>} [materialOrSide=FrontSide]
   * @param {number} [near=0]
   * @param {number} [far=Infinity]
   * @returns {Array<Intersection>}
   */
  raycast(ray, materialOrSide = FrontSide, near = 0, far = Infinity) {
    const roots = this._roots;
    const intersects = [];
    const raycastFunc = this.indirect ? raycast_indirect : raycast;
    for (let i = 0, l = roots.length; i < l; i++) {
      raycastFunc(this, i, materialOrSide, ray, intersects, near, far);
    }
    return intersects;
  }
  /**
   * Returns the first raycast hit in the model. This is typically much faster than returning
   * all hits. See `raycast` for information on the side and material options as well as the
   * frame of the returned intersections.
   *
   * @param {Ray} ray
   * @param {number|Material|Array<Material>} [materialOrSide=FrontSide]
   * @param {number} [near=0]
   * @param {number} [far=Infinity]
   * @returns {Intersection|null}
   */
  raycastFirst(ray, materialOrSide = FrontSide, near = 0, far = Infinity) {
    const roots = this._roots;
    let closestResult = null;
    const raycastFirstFunc = this.indirect ? raycastFirst_indirect : raycastFirst;
    for (let i = 0, l = roots.length; i < l; i++) {
      const result = raycastFirstFunc(this, i, materialOrSide, ray, near, far);
      if (result != null && (closestResult == null || result.distance < closestResult.distance)) {
        closestResult = result;
      }
    }
    return closestResult;
  }
  /**
   * Returns whether or not the mesh intersects the given geometry.
   *
   * The `geometryToBvh` parameter is the transform of the geometry in the BVH's local frame.
   *
   * Performance improves considerably if the provided geometry also has a `boundsTree`.
   *
   * @param {BufferGeometry} otherGeometry
   * @param {Matrix4} geometryToBvh - Transform of `otherGeometry` into the local space of
   *   this BVH.
   * @returns {boolean}
   */
  intersectsGeometry(otherGeometry, geomToMesh) {
    let result = false;
    const roots = this._roots;
    const intersectsGeometryFunc = this.indirect ? intersectsGeometry_indirect : intersectsGeometry;
    for (let i = 0, l = roots.length; i < l; i++) {
      result = intersectsGeometryFunc(this, i, otherGeometry, geomToMesh);
      if (result) {
        break;
      }
    }
    return result;
  }
  /**
   * A generalized cast function that can be used to implement intersection logic for custom
   * shapes. This is used internally for `intersectsBox`, `intersectsSphere`, and more. The
   * function returns as soon as a triangle has been reported as intersected and returns `true`
   * if a triangle has been intersected.
   *
   * @param {Object} callbacks
   * @param {IntersectsBoundsCallback} callbacks.intersectsBounds
   * @param {IntersectsTriangleCallback} [callbacks.intersectsTriangle]
   * @param {IntersectsRangeCallback} [callbacks.intersectsRange]
   * @param {BoundsTraverseOrderCallback} [callbacks.boundsTraverseOrder]
   * @returns {boolean}
   */
  shapecast(callbacks) {
    const triangle4 = ExtendedTrianglePool.getPrimitive();
    const result = super.shapecast(
      {
        ...callbacks,
        intersectsPrimitive: callbacks.intersectsTriangle,
        scratchPrimitive: triangle4,
        // TODO: is the performance significant enough for the added complexity here?
        // can we just use one function?
        iterate: this.indirect ? iterateOverTriangles_indirect : iterateOverTriangles
      }
    );
    ExtendedTrianglePool.releasePrimitive(triangle4);
    return result;
  }
  /**
   * A generalized cast function that traverses two BVH structures simultaneously to perform
   * intersection tests between them. This is used internally by `intersectsGeometry`. The
   * function returns `true` as soon as a triangle pair has been reported as intersected by
   * the callbacks.
   *
   * `matrixToLocal` is a Matrix4 that transforms `otherBvh` into the local space of this BVH.
   * The other BVH's triangles are transformed by this matrix before intersection tests.
   *
   * @param {MeshBVH} otherBvh
   * @param {Matrix4} matrixToLocal - Transforms `otherBvh` into the local space of this BVH.
   * @param {Object} callbacks
   * @param {IntersectsRangesCallback} [callbacks.intersectsRanges]
   * @param {IntersectsTrianglesCallback} [callbacks.intersectsTriangles]
   * @returns {boolean}
   */
  bvhcast(otherBvh, matrixToLocal, callbacks) {
    let {
      intersectsRanges,
      intersectsTriangles
    } = callbacks;
    const triangle1 = ExtendedTrianglePool.getPrimitive();
    const indexAttr1 = this.geometry.index;
    const positionAttr1 = this.geometry.attributes.position;
    const assignTriangle1 = this.indirect ? (i1) => {
      const ti = this.resolveTriangleIndex(i1);
      setTriangle(triangle1, ti * 3, indexAttr1, positionAttr1);
    } : (i1) => {
      setTriangle(triangle1, i1 * 3, indexAttr1, positionAttr1);
    };
    const triangle23 = ExtendedTrianglePool.getPrimitive();
    const indexAttr2 = otherBvh.geometry.index;
    const positionAttr2 = otherBvh.geometry.attributes.position;
    const assignTriangle2 = otherBvh.indirect ? (i2) => {
      const ti2 = otherBvh.resolveTriangleIndex(i2);
      setTriangle(triangle23, ti2 * 3, indexAttr2, positionAttr2);
    } : (i2) => {
      setTriangle(triangle23, i2 * 3, indexAttr2, positionAttr2);
    };
    if (intersectsTriangles) {
      if (!(otherBvh instanceof _MeshBVH)) {
        throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');
      }
      const iterateOverDoubleTriangles = (offset1, count1, offset2, count2, depth1, nodeIndex1, depth2, nodeIndex2) => {
        for (let i2 = offset2, l2 = offset2 + count2; i2 < l2; i2++) {
          assignTriangle2(i2);
          triangle23.a.applyMatrix4(matrixToLocal);
          triangle23.b.applyMatrix4(matrixToLocal);
          triangle23.c.applyMatrix4(matrixToLocal);
          triangle23.needsUpdate = true;
          for (let i1 = offset1, l1 = offset1 + count1; i1 < l1; i1++) {
            assignTriangle1(i1);
            triangle1.needsUpdate = true;
            if (intersectsTriangles(triangle1, triangle23, i1, i2, depth1, nodeIndex1, depth2, nodeIndex2)) {
              return true;
            }
          }
        }
        return false;
      };
      if (intersectsRanges) {
        const originalIntersectsRanges = intersectsRanges;
        intersectsRanges = function(offset1, count1, offset2, count2, depth1, nodeIndex1, depth2, nodeIndex2) {
          if (!originalIntersectsRanges(offset1, count1, offset2, count2, depth1, nodeIndex1, depth2, nodeIndex2)) {
            return iterateOverDoubleTriangles(offset1, count1, offset2, count2, depth1, nodeIndex1, depth2, nodeIndex2);
          }
          return true;
        };
      } else {
        intersectsRanges = iterateOverDoubleTriangles;
      }
    }
    return super.bvhcast(otherBvh, matrixToLocal, { intersectsRanges });
  }
  /* Derived Cast Functions */
  /**
   * Returns whether or not the mesh intersects the given box.
   *
   * The `boxToBvh` parameter is the transform of the box in the meshes frame.
   *
   * @param {Box3} box
   * @param {Matrix4} boxToBvh - Transform of the box in the local space of this BVH.
   * @returns {boolean}
   */
  intersectsBox(box, boxToMesh) {
    _obb.set(box.min, box.max, boxToMesh);
    _obb.needsUpdate = true;
    return this.shapecast(
      {
        intersectsBounds: (box2) => _obb.intersectsBox(box2),
        intersectsTriangle: (tri) => _obb.intersectsTriangle(tri)
      }
    );
  }
  /**
   * Returns whether or not the mesh intersects the given sphere.
   *
   * @param {Sphere} sphere
   * @returns {boolean}
   */
  intersectsSphere(sphere) {
    return this.shapecast(
      {
        intersectsBounds: (box) => sphere.intersectsBox(box),
        intersectsTriangle: (tri) => tri.intersectsSphere(sphere)
      }
    );
  }
  /**
   * Computes the closest distance from the geometry to the mesh and puts the closest point on
   * the mesh in `target1` (in the frame of the BVH) and the closest point on the other
   * geometry in `target2` (in the geometry frame). If `target1` is not provided a new Object
   * is created and returned from the function.
   *
   * The `geometryToBvh` parameter is the transform of the geometry in the BVH's local frame.
   *
   * If a point is found that is closer than `minThreshold` then the function will return that
   * result early. Any triangles or points outside of `maxThreshold` are ignored. If no point
   * is found within the min / max thresholds then `null` is returned and the target objects
   * are not modified.
   *
   * The returned faceIndex in `target1` and `target2` can be used with the standalone function
   * `getTriangleHitPointInfo` to obtain more information like UV coordinates, triangle normal
   * and materialIndex.
   *
   * _Note that this function can be very slow if `geometry` does not have a
   * `geometry.boundsTree` computed._
   *
   * @param {BufferGeometry} otherGeometry
   * @param {Matrix4} geometryToBvh - Transform of `otherGeometry` into the local space of
   *   this BVH.
   * @param {HitPointInfo} [target1={}]
   * @param {HitPointInfo} [target2={}]
   * @param {number} [minThreshold=0]
   * @param {number} [maxThreshold=Infinity]
   * @returns {HitPointInfo|null}
   */
  closestPointToGeometry(otherGeometry, geometryToBvh, target1 = {}, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
    const closestPointToGeometryFunc = this.indirect ? closestPointToGeometry_indirect : closestPointToGeometry;
    return closestPointToGeometryFunc(
      this,
      otherGeometry,
      geometryToBvh,
      target1,
      target2,
      minThreshold,
      maxThreshold
    );
  }
  /**
   * Computes the closest distance from the point to the mesh and gives additional information
   * in `target`. The target can be left undefined to default to a new object which is
   * ultimately returned by the function.
   *
   * If a point is found that is closer than `minThreshold` then the function will return that
   * result early. Any triangles or points outside of `maxThreshold` are ignored. If no point
   * is found within the min / max thresholds then `null` is returned and the `target` object
   * is not modified.
   *
   * The returned faceIndex can be used with the standalone function `getTriangleHitPointInfo`
   * to obtain more information like UV coordinates, triangle normal and materialIndex.
   *
   * @param {Vector3} point
   * @param {HitPointInfo} [target={}]
   * @param {number} [minThreshold=0]
   * @param {number} [maxThreshold=Infinity]
   * @returns {HitPointInfo|null}
   */
  closestPointToPoint(point, target = {}, minThreshold = 0, maxThreshold = Infinity) {
    return closestPointToPoint(
      this,
      point,
      target,
      minThreshold,
      maxThreshold
    );
  }
};

// node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
import {
  BufferAttribute as BufferAttribute3,
  BufferGeometry,
  Float32BufferAttribute,
  InstancedBufferAttribute,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  TriangleFanDrawMode,
  TriangleStripDrawMode,
  TrianglesDrawMode,
  Vector3 as Vector311
} from "./vendor/three.module.js";
function mergeGeometries(geometries, useGroups = false) {
  const isIndexed = geometries[0].index !== null;
  const attributesUsed = new Set(Object.keys(geometries[0].attributes));
  const morphAttributesUsed = new Set(Object.keys(geometries[0].morphAttributes));
  const attributes = {};
  const morphAttributes = {};
  const morphTargetsRelative = geometries[0].morphTargetsRelative;
  const mergedGeometry = new BufferGeometry();
  let offset = 0;
  for (let i = 0; i < geometries.length; ++i) {
    const geometry = geometries[i];
    let attributesCount = 0;
    if (isIndexed !== (geometry.index !== null)) {
      console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");
      return null;
    }
    for (const name in geometry.attributes) {
      if (!attributesUsed.has(name)) {
        console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.');
        return null;
      }
      if (attributes[name] === void 0) attributes[name] = [];
      attributes[name].push(geometry.attributes[name]);
      attributesCount++;
    }
    if (attributesCount !== attributesUsed.size) {
      console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". Make sure all geometries have the same number of attributes.");
      return null;
    }
    if (morphTargetsRelative !== geometry.morphTargetsRelative) {
      console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". .morphTargetsRelative must be consistent throughout all geometries.");
      return null;
    }
    for (const name in geometry.morphAttributes) {
      if (!morphAttributesUsed.has(name)) {
        console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ".  .morphAttributes must be consistent throughout all geometries.");
        return null;
      }
      if (morphAttributes[name] === void 0) morphAttributes[name] = [];
      morphAttributes[name].push(geometry.morphAttributes[name]);
    }
    if (useGroups) {
      let count;
      if (isIndexed) {
        count = geometry.index.count;
      } else if (geometry.attributes.position !== void 0) {
        count = geometry.attributes.position.count;
      } else {
        console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". The geometry must have either an index or a position attribute");
        return null;
      }
      mergedGeometry.addGroup(offset, count, i);
      offset += count;
    }
  }
  if (isIndexed) {
    let indexOffset = 0;
    const mergedIndex = [];
    for (let i = 0; i < geometries.length; ++i) {
      const index = geometries[i].index;
      for (let j = 0; j < index.count; ++j) {
        mergedIndex.push(index.getX(j) + indexOffset);
      }
      indexOffset += geometries[i].attributes.position.count;
    }
    mergedGeometry.setIndex(mergedIndex);
  }
  for (const name in attributes) {
    const mergedAttribute = mergeAttributes(attributes[name]);
    if (!mergedAttribute) {
      console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + name + " attribute.");
      return null;
    }
    mergedGeometry.setAttribute(name, mergedAttribute);
  }
  for (const name in morphAttributes) {
    const numMorphTargets = morphAttributes[name][0].length;
    if (numMorphTargets === 0) continue;
    mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
    mergedGeometry.morphAttributes[name] = [];
    for (let i = 0; i < numMorphTargets; ++i) {
      const morphAttributesToMerge = [];
      for (let j = 0; j < morphAttributes[name].length; ++j) {
        morphAttributesToMerge.push(morphAttributes[name][j][i]);
      }
      const mergedMorphAttribute = mergeAttributes(morphAttributesToMerge);
      if (!mergedMorphAttribute) {
        console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + name + " morphAttribute.");
        return null;
      }
      mergedGeometry.morphAttributes[name].push(mergedMorphAttribute);
    }
  }
  return mergedGeometry;
}
function mergeAttributes(attributes) {
  let TypedArray;
  let itemSize;
  let normalized;
  let gpuType = -1;
  let arrayLength = 0;
  for (let i = 0; i < attributes.length; ++i) {
    const attribute = attributes[i];
    if (TypedArray === void 0) TypedArray = attribute.array.constructor;
    if (TypedArray !== attribute.array.constructor) {
      console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.");
      return null;
    }
    if (itemSize === void 0) itemSize = attribute.itemSize;
    if (itemSize !== attribute.itemSize) {
      console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.");
      return null;
    }
    if (normalized === void 0) normalized = attribute.normalized;
    if (normalized !== attribute.normalized) {
      console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.");
      return null;
    }
    if (gpuType === -1) gpuType = attribute.gpuType;
    if (gpuType !== attribute.gpuType) {
      console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.");
      return null;
    }
    arrayLength += attribute.count * itemSize;
  }
  const array = new TypedArray(arrayLength);
  const result = new BufferAttribute3(array, itemSize, normalized);
  let offset = 0;
  for (let i = 0; i < attributes.length; ++i) {
    const attribute = attributes[i];
    if (attribute.isInterleavedBufferAttribute) {
      const tupleOffset = offset / itemSize;
      for (let j = 0, l = attribute.count; j < l; j++) {
        for (let c = 0; c < itemSize; c++) {
          const value = attribute.getComponent(j, c);
          result.setComponent(j + tupleOffset, c, value);
        }
      }
    } else {
      array.set(attribute.array, offset);
    }
    offset += attribute.count * itemSize;
  }
  if (gpuType !== void 0) {
    result.gpuType = gpuType;
  }
  return result;
}

// node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_index.default;

// upstream/fuse/src/utils/units.ts
var UnitConversions = class {
  static yardsToMeters(yards) {
    return yards * 0.9144;
  }
  static metersToYards(meters) {
    return meters * 1.09361;
  }
  static metersToFeet(meters) {
    return meters * 3.28084;
  }
  static feetToMeters(feet) {
    return feet * 0.3048;
  }
  static milesPerHourToMetersPerSecond(mph) {
    return mph * 0.44704;
  }
  static metersPerSecondToMilesPerHour(metersPerSecond) {
    return metersPerSecond * 2.23694;
  }
};

// upstream/fuse/src/courses/surfaces.ts
var CourseSurfaceType = /* @__PURE__ */ ((CourseSurfaceType2) => {
  CourseSurfaceType2["Green"] = "green";
  CourseSurfaceType2["Fringe"] = "fringe";
  CourseSurfaceType2["Fairway"] = "fairway";
  CourseSurfaceType2["FirstCut"] = "first_cut";
  CourseSurfaceType2["Tee"] = "tee";
  CourseSurfaceType2["Rough"] = "rough";
  CourseSurfaceType2["Sand"] = "sand";
  CourseSurfaceType2["Water"] = "water";
  CourseSurfaceType2["River"] = "river";
  CourseSurfaceType2["Concrete"] = "concrete";
  CourseSurfaceType2["PlaneLake"] = "plane_lake";
  CourseSurfaceType2["PlaneRiver"] = "plane_river";
  CourseSurfaceType2["PineStraw"] = "pine_straw";
  CourseSurfaceType2["Default"] = "default";
  CourseSurfaceType2["Base"] = "base";
  return CourseSurfaceType2;
})(CourseSurfaceType || {});
var CourseSurfaces = {
  ["green" /* Green */]: {
    hasCollider: true,
    friction: 0.5,
    spinGrip: 1.2,
    restitution: 0.35,
    divot: 0.01,
    rollResistance: 0.09,
    stopSpeed: 0.18
  },
  ["fringe" /* Fringe */]: {
    hasCollider: true,
    friction: 0.5,
    spinGrip: 1.2,
    divot: 0.01,
    restitution: 0.3,
    rollResistance: 0.09,
    stopSpeed: 0.2
  },
  ["fairway" /* Fairway */]: {
    hasCollider: true,
    friction: 0.3,
    restitution: 0.3,
    spinGrip: 0.5,
    rollResistance: 0.1
  },
  ["first_cut" /* FirstCut */]: {
    hasCollider: true,
    friction: 0.4,
    spinGrip: 1,
    restitution: 0.3,
    rollResistance: 0.1
  },
  ["tee" /* Tee */]: {
    hasCollider: true,
    friction: 0.3,
    restitution: 0.1,
    rollResistance: 0.2,
    stopSpeed: 0.2
  },
  ["rough" /* Rough */]: {
    hasCollider: true,
    friction: 0.3,
    restitution: 0.25,
    stopSpeed: 0.4,
    rollResistance: 0.1
  },
  ["base" /* Base */]: {
    hasCollider: true,
    friction: 0.3,
    restitution: 0.25,
    rollResistance: 0.1,
    stopSpeed: 0.4
  },
  ["sand" /* Sand */]: {
    hasCollider: true,
    friction: 1,
    restitution: 0.02,
    rollResistance: 0.25,
    stopSpeed: 0.15
  },
  ["water" /* Water */]: {
    hasCollider: true,
    friction: 1,
    restitution: 0,
    rollResistance: 1
  },
  ["river" /* River */]: {
    hasCollider: true,
    friction: 1,
    restitution: 0,
    rollResistance: 1
  },
  ["concrete" /* Concrete */]: {
    hasCollider: true,
    friction: 0.3,
    restitution: 0.8,
    rollResistance: 0.2
  },
  ["plane_lake" /* PlaneLake */]: {
    hasCollider: false,
    friction: 0.3,
    restitution: 0.5,
    rollResistance: 0.2
  },
  ["plane_river" /* PlaneRiver */]: {
    hasCollider: false,
    friction: 0.3,
    restitution: 0.5,
    rollResistance: 0.2
  },
  ["pine_straw" /* PineStraw */]: {
    hasCollider: true,
    friction: 0.8,
    restitution: 0.15,
    rollResistance: 0.2
  },
  ["default" /* Default */]: {
    hasCollider: true,
    friction: 0.5,
    restitution: 0.02,
    rollResistance: 0.05,
    stopSpeed: 0.3
  }
};
function isCourseSurfaceType(value) {
  return Object.values(CourseSurfaceType).includes(value);
}

// upstream/fuse/src/physics/constants.ts
var PhysicsLookupTable = [
  {
    // ballSpeed: 67, // m/s
    ballSpeed: UnitConversions.milesPerHourToMetersPerSecond(150),
    // launchAngle: 10, // VLA in degrees
    magnusCoeff: 4e-4,
    dragCoeff: 0.27,
    spinDecayRate: 0.986,
    sideSpinDecayRate: 0.986
  },
  {
    // ballSpeed: 64,
    ballSpeed: UnitConversions.milesPerHourToMetersPerSecond(143),
    // launchAngle: 9,
    magnusCoeff: 38e-5,
    dragCoeff: 0.27,
    spinDecayRate: 0.985,
    sideSpinDecayRate: 0.986
  },
  {
    // ballSpeed: 60,
    ballSpeed: UnitConversions.milesPerHourToMetersPerSecond(134),
    // launchAngle: 12,
    magnusCoeff: 35e-5,
    dragCoeff: 0.3,
    spinDecayRate: 0.985,
    sideSpinDecayRate: 0.986
  },
  {
    // ballSpeed: 54,
    ballSpeed: UnitConversions.milesPerHourToMetersPerSecond(120),
    // launchAngle: 14,
    magnusCoeff: 1e-4,
    dragCoeff: 0.31,
    spinDecayRate: 0.985,
    sideSpinDecayRate: 0.985
  },
  {
    // ballSpeed: 48, // ~107 mph
    ballSpeed: UnitConversions.milesPerHourToMetersPerSecond(107),
    // launchAngle: 16,
    magnusCoeff: 5e-5,
    dragCoeff: 0.32,
    spinDecayRate: 0.98,
    sideSpinDecayRate: 0.984
  },
  {
    // ballSpeed: 42, // ~94 MPH
    ballSpeed: UnitConversions.milesPerHourToMetersPerSecond(94),
    // launchAngle: 22,
    magnusCoeff: 5e-5,
    dragCoeff: 0.34,
    spinDecayRate: 0.98,
    sideSpinDecayRate: 0.97
  },
  {
    // ballSpeed: 40, // ~89.5 MPH
    ballSpeed: UnitConversions.milesPerHourToMetersPerSecond(90),
    // launchAngle: 25,
    magnusCoeff: 45e-6,
    dragCoeff: 0.34,
    spinDecayRate: 0.97,
    sideSpinDecayRate: 0.97
  },
  {
    ballSpeed: UnitConversions.milesPerHourToMetersPerSecond(50),
    magnusCoeff: 1e-5,
    dragCoeff: 0.3,
    spinDecayRate: 0.97,
    sideSpinDecayRate: 0.97
  }
];
var GRAVITY = 9.81;
var GRAVITY_VECTOR = { x: 0, y: -GRAVITY, z: 0 };

// upstream/fuse/src/physics/ballPhysics.ts
var STIMP_RELEASE_SPEED = 1.83;
var SPEED_BRAKING_SCALE = 0.3;
var BallPhysics = class extends eventemitter3_default {
  constructor(mesh, radius = 0.021335, terrainMeshes = [], stimpLevel) {
    super();
    this.ballMass = 0.04593;
    this.airDensity = 1.225;
    this.airDensityMin = 1.225;
    this.airDensityMax = 1;
    this.magnusCoeff = 15e-5;
    this.dragCoeff = 0.25;
    this.spinDecayRate = 0.987;
    this.sideSpinDecayRate = 0.95;
    this.gripStrength = 2.8;
    this.stimpLevel = 8;
    // green speed, feet of rollout from 1.83 m/s release
    // State flags
    this.isPutt = false;
    this.isLanded = false;
    this.isGrounded = false;
    this.isInWater = false;
    this.isEnded = false;
    this.isShotActive = false;
    this.hasBeenAirborne = false;
    this.terrainCollisionsEnabled = false;
    // Thresholds
    this.defaultEndThresholdSpeed = 0.15;
    // m/s linear
    this.defaultEndThresholdAngular = 10;
    // rad/s
    this.shotFrames = 0;
    this.groundedFrames = 0;
    this.groundedFramesRequired = 10;
    // consecutive grounded steps before "rolling"
    // eventQueue: EventQueue;
    // golf hole physics
    this.holeCenter = new THREE.Vector2();
    // (x, z), set when the pin is placed
    this.holeRadius = 0.054;
    // 108mm
    this.cupDepth = 0.105;
    // ≥101.6mm regulation
    this.holeGroundY = 0;
    // green Y at the pin, captured on entry
    // holeState: 'none' | 'over' | 'falling' | 'exiting' = 'none';
    this.holeState = "none";
    this.isHoled = false;
    this.#lastTerrainInfo = {
      height: 0,
      restitution: 0.35,
      friction: 0.6,
      normal: new THREE.Vector3(0, 1, 0)
    };
    this.#surfaceKeys = [];
    this.#surfaceHoleNumbers = [];
    this.#dynamicSurfaces = [];
    this.#invMat = new THREE.Matrix4();
    this.#normalMat = new THREE.Matrix3();
    this.#localRay = new THREE.Ray();
    this.#terrainRay = new THREE.Ray();
    this.#surfaceSpin = new THREE.Vector3();
    this.#gravity = new THREE.Vector3();
    this.#slopeForce = new THREE.Vector3();
    this.#normalClone = new THREE.Vector3();
    this.#groundNormal = new THREE.Vector3();
    this.#normalComponent = new THREE.Vector3();
    this.#tangentComponent = new THREE.Vector3();
    this.#position = new THREE.Vector3();
    this.#velocity = new THREE.Vector3();
    this.#angularVel = new THREE.Vector3();
    this.#hitNormal = new THREE.Vector3(0, 1, 0);
    this.mesh = mesh;
    if (stimpLevel) {
      console.log(`Using STIMP level of ${stimpLevel}`);
      this.stimpLevel = stimpLevel;
    }
    this.ballRadius = radius ?? 0.021335;
    this.ballArea = Math.PI * this.ballRadius * this.ballRadius;
    this.buildTerrainMap(terrainMeshes);
    this.freeze();
  }
  #lastTerrainInfo;
  #mergedBVH;
  #mergedMesh;
  #surfaceKeys;
  #surfaceHoleNumbers;
  #dynamicSurfaces;
  #invMat;
  #normalMat;
  #localRay;
  #terrainRay;
  #surfaceSpin;
  #gravity;
  #slopeForce;
  #normalClone;
  #groundNormal;
  #normalComponent;
  #tangentComponent;
  #position;
  #velocity;
  #angularVel;
  #hitNormal;
  reset(position, holePosition) {
    this.#position.copy(position);
    this.#velocity.set(0, 0, 0);
    this.#angularVel.set(0, 0, 0);
    this.mesh.position.copy(position);
    this.isShotActive = false;
    this.isPutt = false;
    this.isLanded = false;
    this.isGrounded = false;
    this.isInWater = false;
    this.isEnded = false;
    this.isHoled = false;
    this.hasBeenAirborne = false;
    this.terrainCollisionsEnabled = false;
    this.currentSurface = void 0;
    this.holeState = "none";
    this.shotFrames = 0;
    this.groundedFrames = 0;
    if (holePosition) this.setPin(holePosition);
  }
  buildTerrainMap(terrainMeshes) {
    if (terrainMeshes.length > 0) {
      const geometries = [];
      for (const tm of terrainMeshes) {
        tm.updateMatrixWorld(true);
        const geo = tm.geometry.clone();
        geo.applyMatrix4(tm.matrixWorld);
        const surfaceIndex = this.#surfaceKeys.length;
        this.#surfaceKeys.push(tm.userData.surface ?? "base");
        this.#surfaceHoleNumbers.push(tm.userData.holeNumber);
        geo.clearGroups();
        geo.addGroup(0, geo.index ? geo.index.count : geo.attributes.position.count, surfaceIndex);
        geometries.push(geo);
      }
      const merged = mergeGeometries(geometries, true);
      if (merged) {
        this.#mergedBVH = new MeshBVH(merged);
        this.#mergedMesh = new THREE.Mesh(merged);
        this.#mergedMesh.matrixWorld.identity();
      }
    }
  }
  /** Set elevation and air density */
  setElevation(meters = 0) {
    console.log(`Playing with elevation: ${meters}`);
    if (meters === 0) {
      this.airDensity = this.airDensityMin;
      return;
    }
    const t = THREE.MathUtils.clamp(meters, 0, 1e4) / 1e4;
    this.airDensity = THREE.MathUtils.lerp(this.airDensityMin, this.airDensityMax, t);
  }
  /** Look up physics values by ball speed */
  interpolateBySpeed(speed) {
    const table = [...Object.values(PhysicsLookupTable)].sort((a, b) => a.ballSpeed - b.ballSpeed);
    if (speed <= table[0].ballSpeed) return table[0];
    if (speed >= table[table.length - 1].ballSpeed) return table[table.length - 1];
    for (let i = 0; i < table.length - 1; i++) {
      const a = table[i], b = table[i + 1];
      if (speed >= a.ballSpeed && speed < b.ballSpeed) {
        const t = (speed - a.ballSpeed) / (b.ballSpeed - a.ballSpeed);
        const l = THREE.MathUtils.lerp;
        return {
          ballSpeed: speed,
          // spinRate: l(a.spinRate, b.spinRate, t),
          // launchAngle: l(a.launchAngle, b.launchAngle, t),
          magnusCoeff: l(a.magnusCoeff, b.magnusCoeff, t),
          dragCoeff: l(a.dragCoeff, b.dragCoeff, t),
          spinDecayRate: l(a.spinDecayRate, b.spinDecayRate, t),
          sideSpinDecayRate: l(a.sideSpinDecayRate, b.sideSpinDecayRate, t)
        };
      }
    }
    return table[table.length - 1];
  }
  freeze() {
    this.isShotActive = false;
  }
  unfreeze() {
  }
  resetTo(position) {
    this.isShotActive = false;
    this.#position.copy(position);
    this.#velocity.set(0, 0, 0);
    this.#angularVel.set(0, 0, 0);
    this.isLanded = false;
    this.isGrounded = false;
    this.isHoled = false;
    this.isEnded = false;
    this.groundedFrames = 0;
  }
  launchShot(shot, isPutt = false) {
    const ballSpeed = UnitConversions.milesPerHourToMetersPerSecond(shot.ballSpeed);
    const spinSpeed = THREE.MathUtils.clamp(shot.spinSpeed, 0, 13e3);
    const spinAxis = THREE.MathUtils.clamp(shot.spinAxis, -45, 45);
    const hla = THREE.MathUtils.clamp(shot.horizontalLaunchAngle, -45, 45);
    const vlaMin = isPutt ? 0 : 1;
    const vla = THREE.MathUtils.clamp(shot.verticalLaunchAngle, vlaMin, 50);
    this.hasBeenAirborne = false;
    this.terrainCollisionsEnabled = true;
    this.isLanded = isPutt;
    this.isGrounded = isPutt;
    this.isEnded = false;
    this.isPutt = isPutt;
    this.groundedFrames = 0;
    this.shotFrames = 0;
    this.holeState = "none";
    this.isShotActive = true;
    if (isPutt) {
      console.log("Launching putt", JSON.stringify({ ballSpeed, hla, spinSpeed }));
      this._launchPutt(ballSpeed, hla, spinSpeed);
    } else {
      console.log("Launching full shot", JSON.stringify({ ballSpeed, vla, hla, spinSpeed, spinAxis }));
      this._launchFull(
        ballSpeed,
        vla,
        hla,
        spinSpeed,
        spinAxis
      );
    }
  }
  _launchPutt(speed, hla = 0, spinRPM = 0) {
    const dir = new THREE.Vector3(0, 0, 1).applyQuaternion(this.mesh.quaternion);
    const qH = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      THREE.MathUtils.degToRad(-hla)
    );
    dir.applyQuaternion(qH).normalize().multiplyScalar(speed);
    this.#velocity.copy(dir);
    this.#angularVel.set(0, 0, 0);
    this.#position.copy(this.mesh.position);
    const coeffs = this.interpolateBySpeed(speed);
    this.dragCoeff = coeffs.dragCoeff;
    this.spinDecayRate = coeffs.spinDecayRate;
    this.sideSpinDecayRate = coeffs.sideSpinDecayRate;
  }
  _launchFull(speed, vla, hla = 0, spinRPM = 0, spinAxisDeg = 0) {
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.mesh.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.mesh.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.mesh.quaternion);
    const dir = forward.clone();
    dir.applyQuaternion(
      new THREE.Quaternion().setFromAxisAngle(up, THREE.MathUtils.degToRad(-hla))
    );
    dir.applyQuaternion(
      new THREE.Quaternion().setFromAxisAngle(right, THREE.MathUtils.degToRad(-vla))
    );
    dir.normalize().multiplyScalar(speed);
    this.#velocity.copy(dir);
    const spinRad = spinRPM * 2 * Math.PI / 60;
    const axisRad = THREE.MathUtils.degToRad(spinAxisDeg * -1);
    const localLeft = right.clone().multiplyScalar(-1);
    const spinVec = new THREE.Vector3().addScaledVector(localLeft, Math.cos(axisRad)).addScaledVector(up, Math.sin(axisRad)).multiplyScalar(spinRad);
    this.#angularVel.copy(spinVec);
    this.#surfaceSpin.copy(spinVec);
    this.#position.copy(this.mesh.position);
    const coeffs = this.interpolateBySpeed(speed);
    this.magnusCoeff = coeffs.magnusCoeff;
    this.dragCoeff = coeffs.dragCoeff;
    this.spinDecayRate = coeffs.spinDecayRate;
    this.sideSpinDecayRate = coeffs.sideSpinDecayRate;
  }
  _handleLanding() {
    const vMag = THREE.MathUtils.clamp(this.#velocity.length(), 0, 25) / 25;
    this.emit("landed", vMag);
  }
  _updateAirPhysics(dt) {
    const pos = this.#position;
    const vel = this.#velocity;
    const spin = this.#angularVel;
    const vMag = vel.length();
    if (vMag > 1e-6) {
      const dragFactor = -0.5 * this.dragCoeff * this.airDensity * this.ballArea * vMag / this.ballMass;
      vel.addScaledVector(vel, dragFactor * dt);
      const magnus = this.#gravity.crossVectors(spin, vel).multiplyScalar(this.magnusCoeff / this.ballMass);
      const maxLift = GRAVITY * 0.83;
      if (magnus.length() > maxLift) magnus.setLength(maxLift);
      vel.addScaledVector(magnus, dt);
    }
    vel.y -= GRAVITY * dt;
    const decayBack = Math.pow(this.spinDecayRate, dt / 0.02);
    const decaySide = Math.pow(this.sideSpinDecayRate, dt / 0.02);
    spin.x *= decayBack;
    spin.z *= decayBack;
    spin.y *= decaySide;
    const newX = pos.x + vel.x * dt;
    const newY = pos.y + vel.y * dt;
    const newZ = pos.z + vel.z * dt;
    pos.set(newX, newY, newZ);
    this.shotFrames++;
    if (!this.hasBeenAirborne && this.shotFrames > 1) {
      const terrainY = this.getTerrainHeight(newX, newZ);
      if (newY > terrainY + this.ballRadius * 3) {
        this.hasBeenAirborne = true;
      }
    }
    if (this.hasBeenAirborne) {
      const terrainY = this.getTerrainHeight(newX, newZ);
      if (newY <= terrainY + this.ballRadius + 0.01) {
        this.isLanded = true;
      }
    }
    if (!this.hasBeenAirborne && this.shotFrames > 2 && vel.y <= 0) {
      const terrainY = this.getTerrainHeight(newX, newZ);
      if (newY <= terrainY + this.ballRadius) {
        this.isLanded = true;
      }
    }
  }
  // Main update called every frame with a fixed dt
  update(dt) {
    if (!this.isShotActive) return;
    if (!this.isLanded) {
      this._updateAirPhysics(dt);
      this.#surfaceSpin.multiplyScalar(Math.pow(0.999, dt / 0.02));
    } else {
      this._updateGroundPhysics(dt);
    }
    this.mesh.position.copy(this.#position);
    if (this.isGrounded && !this.isEnded) {
      const vel = this.#velocity;
      const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z);
      const endThresholdSpeed = this.currentSurface?.stopSpeed ?? this.defaultEndThresholdSpeed;
      if (speed < endThresholdSpeed) {
        this._endShot();
      }
    }
  }
  _endShot() {
    this.isEnded = true;
    this.isShotActive = false;
    this.emit("shotEnded", {
      surface: this.currentSurface?.type,
      holeNumber: this.currentHoleNumber,
      isInWater: this.isInWater,
      isHoled: this.isHoled
    });
  }
  _checkWaterCollision() {
    if (this.currentSurface?.type === "plane_lake" || this.currentSurface?.type === "plane_river") {
      return true;
    }
  }
  _updateCupFall(dt) {
    const pos = this.#position;
    const vel = this.#velocity;
    vel.y -= GRAVITY * dt;
    let nx = pos.x + vel.x * dt;
    let nz = pos.z + vel.z * dt;
    let ny = pos.y + vel.y * dt;
    const C = this.holeCenter;
    const off = new THREE.Vector2(nx - C.x, nz - C.y);
    const maxOff = this.holeRadius - this.ballRadius;
    if (off.length() > maxOff) {
      off.setLength(maxOff);
      nx = C.x + off.x;
      nz = C.y + off.y;
      const n = off.clone().normalize();
      const vh = new THREE.Vector2(vel.x, vel.z);
      vh.addScaledVector(n, -2 * vh.dot(n));
      vh.multiplyScalar(0.4);
      vel.x = vh.x;
      vel.z = vh.y;
    }
    const bottomY = this.holeGroundY - this.cupDepth + this.ballRadius;
    if (ny <= bottomY) {
      ny = bottomY;
      vel.set(vel.x * 0.3, Math.abs(vel.y) * 0.25, vel.z * 0.3);
      if (vel.length() < 0.15) {
        pos.set(nx, bottomY, nz);
        vel.set(0, 0, 0);
        this.holeState = "none";
        this.isHoled = true;
        this.emit("holedOut");
        this._endShot();
        return;
      }
    }
    pos.set(nx, ny, nz);
  }
  _updateGroundPhysics(dt) {
    if (this.holeState === "falling") {
      console.log("Ball is falling into hole");
      this._updateCupFall(dt);
      return;
    }
    const pos = this.#position;
    const vel = this.#velocity;
    const spin = this.#surfaceSpin;
    vel.y -= GRAVITY * dt;
    const newX = pos.x + vel.x * dt;
    const newZ = pos.z + vel.z * dt;
    const newY = pos.y + vel.y * dt;
    const terrain = this.getTerrainInfo(newX, newZ);
    const terrainY = terrain.height;
    const normal = this.#groundNormal.copy(terrain.normal);
    if (normal.y < 0) normal.negate();
    if (this.holeState !== "exiting" && this._checkHole(pos, newX, newZ, vel, terrainY)) {
      const segX = newX - pos.x;
      const segZ = newZ - pos.z;
      const segLenSq = segX * segX + segZ * segZ;
      if (segLenSq > 1e-12) {
        const C = this.holeCenter;
        const t = THREE.MathUtils.clamp(
          ((C.x - pos.x) * segX + (C.y - pos.z) * segZ) / segLenSq,
          0,
          1
        );
        pos.x += segX * t;
        pos.z += segZ * t;
        pos.y = terrainY + this.ballRadius;
      }
      return;
    }
    if (this._checkWaterCollision()) {
      this.isInWater = true;
      this.mesh.visible = false;
      this._endShot();
      return;
    }
    this.currentSurface = terrain?.surface;
    this.currentHoleNumber = terrain?.holeNumber;
    const minY = terrainY + this.ballRadius * 2;
    if (newY <= minY && this.holeState !== "exiting") {
      const speed = vel.length();
      const impactVelAlongNormal = -vel.dot(normal);
      if (impactVelAlongNormal > 0.5) {
        const descentAngle = Math.abs(vel.y) / speed;
        const restitutionRaw = this.currentSurface?.restitution ?? 0.25;
        const descentRestitution = THREE.MathUtils.lerp(1, 0.8, descentAngle);
        const divot = this.currentSurface?.divot ?? 0;
        const craterLoss = 1 / (1 + divot * impactVelAlongNormal * descentAngle);
        const restitution = restitutionRaw * descentRestitution * craterLoss;
        const tangentRetention = THREE.MathUtils.lerp(0.92, 0.75, descentAngle) * THREE.MathUtils.lerp(1, craterLoss, 0.6);
        vel.reflect(normal);
        const normalComponent = this.#normalComponent.copy(vel).projectOnVector(normal);
        const tangentComponent = this.#tangentComponent.copy(vel).sub(normalComponent);
        vel.copy(tangentComponent.multiplyScalar(tangentRetention)).add(normalComponent.multiplyScalar(restitution));
        this._handleLanding();
        const spinMag = spin.length();
        if (spinMag > 1) {
          const contact = this.#normalClone.copy(normal).multiplyScalar(-this.ballRadius);
          const spinSurfaceVel = new THREE.Vector3().crossVectors(spin, contact);
          const rpm = spinMag * 9.549;
          const bite = THREE.MathUtils.smoothstep(rpm, 1500, 6500);
          const grip = THREE.MathUtils.lerp(1, this.currentSurface?.spinGrip ?? 1, bite);
          spinSurfaceVel.multiplyScalar(grip);
          const slip = tangentComponent.clone().add(spinSurfaceVel);
          slip.addScaledVector(normal, -slip.dot(normal));
          if (slip.dot(tangentComponent) < 0) {
            slip.set(0, 0, 0);
          }
          const slipSpeed = slip.length();
          if (slipSpeed > 0.05) {
            const mu = this.currentSurface?.friction ?? 0.4;
            const maxImpulse = mu * (1 + restitution) * impactVelAlongNormal;
            const gripImpulse = slipSpeed / 3.5;
            const impulse = Math.min(maxImpulse, gripImpulse);
            slip.divideScalar(slipSpeed);
            vel.addScaledVector(slip, -impulse);
            const f = Math.min(impulse / gripImpulse, THREE.MathUtils.lerp(0.6, 1, bite));
            const vtAfter = new THREE.Vector3().copy(vel).addScaledVector(normal, -vel.dot(normal));
            const rollSpin = new THREE.Vector3().crossVectors(normal, vtAfter).divideScalar(this.ballRadius);
            spin.lerp(rollSpin, f);
          }
        }
        pos.set(newX, terrainY + this.ballRadius, newZ);
      } else {
        this.isGrounded = true;
        vel.sub(this.#normalClone.copy(normal).multiplyScalar(vel.dot(normal)));
        let resistance = this.currentSurface?.rollResistance ?? CourseSurfaces.base.rollResistance;
        const horizontalSpeed = vel.length();
        const normalForce = normal.y;
        const useStimpLevel = this.currentSurface?.type === "green" /* Green */;
        let decel;
        if (useStimpLevel) {
          const stimpDecel = STIMP_RELEASE_SPEED * STIMP_RELEASE_SPEED / (2 * UnitConversions.feetToMeters(this.stimpLevel));
          decel = stimpDecel * (1 + SPEED_BRAKING_SCALE * (horizontalSpeed - STIMP_RELEASE_SPEED));
        } else {
          decel = resistance * GRAVITY;
        }
        const friction = Math.min(decel * normalForce * dt, horizontalSpeed);
        vel.addScaledVector(this.#normalClone.copy(vel).normalize(), -friction);
        if (!useStimpLevel) {
          const dampingFactor = Math.exp(-resistance * 8 * normalForce * dt);
          vel.multiplyScalar(dampingFactor);
        }
        if (vel.length() < 0.02) {
          vel.set(0, 0, 0);
        }
        if (spin.length() > 1 && horizontalSpeed > 0.1) {
          const contactPoint = this.#normalClone.copy(normal).multiplyScalar(-this.ballRadius);
          const slipVel = this.#slopeForce.crossVectors(spin, contactPoint).add(vel);
          slipVel.addScaledVector(normal, -slipVel.dot(normal));
          const slipLen = slipVel.length();
          if (slipLen > 0.02) {
            const mu = this.currentSurface?.friction ?? 0.4;
            const dv = Math.min(mu * GRAVITY * Math.max(normal.y, 0) * dt, slipLen / 3.5);
            slipVel.divideScalar(slipLen);
            vel.addScaledVector(slipVel, -dv);
            const f = dv / (slipLen / 3.5);
            const rollSpin = new THREE.Vector3().crossVectors(normal, vel).divideScalar(this.ballRadius);
            spin.lerp(rollSpin, f);
          }
        }
        pos.set(newX, terrainY + this.ballRadius, newZ);
        vel.y = 0;
      }
    } else {
      this.isGrounded = false;
      this.currentSurface = void 0;
      pos.set(newX, newY, newZ);
      if (this.holeState === "exiting") {
        this.holeState = "none";
      }
    }
    const checkY = this.getTerrainHeight(pos.x, pos.z);
    const safeY = checkY + this.ballRadius;
    if (pos.y < safeY - 5e-3) {
      console.warn("Ball fallen below ground");
      pos.y = safeY;
      if (vel.y < 0) vel.y = 0;
    }
  }
  getTerrainInfo(x, z) {
    if (!this.#mergedBVH) {
      return this.#lastTerrainInfo;
    }
    this.#terrainRay.origin.set(x, 1e3, z);
    this.#terrainRay.direction.set(0, -1, 0);
    let hit = this.#mergedBVH.raycastFirst(this.#terrainRay, THREE.DoubleSide);
    let surfaceKey2 = "base";
    let holeNumber;
    if (hit && hit.faceIndex != null && this.#mergedMesh.geometry.groups.length > 0) {
      const vertIndex = hit.faceIndex * 3;
      for (const group of this.#mergedMesh.geometry.groups) {
        if (vertIndex >= group.start && vertIndex < group.start + group.count) {
          surfaceKey2 = this.#surfaceKeys[group.materialIndex ?? 0];
          holeNumber = this.#surfaceHoleNumbers[group.materialIndex ?? 0];
          break;
        }
      }
    }
    let hitNormalWorld = hit?.face?.normal ?? null;
    for (const d of this.#dynamicSurfaces) {
      d.mesh.updateMatrixWorld();
      this.#invMat.copy(d.mesh.matrixWorld).invert();
      this.#localRay.copy(this.#terrainRay).applyMatrix4(this.#invMat);
      const dHit = d.bvh.raycastFirst(this.#localRay, THREE.DoubleSide);
      if (!dHit) continue;
      dHit.point.applyMatrix4(d.mesh.matrixWorld);
      if (!hit || dHit.point.y > hit.point.y) {
        hit = dHit;
        surfaceKey2 = d.surfaceKey;
        holeNumber = d.mesh.userData.holeNumber;
        hitNormalWorld = dHit.face ? dHit.face.normal.applyNormalMatrix(
          this.#normalMat.getNormalMatrix(d.mesh.matrixWorld)
        ).normalize() : null;
      }
    }
    if (!hit) {
      console.warn("[terrain] raycast MISS at", x.toFixed(1), z.toFixed(1));
      return this.#lastTerrainInfo;
    }
    const validSurfaceKey = isCourseSurfaceType(surfaceKey2) ? surfaceKey2 : "base" /* Base */;
    const surfaceSettings = CourseSurfaces[validSurfaceKey];
    const normal = hitNormalWorld ? this.#hitNormal.copy(hitNormalWorld) : this.#hitNormal.set(0, 1, 0);
    this.#lastTerrainInfo = {
      height: hit.point.y,
      restitution: surfaceSettings.restitution ?? 0.35,
      friction: surfaceSettings.friction ?? 0.6,
      surface: { type: validSurfaceKey, ...surfaceSettings },
      holeNumber,
      normal
    };
    return this.#lastTerrainInfo;
  }
  getTerrainHeight(x, z) {
    return this.getTerrainInfo(x, z).height;
  }
  _getTerrainNormal(x, z) {
    const eps = 0.1;
    const hL = this.getTerrainHeight(x - eps, z);
    const hR = this.getTerrainHeight(x + eps, z);
    const hD = this.getTerrainHeight(x, z - eps);
    const hU = this.getTerrainHeight(x, z + eps);
    return new THREE.Vector3(hL - hR, 2 * eps, hD - hU).normalize();
  }
  setPin(pin) {
    this.holeCenter.set(pin.x, pin.z);
    this.holeGroundY = pin.y;
    console.log(`Setting hole center to: ${pin.toArray().join(",")}`);
  }
  _checkHole(pos, newX, newZ, vel, terrainY) {
    const R = this.holeRadius;
    const r = this.ballRadius;
    const C = this.holeCenter;
    const detectionRadius = R * 3;
    const dx = newX - pos.x;
    const dz = newZ - pos.z;
    const segLenSq = dx * dx + dz * dz;
    if (segLenSq < 1e-12) return false;
    const fx = pos.x - C.x;
    const fz = pos.z - C.y;
    const tClosest = THREE.MathUtils.clamp(-(fx * dx + fz * dz) / segLenSq, 0, 1);
    const closestX = pos.x + dx * tClosest;
    const closestZ = pos.z + dz * tClosest;
    const closestDist = Math.hypot(closestX - C.x, closestZ - C.y);
    if (closestDist >= detectionRadius) return false;
    const vh = Math.hypot(vel.x, vel.z);
    if (closestDist >= R + r) {
      if (closestDist < R * 2 && vh < 3) {
        const pullFactor = 1 - closestDist / (R * 2);
        const toCenterX = C.x - newX;
        const toCenterZ = C.y - newZ;
        const toCenterDist = Math.hypot(toCenterX, toCenterZ);
        if (toCenterDist > 1e-3) {
          const gentlePull = pullFactor * 0.02;
          vel.x += toCenterX / toCenterDist * gentlePull;
          vel.z += toCenterZ / toCenterDist * gentlePull;
        }
      }
      return false;
    }
    const centrality = Math.max(0, 1 - closestDist / (R + r));
    const fallInSpeed = 1 + centrality * 2.5;
    if (vh < fallInSpeed) {
      this._enterCup(terrainY);
      return true;
    }
    const chord = 2 * Math.sqrt(Math.max(0, (R + r) * (R + r) - closestDist * closestDist));
    const crossingTime = chord / vh;
    const gravityDrop = 0.5 * GRAVITY * crossingTime * crossingTime;
    const dipFactor = Math.min(gravityDrop / r, 1);
    const a = segLenSq;
    const b2 = fx * dx + fz * dz;
    const c = fx * fx + fz * fz - (R + r) * (R + r);
    const discriminant = b2 * b2 - a * c;
    let exitX = newX, exitZ = newZ;
    if (discriminant >= 0 && a > 1e-12) {
      const tExit = (-b2 + Math.sqrt(discriminant)) / a;
      if (tExit >= 0 && tExit <= 1) {
        exitX = pos.x + dx * tExit;
        exitZ = pos.z + dz * tExit;
      }
    }
    const exitTerrain = this.getTerrainInfo(exitX, exitZ);
    pos.set(exitX, exitTerrain.height + this.ballRadius, exitZ);
    if (dipFactor < 0.05) {
      return false;
    }
    const speedRetain = 1 - dipFactor * centrality * 0.2;
    vel.x *= speedRetain;
    vel.z *= speedRetain;
    const exitSpeed = Math.hypot(vel.x, vel.z);
    const lipBounceFromSpeed = exitSpeed * 0.4 * dipFactor;
    const lipBounceFromDepth = centrality * 0.6 * dipFactor;
    const minimumLipBounce = 0.2 * dipFactor;
    const maximumLipBounce = 2;
    vel.y = Math.min(lipBounceFromSpeed + lipBounceFromDepth + minimumLipBounce, maximumLipBounce);
    const awayX = exitX - C.x;
    const awayZ = exitZ - C.y;
    const awayDist = Math.hypot(awayX, awayZ);
    if (awayDist > 1e-3) {
      const radialX = awayX / awayDist;
      const radialZ = awayZ / awayDist;
      let tangentX = -radialZ;
      let tangentZ = radialX;
      if (tangentX * vel.x + tangentZ * vel.z < 0) {
        tangentX = -tangentX;
        tangentZ = -tangentZ;
      }
      const offCenter = 1 - centrality;
      const rimCurveStrength = offCenter * offCenter * 1;
      const deflectAmount = dipFactor * rimCurveStrength;
      if (deflectAmount > 0.01) {
        vel.x += tangentX * vh * deflectAmount;
        vel.z += tangentZ * vh * deflectAmount;
      }
      const newSpeed = Math.hypot(vel.x, vel.z);
      if (newSpeed > 1e-3) {
        const targetSpeed = vh * speedRetain;
        vel.x *= targetSpeed / newSpeed;
        vel.z *= targetSpeed / newSpeed;
      }
    }
    this.holeState = "exiting";
    this.isGrounded = false;
    return true;
  }
  _enterCup(terrainY) {
    this.holeState = "falling";
    this.holeGroundY = terrainY;
    this.isGrounded = false;
  }
  /** Register a movable mesh (e.g. practice green) as a physics surface.
   *  BVH is built once in local space; current matrixWorld is applied per
   *  query, so the mesh can be repositioned/scaled at runtime freely. */
  addDynamicSurface(mesh, surfaceKey2) {
    this.#dynamicSurfaces.push({
      mesh,
      bvh: new MeshBVH(mesh.geometry),
      surfaceKey: surfaceKey2 ?? mesh.userData.surface ?? "base"
    });
  }
};

// dist/cup.js
var YARD_TO_METERS = 0.9144;
var CUP_RADIUS = 0.19;
var CUP_DEPTH = 0.22 / YARD_TO_METERS;

// dist/fuse-physics.js
var METERS = 0.9144;
var RADIUS = 0.021335;
var surfaceKey = { green: "green", fairway: "fairway", rough: "rough", bunker: "sand", water: "plane_lake", out: "base" };
var clubLaunches = [{ mph: 156, angle: 12, spin: 2500 }, { mph: 137, angle: 15, spin: 3600 }, { mph: 113, angle: 19, spin: 5200 }, { mph: 87, angle: 29, spin: 7600 }, { mph: 59, angle: 42, spin: 9200 }, { mph: 0, angle: 0, spin: 0 }];
var CourseBallPhysics = class extends BallPhysics {
  constructor(object, sample) {
    super(object, RADIUS, []);
    this.sample = sample;
    this.stimpLevel = 9.5;
    this.holeRadius = CUP_RADIUS * YARD_TO_METERS;
    this.cupDepth = 0.22;
  }
  _checkHole(pos, newX, newZ, velocity, terrainY) {
    if (pos.y > terrainY + this.ballRadius + 0.1) return false;
    const dx = newX - pos.x, dz = newZ - pos.z, lengthSq = dx * dx + dz * dz;
    const t = lengthSq > 1e-12 ? THREE2.MathUtils.clamp(((this.holeCenter.x - pos.x) * dx + (this.holeCenter.y - pos.z) * dz) / lengthSq, 0, 1) : 0;
    const distance = Math.hypot(pos.x + t * dx - this.holeCenter.x, pos.z + t * dz - this.holeCenter.y);
    if (distance <= this.holeRadius && Math.hypot(velocity.x, velocity.z) <= 6.5) {
      this._enterCup(terrainY);
      return true;
    }
    return super._checkHole(pos, newX, newZ, velocity, terrainY);
  }
  getTerrainInfo(x, z) {
    const s = this.sample(x / METERS, z / METERS), key = surfaceKey[s.lie] || "base";
    const surface = { ...CourseSurfaces[key], type: key };
    if (key === "rough") surface.rollResistance = 0.18;
    return { height: s.height * METERS, normal: s.normal || new THREE2.Vector3(0, 1, 0), surface, friction: surface.friction, restitution: surface.restitution };
  }
  getTerrainHeight(x, z) {
    return this.getTerrainInfo(x, z).height;
  }
};
var FuseShotEngine = class {
  constructor(sample) {
    this.sample = sample;
    this.object = new THREE2.Object3D();
    this.physics = new CourseBallPhysics(this.object, sample);
    this.result = null;
    this.started = new THREE2.Vector3();
    this.last = new THREE2.Vector3();
    this.landed = false;
    this.stats = { carry: 0, roll: 0, apex: 0, bounces: 0, total: 0 };
    this.bindEvents();
  }
  bindEvents() {
    this.physics.on("landed", () => {
      this.stats.bounces++;
      this.onLanding?.();
    });
    this.physics.on("shotEnded", (event) => {
      this.result = event;
    });
  }
  launch(position, pin, club, power, aim, shape = 0, puttDistance = 30) {
    this.physics.removeAllListeners();
    this.physics = new CourseBallPhysics(this.object, this.sample);
    this.bindEvents();
    const sample = this.sample(position.x, position.z);
    this.result = null;
    this.started.copy(position);
    this.started.y = sample.height;
    this.last.copy(this.started);
    this.stats = { carry: 0, roll: 0, apex: 0, bounces: 0, total: 0 };
    this.landed = club === 5;
    this.object.position.set(position.x * METERS, sample.height * METERS + RADIUS, position.z * METERS);
    this.object.quaternion.setFromAxisAngle(new THREE2.Vector3(0, 1, 0), Math.PI - aim);
    this.physics.reset(this.object.position.clone(), new THREE2.Vector3(pin.x * METERS, pin.y * METERS, pin.z * METERS));
    const preset = clubLaunches[club];
    const lieFactor = sample.lie === "rough" ? 0.87 : sample.lie === "bunker" ? club === 4 ? 0.87 : 0.57 : 1;
    const distance = puttDistance * power * METERS, baseDecel = 1.83 ** 2 / (2 * 9.5 * 0.3048);
    const A = 1 - 0.3 * 1.83, B = 0.3;
    let low = 0, high = 20;
    for (let i = 0; i < 35; i++) {
      const v = (low + high) / 2, d = (v / B - A / (B * B) * Math.log((A + B * v) / A)) / baseDecel;
      if (d < distance) low = v;
      else high = v;
    }
    const puttSpeed = (low + high) / 2;
    const shot = { ballSpeed: club === 5 ? puttSpeed / 0.44704 : preset.mph * Math.sqrt(Math.max(0.02, power)) * lieFactor, verticalLaunchAngle: preset.angle, horizontalLaunchAngle: 0, spinSpeed: club === 5 ? 0 : preset.spin * (0.65 + 0.35 * power), spinAxis: shape };
    this.physics.launchShot(shot, club === 5);
    this.shot = shot;
    return shot;
  }
  update(dt) {
    if (!this.physics.isShotActive) return;
    this.physics.update(dt);
    const p = this.position();
    this.stats.apex = Math.max(this.stats.apex, p.y - this.started.y);
    if (this.physics.isLanded && !this.landed) {
      this.landed = true;
      this.stats.carry = Math.hypot(p.x - this.started.x, p.z - this.started.z);
    }
    if (this.landed) this.stats.roll += Math.hypot(p.x - this.last.x, p.z - this.last.z);
    this.stats.total = Math.hypot(p.x - this.started.x, p.z - this.started.z);
    this.last.copy(p);
  }
  position() {
    return this.object.position.clone().multiplyScalar(1 / METERS);
  }
  get phase() {
    return this.physics.isLanded ? "ground" : "air";
  }
  get active() {
    return this.physics.isShotActive;
  }
  preview(position, pin, club, power, aim, shape = 0, puttDistance = 30) {
    this.launch(position, new THREE2.Vector3(9999, 0, 9999), club, power, aim, shape, puttDistance);
    const points = [];
    for (let i = 0; i < 7200 && this.active; i++) {
      this.update(1 / 120);
      if (i % 24 === 0) points.push(this.position());
    }
    return { points, stats: { ...this.stats }, end: this.position() };
  }
};

// dist/terrain.js
import * as THREE3 from "./vendor/three.module.js";
function elevation(x, z, h) {
  const teeFade = THREE3.MathUtils.smoothstep(-z, 5, 45);
  const base = (0.55 * Math.sin(-z * 0.024) + 0.3 * Math.sin(x * 0.032) * Math.sin(-z * 0.015)) * teeFade;
  const greenDist = Math.hypot(x - h.pinX, z + h.length), blend = 1 - THREE3.MathUtils.smoothstep(greenDist, 19, 30);
  const greenBase = 0.55 * Math.sin(h.length * 0.024) + 0.3 * Math.sin(h.pinX * 0.032) * Math.sin(h.length * 0.015);
  const green = greenBase + 4e-3 * (x - h.pinX) + 3e-3 * (z + h.length) + 0.06 * Math.sin((x - h.pinX) * 0.16);
  return THREE3.MathUtils.lerp(base, green, blend);
}
function surfaceAt(x, z, h) {
  if (x > 103 || Math.abs(x) > 150 || z > 40 || z < -h.length - 70) return "out";
  if (((x - h.pond.x) / h.pond.rx) ** 2 + ((z - h.pond.z) / h.pond.rz) ** 2 < 1) return "water";
  if (h.sand.some(([sx, sz, rx, rz]) => ((x - sx) / rx) ** 2 + ((z - sz) / rz) ** 2 < 1)) return "bunker";
  if (Math.hypot(x - h.pinX, z + h.length) < 24) return "green";
  const center = Math.sin(-z / h.length * Math.PI) * h.bend;
  return Math.abs(x - center) < 24 ? "fairway" : "rough";
}

// scripts/preview-worker.js
self.onmessage = ({ data }) => {
  try {
    const { id, h, ball, pin, club, power, aim, shape, puttDistance } = data;
    const sample = (x, z) => ({ lie: surfaceAt(x, z, h), height: elevation(x, z, h), normal: new THREE4.Vector3(elevation(x - 0.1, z, h) - elevation(x + 0.1, z, h), 0.2, elevation(x, z - 0.1, h) - elevation(x, z + 0.1, h)).normalize() });
    const engine = new FuseShotEngine(sample), prediction = engine.preview(new THREE4.Vector3(...ball), new THREE4.Vector3(...pin), club, power, aim, shape, puttDistance);
    self.postMessage({ id, points: prediction.points.map((p) => p.toArray()), end: prediction.end.toArray(), stats: prediction.stats, shot: engine.shot });
  } catch (e) {
    self.postMessage({ id: data.id, error: e.message });
  }
};
