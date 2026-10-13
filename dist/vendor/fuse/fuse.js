/*! OpenGolfSim Fuse — Required Notice: Copyright (c) 2026 OpenGolfSim LLC. For commercial licensing: help@opengolfsim.com. PolyForm Noncommercial 1.0.0; see LICENSE.md alongside this bundle. */
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

// upstream/fuse/src/physics/ballPhysics.ts
import * as THREE from "three";

// node_modules/three-mesh-bvh/src/core/BVH.js
import { Box3 as Box33 } from "three";

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
import { Box3 } from "three";

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
import { Box3 as Box32, Matrix4 } from "three";
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
import { Box3 as Box34 } from "three";

// node_modules/three-mesh-bvh/src/utils/BufferUtils.js
function isSharedArrayBufferSupported() {
  return typeof SharedArrayBuffer !== "undefined";
}

// node_modules/three-mesh-bvh/src/core/build/geometryUtils.js
import { BufferAttribute } from "three";
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
import { BufferAttribute as BufferAttribute2, FrontSide, Ray, Vector3 as Vector310, Matrix4 as Matrix47 } from "three";

// node_modules/three-mesh-bvh/src/math/OrientedBox.js
import { Vector3 as Vector34, Matrix4 as Matrix42, Line3 as Line33 } from "three";

// node_modules/three-mesh-bvh/src/math/SeparatingAxisBounds.js
import { Vector3 } from "three";
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
import { Triangle, Vector3 as Vector33, Vector2 as Vector22, Line3 as Line32, Plane as Plane2 } from "three";

// node_modules/three-mesh-bvh/src/math/MathUtilities.js
import { Vector3 as Vector32, Vector2, Plane, Line3 } from "three";
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
import { Vector3 as Vector35 } from "three";
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
import { Vector3 as Vector36, Vector2 as Vector23, Triangle as Triangle2, DoubleSide, BackSide, REVISION } from "three";
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
function checkBufferGeometryIntersection(ray, position, normal, uv4, uv1, a, b, c, side, near, far) {
  _vA.fromBufferAttribute(position, a);
  _vB.fromBufferAttribute(position, b);
  _vC.fromBufferAttribute(position, c);
  const intersection = checkIntersection(ray, _vA, _vB, _vC, _intersectionPoint, side, near, far);
  if (intersection) {
    if (uv4) {
      _uvA.fromBufferAttribute(uv4, a);
      _uvB.fromBufferAttribute(uv4, b);
      _uvC.fromBufferAttribute(uv4, c);
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
  const { position, normal, uv: uv4, uv1 } = geometry.attributes;
  if (Array.isArray(materialOrSide)) {
    const firstIndex = tri * 3;
    for (let i = 0, l = groups.length; i < l; i++) {
      const { start, count, materialIndex } = groups[i];
      if (firstIndex >= start && firstIndex < start + count) {
        const side = getSide(materialOrSide[materialIndex]);
        const intersection = checkBufferGeometryIntersection(ray, position, normal, uv4, uv1, a, b, c, side, near, far);
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
    const intersection = checkBufferGeometryIntersection(ray, position, normal, uv4, uv1, a, b, c, side, near, far);
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
import { Vector2 as Vector24, Vector3 as Vector37, Triangle as Triangle3 } from "three";
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
import { Box3 as Box35, Matrix4 as Matrix43 } from "three";
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
import { Matrix4 as Matrix44, Vector3 as Vector38 } from "three";
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
import { Box3 as Box36, Matrix4 as Matrix45 } from "three";
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
import { Matrix4 as Matrix46, Vector3 as Vector39 } from "three";
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
} from "three";
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
function toTrianglesDrawMode(geometry, drawMode) {
  if (drawMode === TrianglesDrawMode) {
    console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.");
    return geometry;
  }
  if (drawMode === TriangleFanDrawMode || drawMode === TriangleStripDrawMode) {
    let index = geometry.getIndex();
    if (index === null) {
      const indices = [];
      const position = geometry.getAttribute("position");
      if (position !== void 0) {
        for (let i = 0; i < position.count; i++) {
          indices.push(i);
        }
        geometry.setIndex(indices);
        index = geometry.getIndex();
      } else {
        console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.");
        return geometry;
      }
    }
    const numberOfTriangles = index.count - 2;
    const newIndices = [];
    if (drawMode === TriangleFanDrawMode) {
      for (let i = 1; i <= numberOfTriangles; i++) {
        newIndices.push(index.getX(0));
        newIndices.push(index.getX(i));
        newIndices.push(index.getX(i + 1));
      }
    } else {
      for (let i = 0; i < numberOfTriangles; i++) {
        if (i % 2 === 0) {
          newIndices.push(index.getX(i));
          newIndices.push(index.getX(i + 1));
          newIndices.push(index.getX(i + 2));
        } else {
          newIndices.push(index.getX(i + 2));
          newIndices.push(index.getX(i + 1));
          newIndices.push(index.getX(i));
        }
      }
    }
    if (newIndices.length / 3 !== numberOfTriangles) {
      console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    }
    const newGeometry = geometry.clone();
    newGeometry.setIndex(newIndices);
    newGeometry.clearGroups();
    return newGeometry;
  } else {
    console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", drawMode);
    return geometry;
  }
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
    let surfaceKey = "base";
    let holeNumber;
    if (hit && hit.faceIndex != null && this.#mergedMesh.geometry.groups.length > 0) {
      const vertIndex = hit.faceIndex * 3;
      for (const group of this.#mergedMesh.geometry.groups) {
        if (vertIndex >= group.start && vertIndex < group.start + group.count) {
          surfaceKey = this.#surfaceKeys[group.materialIndex ?? 0];
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
        surfaceKey = d.surfaceKey;
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
    const validSurfaceKey = isCourseSurfaceType(surfaceKey) ? surfaceKey : "base" /* Base */;
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
  addDynamicSurface(mesh, surfaceKey) {
    this.#dynamicSurfaces.push({
      mesh,
      bvh: new MeshBVH(mesh.geometry),
      surfaceKey: surfaceKey ?? mesh.userData.surface ?? "base"
    });
  }
};

// upstream/fuse/src/shaders/grassSurface.ts
import * as THREE2 from "three/webgpu";
import { MeshStandardNodeMaterial } from "three/webgpu";
import {
  texture as tslTexture,
  vec2,
  vec3,
  float,
  mix,
  smoothstep,
  sin,
  positionWorld,
  cameraPosition,
  uniform,
  normalMap,
  uv,
  mx_fractal_noise_float,
  normalWorldGeometry,
  tanh
} from "three/tsl";
var GrassSurface = class extends MeshStandardNodeMaterial {
  constructor(baseMat, options = {}) {
    super();
    const baseTexture = baseMat.map;
    if (!baseTexture) {
      throw new Error("GrassSurface requires a base texture map");
    }
    this.roughness = baseMat.roughness ?? 0.9;
    this.metalness = baseMat.metalness ?? 0;
    if (baseMat.map) this.map = baseMat.map;
    if (baseMat.color) this.color = baseMat.color.clone();
    if (baseMat.roughnessMap) this.roughnessMap = baseMat.roughnessMap;
    if (baseMat.metalnessMap) this.metalnessMap = baseMat.metalnessMap;
    if (baseMat.emissive) this.emissive = baseMat.emissive.clone();
    if (baseMat.emissiveMap) this.emissiveMap = baseMat.emissiveMap;
    this.emissiveIntensity = baseMat.emissiveIntensity ?? 1;
    if (baseMat.aoMap) this.aoMap = baseMat.aoMap;
    this.aoMapIntensity = baseMat.aoMapIntensity ?? 1;
    this.envMapIntensity = baseMat.envMapIntensity ?? 1;
    if (baseMat.lightMap) this.lightMap = baseMat.lightMap;
    this.lightMapIntensity = baseMat.lightMapIntensity ?? 1;
    this.side = baseMat.side;
    this.toneMapped = baseMat.toneMapped;
    this.fadeStart = uniform(options.fadeStart ?? 50);
    this.fadeEnd = uniform(options.fadeEnd ?? 150);
    const tint = baseMat.color || new THREE2.Color(1, 1, 1);
    const texColor = tslTexture(baseTexture, uv()).rgb.mul(vec3(tint.r, tint.g, tint.b));
    const flatColor = options.flatColor ? vec3(...options.flatColor.clone().multiply(tint).toArray()) : tslTexture(baseTexture, uv()).level(float(12)).rgb.mul(vec3(tint.r, tint.g, tint.b));
    const camDist = positionWorld.sub(cameraPosition).length();
    const fade = smoothstep(this.fadeStart, this.fadeEnd, camDist);
    let color = mix(
      texColor,
      flatColor,
      fade
    );
    if (options.distantDetail) {
      const dScale = options.distantDetail.scale ?? 0.5;
      const dStrength = uniform(options.distantDetail.strength ?? 0.08);
      const raw = tslTexture(
        options.distantDetail.noiseTexture,
        positionWorld.xz.div(dScale)
      ).r;
      const rampStart = uniform(options.distantDetail.rampStart ?? options.fadeStart ?? 50);
      const rampEnd = uniform(options.distantDetail.rampEnd ?? options.fadeEnd ?? 150);
      const nearAmount = options.distantDetail.nearAmount ?? 0.2;
      const dRamp = mix(
        float(nearAmount),
        float(1),
        smoothstep(rampStart, rampEnd, camDist)
      );
      const dShade = float(1).sub(raw.mul(dStrength).mul(dRamp));
      color = color.mul(dShade);
    }
    if (options.discolor) {
      const d = options.discolor;
      const scale = d.patchScale ?? 40;
      const dry = new THREE2.Color(d.dryColor ?? "#4d4d14");
      const strength = uniform(d.strength ?? 0.35);
      const threshold = d.coverage ?? 0.55;
      const wp = vec3(positionWorld.x.div(scale), positionWorld.z.div(scale), 0);
      const n = mx_fractal_noise_float(wp, 3).mul(0.5).add(0.5);
      const base = smoothstep(float(threshold - 0.15), float(threshold + 0.35), n);
      const detail = mx_fractal_noise_float(wp.mul(6), 2).mul(0.5).add(0.5);
      const patch = base.mul(detail.mul(0.6).add(0.4));
      const cast = vec3(dry.r, dry.g, dry.b).mul(patch.mul(strength));
      color = color.add(cast);
    }
    if (options.mowLines) {
      const rad = (options.mowLines.direction ?? 0) * Math.PI / 180;
      const axis = vec2(Math.cos(rad), Math.sin(rad));
      const width = options.mowLines.width ?? 4;
      const strength = uniform(options.mowLines.strength ?? 0.08);
      const wobble = options.mowLines.wobble ?? 0.3;
      const fadeVar = options.mowLines.fadeVariation ?? 0.4;
      const wp3 = vec3(positionWorld.x, positionWorld.z, 0);
      const bend = mx_fractal_noise_float(wp3.div(width * 4), 2).mul(wobble);
      const t = positionWorld.xz.dot(axis).add(bend).div(width);
      const wave = sin(t.mul(Math.PI));
      const stripe = smoothstep(float(-0.3), float(0.3), wave);
      const fadeNoise = mx_fractal_noise_float(wp3.div(width * 10), 2).mul(0.5).add(0.5);
      const localStrength = strength.mul(
        float(1).sub(fadeNoise.mul(fadeVar))
      );
      const shade = mix(
        float(1).sub(localStrength),
        float(1).add(localStrength),
        stripe
      );
      color = color.mul(shade);
    }
    if (options.shading) {
      const s = options.shading;
      const el = s.elevation * Math.PI / 180;
      const az = s.azimuth * Math.PI / 180;
      const sunDir = vec3(
        Math.cos(el) * Math.sin(az),
        Math.sin(el),
        Math.cos(el) * Math.cos(az)
      );
      const ndl = normalWorldGeometry.dot(sunDir).clamp(0, 1);
      const flatNdl = Math.sin(el);
      const contrast = uniform(s.contrast ?? 8);
      const maxSwing = 0.3;
      const hillshade = tanh(ndl.sub(flatNdl).mul(contrast)).mul(maxSwing).add(1);
      const steep = float(1).sub(normalWorldGeometry.y.clamp(0, 1));
      const slopeShade = float(1).sub(
        tanh(steep.mul(8)).mul(uniform(s.slopeTint ?? 0.1))
      );
      color = color.mul(hillshade).mul(slopeShade);
    }
    this.surfaceColor = vec3(color);
    this.colorNode = this.surfaceColor;
    if (baseMat.normalMap) {
      this.normalMap = baseMat.normalMap;
      const scale = baseMat.normalScale || new THREE2.Vector2(1, 1);
      const fadedScale = vec2(scale.x, scale.y).mul(float(1).sub(fade));
      this.normalNode = normalMap(tslTexture(baseMat.normalMap, uv()), fadedScale);
    }
  }
};

// upstream/fuse/src/shaders/grassBlades.ts
import * as THREE4 from "three/webgpu";
import { MeshStandardNodeMaterial as MeshStandardNodeMaterial3 } from "three/webgpu";
import {
  vec2 as vec22,
  vec3 as vec33,
  vec4 as vec42,
  float as float3,
  uv as uv2,
  texture,
  uniform as tslUniform2,
  positionWorld as positionWorld3,
  cameraPosition as cameraPosition2,
  modelWorldMatrix,
  normalize,
  dot,
  mix as mix2,
  smoothstep as tslSmoothstep
} from "three/tsl";

// upstream/fuse/src/shaders/lightmap.ts
import * as THREE3 from "three/webgpu";
import { MeshStandardNodeMaterial as MeshStandardNodeMaterial2 } from "three/webgpu";
import {
  texture as tslTexture2,
  vec3 as vec32,
  vec4,
  float as float2,
  mix as tslMix,
  positionWorld as positionWorld2
} from "three/tsl";
function lightmapShadowNode(lightmap, worldSize = 1e3, strength = 0.85) {
  const uvNode = positionWorld2.xz.div(float2(worldSize));
  const texNode = tslTexture2(lightmap, uvNode);
  const node = tslMix(float2(1), texNode.r, float2(strength));
  return { node, texNode };
}

// node_modules/three/examples/jsm/loaders/GLTFLoader.js
import {
  AnimationClip as AnimationClip2,
  Bone,
  Box3 as Box37,
  BufferAttribute as BufferAttribute4,
  BufferGeometry as BufferGeometry2,
  ClampToEdgeWrapping as ClampToEdgeWrapping2,
  Color as Color3,
  ColorManagement,
  DirectionalLight,
  DoubleSide as DoubleSide3,
  FileLoader,
  FrontSide as FrontSide2,
  Group,
  ImageBitmapLoader,
  InstancedMesh,
  InterleavedBuffer as InterleavedBuffer2,
  InterleavedBufferAttribute as InterleavedBufferAttribute2,
  Interpolant,
  InterpolateDiscrete,
  InterpolateLinear,
  Line,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  LinearFilter,
  LinearMipmapLinearFilter,
  LinearMipmapNearestFilter,
  LinearSRGBColorSpace,
  Loader,
  LoaderUtils,
  Material,
  MathUtils as MathUtils2,
  Matrix4 as Matrix410,
  Mesh as Mesh2,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial as MeshStandardMaterial2,
  MirroredRepeatWrapping,
  NearestFilter,
  NearestMipmapLinearFilter,
  NearestMipmapNearestFilter,
  NumberKeyframeTrack,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  PropertyBinding,
  Quaternion as Quaternion3,
  QuaternionKeyframeTrack as QuaternionKeyframeTrack2,
  RepeatWrapping,
  Skeleton,
  SkinnedMesh,
  Sphere,
  SpotLight,
  Texture,
  TextureLoader,
  TriangleFanDrawMode as TriangleFanDrawMode2,
  TriangleStripDrawMode as TriangleStripDrawMode2,
  Vector2 as Vector28,
  Vector3 as Vector314,
  VectorKeyframeTrack as VectorKeyframeTrack2,
  SRGBColorSpace,
  InstancedBufferAttribute as InstancedBufferAttribute2
} from "three";

// node_modules/three/examples/jsm/utils/SkeletonUtils.js
import {
  AnimationClip,
  AnimationMixer,
  Matrix4 as Matrix49,
  Quaternion as Quaternion2,
  QuaternionKeyframeTrack,
  SkeletonHelper,
  Vector3 as Vector313,
  VectorKeyframeTrack
} from "three";
function clone(source) {
  const sourceLookup = /* @__PURE__ */ new Map();
  const cloneLookup = /* @__PURE__ */ new Map();
  const clone2 = source.clone();
  parallelTraverse(source, clone2, function(sourceNode, clonedNode) {
    sourceLookup.set(clonedNode, sourceNode);
    cloneLookup.set(sourceNode, clonedNode);
  });
  clone2.traverse(function(node) {
    if (!node.isSkinnedMesh) return;
    const clonedMesh = node;
    const sourceMesh = sourceLookup.get(node);
    const sourceBones = sourceMesh.skeleton.bones;
    clonedMesh.skeleton = sourceMesh.skeleton.clone();
    clonedMesh.bindMatrix.copy(sourceMesh.bindMatrix);
    clonedMesh.skeleton.bones = sourceBones.map(function(bone) {
      return cloneLookup.get(bone);
    });
    clonedMesh.bind(clonedMesh.skeleton, clonedMesh.bindMatrix);
  });
  return clone2;
}
function parallelTraverse(a, b, callback) {
  callback(a, b);
  for (let i = 0; i < a.children.length; i++) {
    parallelTraverse(a.children[i], b.children[i], callback);
  }
}

// node_modules/three/examples/jsm/loaders/GLTFLoader.js
var GLTFLoader = class extends Loader {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
    this.dracoLoader = null;
    this.ktx2Loader = null;
    this.meshoptDecoder = null;
    this.pluginCallbacks = [];
    this.register(function(parser) {
      return new GLTFMaterialsClearcoatExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsDispersionExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureBasisUExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureWebPExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureAVIFExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsSheenExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsTransmissionExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsVolumeExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsIorExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsEmissiveStrengthExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsSpecularExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsIridescenceExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsAnisotropyExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsBumpExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFLightsExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMeshoptCompression(parser, EXTENSIONS.EXT_MESHOPT_COMPRESSION);
    });
    this.register(function(parser) {
      return new GLTFMeshoptCompression(parser, EXTENSIONS.KHR_MESHOPT_COMPRESSION);
    });
    this.register(function(parser) {
      return new GLTFMeshGpuInstancing(parser);
    });
  }
  /**
   * Starts loading from the given URL and passes the loaded glTF asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    let resourcePath;
    if (this.resourcePath !== "") {
      resourcePath = this.resourcePath;
    } else if (this.path !== "") {
      const relativeUrl = LoaderUtils.extractUrlBase(url);
      resourcePath = LoaderUtils.resolveURL(relativeUrl, this.path);
    } else {
      resourcePath = LoaderUtils.extractUrlBase(url);
    }
    this.manager.itemStart(url);
    const _onError = function(e) {
      if (onError) {
        onError(e);
      } else {
        console.error(e);
      }
      scope.manager.itemError(url);
      scope.manager.itemEnd(url);
    };
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(data) {
      try {
        scope.parse(data, resourcePath, function(gltf) {
          onLoad(gltf);
          scope.manager.itemEnd(url);
        }, _onError);
      } catch (e) {
        _onError(e);
      }
    }, onProgress, _onError);
  }
  /**
   * Sets the given Draco loader to this loader. Required for decoding assets
   * compressed with the `KHR_draco_mesh_compression` extension.
   *
   * @param {DRACOLoader} dracoLoader - The Draco loader to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setDRACOLoader(dracoLoader) {
    this.dracoLoader = dracoLoader;
    return this;
  }
  /**
   * Sets the given KTX2 loader to this loader. Required for loading KTX2
   * compressed textures.
   *
   * @param {KTX2Loader} ktx2Loader - The KTX2 loader to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setKTX2Loader(ktx2Loader) {
    this.ktx2Loader = ktx2Loader;
    return this;
  }
  /**
   * Sets the given meshopt decoder. Required for decoding assets
   * compressed with the `EXT_meshopt_compression` extension.
   *
   * @param {Object} meshoptDecoder - The meshopt decoder to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setMeshoptDecoder(meshoptDecoder) {
    this.meshoptDecoder = meshoptDecoder;
    return this;
  }
  /**
   * Registers a plugin callback. This API is internally used to implement the various
   * glTF extensions but can also used by third-party code to add additional logic
   * to the loader.
   *
   * @param {function(parser:GLTFParser)} callback - The callback function to register.
   * @return {GLTFLoader} A reference to this loader.
   */
  register(callback) {
    if (this.pluginCallbacks.indexOf(callback) === -1) {
      this.pluginCallbacks.push(callback);
    }
    return this;
  }
  /**
   * Unregisters a plugin callback.
   *
   * @param {Function} callback - The callback function to unregister.
   * @return {GLTFLoader} A reference to this loader.
   */
  unregister(callback) {
    if (this.pluginCallbacks.indexOf(callback) !== -1) {
      this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(callback), 1);
    }
    return this;
  }
  /**
   * Parses the given glTF data and returns the resulting group.
   *
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(data, path, onLoad, onError) {
    let json;
    const extensions = {};
    const plugins = {};
    const textDecoder = new TextDecoder();
    if (typeof data === "string") {
      json = JSON.parse(data);
    } else if (data instanceof ArrayBuffer) {
      const magic = textDecoder.decode(new Uint8Array(data, 0, 4));
      if (magic === BINARY_EXTENSION_HEADER_MAGIC) {
        try {
          extensions[EXTENSIONS.KHR_BINARY_GLTF] = new GLTFBinaryExtension(data);
        } catch (error) {
          if (onError) onError(error);
          return;
        }
        json = JSON.parse(extensions[EXTENSIONS.KHR_BINARY_GLTF].content);
      } else {
        json = JSON.parse(textDecoder.decode(data));
      }
    } else {
      json = data;
    }
    if (json.asset === void 0 || json.asset.version[0] < 2) {
      if (onError) onError(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const parser = new GLTFParser(json, {
      path: path || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    parser.fileLoader.setRequestHeader(this.requestHeader);
    for (let i = 0; i < this.pluginCallbacks.length; i++) {
      const plugin = this.pluginCallbacks[i](parser);
      if (!plugin.name) console.error("THREE.GLTFLoader: Invalid plugin found: missing name");
      plugins[plugin.name] = plugin;
      extensions[plugin.name] = true;
    }
    if (json.extensionsUsed) {
      for (let i = 0; i < json.extensionsUsed.length; ++i) {
        const extensionName = json.extensionsUsed[i];
        const extensionsRequired = json.extensionsRequired || [];
        switch (extensionName) {
          case EXTENSIONS.KHR_MATERIALS_UNLIT:
            extensions[extensionName] = new GLTFMaterialsUnlitExtension();
            break;
          case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
            extensions[extensionName] = new GLTFDracoMeshCompressionExtension(json, this.dracoLoader);
            break;
          case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
            extensions[extensionName] = new GLTFTextureTransformExtension();
            break;
          case EXTENSIONS.KHR_MESH_QUANTIZATION:
            extensions[extensionName] = new GLTFMeshQuantizationExtension();
            break;
          default:
            if (extensionsRequired.indexOf(extensionName) >= 0 && plugins[extensionName] === void 0) {
              console.warn('THREE.GLTFLoader: Unknown extension "' + extensionName + '".');
            }
        }
      }
    }
    parser.setExtensions(extensions);
    parser.setPlugins(plugins);
    parser.parse(onLoad, onError);
  }
  /**
   * Async version of {@link GLTFLoader#parse}.
   *
   * @async
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @return {Promise<GLTFLoader~LoadObject>} A Promise that resolves with the loaded glTF when the parsing has been finished.
   */
  parseAsync(data, path) {
    const scope = this;
    return new Promise(function(resolve, reject) {
      scope.parse(data, path, resolve, reject);
    });
  }
};
function GLTFRegistry() {
  let objects = {};
  return {
    get: function(key) {
      return objects[key];
    },
    add: function(key, object) {
      objects[key] = object;
    },
    remove: function(key) {
      delete objects[key];
    },
    removeAll: function() {
      objects = {};
    }
  };
}
function getMaterialExtension(parser, materialIndex, extensionName) {
  const materialDef = parser.json.materials[materialIndex];
  if (materialDef.extensions && materialDef.extensions[extensionName]) {
    return materialDef.extensions[extensionName];
  }
  return null;
}
var EXTENSIONS = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  KHR_MESHOPT_COMPRESSION: "KHR_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
var GLTFLightsExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;
    this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const parser = this.parser;
    const nodeDefs = this.parser.json.nodes || [];
    for (let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      const nodeDef = nodeDefs[nodeIndex];
      if (nodeDef.extensions && nodeDef.extensions[this.name] && nodeDef.extensions[this.name].light !== void 0) {
        parser._addNodeRef(this.cache, nodeDef.extensions[this.name].light);
      }
    }
  }
  _loadLight(lightIndex) {
    const parser = this.parser;
    const cacheKey = "light:" + lightIndex;
    let dependency = parser.cache.get(cacheKey);
    if (dependency) return dependency;
    const json = parser.json;
    const extensions = json.extensions && json.extensions[this.name] || {};
    const lightDefs = extensions.lights || [];
    const lightDef = lightDefs[lightIndex];
    let lightNode;
    const color = new Color3(16777215);
    if (lightDef.color !== void 0) color.setRGB(lightDef.color[0], lightDef.color[1], lightDef.color[2], LinearSRGBColorSpace);
    const range = lightDef.range !== void 0 ? lightDef.range : 0;
    switch (lightDef.type) {
      case "directional":
        lightNode = new DirectionalLight(color);
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;
      case "point":
        lightNode = new PointLight(color);
        lightNode.distance = range;
        break;
      case "spot":
        lightNode = new SpotLight(color);
        lightNode.distance = range;
        lightDef.spot = lightDef.spot || {};
        lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== void 0 ? lightDef.spot.innerConeAngle : 0;
        lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== void 0 ? lightDef.spot.outerConeAngle : Math.PI / 4;
        lightNode.angle = lightDef.spot.outerConeAngle;
        lightNode.penumbra = 1 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + lightDef.type);
    }
    lightNode.position.set(0, 0, 0);
    assignExtrasToUserData(lightNode, lightDef);
    if (lightDef.intensity !== void 0) lightNode.intensity = lightDef.intensity;
    lightNode.name = parser.createUniqueName(lightDef.name || "light_" + lightIndex);
    dependency = Promise.resolve(lightNode);
    parser.cache.add(cacheKey, dependency);
    return dependency;
  }
  getDependency(type, index) {
    if (type !== "light") return;
    return this._loadLight(index);
  }
  createNodeAttachment(nodeIndex) {
    const self2 = this;
    const parser = this.parser;
    const json = parser.json;
    const nodeDef = json.nodes[nodeIndex];
    const lightDef = nodeDef.extensions && nodeDef.extensions[this.name] || {};
    const lightIndex = lightDef.light;
    if (lightIndex === void 0) return null;
    return this._loadLight(lightIndex).then(function(light) {
      return parser._getNodeRef(self2.cache, lightIndex, light);
    });
  }
};
var GLTFMaterialsUnlitExtension = class {
  constructor() {
    this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return MeshBasicMaterial;
  }
  extendParams(materialParams, materialDef, parser) {
    const pending = [];
    materialParams.color = new Color3(1, 1, 1);
    materialParams.opacity = 1;
    const metallicRoughness = materialDef.pbrMetallicRoughness;
    if (metallicRoughness) {
      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        const array = metallicRoughness.baseColorFactor;
        materialParams.color.setRGB(array[0], array[1], array[2], LinearSRGBColorSpace);
        materialParams.opacity = array[3];
      }
      if (metallicRoughness.baseColorTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, SRGBColorSpace));
      }
    }
    return Promise.all(pending);
  }
};
var GLTFMaterialsEmissiveStrengthExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    if (extension.emissiveStrength !== void 0) {
      materialParams.emissiveIntensity = extension.emissiveStrength;
    }
    return Promise.resolve();
  }
};
var GLTFMaterialsClearcoatExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(materialIndex) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    return extension !== null ? MeshPhysicalMaterial : null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    const pending = [];
    if (extension.clearcoatFactor !== void 0) {
      materialParams.clearcoat = extension.clearcoatFactor;
    }
    if (extension.clearcoatTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "clearcoatMap", extension.clearcoatTexture));
    }
    if (extension.clearcoatRoughnessFactor !== void 0) {
      materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;
    }
    if (extension.clearcoatRoughnessTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "clearcoatRoughnessMap", extension.clearcoatRoughnessTexture));
    }
    if (extension.clearcoatNormalTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "clearcoatNormalMap", extension.clearcoatNormalTexture));
      if (extension.clearcoatNormalTexture.scale !== void 0) {
        const scale = extension.clearcoatNormalTexture.scale;
        materialParams.clearcoatNormalScale = new Vector28(scale, scale);
      }
    }
    return Promise.all(pending);
  }
};
var GLTFMaterialsDispersionExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(materialIndex) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    return extension !== null ? MeshPhysicalMaterial : null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    materialParams.dispersion = extension.dispersion !== void 0 ? extension.dispersion : 0;
    return Promise.resolve();
  }
};
var GLTFMaterialsIridescenceExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(materialIndex) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    return extension !== null ? MeshPhysicalMaterial : null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    const pending = [];
    if (extension.iridescenceFactor !== void 0) {
      materialParams.iridescence = extension.iridescenceFactor;
    }
    if (extension.iridescenceTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "iridescenceMap", extension.iridescenceTexture));
    }
    if (extension.iridescenceIor !== void 0) {
      materialParams.iridescenceIOR = extension.iridescenceIor;
    }
    if (materialParams.iridescenceThicknessRange === void 0) {
      materialParams.iridescenceThicknessRange = [100, 400];
    }
    if (extension.iridescenceThicknessMinimum !== void 0) {
      materialParams.iridescenceThicknessRange[0] = extension.iridescenceThicknessMinimum;
    }
    if (extension.iridescenceThicknessMaximum !== void 0) {
      materialParams.iridescenceThicknessRange[1] = extension.iridescenceThicknessMaximum;
    }
    if (extension.iridescenceThicknessTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "iridescenceThicknessMap", extension.iridescenceThicknessTexture));
    }
    return Promise.all(pending);
  }
};
var GLTFMaterialsSheenExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(materialIndex) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    return extension !== null ? MeshPhysicalMaterial : null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    const pending = [];
    materialParams.sheenColor = new Color3(0, 0, 0);
    materialParams.sheenRoughness = 0;
    materialParams.sheen = 1;
    if (extension.sheenColorFactor !== void 0) {
      const colorFactor = extension.sheenColorFactor;
      materialParams.sheenColor.setRGB(colorFactor[0], colorFactor[1], colorFactor[2], LinearSRGBColorSpace);
    }
    if (extension.sheenRoughnessFactor !== void 0) {
      materialParams.sheenRoughness = extension.sheenRoughnessFactor;
    }
    if (extension.sheenColorTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "sheenColorMap", extension.sheenColorTexture, SRGBColorSpace));
    }
    if (extension.sheenRoughnessTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "sheenRoughnessMap", extension.sheenRoughnessTexture));
    }
    return Promise.all(pending);
  }
};
var GLTFMaterialsTransmissionExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(materialIndex) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    return extension !== null ? MeshPhysicalMaterial : null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    const pending = [];
    if (extension.transmissionFactor !== void 0) {
      materialParams.transmission = extension.transmissionFactor;
    }
    if (extension.transmissionTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "transmissionMap", extension.transmissionTexture));
    }
    return Promise.all(pending);
  }
};
var GLTFMaterialsVolumeExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(materialIndex) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    return extension !== null ? MeshPhysicalMaterial : null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    const pending = [];
    materialParams.thickness = extension.thicknessFactor !== void 0 ? extension.thicknessFactor : 0;
    if (extension.thicknessTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "thicknessMap", extension.thicknessTexture));
    }
    materialParams.attenuationDistance = extension.attenuationDistance || Infinity;
    const colorArray = extension.attenuationColor || [1, 1, 1];
    materialParams.attenuationColor = new Color3().setRGB(colorArray[0], colorArray[1], colorArray[2], LinearSRGBColorSpace);
    return Promise.all(pending);
  }
};
var GLTFMaterialsIorExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_IOR;
  }
  getMaterialType(materialIndex) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    return extension !== null ? MeshPhysicalMaterial : null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    materialParams.ior = extension.ior !== void 0 ? extension.ior : 1.5;
    if (materialParams.ior === 0) materialParams.ior = 1e3;
    return Promise.resolve();
  }
};
var GLTFMaterialsSpecularExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(materialIndex) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    return extension !== null ? MeshPhysicalMaterial : null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    const pending = [];
    materialParams.specularIntensity = extension.specularFactor !== void 0 ? extension.specularFactor : 1;
    if (extension.specularTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "specularIntensityMap", extension.specularTexture));
    }
    const colorArray = extension.specularColorFactor || [1, 1, 1];
    materialParams.specularColor = new Color3().setRGB(colorArray[0], colorArray[1], colorArray[2], LinearSRGBColorSpace);
    if (extension.specularColorTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "specularColorMap", extension.specularColorTexture, SRGBColorSpace));
    }
    return Promise.all(pending);
  }
};
var GLTFMaterialsBumpExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_MATERIALS_BUMP;
  }
  getMaterialType(materialIndex) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    return extension !== null ? MeshPhysicalMaterial : null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    const pending = [];
    materialParams.bumpScale = extension.bumpFactor !== void 0 ? extension.bumpFactor : 1;
    if (extension.bumpTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "bumpMap", extension.bumpTexture));
    }
    return Promise.all(pending);
  }
};
var GLTFMaterialsAnisotropyExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(materialIndex) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    return extension !== null ? MeshPhysicalMaterial : null;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const extension = getMaterialExtension(this.parser, materialIndex, this.name);
    if (extension === null) return Promise.resolve();
    const pending = [];
    if (extension.anisotropyStrength !== void 0) {
      materialParams.anisotropy = extension.anisotropyStrength;
    }
    if (extension.anisotropyRotation !== void 0) {
      materialParams.anisotropyRotation = extension.anisotropyRotation;
    }
    if (extension.anisotropyTexture !== void 0) {
      pending.push(this.parser.assignTexture(materialParams, "anisotropyMap", extension.anisotropyTexture));
    }
    return Promise.all(pending);
  }
};
var GLTFTextureBasisUExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_TEXTURE_BASISU;
  }
  loadTexture(textureIndex) {
    const parser = this.parser;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[this.name]) {
      return null;
    }
    const extension = textureDef.extensions[this.name];
    const loader = parser.options.ktx2Loader;
    if (!loader) {
      if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      } else {
        return null;
      }
    }
    return parser.loadTextureImage(textureIndex, extension.source, loader);
  }
};
var GLTFTextureWebPExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_TEXTURE_WEBP;
  }
  loadTexture(textureIndex) {
    const name = this.name;
    const parser = this.parser;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[name]) {
      return null;
    }
    const extension = textureDef.extensions[name];
    const source = json.images[extension.source];
    let loader = parser.textureLoader;
    if (source.uri) {
      const handler = parser.options.manager.getHandler(source.uri);
      if (handler !== null) loader = handler;
    }
    return parser.loadTextureImage(textureIndex, extension.source, loader);
  }
};
var GLTFTextureAVIFExtension = class {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_TEXTURE_AVIF;
  }
  loadTexture(textureIndex) {
    const name = this.name;
    const parser = this.parser;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[name]) {
      return null;
    }
    const extension = textureDef.extensions[name];
    const source = json.images[extension.source];
    let loader = parser.textureLoader;
    if (source.uri) {
      const handler = parser.options.manager.getHandler(source.uri);
      if (handler !== null) loader = handler;
    }
    return parser.loadTextureImage(textureIndex, extension.source, loader);
  }
};
var GLTFMeshoptCompression = class {
  constructor(parser, name) {
    this.name = name;
    this.parser = parser;
  }
  loadBufferView(index) {
    const json = this.parser.json;
    const bufferView = json.bufferViews[index];
    if (bufferView.extensions && bufferView.extensions[this.name]) {
      const extensionDef = bufferView.extensions[this.name];
      const buffer = this.parser.getDependency("buffer", extensionDef.buffer);
      const decoder = this.parser.options.meshoptDecoder;
      if (!decoder || !decoder.supported) {
        if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        } else {
          return null;
        }
      }
      return buffer.then(function(res) {
        const byteOffset = extensionDef.byteOffset || 0;
        const byteLength = extensionDef.byteLength || 0;
        const count = extensionDef.count;
        const stride = extensionDef.byteStride;
        const source = new Uint8Array(res, byteOffset, byteLength);
        if (decoder.decodeGltfBufferAsync) {
          return decoder.decodeGltfBufferAsync(count, stride, source, extensionDef.mode, extensionDef.filter).then(function(res2) {
            return res2.buffer;
          });
        } else {
          return decoder.ready.then(function() {
            const result = new ArrayBuffer(count * stride);
            decoder.decodeGltfBuffer(new Uint8Array(result), count, stride, source, extensionDef.mode, extensionDef.filter);
            return result;
          });
        }
      });
    } else {
      return null;
    }
  }
};
var GLTFMeshGpuInstancing = class {
  constructor(parser) {
    this.name = EXTENSIONS.EXT_MESH_GPU_INSTANCING;
    this.parser = parser;
  }
  createNodeMesh(nodeIndex) {
    const json = this.parser.json;
    const nodeDef = json.nodes[nodeIndex];
    if (!nodeDef.extensions || !nodeDef.extensions[this.name] || nodeDef.mesh === void 0) {
      return null;
    }
    const meshDef = json.meshes[nodeDef.mesh];
    for (const primitive of meshDef.primitives) {
      if (primitive.mode !== WEBGL_CONSTANTS.TRIANGLES && primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_STRIP && primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_FAN && primitive.mode !== void 0) {
        return null;
      }
    }
    const extensionDef = nodeDef.extensions[this.name];
    const attributesDef = extensionDef.attributes;
    const pending = [];
    const attributes = {};
    for (const key in attributesDef) {
      pending.push(this.parser.getDependency("accessor", attributesDef[key]).then((accessor) => {
        attributes[key] = accessor;
        return attributes[key];
      }));
    }
    if (pending.length < 1) {
      return null;
    }
    pending.push(this.parser.createNodeMesh(nodeIndex));
    return Promise.all(pending).then((results) => {
      const nodeObject = results.pop();
      const meshes = nodeObject.isGroup ? nodeObject.children : [nodeObject];
      const count = results[0].count;
      const instancedMeshes = [];
      for (const mesh of meshes) {
        const m = new Matrix410();
        const p = new Vector314();
        const q = new Quaternion3();
        const s = new Vector314(1, 1, 1);
        const instancedMesh = new InstancedMesh(mesh.geometry, mesh.material, count);
        for (let i = 0; i < count; i++) {
          if (attributes.TRANSLATION) {
            p.fromBufferAttribute(attributes.TRANSLATION, i);
          }
          if (attributes.ROTATION) {
            q.fromBufferAttribute(attributes.ROTATION, i);
          }
          if (attributes.SCALE) {
            s.fromBufferAttribute(attributes.SCALE, i);
          }
          instancedMesh.setMatrixAt(i, m.compose(p, q, s));
        }
        for (const attributeName in attributes) {
          if (attributeName === "_COLOR_0") {
            const attr = attributes[attributeName];
            instancedMesh.instanceColor = new InstancedBufferAttribute2(attr.array, attr.itemSize, attr.normalized);
          } else if (attributeName !== "TRANSLATION" && attributeName !== "ROTATION" && attributeName !== "SCALE") {
            mesh.geometry.setAttribute(attributeName, attributes[attributeName]);
          }
        }
        Object3D.prototype.copy.call(instancedMesh, mesh);
        this.parser.assignFinalMaterial(instancedMesh);
        instancedMeshes.push(instancedMesh);
      }
      if (nodeObject.isGroup) {
        nodeObject.clear();
        nodeObject.add(...instancedMeshes);
        return nodeObject;
      }
      return instancedMeshes[0];
    });
  }
};
var BINARY_EXTENSION_HEADER_MAGIC = "glTF";
var BINARY_EXTENSION_HEADER_LENGTH = 12;
var BINARY_EXTENSION_CHUNK_TYPES = { JSON: 1313821514, BIN: 5130562 };
var GLTFBinaryExtension = class {
  constructor(data) {
    this.name = EXTENSIONS.KHR_BINARY_GLTF;
    this.content = null;
    this.body = null;
    const headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);
    const textDecoder = new TextDecoder();
    this.header = {
      magic: textDecoder.decode(new Uint8Array(data.slice(0, 4))),
      version: headerView.getUint32(4, true),
      length: headerView.getUint32(8, true)
    };
    if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    } else if (this.header.version < 2) {
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    }
    const chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
    const chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
    let chunkIndex = 0;
    while (chunkIndex < chunkContentsLength) {
      const chunkLength = chunkView.getUint32(chunkIndex, true);
      chunkIndex += 4;
      const chunkType = chunkView.getUint32(chunkIndex, true);
      chunkIndex += 4;
      if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {
        const contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
        this.content = textDecoder.decode(contentArray);
      } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {
        const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
        this.body = data.slice(byteOffset, byteOffset + chunkLength);
      }
      chunkIndex += chunkLength;
    }
    if (this.content === null) {
      throw new Error("THREE.GLTFLoader: JSON content not found.");
    }
  }
};
var GLTFDracoMeshCompressionExtension = class {
  constructor(json, dracoLoader) {
    if (!dracoLoader) {
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    }
    this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
    this.json = json;
    this.dracoLoader = dracoLoader;
    this.dracoLoader.preload();
  }
  decodePrimitive(primitive, parser) {
    const json = this.json;
    const dracoLoader = this.dracoLoader;
    const bufferViewIndex = primitive.extensions[this.name].bufferView;
    const gltfAttributeMap = primitive.extensions[this.name].attributes;
    const threeAttributeMap = {};
    const attributeNormalizedMap = {};
    const attributeTypeMap = {};
    for (const attributeName in gltfAttributeMap) {
      const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
      threeAttributeMap[threeAttributeName] = gltfAttributeMap[attributeName];
    }
    for (const attributeName in primitive.attributes) {
      const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
      if (gltfAttributeMap[attributeName] !== void 0) {
        const accessorDef = json.accessors[primitive.attributes[attributeName]];
        const componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
        attributeTypeMap[threeAttributeName] = componentType.name;
        attributeNormalizedMap[threeAttributeName] = accessorDef.normalized === true;
      }
    }
    return parser.getDependency("bufferView", bufferViewIndex).then(function(bufferView) {
      return new Promise(function(resolve, reject) {
        dracoLoader.decodeDracoFile(bufferView, function(geometry) {
          for (const attributeName in geometry.attributes) {
            const attribute = geometry.attributes[attributeName];
            const normalized = attributeNormalizedMap[attributeName];
            if (normalized !== void 0) attribute.normalized = normalized;
          }
          resolve(geometry);
        }, threeAttributeMap, attributeTypeMap, LinearSRGBColorSpace, reject);
      });
    });
  }
};
var GLTFTextureTransformExtension = class {
  constructor() {
    this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(texture3, transform) {
    if ((transform.texCoord === void 0 || transform.texCoord === texture3.channel) && transform.offset === void 0 && transform.rotation === void 0 && transform.scale === void 0) {
      return texture3;
    }
    texture3 = texture3.clone();
    if (transform.texCoord !== void 0) {
      texture3.channel = transform.texCoord;
    }
    if (transform.offset !== void 0) {
      texture3.offset.fromArray(transform.offset);
    }
    if (transform.rotation !== void 0) {
      texture3.rotation = transform.rotation;
    }
    if (transform.scale !== void 0) {
      texture3.repeat.fromArray(transform.scale);
    }
    texture3.needsUpdate = true;
    return texture3;
  }
};
var GLTFMeshQuantizationExtension = class {
  constructor() {
    this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;
  }
};
var GLTFCubicSplineInterpolant = class extends Interpolant {
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  copySampleValue_(index) {
    const result = this.resultBuffer, values = this.sampleValues, valueSize = this.valueSize, offset = index * valueSize * 3 + valueSize;
    for (let i = 0; i !== valueSize; i++) {
      result[i] = values[offset + i];
    }
    return result;
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer;
    const values = this.sampleValues;
    const stride = this.valueSize;
    const stride2 = stride * 2;
    const stride3 = stride * 3;
    const td = t1 - t0;
    const p = (t - t0) / td;
    const pp = p * p;
    const ppp = pp * p;
    const offset1 = i1 * stride3;
    const offset0 = offset1 - stride3;
    const s2 = -2 * ppp + 3 * pp;
    const s3 = ppp - pp;
    const s0 = 1 - s2;
    const s1 = s3 - pp + p;
    for (let i = 0; i !== stride; i++) {
      const p0 = values[offset0 + i + stride];
      const m0 = values[offset0 + i + stride2] * td;
      const p1 = values[offset1 + i + stride];
      const m1 = values[offset1 + i] * td;
      result[i] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;
    }
    return result;
  }
};
var _quaternion = new Quaternion3();
var GLTFCubicSplineQuaternionInterpolant = class extends GLTFCubicSplineInterpolant {
  interpolate_(i1, t0, t, t1) {
    const result = super.interpolate_(i1, t0, t, t1);
    _quaternion.fromArray(result).normalize().toArray(result);
    return result;
  }
};
var WEBGL_CONSTANTS = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
};
var WEBGL_COMPONENT_TYPES = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
var WEBGL_FILTERS = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
var WEBGL_WRAPPINGS = {
  33071: ClampToEdgeWrapping2,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
var WEBGL_TYPE_SIZES = {
  "SCALAR": 1,
  "VEC2": 2,
  "VEC3": 3,
  "VEC4": 4,
  "MAT2": 4,
  "MAT3": 9,
  "MAT4": 16
};
var ATTRIBUTES = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
};
var PATH_PROPERTIES = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
};
var INTERPOLATION = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
var ALPHA_MODES = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function createDefaultMaterial(cache) {
  if (cache["DefaultMaterial"] === void 0) {
    cache["DefaultMaterial"] = new MeshStandardMaterial2({
      color: 16777215,
      emissive: 0,
      metalness: 1,
      roughness: 1,
      transparent: false,
      depthTest: true,
      side: FrontSide2
    });
  }
  return cache["DefaultMaterial"];
}
function addUnknownExtensionsToUserData(knownExtensions, object, objectDef) {
  for (const name in objectDef.extensions) {
    if (knownExtensions[name] === void 0) {
      object.userData.gltfExtensions = object.userData.gltfExtensions || {};
      object.userData.gltfExtensions[name] = objectDef.extensions[name];
    }
  }
}
function assignExtrasToUserData(object, gltfDef) {
  if (gltfDef.extras !== void 0) {
    if (typeof gltfDef.extras === "object") {
      Object.assign(object.userData, gltfDef.extras);
    } else {
      console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + gltfDef.extras);
    }
  }
}
function addMorphTargets(geometry, targets, parser) {
  let hasMorphPosition = false;
  let hasMorphNormal = false;
  let hasMorphColor = false;
  for (let i = 0, il = targets.length; i < il; i++) {
    const target = targets[i];
    if (target.POSITION !== void 0) hasMorphPosition = true;
    if (target.NORMAL !== void 0) hasMorphNormal = true;
    if (target.COLOR_0 !== void 0) hasMorphColor = true;
    if (hasMorphPosition && hasMorphNormal && hasMorphColor) break;
  }
  if (!hasMorphPosition && !hasMorphNormal && !hasMorphColor) return Promise.resolve(geometry);
  const pendingPositionAccessors = [];
  const pendingNormalAccessors = [];
  const pendingColorAccessors = [];
  for (let i = 0, il = targets.length; i < il; i++) {
    const target = targets[i];
    if (hasMorphPosition) {
      const pendingAccessor = target.POSITION !== void 0 ? parser.getDependency("accessor", target.POSITION) : geometry.attributes.position;
      pendingPositionAccessors.push(pendingAccessor);
    }
    if (hasMorphNormal) {
      const pendingAccessor = target.NORMAL !== void 0 ? parser.getDependency("accessor", target.NORMAL) : geometry.attributes.normal;
      pendingNormalAccessors.push(pendingAccessor);
    }
    if (hasMorphColor) {
      const pendingAccessor = target.COLOR_0 !== void 0 ? parser.getDependency("accessor", target.COLOR_0) : geometry.attributes.color;
      pendingColorAccessors.push(pendingAccessor);
    }
  }
  return Promise.all([
    Promise.all(pendingPositionAccessors),
    Promise.all(pendingNormalAccessors),
    Promise.all(pendingColorAccessors)
  ]).then(function(accessors) {
    const morphPositions = accessors[0];
    const morphNormals = accessors[1];
    const morphColors = accessors[2];
    if (hasMorphPosition) geometry.morphAttributes.position = morphPositions;
    if (hasMorphNormal) geometry.morphAttributes.normal = morphNormals;
    if (hasMorphColor) geometry.morphAttributes.color = morphColors;
    geometry.morphTargetsRelative = true;
    return geometry;
  });
}
function updateMorphTargets(mesh, meshDef) {
  mesh.updateMorphTargets();
  if (meshDef.weights !== void 0) {
    for (let i = 0, il = meshDef.weights.length; i < il; i++) {
      mesh.morphTargetInfluences[i] = meshDef.weights[i];
    }
  }
  if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {
    const targetNames = meshDef.extras.targetNames;
    if (mesh.morphTargetInfluences.length === targetNames.length) {
      mesh.morphTargetDictionary = {};
      for (let i = 0, il = targetNames.length; i < il; i++) {
        mesh.morphTargetDictionary[targetNames[i]] = i;
      }
    } else {
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
    }
  }
}
function createPrimitiveKey(primitiveDef) {
  let geometryKey;
  const dracoExtension = primitiveDef.extensions && primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
  if (dracoExtension) {
    geometryKey = "draco:" + dracoExtension.bufferView + ":" + dracoExtension.indices + ":" + createAttributesKey(dracoExtension.attributes);
  } else {
    geometryKey = primitiveDef.indices + ":" + createAttributesKey(primitiveDef.attributes) + ":" + primitiveDef.mode;
  }
  if (primitiveDef.targets !== void 0) {
    for (let i = 0, il = primitiveDef.targets.length; i < il; i++) {
      geometryKey += ":" + createAttributesKey(primitiveDef.targets[i]);
    }
  }
  return geometryKey;
}
function createAttributesKey(attributes) {
  let attributesKey = "";
  const keys = Object.keys(attributes).sort();
  for (let i = 0, il = keys.length; i < il; i++) {
    attributesKey += keys[i] + ":" + attributes[keys[i]] + ";";
  }
  return attributesKey;
}
function getNormalizedComponentScale(constructor) {
  switch (constructor) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function getImageURIMimeType(uri) {
  if (uri.search(/\.jpe?g($|\?)/i) > 0 || uri.search(/^data\:image\/jpeg/) === 0) return "image/jpeg";
  if (uri.search(/\.webp($|\?)/i) > 0 || uri.search(/^data\:image\/webp/) === 0) return "image/webp";
  if (uri.search(/\.ktx2($|\?)/i) > 0 || uri.search(/^data\:image\/ktx2/) === 0) return "image/ktx2";
  return "image/png";
}
var _identityMatrix = new Matrix410();
var GLTFParser = class {
  constructor(json = {}, options = {}) {
    this.json = json;
    this.extensions = {};
    this.plugins = {};
    this.options = options;
    this.cache = new GLTFRegistry();
    this.associations = /* @__PURE__ */ new Map();
    this.primitiveCache = {};
    this.nodeCache = {};
    this.meshCache = { refs: {}, uses: {} };
    this.cameraCache = { refs: {}, uses: {} };
    this.lightCache = { refs: {}, uses: {} };
    this.sourceCache = {};
    this.textureCache = {};
    this.nodeNamesUsed = {};
    let isSafari = false;
    let safariVersion = -1;
    let isFirefox = false;
    let firefoxVersion = -1;
    if (typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined") {
      const userAgent = navigator.userAgent;
      isSafari = /^((?!chrome|android).)*safari/i.test(userAgent) === true;
      const safariMatch = userAgent.match(/Version\/(\d+)/);
      safariVersion = isSafari && safariMatch ? parseInt(safariMatch[1], 10) : -1;
      isFirefox = userAgent.indexOf("Firefox") > -1;
      firefoxVersion = isFirefox ? userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    if (typeof createImageBitmap === "undefined" || isSafari && safariVersion < 17 || isFirefox && firefoxVersion < 98) {
      this.textureLoader = new TextureLoader(this.options.manager);
    } else {
      this.textureLoader = new ImageBitmapLoader(this.options.manager);
    }
    this.textureLoader.setCrossOrigin(this.options.crossOrigin);
    this.textureLoader.setRequestHeader(this.options.requestHeader);
    this.fileLoader = new FileLoader(this.options.manager);
    this.fileLoader.setResponseType("arraybuffer");
    if (this.options.crossOrigin === "use-credentials") {
      this.fileLoader.setWithCredentials(true);
    }
  }
  setExtensions(extensions) {
    this.extensions = extensions;
  }
  setPlugins(plugins) {
    this.plugins = plugins;
  }
  parse(onLoad, onError) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    this.cache.removeAll();
    this.nodeCache = {};
    this._invokeAll(function(ext) {
      return ext._markDefs && ext._markDefs();
    });
    Promise.all(this._invokeAll(function(ext) {
      return ext.beforeRoot && ext.beforeRoot();
    })).then(function() {
      return Promise.all([
        parser.getDependencies("scene"),
        parser.getDependencies("animation"),
        parser.getDependencies("camera")
      ]);
    }).then(function(dependencies) {
      const result = {
        scene: dependencies[0][json.scene || 0],
        scenes: dependencies[0],
        animations: dependencies[1],
        cameras: dependencies[2],
        asset: json.asset,
        parser,
        userData: {}
      };
      addUnknownExtensionsToUserData(extensions, result, json);
      assignExtrasToUserData(result, json);
      return Promise.all(parser._invokeAll(function(ext) {
        return ext.afterRoot && ext.afterRoot(result);
      })).then(function() {
        for (const scene of result.scenes) {
          scene.updateMatrixWorld();
        }
        onLoad(result);
      });
    }).catch(onError);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   *
   * @private
   */
  _markDefs() {
    const nodeDefs = this.json.nodes || [];
    const skinDefs = this.json.skins || [];
    const meshDefs = this.json.meshes || [];
    for (let skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex++) {
      const joints = skinDefs[skinIndex].joints;
      for (let i = 0, il = joints.length; i < il; i++) {
        nodeDefs[joints[i]].isBone = true;
      }
    }
    for (let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      const nodeDef = nodeDefs[nodeIndex];
      if (nodeDef.mesh !== void 0) {
        this._addNodeRef(this.meshCache, nodeDef.mesh);
        if (nodeDef.skin !== void 0) {
          meshDefs[nodeDef.mesh].isSkinnedMesh = true;
        }
      }
      if (nodeDef.camera !== void 0) {
        this._addNodeRef(this.cameraCache, nodeDef.camera);
      }
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   *
   * @private
   * @param {Object} cache
   * @param {Object3D} index
   */
  _addNodeRef(cache, index) {
    if (index === void 0) return;
    if (cache.refs[index] === void 0) {
      cache.refs[index] = cache.uses[index] = 0;
    }
    cache.refs[index]++;
  }
  /**
   * Returns a reference to a shared resource, cloning it if necessary.
   *
   * @private
   * @param {Object} cache
   * @param {number} index
   * @param {Object} object
   * @return {Object}
   */
  _getNodeRef(cache, index, object) {
    if (cache.refs[index] <= 1) return object;
    const ref = object.clone();
    const updateMappings = (original, clone2) => {
      const mappings = this.associations.get(original);
      if (mappings != null) {
        this.associations.set(clone2, mappings);
      }
      for (const [i, child] of original.children.entries()) {
        updateMappings(child, clone2.children[i]);
      }
    };
    updateMappings(object, ref);
    ref.name += "_instance_" + cache.uses[index]++;
    return ref;
  }
  _invokeOne(func) {
    const extensions = Object.values(this.plugins);
    extensions.push(this);
    for (let i = 0; i < extensions.length; i++) {
      const result = func(extensions[i]);
      if (result) return result;
    }
    return null;
  }
  _invokeAll(func) {
    const extensions = Object.values(this.plugins);
    extensions.unshift(this);
    const pending = [];
    for (let i = 0; i < extensions.length; i++) {
      const result = func(extensions[i]);
      if (result) pending.push(result);
    }
    return pending;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   *
   * @private
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(type, index) {
    const cacheKey = type + ":" + index;
    let dependency = this.cache.get(cacheKey);
    if (!dependency) {
      switch (type) {
        case "scene":
          dependency = this.loadScene(index);
          break;
        case "node":
          dependency = this._invokeOne(function(ext) {
            return ext.loadNode && ext.loadNode(index);
          });
          break;
        case "mesh":
          dependency = this._invokeOne(function(ext) {
            return ext.loadMesh && ext.loadMesh(index);
          });
          break;
        case "accessor":
          dependency = this.loadAccessor(index);
          break;
        case "bufferView":
          dependency = this._invokeOne(function(ext) {
            return ext.loadBufferView && ext.loadBufferView(index);
          });
          break;
        case "buffer":
          dependency = this.loadBuffer(index);
          break;
        case "material":
          dependency = this._invokeOne(function(ext) {
            return ext.loadMaterial && ext.loadMaterial(index);
          });
          break;
        case "texture":
          dependency = this._invokeOne(function(ext) {
            return ext.loadTexture && ext.loadTexture(index);
          });
          break;
        case "skin":
          dependency = this.loadSkin(index);
          break;
        case "animation":
          dependency = this._invokeOne(function(ext) {
            return ext.loadAnimation && ext.loadAnimation(index);
          });
          break;
        case "camera":
          dependency = this.loadCamera(index);
          break;
        default:
          dependency = this._invokeOne(function(ext) {
            return ext != this && ext.getDependency && ext.getDependency(type, index);
          });
          if (!dependency) {
            throw new Error("Unknown type: " + type);
          }
          break;
      }
      this.cache.add(cacheKey, dependency);
    }
    return dependency;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   *
   * @private
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(type) {
    let dependencies = this.cache.get(type);
    if (!dependencies) {
      const parser = this;
      const defs = this.json[type + (type === "mesh" ? "es" : "s")] || [];
      dependencies = Promise.all(defs.map(function(def, index) {
        return parser.getDependency(type, index);
      }));
      this.cache.add(type, dependencies);
    }
    return dependencies;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   *
   * @private
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(bufferIndex) {
    const bufferDef = this.json.buffers[bufferIndex];
    const loader = this.fileLoader;
    if (bufferDef.type && bufferDef.type !== "arraybuffer") {
      throw new Error("THREE.GLTFLoader: " + bufferDef.type + " buffer type is not supported.");
    }
    if (bufferDef.uri === void 0 && bufferIndex === 0) {
      return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);
    }
    const options = this.options;
    return new Promise(function(resolve, reject) {
      loader.load(LoaderUtils.resolveURL(bufferDef.uri, options.path), resolve, void 0, function() {
        reject(new Error('THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   *
   * @private
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(bufferViewIndex) {
    const bufferViewDef = this.json.bufferViews[bufferViewIndex];
    return this.getDependency("buffer", bufferViewDef.buffer).then(function(buffer) {
      const byteLength = bufferViewDef.byteLength || 0;
      const byteOffset = bufferViewDef.byteOffset || 0;
      return buffer.slice(byteOffset, byteOffset + byteLength);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   *
   * @private
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(accessorIndex) {
    const parser = this;
    const json = this.json;
    const accessorDef = this.json.accessors[accessorIndex];
    if (accessorDef.bufferView === void 0 && accessorDef.sparse === void 0) {
      const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
      const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
      const normalized = accessorDef.normalized === true;
      const array = new TypedArray(accessorDef.count * itemSize);
      return Promise.resolve(new BufferAttribute4(array, itemSize, normalized));
    }
    const pendingBufferViews = [];
    if (accessorDef.bufferView !== void 0) {
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.bufferView));
    } else {
      pendingBufferViews.push(null);
    }
    if (accessorDef.sparse !== void 0) {
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.indices.bufferView));
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.values.bufferView));
    }
    return Promise.all(pendingBufferViews).then(function(bufferViews) {
      const bufferView = bufferViews[0];
      const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
      const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
      const elementBytes = TypedArray.BYTES_PER_ELEMENT;
      const itemBytes = elementBytes * itemSize;
      const byteOffset = accessorDef.byteOffset || 0;
      const byteStride = accessorDef.bufferView !== void 0 ? json.bufferViews[accessorDef.bufferView].byteStride : void 0;
      const normalized = accessorDef.normalized === true;
      let array, bufferAttribute;
      if (byteStride && byteStride !== itemBytes) {
        const ibSlice = Math.floor(byteOffset / byteStride);
        const ibCacheKey = "InterleavedBuffer:" + accessorDef.bufferView + ":" + accessorDef.componentType + ":" + ibSlice + ":" + accessorDef.count;
        let ib = parser.cache.get(ibCacheKey);
        if (!ib) {
          array = new TypedArray(bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes);
          ib = new InterleavedBuffer2(array, byteStride / elementBytes);
          parser.cache.add(ibCacheKey, ib);
        }
        bufferAttribute = new InterleavedBufferAttribute2(ib, itemSize, byteOffset % byteStride / elementBytes, normalized);
      } else {
        if (bufferView === null) {
          array = new TypedArray(accessorDef.count * itemSize);
        } else {
          array = new TypedArray(bufferView, byteOffset, accessorDef.count * itemSize);
        }
        bufferAttribute = new BufferAttribute4(array, itemSize, normalized);
      }
      if (accessorDef.sparse !== void 0) {
        const itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
        const TypedArrayIndices = WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType];
        const byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
        const byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;
        const sparseIndices = new TypedArrayIndices(bufferViews[1], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices);
        const sparseValues = new TypedArray(bufferViews[2], byteOffsetValues, accessorDef.sparse.count * itemSize);
        if (bufferView !== null) {
          bufferAttribute = new BufferAttribute4(bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized);
        }
        bufferAttribute.normalized = false;
        for (let i = 0, il = sparseIndices.length; i < il; i++) {
          const index = sparseIndices[i];
          bufferAttribute.setX(index, sparseValues[i * itemSize]);
          if (itemSize >= 2) bufferAttribute.setY(index, sparseValues[i * itemSize + 1]);
          if (itemSize >= 3) bufferAttribute.setZ(index, sparseValues[i * itemSize + 2]);
          if (itemSize >= 4) bufferAttribute.setW(index, sparseValues[i * itemSize + 3]);
          if (itemSize >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        bufferAttribute.normalized = normalized;
      }
      return bufferAttribute;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   *
   * @private
   * @param {number} textureIndex
   * @return {Promise<?Texture>}
   */
  loadTexture(textureIndex) {
    const json = this.json;
    const options = this.options;
    const textureDef = json.textures[textureIndex];
    const sourceIndex = textureDef.source;
    const sourceDef = json.images[sourceIndex];
    let loader = this.textureLoader;
    if (sourceDef.uri) {
      const handler = options.manager.getHandler(sourceDef.uri);
      if (handler !== null) loader = handler;
    }
    return this.loadTextureImage(textureIndex, sourceIndex, loader);
  }
  loadTextureImage(textureIndex, sourceIndex, loader) {
    const parser = this;
    const json = this.json;
    const textureDef = json.textures[textureIndex];
    const sourceDef = json.images[sourceIndex];
    const cacheKey = (sourceDef.uri || sourceDef.bufferView) + ":" + textureDef.sampler;
    if (this.textureCache[cacheKey]) {
      return this.textureCache[cacheKey];
    }
    const promise = this.loadImageSource(sourceIndex, loader).then(function(texture3) {
      texture3.flipY = false;
      texture3.name = textureDef.name || sourceDef.name || "";
      if (texture3.name === "" && typeof sourceDef.uri === "string" && sourceDef.uri.startsWith("data:image/") === false) {
        texture3.name = sourceDef.uri;
      }
      const samplers = json.samplers || {};
      const sampler = samplers[textureDef.sampler] || {};
      texture3.magFilter = WEBGL_FILTERS[sampler.magFilter] || LinearFilter;
      texture3.minFilter = WEBGL_FILTERS[sampler.minFilter] || LinearMipmapLinearFilter;
      texture3.wrapS = WEBGL_WRAPPINGS[sampler.wrapS] || RepeatWrapping;
      texture3.wrapT = WEBGL_WRAPPINGS[sampler.wrapT] || RepeatWrapping;
      texture3.generateMipmaps = !texture3.isCompressedTexture && texture3.minFilter !== NearestFilter && texture3.minFilter !== LinearFilter;
      parser.associations.set(texture3, { textures: textureIndex });
      return texture3;
    }).catch(function() {
      return null;
    });
    this.textureCache[cacheKey] = promise;
    return promise;
  }
  loadImageSource(sourceIndex, loader) {
    const parser = this;
    const json = this.json;
    const options = this.options;
    if (this.sourceCache[sourceIndex] !== void 0) {
      return this.sourceCache[sourceIndex].then((texture3) => texture3.clone());
    }
    const sourceDef = json.images[sourceIndex];
    const URL = self.URL || self.webkitURL;
    let sourceURI = sourceDef.uri || "";
    let isObjectURL = false;
    if (sourceDef.bufferView !== void 0) {
      sourceURI = parser.getDependency("bufferView", sourceDef.bufferView).then(function(bufferView) {
        isObjectURL = true;
        const blob = new Blob([bufferView], { type: sourceDef.mimeType });
        sourceURI = URL.createObjectURL(blob);
        return sourceURI;
      });
    } else if (sourceDef.uri === void 0) {
      throw new Error("THREE.GLTFLoader: Image " + sourceIndex + " is missing URI and bufferView");
    }
    const promise = Promise.resolve(sourceURI).then(function(sourceURI2) {
      return new Promise(function(resolve, reject) {
        let onLoad = resolve;
        if (loader.isImageBitmapLoader === true) {
          onLoad = function(imageBitmap) {
            const texture3 = new Texture(imageBitmap);
            texture3.needsUpdate = true;
            resolve(texture3);
          };
        }
        loader.load(LoaderUtils.resolveURL(sourceURI2, options.path), onLoad, void 0, reject);
      });
    }).then(function(texture3) {
      if (isObjectURL === true) {
        URL.revokeObjectURL(sourceURI);
      }
      assignExtrasToUserData(texture3, sourceDef);
      texture3.userData.mimeType = sourceDef.mimeType || getImageURIMimeType(sourceDef.uri);
      return texture3;
    }).catch(function(error) {
      console.error("THREE.GLTFLoader: Couldn't load texture", sourceURI);
      throw error;
    });
    this.sourceCache[sourceIndex] = promise;
    return promise;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   *
   * @private
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @param {string} [colorSpace]
   * @return {Promise<Texture>}
   */
  assignTexture(materialParams, mapName, mapDef, colorSpace) {
    const parser = this;
    return this.getDependency("texture", mapDef.index).then(function(texture3) {
      if (!texture3) return null;
      if (mapDef.texCoord !== void 0 && mapDef.texCoord > 0) {
        texture3 = texture3.clone();
        texture3.channel = mapDef.texCoord;
      }
      if (parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {
        const transform = mapDef.extensions !== void 0 ? mapDef.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] : void 0;
        if (transform) {
          const gltfReference = parser.associations.get(texture3);
          texture3 = parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(texture3, transform);
          parser.associations.set(texture3, gltfReference);
        }
      }
      if (colorSpace !== void 0) {
        texture3.colorSpace = colorSpace;
      }
      materialParams[mapName] = texture3;
      return texture3;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   *
   * @private
   * @param {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(mesh) {
    const geometry = mesh.geometry;
    let material = mesh.material;
    const useDerivativeTangents = geometry.attributes.tangent === void 0;
    const useVertexColors = geometry.attributes.color !== void 0;
    const useFlatShading = geometry.attributes.normal === void 0;
    if (mesh.isPoints) {
      const cacheKey = "PointsMaterial:" + material.uuid;
      let pointsMaterial = this.cache.get(cacheKey);
      if (!pointsMaterial) {
        pointsMaterial = new PointsMaterial();
        Material.prototype.copy.call(pointsMaterial, material);
        pointsMaterial.color.copy(material.color);
        pointsMaterial.map = material.map;
        pointsMaterial.sizeAttenuation = false;
        this.cache.add(cacheKey, pointsMaterial);
      }
      material = pointsMaterial;
    } else if (mesh.isLine) {
      const cacheKey = "LineBasicMaterial:" + material.uuid;
      let lineMaterial = this.cache.get(cacheKey);
      if (!lineMaterial) {
        lineMaterial = new LineBasicMaterial();
        Material.prototype.copy.call(lineMaterial, material);
        lineMaterial.color.copy(material.color);
        lineMaterial.map = material.map;
        this.cache.add(cacheKey, lineMaterial);
      }
      material = lineMaterial;
    }
    if (useDerivativeTangents || useVertexColors || useFlatShading) {
      let cacheKey = "ClonedMaterial:" + material.uuid + ":";
      if (useDerivativeTangents) cacheKey += "derivative-tangents:";
      if (useVertexColors) cacheKey += "vertex-colors:";
      if (useFlatShading) cacheKey += "flat-shading:";
      let cachedMaterial = this.cache.get(cacheKey);
      if (!cachedMaterial) {
        cachedMaterial = material.clone();
        if (useVertexColors) cachedMaterial.vertexColors = true;
        if (useFlatShading) cachedMaterial.flatShading = true;
        if (useDerivativeTangents) {
          if (cachedMaterial.normalScale) cachedMaterial.normalScale.y *= -1;
          if (cachedMaterial.clearcoatNormalScale) cachedMaterial.clearcoatNormalScale.y *= -1;
        }
        this.cache.add(cacheKey, cachedMaterial);
        this.associations.set(cachedMaterial, this.associations.get(material));
      }
      material = cachedMaterial;
    }
    mesh.material = material;
  }
  getMaterialType() {
    return MeshStandardMaterial2;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   *
   * @private
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(materialIndex) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    const materialDef = json.materials[materialIndex];
    let materialType;
    const materialParams = {};
    const materialExtensions = materialDef.extensions || {};
    const pending = [];
    if (materialExtensions[EXTENSIONS.KHR_MATERIALS_UNLIT]) {
      const kmuExtension = extensions[EXTENSIONS.KHR_MATERIALS_UNLIT];
      materialType = kmuExtension.getMaterialType();
      pending.push(kmuExtension.extendParams(materialParams, materialDef, parser));
    } else {
      const metallicRoughness = materialDef.pbrMetallicRoughness || {};
      materialParams.color = new Color3(1, 1, 1);
      materialParams.opacity = 1;
      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        const array = metallicRoughness.baseColorFactor;
        materialParams.color.setRGB(array[0], array[1], array[2], LinearSRGBColorSpace);
        materialParams.opacity = array[3];
      }
      if (metallicRoughness.baseColorTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, SRGBColorSpace));
      }
      materialParams.metalness = metallicRoughness.metallicFactor !== void 0 ? metallicRoughness.metallicFactor : 1;
      materialParams.roughness = metallicRoughness.roughnessFactor !== void 0 ? metallicRoughness.roughnessFactor : 1;
      if (metallicRoughness.metallicRoughnessTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "metalnessMap", metallicRoughness.metallicRoughnessTexture));
        pending.push(parser.assignTexture(materialParams, "roughnessMap", metallicRoughness.metallicRoughnessTexture));
      }
      materialType = this._invokeOne(function(ext) {
        return ext.getMaterialType && ext.getMaterialType(materialIndex);
      });
      pending.push(Promise.all(this._invokeAll(function(ext) {
        return ext.extendMaterialParams && ext.extendMaterialParams(materialIndex, materialParams);
      })));
    }
    if (materialDef.doubleSided === true) {
      materialParams.side = DoubleSide3;
    }
    const alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;
    if (alphaMode === ALPHA_MODES.BLEND) {
      materialParams.transparent = true;
      materialParams.depthWrite = false;
    } else {
      materialParams.transparent = false;
      if (alphaMode === ALPHA_MODES.MASK) {
        materialParams.alphaTest = materialDef.alphaCutoff !== void 0 ? materialDef.alphaCutoff : 0.5;
      }
    }
    if (materialDef.normalTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "normalMap", materialDef.normalTexture));
      materialParams.normalScale = new Vector28(1, 1);
      if (materialDef.normalTexture.scale !== void 0) {
        const scale = materialDef.normalTexture.scale;
        materialParams.normalScale.set(scale, scale);
      }
    }
    if (materialDef.occlusionTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "aoMap", materialDef.occlusionTexture));
      if (materialDef.occlusionTexture.strength !== void 0) {
        materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;
      }
    }
    if (materialDef.emissiveFactor !== void 0 && materialType !== MeshBasicMaterial) {
      const emissiveFactor = materialDef.emissiveFactor;
      materialParams.emissive = new Color3().setRGB(emissiveFactor[0], emissiveFactor[1], emissiveFactor[2], LinearSRGBColorSpace);
    }
    if (materialDef.emissiveTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "emissiveMap", materialDef.emissiveTexture, SRGBColorSpace));
    }
    return Promise.all(pending).then(function() {
      const material = new materialType(materialParams);
      if (materialDef.name) material.name = materialDef.name;
      assignExtrasToUserData(material, materialDef);
      parser.associations.set(material, { materials: materialIndex });
      if (materialDef.extensions) addUnknownExtensionsToUserData(extensions, material, materialDef);
      return material;
    });
  }
  /**
   * When Object3D instances are targeted by animation, they need unique names.
   *
   * @private
   * @param {string} originalName
   * @return {string}
   */
  createUniqueName(originalName) {
    const sanitizedName = PropertyBinding.sanitizeNodeName(originalName || "");
    if (sanitizedName in this.nodeNamesUsed) {
      return sanitizedName + "_" + ++this.nodeNamesUsed[sanitizedName];
    } else {
      this.nodeNamesUsed[sanitizedName] = 0;
      return sanitizedName;
    }
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @private
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(primitives) {
    const parser = this;
    const extensions = this.extensions;
    const cache = this.primitiveCache;
    function createDracoPrimitive(primitive) {
      return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(primitive, parser).then(function(geometry) {
        return addPrimitiveAttributes(geometry, primitive, parser);
      });
    }
    const pending = [];
    for (let i = 0, il = primitives.length; i < il; i++) {
      const primitive = primitives[i];
      const cacheKey = createPrimitiveKey(primitive);
      const cached = cache[cacheKey];
      if (cached) {
        pending.push(cached.promise);
      } else {
        let geometryPromise;
        if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) {
          geometryPromise = createDracoPrimitive(primitive);
        } else {
          geometryPromise = addPrimitiveAttributes(new BufferGeometry2(), primitive, parser);
        }
        cache[cacheKey] = { primitive, promise: geometryPromise };
        pending.push(geometryPromise);
      }
    }
    return Promise.all(pending);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   *
   * @private
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh|Line|Points>}
   */
  loadMesh(meshIndex) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    const meshDef = json.meshes[meshIndex];
    const primitives = meshDef.primitives;
    const pending = [];
    for (let i = 0, il = primitives.length; i < il; i++) {
      const material = primitives[i].material === void 0 ? createDefaultMaterial(this.cache) : this.getDependency("material", primitives[i].material);
      pending.push(material);
    }
    pending.push(parser.loadGeometries(primitives));
    return Promise.all(pending).then(function(results) {
      const materials = results.slice(0, results.length - 1);
      const geometries = results[results.length - 1];
      const meshes = [];
      for (let i = 0, il = geometries.length; i < il; i++) {
        const geometry = geometries[i];
        const primitive = primitives[i];
        let mesh;
        const material = materials[i];
        if (primitive.mode === WEBGL_CONSTANTS.TRIANGLES || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN || primitive.mode === void 0) {
          mesh = meshDef.isSkinnedMesh === true ? new SkinnedMesh(geometry, material) : new Mesh2(geometry, material);
          if (mesh.isSkinnedMesh === true) {
            mesh.normalizeSkinWeights();
          }
          if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleStripDrawMode2);
          } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleFanDrawMode2);
          }
        } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {
          mesh = new LineSegments(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {
          mesh = new Line(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {
          mesh = new LineLoop(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {
          mesh = new Points(geometry, material);
        } else {
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + primitive.mode);
        }
        if (Object.keys(mesh.geometry.morphAttributes).length > 0) {
          updateMorphTargets(mesh, meshDef);
        }
        mesh.name = parser.createUniqueName(meshDef.name || "mesh_" + meshIndex);
        assignExtrasToUserData(mesh, meshDef);
        if (primitive.extensions) addUnknownExtensionsToUserData(extensions, mesh, primitive);
        parser.assignFinalMaterial(mesh);
        meshes.push(mesh);
      }
      for (let i = 0, il = meshes.length; i < il; i++) {
        parser.associations.set(meshes[i], {
          meshes: meshIndex,
          primitives: i
        });
      }
      if (meshes.length === 1) {
        if (meshDef.extensions) addUnknownExtensionsToUserData(extensions, meshes[0], meshDef);
        return meshes[0];
      }
      const group = new Group();
      if (meshDef.extensions) addUnknownExtensionsToUserData(extensions, group, meshDef);
      parser.associations.set(group, { meshes: meshIndex });
      for (let i = 0, il = meshes.length; i < il; i++) {
        group.add(meshes[i]);
      }
      return group;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   *
   * @private
   * @param {number} cameraIndex
   * @return {Promise<Camera>|undefined}
   */
  loadCamera(cameraIndex) {
    let camera;
    const cameraDef = this.json.cameras[cameraIndex];
    const params = cameraDef[cameraDef.type];
    if (!params) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    if (cameraDef.type === "perspective") {
      camera = new PerspectiveCamera(MathUtils2.radToDeg(params.yfov), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6);
    } else if (cameraDef.type === "orthographic") {
      camera = new OrthographicCamera(-params.xmag, params.xmag, params.ymag, -params.ymag, params.znear, params.zfar);
    }
    if (cameraDef.name) camera.name = this.createUniqueName(cameraDef.name);
    assignExtrasToUserData(camera, cameraDef);
    return Promise.resolve(camera);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   *
   * @private
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(skinIndex) {
    const skinDef = this.json.skins[skinIndex];
    const pending = [];
    for (let i = 0, il = skinDef.joints.length; i < il; i++) {
      pending.push(this._loadNodeShallow(skinDef.joints[i]));
    }
    if (skinDef.inverseBindMatrices !== void 0) {
      pending.push(this.getDependency("accessor", skinDef.inverseBindMatrices));
    } else {
      pending.push(null);
    }
    return Promise.all(pending).then(function(results) {
      const inverseBindMatrices = results.pop();
      const jointNodes = results;
      const bones = [];
      const boneInverses = [];
      for (let i = 0, il = jointNodes.length; i < il; i++) {
        const jointNode = jointNodes[i];
        if (jointNode) {
          bones.push(jointNode);
          const mat = new Matrix410();
          if (inverseBindMatrices !== null) {
            mat.fromArray(inverseBindMatrices.array, i * 16);
          }
          boneInverses.push(mat);
        } else {
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', skinDef.joints[i]);
        }
      }
      return new Skeleton(bones, boneInverses);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   *
   * @private
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(animationIndex) {
    const json = this.json;
    const parser = this;
    const animationDef = json.animations[animationIndex];
    const animationName = animationDef.name ? animationDef.name : "animation_" + animationIndex;
    const pendingNodes = [];
    const pendingInputAccessors = [];
    const pendingOutputAccessors = [];
    const pendingSamplers = [];
    const pendingTargets = [];
    for (let i = 0, il = animationDef.channels.length; i < il; i++) {
      const channel = animationDef.channels[i];
      const sampler = animationDef.samplers[channel.sampler];
      const target = channel.target;
      const name = target.node;
      const input = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.input] : sampler.input;
      const output = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.output] : sampler.output;
      if (target.node === void 0) continue;
      pendingNodes.push(this.getDependency("node", name));
      pendingInputAccessors.push(this.getDependency("accessor", input));
      pendingOutputAccessors.push(this.getDependency("accessor", output));
      pendingSamplers.push(sampler);
      pendingTargets.push(target);
    }
    return Promise.all([
      Promise.all(pendingNodes),
      Promise.all(pendingInputAccessors),
      Promise.all(pendingOutputAccessors),
      Promise.all(pendingSamplers),
      Promise.all(pendingTargets)
    ]).then(function(dependencies) {
      const nodes = dependencies[0];
      const inputAccessors = dependencies[1];
      const outputAccessors = dependencies[2];
      const samplers = dependencies[3];
      const targets = dependencies[4];
      const tracks = [];
      for (let i = 0, il = nodes.length; i < il; i++) {
        const node = nodes[i];
        const inputAccessor = inputAccessors[i];
        const outputAccessor = outputAccessors[i];
        const sampler = samplers[i];
        const target = targets[i];
        if (node === void 0) continue;
        if (node.updateMatrix) {
          node.updateMatrix();
        }
        const createdTracks = parser._createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target);
        if (createdTracks) {
          for (let k = 0; k < createdTracks.length; k++) {
            tracks.push(createdTracks[k]);
          }
        }
      }
      const animation = new AnimationClip2(animationName, void 0, tracks);
      assignExtrasToUserData(animation, animationDef);
      return animation;
    });
  }
  createNodeMesh(nodeIndex) {
    const json = this.json;
    const parser = this;
    const nodeDef = json.nodes[nodeIndex];
    if (nodeDef.mesh === void 0) return null;
    return parser.getDependency("mesh", nodeDef.mesh).then(function(mesh) {
      const node = parser._getNodeRef(parser.meshCache, nodeDef.mesh, mesh);
      if (nodeDef.weights !== void 0) {
        node.traverse(function(o) {
          if (!o.isMesh) return;
          for (let i = 0, il = nodeDef.weights.length; i < il; i++) {
            o.morphTargetInfluences[i] = nodeDef.weights[i];
          }
        });
      }
      return node;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   *
   * @private
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(nodeIndex) {
    const json = this.json;
    const parser = this;
    const nodeDef = json.nodes[nodeIndex];
    const nodePending = parser._loadNodeShallow(nodeIndex);
    const childPending = [];
    const childrenDef = nodeDef.children || [];
    for (let i = 0, il = childrenDef.length; i < il; i++) {
      childPending.push(parser.getDependency("node", childrenDef[i]));
    }
    const skeletonPending = nodeDef.skin === void 0 ? Promise.resolve(null) : parser.getDependency("skin", nodeDef.skin);
    return Promise.all([
      nodePending,
      Promise.all(childPending),
      skeletonPending
    ]).then(function(results) {
      const node = results[0];
      const children = results[1];
      const skeleton = results[2];
      if (skeleton !== null) {
        node.traverse(function(mesh) {
          if (!mesh.isSkinnedMesh) return;
          mesh.bind(skeleton, _identityMatrix);
        });
      }
      for (let i = 0, il = children.length; i < il; i++) {
        node.add(children[i]);
      }
      if (node.userData.pivot !== void 0 && children.length > 0) {
        const pivot = node.userData.pivot;
        const pivotChild = children[0];
        node.pivot = new Vector314().fromArray(pivot);
        node.position.x -= pivot[0];
        node.position.y -= pivot[1];
        node.position.z -= pivot[2];
        pivotChild.position.set(0, 0, 0);
        delete node.userData.pivot;
      }
      return node;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(nodeIndex) {
    const json = this.json;
    const extensions = this.extensions;
    const parser = this;
    if (this.nodeCache[nodeIndex] !== void 0) {
      return this.nodeCache[nodeIndex];
    }
    const nodeDef = json.nodes[nodeIndex];
    const nodeName = nodeDef.name ? parser.createUniqueName(nodeDef.name) : "";
    const pending = [];
    const meshPromise = parser._invokeOne(function(ext) {
      return ext.createNodeMesh && ext.createNodeMesh(nodeIndex);
    });
    if (meshPromise) {
      pending.push(meshPromise);
    }
    if (nodeDef.camera !== void 0) {
      pending.push(parser.getDependency("camera", nodeDef.camera).then(function(camera) {
        return parser._getNodeRef(parser.cameraCache, nodeDef.camera, camera);
      }));
    }
    parser._invokeAll(function(ext) {
      return ext.createNodeAttachment && ext.createNodeAttachment(nodeIndex);
    }).forEach(function(promise) {
      pending.push(promise);
    });
    this.nodeCache[nodeIndex] = Promise.all(pending).then(function(objects) {
      let node;
      if (nodeDef.isBone === true) {
        node = new Bone();
      } else if (objects.length > 1) {
        node = new Group();
      } else if (objects.length === 1) {
        node = objects[0];
      } else {
        node = new Object3D();
      }
      if (node !== objects[0]) {
        for (let i = 0, il = objects.length; i < il; i++) {
          node.add(objects[i]);
        }
      }
      if (nodeDef.name) {
        node.userData.name = nodeDef.name;
        node.name = nodeName;
      }
      assignExtrasToUserData(node, nodeDef);
      if (nodeDef.extensions) addUnknownExtensionsToUserData(extensions, node, nodeDef);
      if (nodeDef.matrix !== void 0) {
        const matrix = new Matrix410();
        matrix.fromArray(nodeDef.matrix);
        node.applyMatrix4(matrix);
      } else {
        if (nodeDef.translation !== void 0) {
          node.position.fromArray(nodeDef.translation);
        }
        if (nodeDef.rotation !== void 0) {
          node.quaternion.fromArray(nodeDef.rotation);
        }
        if (nodeDef.scale !== void 0) {
          node.scale.fromArray(nodeDef.scale);
        }
      }
      if (!parser.associations.has(node)) {
        parser.associations.set(node, {});
      } else if (nodeDef.mesh !== void 0 && parser.meshCache.refs[nodeDef.mesh] > 1) {
        const mapping = parser.associations.get(node);
        parser.associations.set(node, { ...mapping });
      }
      parser.associations.get(node).nodes = nodeIndex;
      return node;
    });
    return this.nodeCache[nodeIndex];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   *
   * @private
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(sceneIndex) {
    const extensions = this.extensions;
    const sceneDef = this.json.scenes[sceneIndex];
    const parser = this;
    const scene = new Group();
    if (sceneDef.name) scene.name = parser.createUniqueName(sceneDef.name);
    assignExtrasToUserData(scene, sceneDef);
    if (sceneDef.extensions) addUnknownExtensionsToUserData(extensions, scene, sceneDef);
    const nodeIds = sceneDef.nodes || [];
    const pending = [];
    for (let i = 0, il = nodeIds.length; i < il; i++) {
      pending.push(parser.getDependency("node", nodeIds[i]));
    }
    return Promise.all(pending).then(function(nodes) {
      for (let i = 0, il = nodes.length; i < il; i++) {
        const node = nodes[i];
        if (node.parent !== null) {
          scene.add(clone(node));
        } else {
          scene.add(node);
        }
      }
      const reduceAssociations = (node) => {
        const reducedAssociations = /* @__PURE__ */ new Map();
        for (const [key, value] of parser.associations) {
          if (key instanceof Material || key instanceof Texture) {
            reducedAssociations.set(key, value);
          }
        }
        node.traverse((node2) => {
          const mappings = parser.associations.get(node2);
          if (mappings != null) {
            reducedAssociations.set(node2, mappings);
          }
        });
        return reducedAssociations;
      };
      parser.associations = reduceAssociations(scene);
      return scene;
    });
  }
  _createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target) {
    const tracks = [];
    const targetName = node.name ? node.name : node.uuid;
    const targetNames = [];
    function collectMorphTargets(object) {
      if (object.morphTargetInfluences) {
        targetNames.push(object.name ? object.name : object.uuid);
      }
    }
    if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {
      collectMorphTargets(node);
      if (node.isGroup) {
        node.children.forEach(collectMorphTargets);
      }
    } else {
      targetNames.push(targetName);
    }
    let TypedKeyframeTrack;
    switch (PATH_PROPERTIES[target.path]) {
      case PATH_PROPERTIES.weights:
        TypedKeyframeTrack = NumberKeyframeTrack;
        break;
      case PATH_PROPERTIES.rotation:
        TypedKeyframeTrack = QuaternionKeyframeTrack2;
        break;
      case PATH_PROPERTIES.translation:
      case PATH_PROPERTIES.scale:
        TypedKeyframeTrack = VectorKeyframeTrack2;
        break;
      default:
        switch (outputAccessor.itemSize) {
          case 1:
            TypedKeyframeTrack = NumberKeyframeTrack;
            break;
          case 2:
          case 3:
          default:
            TypedKeyframeTrack = VectorKeyframeTrack2;
            break;
        }
        break;
    }
    const interpolation = sampler.interpolation !== void 0 ? INTERPOLATION[sampler.interpolation] : InterpolateLinear;
    const outputArray = this._getArrayFromAccessor(outputAccessor);
    for (let j = 0, jl = targetNames.length; j < jl; j++) {
      const track = new TypedKeyframeTrack(
        targetNames[j] + "." + PATH_PROPERTIES[target.path],
        inputAccessor.array,
        outputArray,
        interpolation
      );
      if (sampler.interpolation === "CUBICSPLINE") {
        this._createCubicSplineTrackInterpolant(track);
      }
      tracks.push(track);
    }
    return tracks;
  }
  _getArrayFromAccessor(accessor) {
    let outputArray = accessor.array;
    if (accessor.normalized) {
      const scale = getNormalizedComponentScale(outputArray.constructor);
      const scaled = new Float32Array(outputArray.length);
      for (let j = 0, jl = outputArray.length; j < jl; j++) {
        scaled[j] = outputArray[j] * scale;
      }
      outputArray = scaled;
    }
    return outputArray;
  }
  _createCubicSplineTrackInterpolant(track) {
    track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(result) {
      const interpolantType = this instanceof QuaternionKeyframeTrack2 ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant;
      return new interpolantType(this.times, this.values, this.getValueSize() / 3, result);
    };
    track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
  }
};
function computeBounds(geometry, primitiveDef, parser) {
  const attributes = primitiveDef.attributes;
  const box = new Box37();
  if (attributes.POSITION !== void 0) {
    const accessor = parser.json.accessors[attributes.POSITION];
    const min = accessor.min;
    const max = accessor.max;
    if (min !== void 0 && max !== void 0) {
      box.set(
        new Vector314(min[0], min[1], min[2]),
        new Vector314(max[0], max[1], max[2])
      );
      if (accessor.normalized) {
        const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
        box.min.multiplyScalar(boxScale);
        box.max.multiplyScalar(boxScale);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else {
    return;
  }
  const targets = primitiveDef.targets;
  if (targets !== void 0) {
    const maxDisplacement = new Vector314();
    const vector = new Vector314();
    for (let i = 0, il = targets.length; i < il; i++) {
      const target = targets[i];
      if (target.POSITION !== void 0) {
        const accessor = parser.json.accessors[target.POSITION];
        const min = accessor.min;
        const max = accessor.max;
        if (min !== void 0 && max !== void 0) {
          vector.setX(Math.max(Math.abs(min[0]), Math.abs(max[0])));
          vector.setY(Math.max(Math.abs(min[1]), Math.abs(max[1])));
          vector.setZ(Math.max(Math.abs(min[2]), Math.abs(max[2])));
          if (accessor.normalized) {
            const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
            vector.multiplyScalar(boxScale);
          }
          maxDisplacement.max(vector);
        } else {
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
        }
      }
    }
    box.expandByVector(maxDisplacement);
  }
  geometry.boundingBox = box;
  const sphere = new Sphere();
  box.getCenter(sphere.center);
  sphere.radius = box.min.distanceTo(box.max) / 2;
  geometry.boundingSphere = sphere;
}
function addPrimitiveAttributes(geometry, primitiveDef, parser) {
  const attributes = primitiveDef.attributes;
  const pending = [];
  function assignAttributeAccessor(accessorIndex, attributeName) {
    return parser.getDependency("accessor", accessorIndex).then(function(accessor) {
      geometry.setAttribute(attributeName, accessor);
    });
  }
  for (const gltfAttributeName in attributes) {
    const threeAttributeName = ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase();
    if (threeAttributeName in geometry.attributes) continue;
    pending.push(assignAttributeAccessor(attributes[gltfAttributeName], threeAttributeName));
  }
  if (primitiveDef.indices !== void 0 && !geometry.index) {
    const accessor = parser.getDependency("accessor", primitiveDef.indices).then(function(accessor2) {
      geometry.setIndex(accessor2);
    });
    pending.push(accessor);
  }
  if (ColorManagement.workingColorSpace !== LinearSRGBColorSpace && "COLOR_0" in attributes) {
    console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ColorManagement.workingColorSpace}" not supported.`);
  }
  assignExtrasToUserData(geometry, primitiveDef);
  computeBounds(geometry, primitiveDef, parser);
  return Promise.all(pending).then(function() {
    return primitiveDef.targets !== void 0 ? addMorphTargets(geometry, primitiveDef.targets, parser) : geometry;
  });
}

// node_modules/three/examples/jsm/math/MeshSurfaceSampler.js
import {
  Triangle as Triangle4,
  Vector2 as Vector29,
  Vector3 as Vector315
} from "three";
var _face = new Triangle4();
var _color = new Vector315();
var _uva = new Vector29();
var _uvb = new Vector29();
var _uvc = new Vector29();
var MeshSurfaceSampler = class {
  /**
   * Constructs a mesh surface sampler.
   *
   * @param {Mesh} mesh - Surface mesh from which to sample.
   */
  constructor(mesh) {
    this.geometry = mesh.geometry;
    this.randomFunction = Math.random;
    this.indexAttribute = this.geometry.index;
    this.positionAttribute = this.geometry.getAttribute("position");
    this.normalAttribute = this.geometry.getAttribute("normal");
    this.colorAttribute = this.geometry.getAttribute("color");
    this.uvAttribute = this.geometry.getAttribute("uv");
    this.weightAttribute = null;
    this.distribution = null;
  }
  /**
   * Specifies a vertex attribute to be used as a weight when sampling from the surface.
   * Faces with higher weights are more likely to be sampled, and those with weights of
   * zero will not be sampled at all. For vector attributes, only .x is used in sampling.
   *
   * If no weight attribute is selected, sampling is randomly distributed by area.
   *
   * @param {string} name - The attribute name.
   * @return {MeshSurfaceSampler} A reference to this sampler.
   */
  setWeightAttribute(name) {
    this.weightAttribute = name ? this.geometry.getAttribute(name) : null;
    return this;
  }
  /**
   * Processes the input geometry and prepares to return samples. Any configuration of the
   * geometry or sampler must occur before this method is called. Time complexity is O(n)
   * for a surface with n faces.
   *
   * @return {MeshSurfaceSampler} A reference to this sampler.
   */
  build() {
    const indexAttribute = this.indexAttribute;
    const positionAttribute = this.positionAttribute;
    const weightAttribute = this.weightAttribute;
    const totalFaces = indexAttribute ? indexAttribute.count / 3 : positionAttribute.count / 3;
    const faceWeights = new Float32Array(totalFaces);
    for (let i = 0; i < totalFaces; i++) {
      let faceWeight = 1;
      let i0 = 3 * i;
      let i1 = 3 * i + 1;
      let i2 = 3 * i + 2;
      if (indexAttribute) {
        i0 = indexAttribute.getX(i0);
        i1 = indexAttribute.getX(i1);
        i2 = indexAttribute.getX(i2);
      }
      if (weightAttribute) {
        faceWeight = weightAttribute.getX(i0) + weightAttribute.getX(i1) + weightAttribute.getX(i2);
      }
      _face.a.fromBufferAttribute(positionAttribute, i0);
      _face.b.fromBufferAttribute(positionAttribute, i1);
      _face.c.fromBufferAttribute(positionAttribute, i2);
      faceWeight *= _face.getArea();
      faceWeights[i] = faceWeight;
    }
    const distribution = new Float32Array(totalFaces);
    let cumulativeTotal = 0;
    for (let i = 0; i < totalFaces; i++) {
      cumulativeTotal += faceWeights[i];
      distribution[i] = cumulativeTotal;
    }
    this.distribution = distribution;
    return this;
  }
  /**
   * Allows to set a custom random number generator. Default is `Math.random()`.
   *
   * @param {Function} randomFunction - A random number generator.
   * @return {MeshSurfaceSampler} A reference to this sampler.
   */
  setRandomGenerator(randomFunction) {
    this.randomFunction = randomFunction;
    return this;
  }
  /**
   * Selects a random point on the surface of the input geometry, returning the
   * position and optionally the normal vector, color and UV Coordinate at that point.
   * Time complexity is O(log n) for a surface with n faces.
   *
   * @param {Vector3} targetPosition - The target object holding the sampled position.
   * @param {Vector3} targetNormal - The target object holding the sampled normal.
   * @param {Color} targetColor - The target object holding the sampled color.
   * @param {Vector2} targetUV -  The target object holding the sampled uv coordinates.
   * @return {MeshSurfaceSampler} A reference to this sampler.
   */
  sample(targetPosition, targetNormal, targetColor, targetUV) {
    const faceIndex = this._sampleFaceIndex();
    return this._sampleFace(faceIndex, targetPosition, targetNormal, targetColor, targetUV);
  }
  // private
  _sampleFaceIndex() {
    const cumulativeTotal = this.distribution[this.distribution.length - 1];
    return this._binarySearch(this.randomFunction() * cumulativeTotal);
  }
  _binarySearch(x) {
    const dist = this.distribution;
    let start = 0;
    let end = dist.length - 1;
    let index = -1;
    while (start <= end) {
      const mid = Math.ceil((start + end) / 2);
      if (mid === 0 || dist[mid - 1] <= x && dist[mid] > x) {
        index = mid;
        break;
      } else if (x < dist[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return index;
  }
  _sampleFace(faceIndex, targetPosition, targetNormal, targetColor, targetUV) {
    let u = this.randomFunction();
    let v = this.randomFunction();
    if (u + v > 1) {
      u = 1 - u;
      v = 1 - v;
    }
    const indexAttribute = this.indexAttribute;
    let i0 = faceIndex * 3;
    let i1 = faceIndex * 3 + 1;
    let i2 = faceIndex * 3 + 2;
    if (indexAttribute) {
      i0 = indexAttribute.getX(i0);
      i1 = indexAttribute.getX(i1);
      i2 = indexAttribute.getX(i2);
    }
    _face.a.fromBufferAttribute(this.positionAttribute, i0);
    _face.b.fromBufferAttribute(this.positionAttribute, i1);
    _face.c.fromBufferAttribute(this.positionAttribute, i2);
    targetPosition.set(0, 0, 0).addScaledVector(_face.a, u).addScaledVector(_face.b, v).addScaledVector(_face.c, 1 - (u + v));
    if (targetNormal !== void 0) {
      if (this.normalAttribute !== void 0) {
        _face.a.fromBufferAttribute(this.normalAttribute, i0);
        _face.b.fromBufferAttribute(this.normalAttribute, i1);
        _face.c.fromBufferAttribute(this.normalAttribute, i2);
        targetNormal.set(0, 0, 0).addScaledVector(_face.a, u).addScaledVector(_face.b, v).addScaledVector(_face.c, 1 - (u + v)).normalize();
      } else {
        _face.getNormal(targetNormal);
      }
    }
    if (targetColor !== void 0 && this.colorAttribute !== void 0) {
      _face.a.fromBufferAttribute(this.colorAttribute, i0);
      _face.b.fromBufferAttribute(this.colorAttribute, i1);
      _face.c.fromBufferAttribute(this.colorAttribute, i2);
      _color.set(0, 0, 0).addScaledVector(_face.a, u).addScaledVector(_face.b, v).addScaledVector(_face.c, 1 - (u + v));
      targetColor.r = _color.x;
      targetColor.g = _color.y;
      targetColor.b = _color.z;
    }
    if (targetUV !== void 0 && this.uvAttribute !== void 0) {
      _uva.fromBufferAttribute(this.uvAttribute, i0);
      _uvb.fromBufferAttribute(this.uvAttribute, i1);
      _uvc.fromBufferAttribute(this.uvAttribute, i2);
      targetUV.set(0, 0).addScaledVector(_uva, u).addScaledVector(_uvb, v).addScaledVector(_uvc, 1 - (u + v));
    }
    return this;
  }
};

// upstream/fuse/src/shaders/grassBlades.ts
function createClumpGeometry(opts = {}) {
  const {
    bladeCount = 30,
    radius = 0.15,
    bladeWidth = 0.025,
    bladeHeight = 0.08,
    heightVariation = 0.4,
    lean = 0.3
  } = opts;
  const singleBlade = createBladeGeometry();
  singleBlade.scale(bladeWidth, bladeHeight, bladeWidth);
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  const mat = new THREE4.Matrix4();
  const quat = new THREE4.Quaternion();
  const euler = new THREE4.Euler();
  const pos = new THREE4.Vector3();
  const scale = new THREE4.Vector3();
  const tempVec = new THREE4.Vector3();
  const tempNorm = new THREE4.Vector3();
  const normalMatrix = new THREE4.Matrix3();
  const bladePos = singleBlade.attributes.position;
  const bladeNorm = singleBlade.attributes.normal;
  const bladeUV = singleBlade.attributes.uv;
  const bladeIdx = singleBlade.index;
  for (let i = 0; i < bladeCount; i++) {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const t = i / bladeCount;
    const angle = i * goldenAngle;
    const dist = Math.sqrt(t) * radius;
    const jitter = radius * 0.02;
    pos.set(
      Math.cos(angle) * dist + (Math.random() - 0.5) * jitter,
      0,
      Math.sin(angle) * dist + (Math.random() - 0.5) * jitter
    );
    const yRot = Math.random() * Math.PI * 2;
    const leanAmount = (Math.random() - 0.5) * 2 * lean;
    const leanDir = Math.random() * Math.PI * 2;
    euler.set(Math.sin(leanDir) * leanAmount, yRot, Math.cos(leanDir) * leanAmount);
    quat.setFromEuler(euler);
    const hVar = 1 + (Math.random() - 0.5) * 2 * heightVariation;
    scale.set(1, hVar, 1);
    mat.compose(pos, quat, scale);
    normalMatrix.getNormalMatrix(mat);
    const vertexOffset = positions.length / 3;
    for (let v = 0; v < bladePos.count; v++) {
      tempVec.fromBufferAttribute(bladePos, v).applyMatrix4(mat);
      positions.push(tempVec.x, tempVec.y, tempVec.z);
      tempNorm.fromBufferAttribute(bladeNorm, v).applyMatrix3(normalMatrix).normalize();
      normals.push(tempNorm.x, tempNorm.y, tempNorm.z);
      uvs.push(bladeUV.getX(v), bladeUV.getY(v));
    }
    for (let j = 0; j < bladeIdx.count; j++) {
      indices.push(bladeIdx.getX(j) + vertexOffset);
    }
  }
  const geo = new THREE4.BufferGeometry();
  geo.setAttribute("position", new THREE4.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE4.Float32BufferAttribute(normals, 3));
  geo.setAttribute("uv", new THREE4.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  singleBlade.dispose();
  return geo;
}
function createBladeGeometry() {
  const halfBase = 0.5;
  const halfTip = 0.08;
  const vertices = new Float32Array([
    -halfBase,
    0,
    0,
    halfBase,
    0,
    0,
    halfTip,
    1,
    0,
    -halfTip,
    1,
    0
  ]);
  const uvs = new Float32Array([
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1
  ]);
  const normals = new Float32Array([
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1
  ]);
  const geo = new THREE4.BufferGeometry();
  geo.setAttribute("position", new THREE4.BufferAttribute(vertices, 3));
  geo.setAttribute("uv", new THREE4.BufferAttribute(uvs, 2));
  geo.setAttribute("normal", new THREE4.BufferAttribute(normals, 3));
  geo.setIndex([0, 1, 2, 0, 2, 3]);
  return geo;
}
function createBladeMaterial(noiseTexture, opts = {}, terrainBounds = null) {
  const uniforms = {
    baseColor: tslUniform2(new THREE4.Color(opts.baseColor ?? "#3a5a20")),
    tipColor1: tslUniform2(new THREE4.Color(opts.tipColor1 ?? "#6a9a45")),
    tipColor2: tslUniform2(new THREE4.Color(opts.tipColor2 ?? "#4a7a30")),
    uGrassLightIntensity: tslUniform2(opts.lightIntensity ?? 1),
    uNoiseScale: tslUniform2(opts.noiseScale ?? 1.5),
    uRenderDistance: tslUniform2(opts.renderDistance ?? 0),
    noiseTexture: { value: noiseTexture }
  };
  const material = new MeshStandardNodeMaterial3({
    side: THREE4.DoubleSide,
    transparent: true,
    roughness: 1,
    metalness: 0
  });
  material.normalNode = vec33(0, 1, 0);
  const bladeUV = uv2();
  const authoredColor = mix2(uniforms.tipColor1, uniforms.baseColor, float3(1).sub(bladeUV.y));
  let grassColor = authoredColor;
  if (opts.terrainTexture && terrainBounds) {
    uniforms.uTerrainTint = opts.terrainTintNode ?? tslUniform2(new THREE4.Color(opts.terrainTint ?? "#ffffff"));
    uniforms.uGroundMatch = tslUniform2(opts.groundMatch ?? 1);
    const terrainUVNode = positionWorld3.xz.sub(vec22(terrainBounds.minX, terrainBounds.minZ)).div(vec22(terrainBounds.sizeX, terrainBounds.sizeZ));
    const terrainTexNode = texture(opts.terrainTexture, terrainUVNode).level(float3(opts.terrainBlur ?? 5));
    uniforms.terrainTexture = terrainTexNode;
    const rgb = terrainTexNode.rgb;
    const meanColor = texture(opts.terrainTexture, terrainUVNode).level(float3(12)).rgb;
    const groundAlbedo = mix2(rgb, meanColor, 0.3).mul(uniforms.uTerrainTint);
    const matchedBase = groundAlbedo.mul(opts.rootDarken ?? 0.6);
    const matchedTip = groundAlbedo.mul(opts.tipBrighten ?? 1.3);
    const matchedColor = mix2(matchedBase, matchedTip, bladeUV.y);
    grassColor = mix2(authoredColor, matchedColor, uniforms.uGroundMatch);
  }
  let litColor = grassColor.mul(uniforms.uGrassLightIntensity);
  if (opts.lightmap) {
    const { node } = lightmapShadowNode(
      opts.lightmap,
      opts.lightmapWorldSize ?? 1e3,
      opts.lightmapStrength ?? 0.85
    );
    litColor = litColor.mul(node);
  }
  material.colorNode = litColor;
  const worldPos = positionWorld3;
  const distXZ = worldPos.xz.sub(cameraPosition2.xz).length();
  const renderDist = uniforms.uRenderDistance;
  const computedFade = float3(1).sub(
    tslSmoothstep(renderDist.mul(0.6), renderDist, distXZ)
  );
  const distFade = renderDist.greaterThan(0).select(computedFade, float3(1));
  const surfaceNormal = normalize(modelWorldMatrix.mul(vec42(0, 1, 0, 0)).xyz);
  const viewDir = normalize(cameraPosition2.sub(worldPos));
  const backfaceFade = dot(surfaceNormal, viewDir).greaterThan(0).select(float3(1), float3(0));
  const nearDist = worldPos.sub(cameraPosition2).length();
  const nearFade = tslSmoothstep(float3(0.5), float3(2), nearDist);
  material.opacityNode = distFade.mul(nearFade).mul(backfaceFade);
  material.normalNode = vec33(0, 1, 0);
  return { material, uniforms };
}
var GrassBlades = class {
  static async loadAssets(paths) {
    const texLoader = new THREE4.TextureLoader();
    let grainTexture;
    if (paths.grainPath) {
      grainTexture = await texLoader.loadAsync(paths.grainPath);
      grainTexture.wrapS = grainTexture.wrapT = THREE4.RepeatWrapping;
    }
    let noiseTexture;
    if (paths.noisePath) {
      noiseTexture = await texLoader.loadAsync(paths.noisePath);
      noiseTexture.wrapS = noiseTexture.wrapT = THREE4.RepeatWrapping;
    }
    let geometry = null;
    if (paths.modelPath) {
      const gltfLoader = new GLTFLoader();
      geometry = await new Promise((resolve, reject) => {
        gltfLoader.load(paths.modelPath, (gltf) => {
          let geo = null;
          gltf.scene.traverse((child) => {
            if (!(child instanceof THREE4.Mesh)) {
              return;
            }
            if (child.isMesh && !geo) geo = child.geometry;
          });
          geo ? resolve(geo) : reject(new Error("No mesh found in grass model"));
        }, void 0, reject);
      });
    }
    return { noiseTexture, geometry, grainTexture };
  }
  constructor(sourceMesh, assets, opts = {}) {
    const bladeWidth = opts.bladeWidth ?? 0.025;
    const bladeHeight = opts.bladeHeight ?? 0.08;
    sourceMesh.updateWorldMatrix(true, false);
    this._worldMatrix = sourceMesh.matrixWorld.clone();
    let terrainBounds = null;
    const srcMat = Array.isArray(sourceMesh.material) ? sourceMesh.material[0] : sourceMesh.material;
    const terrainTexture = opts.terrainTexture ?? srcMat?.map ?? void 0;
    const terrainTint = opts.terrainTint ?? srcMat?.color ?? void 0;
    if (terrainTexture) {
      const bbox = new THREE4.Box3().setFromObject(sourceMesh);
      terrainBounds = {
        minX: bbox.min.x,
        minZ: bbox.min.z,
        sizeX: Math.max(bbox.max.x - bbox.min.x, 1e-6),
        sizeZ: Math.max(bbox.max.z - bbox.min.z, 1e-6)
      };
    }
    const { material, uniforms } = createBladeMaterial(
      assets.noiseTexture,
      { ...opts, terrainTexture, terrainTint },
      terrainBounds
    );
    this._uniforms = uniforms;
    this._material = material;
    this._shadows = opts.shadows ?? true;
    this._renderDistance = opts.renderDistance ?? 40;
    const scaleXZ = opts.scaleXZ ?? 1;
    const scaleY = opts.scaleY ?? 1;
    this._heightVariation = opts.heightVariation ?? 0.4;
    this._lean = opts.lean ?? 0.3;
    this._layer = opts.layer;
    const clumpSpread = opts.clumpSpread ?? 0.5;
    const density = opts.density ?? 10;
    const bladeCount = opts.bladeCount ?? 30;
    const clumpRadius = Math.min(0.6, clumpSpread / Math.sqrt(density));
    this._clumpRadius = clumpRadius;
    this._geo = createClumpGeometry({
      bladeCount,
      radius: clumpRadius,
      bladeWidth: bladeWidth * scaleXZ,
      bladeHeight: bladeHeight * scaleY,
      heightVariation: this._heightVariation,
      lean: this._lean
    });
    this._cellSize = opts.cellSize ?? 10;
    this._maxNewPerFrame = opts.maxNewCellsPerFrame ?? 15;
    this._density = opts.density ?? 10;
    this._object = new THREE4.Group();
    this._meshPool = [];
    this._activeCells = /* @__PURE__ */ new Map();
    this._cellCache = /* @__PURE__ */ new Map();
    this._cellTriangles = /* @__PURE__ */ new Map();
    this._initChunked(sourceMesh);
  }
  get object() {
    return this._object;
  }
  get mesh() {
    return this._object;
  }
  update(dt, camera) {
    if (camera) {
      this._updateChunks(camera);
    }
  }
  set baseColor(hex) {
    this._uniforms.baseColor.value.set(hex);
  }
  set tipColor1(hex) {
    this._uniforms.tipColor1.value.set(hex);
  }
  set tipColor2(hex) {
    this._uniforms.tipColor2.value.set(hex);
  }
  set lightIntensity(v) {
    this._uniforms.uGrassLightIntensity.value = v;
  }
  set noiseScale(v) {
    this._uniforms.uNoiseScale.value = v;
  }
  /** Update the tint (no-op if ground matching wasn't enabled). If you passed
   *  terrainTintNode, prefer setting that shared node's .value directly. */
  set terrainTint(color) {
    this._uniforms.uTerrainTint?.value.set(color);
  }
  /** 0 = authored colors, 1 = fully ground-matched. Animatable. */
  set groundMatch(v) {
    if (this._uniforms.uGroundMatch) this._uniforms.uGroundMatch.value = v;
  }
  /** Hot-swap the terrain texture the grass samples from. */
  setTerrainTexture(tex) {
    if (!this._uniforms.terrainTexture) return;
    this._uniforms.terrainTexture.value = tex;
  }
  dispose() {
    this._geo.dispose();
    this._material.dispose();
    for (const m of this._activeCells.values()) m.dispose();
    for (const m of this._meshPool) m.dispose();
  }
  /* ================================================================ */
  /*  Chunked mode — lazy jittered-grid sampling                       */
  /* ================================================================ */
  _initChunked(sourceMesh) {
    const cs = this._cellSize;
    const geo = sourceMesh.geometry;
    const pos = geo.attributes.position;
    const nor = geo.attributes.normal;
    const idx = geo.index;
    const triCount = idx ? idx.count / 3 : pos.count / 3;
    const a = new THREE4.Vector3();
    const b = new THREE4.Vector3();
    const c = new THREE4.Vector3();
    const na = new THREE4.Vector3();
    const nb = new THREE4.Vector3();
    const nc = new THREE4.Vector3();
    for (let t = 0; t < triCount; t++) {
      const i0 = idx ? idx.getX(t * 3) : t * 3;
      const i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1;
      const i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
      a.fromBufferAttribute(pos, i0);
      b.fromBufferAttribute(pos, i1);
      c.fromBufferAttribute(pos, i2);
      if (nor) {
        na.fromBufferAttribute(nor, i0);
        nb.fromBufferAttribute(nor, i1);
        nc.fromBufferAttribute(nor, i2);
      } else {
        const ab = new THREE4.Vector3().subVectors(b, a);
        const ac = new THREE4.Vector3().subVectors(c, a);
        na.crossVectors(ab, ac).normalize();
        nb.copy(na);
        nc.copy(na);
      }
      const wa = a.clone().applyMatrix4(this._worldMatrix);
      const wb = b.clone().applyMatrix4(this._worldMatrix);
      const wc = c.clone().applyMatrix4(this._worldMatrix);
      const minCX = Math.floor(Math.min(wa.x, wb.x, wc.x) / cs);
      const maxCX = Math.floor(Math.max(wa.x, wb.x, wc.x) / cs);
      const minCZ = Math.floor(Math.min(wa.z, wb.z, wc.z) / cs);
      const maxCZ = Math.floor(Math.max(wa.z, wb.z, wc.z) / cs);
      for (let gx = minCX; gx <= maxCX; gx++) {
        for (let gz = minCZ; gz <= maxCZ; gz++) {
          const key = gx + "," + gz;
          let cell = this._cellTriangles.get(key);
          if (!cell) {
            cell = { localVerts: [], norms: [], worldVerts: [] };
            this._cellTriangles.set(key, cell);
          }
          cell.localVerts.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
          cell.norms.push(na.x, na.y, na.z, nb.x, nb.y, nb.z, nc.x, nc.y, nc.z);
          cell.worldVerts.push(wa.x, wa.y, wa.z, wb.x, wb.y, wb.z, wc.x, wc.y, wc.z);
        }
      }
    }
    console.log(
      `[GrassBlades] chunked: "${sourceMesh.name}" ${this._cellTriangles.size} cells, density=${this._density}, cellSize=${cs}`
    );
    this._object.matrixAutoUpdate = false;
    this._object.matrix.copy(this._worldMatrix);
    this._object.matrixWorldNeedsUpdate = true;
  }
  _generateCell(key) {
    const cell = this._cellTriangles.get(key);
    if (!cell) return null;
    const { localVerts, norms, worldVerts } = cell;
    const triCount = localVerts.length / 9;
    const spacing = 1 / Math.sqrt(this._density);
    const jitter = spacing * 0.4;
    const cs = this._cellSize;
    const floats = [];
    const parts = key.split(",");
    const cellMinX = parseInt(parts[0]) * cs;
    const cellMaxX = cellMinX + cs;
    const cellMinZ = parseInt(parts[1]) * cs;
    const cellMaxZ = cellMinZ + cs;
    const position = new THREE4.Vector3();
    const normal = new THREE4.Vector3();
    const na = new THREE4.Vector3();
    const nb = new THREE4.Vector3();
    const nc = new THREE4.Vector3();
    const quat = new THREE4.Quaternion();
    const yRot = new THREE4.Quaternion();
    const leanQuat = new THREE4.Quaternion();
    const euler = new THREE4.Euler();
    const yAxis = new THREE4.Vector3(0, 1, 0);
    const scaleVec = new THREE4.Vector3();
    const mat = new THREE4.Matrix4();
    const triData = [];
    for (let ti = 0; ti < triCount; ti++) {
      const wi = ti * 9;
      const wax = worldVerts[wi], waz = worldVerts[wi + 2];
      const wbx = worldVerts[wi + 3], wbz = worldVerts[wi + 5];
      const wcx = worldVerts[wi + 6], wcz = worldVerts[wi + 8];
      const v0x = wbx - wax, v0z = wbz - waz;
      const v1x = wcx - wax, v1z = wcz - waz;
      const d00 = v0x * v0x + v0z * v0z;
      const d01 = v0x * v1x + v0z * v1z;
      const d11 = v1x * v1x + v1z * v1z;
      const det = d00 * d11 - d01 * d01;
      if (Math.abs(det) < 1e-10) continue;
      triData.push({ ti, wax, waz, v0x, v0z, v1x, v1z, d00, d01, d11, invDenom: 1 / det });
    }
    const isInside = (x, z) => {
      for (let t = 0; t < triData.length; t++) {
        const td = triData[t];
        const v2x = x - td.wax, v2z = z - td.waz;
        const d02 = td.v0x * v2x + td.v0z * v2z;
        const d12 = td.v1x * v2x + td.v1z * v2z;
        const bv = (td.d11 * d02 - td.d01 * d12) * td.invDenom;
        const bw = (td.d00 * d12 - td.d01 * d02) * td.invDenom;
        if (bv >= 0 && bw >= 0 && 1 - bv - bw >= 0) return true;
      }
      return false;
    };
    const startX = Math.floor(cellMinX / spacing) * spacing;
    const startZ = Math.floor(cellMinZ / spacing) * spacing;
    for (let gx = startX; gx <= cellMaxX; gx += spacing) {
      for (let gz = startZ; gz <= cellMaxZ; gz += spacing) {
        const px = gx + (Math.random() - 0.5) * jitter * 2;
        const pz = gz + (Math.random() - 0.5) * jitter * 2;
        if (px < cellMinX || px >= cellMaxX || pz < cellMinZ || pz >= cellMaxZ) continue;
        let found = false;
        for (let t = 0; t < triData.length; t++) {
          const td = triData[t];
          const v2x = px - td.wax, v2z = pz - td.waz;
          const d02 = td.v0x * v2x + td.v0z * v2z;
          const d12 = td.v1x * v2x + td.v1z * v2z;
          const bv = (td.d11 * d02 - td.d01 * d12) * td.invDenom;
          const bw = (td.d00 * d12 - td.d01 * d02) * td.invDenom;
          const bu = 1 - bv - bw;
          if (bu < 0 || bv < 0 || bw < 0) continue;
          let clumpScale = 1;
          let fits = false;
          for (const r of [this._clumpRadius, this._clumpRadius * 0.5]) {
            fits = true;
            for (let p = 0; p < 6; p++) {
              const ang = p / 6 * Math.PI * 2;
              if (!isInside(px + Math.cos(ang) * r, pz + Math.sin(ang) * r)) {
                fits = false;
                break;
              }
            }
            if (fits) break;
            clumpScale *= 0.5;
          }
          if (!fits) {
            found = true;
            break;
          }
          const li = td.ti * 9;
          const ni = td.ti * 9;
          position.set(
            bu * localVerts[li] + bv * localVerts[li + 3] + bw * localVerts[li + 6],
            bu * localVerts[li + 1] + bv * localVerts[li + 4] + bw * localVerts[li + 7],
            bu * localVerts[li + 2] + bv * localVerts[li + 5] + bw * localVerts[li + 8]
          );
          na.set(norms[ni], norms[ni + 1], norms[ni + 2]);
          nb.set(norms[ni + 3], norms[ni + 4], norms[ni + 5]);
          nc.set(norms[ni + 6], norms[ni + 7], norms[ni + 8]);
          normal.set(
            bu * na.x + bv * nb.x + bw * nc.x,
            bu * na.y + bv * nb.y + bw * nc.y,
            bu * na.z + bv * nb.z + bw * nc.z
          ).normalize();
          quat.setFromUnitVectors(yAxis, normal);
          yRot.setFromEuler(euler.set(0, Math.random() * Math.PI * 2, 0));
          quat.multiply(yRot);
          const lean = (Math.random() - 0.5) * 2 * this._lean;
          const leanDir = Math.random() * Math.PI * 2;
          leanQuat.setFromEuler(euler.set(
            Math.sin(leanDir) * lean,
            0,
            Math.cos(leanDir) * lean
          ));
          quat.multiply(leanQuat);
          const hVar = 1 + (Math.random() - 0.5) * 2 * this._heightVariation;
          scaleVec.set(clumpScale, hVar, clumpScale);
          mat.compose(position, quat, scaleVec);
          const elements = mat.elements;
          for (let j = 0; j < 16; j++) floats.push(elements[j]);
          found = true;
          break;
        }
      }
    }
    if (floats.length === 0) return null;
    return new Float32Array(floats);
  }
  _updateChunks(camera) {
    const cs = this._cellSize;
    const rd = this._renderDistance;
    const hr = Math.ceil(rd / cs);
    const camX = camera.position.x;
    const camZ = camera.position.z;
    const ccx = Math.floor(camX / cs);
    const ccz = Math.floor(camZ / cs);
    const want = /* @__PURE__ */ new Set();
    const toActivate = [];
    for (let dx = -hr; dx <= hr; dx++) {
      for (let dz = -hr; dz <= hr; dz++) {
        const kx = ccx + dx;
        const kz = ccz + dz;
        const key = kx + "," + kz;
        if (!this._cellTriangles.has(key)) continue;
        const dist = Math.hypot((kx + 0.5) * cs - camX, (kz + 0.5) * cs - camZ);
        if (dist > rd) continue;
        want.add(key);
        if (!this._activeCells.has(key)) {
          toActivate.push({ key, dist });
        }
      }
    }
    if (toActivate.length) {
      toActivate.sort((a, b) => a.dist - b.dist);
      const n = Math.min(this._maxNewPerFrame, toActivate.length);
      for (let i = 0; i < n; i++) {
        this._activateCell(toActivate[i].key);
      }
    }
    for (const [key, mesh] of this._activeCells) {
      if (!want.has(key)) {
        mesh.parent.remove(mesh);
        mesh.visible = false;
        this._meshPool.push(mesh);
        this._activeCells.delete(key);
      }
    }
  }
  _activateCell(key) {
    let data = this._cellCache.get(key);
    if (!data) {
      data = this._generateCell(key);
      if (!data) return;
      this._cellCache.set(key, data);
    }
    const count = data.length / 16;
    const bufferSize = Math.ceil(this._density * this._cellSize * this._cellSize * 1.5);
    let mesh;
    if (this._meshPool.length) {
      mesh = this._meshPool.pop();
      if (mesh?.instanceMatrix?.array && mesh.instanceMatrix.array.length < count * 16) {
        mesh.dispose();
        mesh = this._createInstancedMesh(Math.max(count, bufferSize));
      }
    } else {
      mesh = this._createInstancedMesh(Math.max(count, bufferSize));
    }
    if (!mesh) {
      throw new Error("Unable to create instanced mesh in mesh pool");
    }
    mesh.count = count;
    mesh.instanceMatrix.set(data);
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    mesh.visible = true;
    mesh.matrixAutoUpdate = false;
    mesh.matrix.copy(this._worldMatrix);
    mesh.matrixWorldNeedsUpdate = true;
    this._activeCells.set(key, mesh);
    this._object?.parent?.add(mesh);
  }
  /* ================================================================ */
  /*  Shared helpers                                                    */
  /* ================================================================ */
  _createInstancedMesh(count) {
    const mesh = new THREE4.InstancedMesh(this._geo, this._material, count);
    mesh.receiveShadow = this._shadows;
    mesh.frustumCulled = true;
    mesh.renderOrder = -1;
    if (this._layer !== void 0) mesh.layers.set(this._layer);
    return mesh;
  }
  _buildBladeMatrix(position, normal) {
    const quat = new THREE4.Quaternion();
    const yAxis = new THREE4.Vector3(0, 1, 0);
    quat.setFromUnitVectors(yAxis, normal);
    const yRot = new THREE4.Quaternion().setFromEuler(
      new THREE4.Euler(0, Math.random() * Math.PI * 2, 0)
    );
    quat.multiply(yRot);
    const lean = (Math.random() - 0.5) * 2 * this._lean;
    const leanDir = Math.random() * Math.PI * 2;
    const leanQuat = new THREE4.Quaternion().setFromEuler(
      new THREE4.Euler(
        Math.sin(leanDir) * lean,
        0,
        Math.cos(leanDir) * lean
      )
    );
    quat.multiply(leanQuat);
    const hVar = 1 + (Math.random() - 0.5) * 2 * this._heightVariation;
    const scale = new THREE4.Vector3(1, hVar, 1);
    const mat = new THREE4.Matrix4();
    mat.compose(position, quat, scale);
    return mat;
  }
  _scatterBlades(sourceMesh, instancedMesh, count) {
    const sampler = new MeshSurfaceSampler(sourceMesh).build();
    const position = new THREE4.Vector3();
    const normal = new THREE4.Vector3();
    for (let i = 0; i < count; i++) {
      sampler.sample(position, normal);
      const mat = this._buildBladeMatrix(position, normal);
      instancedMesh.setMatrixAt(i, mat);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    console.log(`[GrassBlades] ${count} blades on "${sourceMesh.name}"`);
  }
  static _getSurfaceArea(mesh) {
    mesh.updateWorldMatrix(true, false);
    const matrix = mesh.matrixWorld;
    const geo = mesh.geometry;
    const pos = geo.attributes.position;
    const idx = geo.index;
    const triCount = idx ? idx.count / 3 : pos.count / 3;
    const a = new THREE4.Vector3();
    const b = new THREE4.Vector3();
    const c = new THREE4.Vector3();
    const ab = new THREE4.Vector3();
    const ac = new THREE4.Vector3();
    const cross = new THREE4.Vector3();
    let total = 0;
    for (let t = 0; t < triCount; t++) {
      const i0 = idx ? idx.getX(t * 3) : t * 3;
      const i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1;
      const i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
      a.fromBufferAttribute(pos, i0).applyMatrix4(matrix);
      b.fromBufferAttribute(pos, i1).applyMatrix4(matrix);
      c.fromBufferAttribute(pos, i2).applyMatrix4(matrix);
      ab.subVectors(b, a);
      ac.subVectors(c, a);
      cross.crossVectors(ab, ac);
      total += cross.length() * 0.5;
    }
    return total;
  }
};

// upstream/fuse/src/shaders/sand.ts
import * as THREE5 from "three/webgpu";
import { MeshStandardNodeMaterial as MeshStandardNodeMaterial4 } from "three/webgpu";
import {
  texture as tslTexture3,
  vec2 as vec23,
  vec3 as vec34,
  vec4 as vec43,
  float as float4,
  mix as mix3,
  smoothstep as smoothstep2,
  positionWorld as positionWorld4,
  uniform as uniform2,
  cameraPosition as cameraPosition3
} from "three/tsl";
var SandMaterial = class {
  constructor(baseMesh, noiseTexture, blendMap, neighborMesh, blendSettings = {}) {
    const baseMat = baseMesh.material;
    if (!(baseMat instanceof THREE5.MeshStandardMaterial)) {
      throw new Error("Base material requires a MeshStandardMaterial");
    }
    const baseTexture = baseMat.map;
    const baseTint = baseMat.color || new THREE5.Color(1, 1, 1);
    const baseTileSize = baseMesh.userData.tileSize || 2.5;
    const baseRoughness = baseMat.roughness ?? 0.9;
    if (!baseTexture) {
      throw new Error("Base material requires a base texture map");
    }
    this.material = new MeshStandardNodeMaterial4({
      transparent: false
    });
    this.material.roughness = baseRoughness;
    if (baseMat.normalMap) {
      this.material.normalMap = baseMat.normalMap;
      this.material.normalScale = baseMat.normalScale?.clone() || new THREE5.Vector2(1, 1);
    }
    const baseTiledUV = positionWorld4.xz.div(float4(baseTileSize));
    const baseColorTex = tslTexture3(baseTexture, baseTiledUV);
    const baseColor = baseColorTex.mul(vec34(baseTint.r, baseTint.g, baseTint.b));
    const sandNoiseFreq = float4(blendSettings.sandNoiseFreq || 0.15);
    const sandNoiseUV1 = positionWorld4.xz.mul(sandNoiseFreq);
    const sandNoise1 = tslTexture3(noiseTexture, sandNoiseUV1).r;
    const sandNoiseUV2 = positionWorld4.xz.mul(sandNoiseFreq.mul(4));
    const sandNoise2 = tslTexture3(noiseTexture, sandNoiseUV2).r;
    const sandVariation = sandNoise1.mul(0.6).add(sandNoise2.mul(0.4));
    const heightRef = float4(blendSettings.sandBaseHeight || 0);
    const heightFactor = positionWorld4.y.sub(heightRef).clamp(-2, 2).div(2);
    const lowSpotDarken = float4(1).sub(
      float4(1).sub(heightFactor).clamp(0, 1).mul(float4(blendSettings.sandLowDarken || 0.25))
    );
    const sandDarkenAmount = float4(1).sub(
      float4(1).sub(sandVariation).mul(float4(blendSettings.sandVariationStrength || 0.5))
    );
    const finalSand = baseColor.mul(sandDarkenAmount).mul(lowSpotDarken);
    if (blendMap && neighborMesh) {
      const neighborMat = neighborMesh.material;
      if (!(neighborMat instanceof THREE5.MeshStandardMaterial)) {
        console.warn(`baseMesh: ${baseMesh.name}`, baseMat);
        console.warn(`neighborMesh: ${neighborMesh.name}`, neighborMat);
        return;
      }
      const neighborTexture = neighborMat.map;
      if (!neighborTexture) {
        return;
      }
      const neighborTint = neighborMat.color || new THREE5.Color(1, 1, 1);
      const neighborTileSize = neighborMesh.userData.tileSize || 2;
      const neighborTiledUV = positionWorld4.xz.div(float4(neighborTileSize));
      const neighborColorTex = tslTexture3(neighborTexture, neighborTiledUV);
      const neighborColor = neighborColorTex.mul(vec34(neighborTint.r, neighborTint.g, neighborTint.b));
      const blendTex = new THREE5.DataTexture(
        new Uint8Array(blendMap.data),
        blendMap.width,
        blendMap.height,
        THREE5.RGBAFormat
        // THREE.RedFormat,
      );
      blendTex.needsUpdate = true;
      blendTex.magFilter = THREE5.LinearFilter;
      blendTex.minFilter = THREE5.LinearFilter;
      blendTex.generateMipmaps = false;
      blendTex.colorSpace = THREE5.NoColorSpace;
      blendTex.wrapS = THREE5.ClampToEdgeWrapping;
      blendTex.wrapT = THREE5.ClampToEdgeWrapping;
      const boundsX = uniform2(blendMap.bounds.x);
      const boundsY = uniform2(blendMap.bounds.y);
      const boundsW = uniform2(blendMap.bounds.w);
      const boundsH = uniform2(blendMap.bounds.h);
      const blendU = positionWorld4.x.sub(boundsX).div(boundsW);
      const blendV = positionWorld4.z.sub(boundsY).div(boundsH);
      const blendSample = tslTexture3(blendTex, vec23(blendU, blendV)).r;
      const noiseFreq = float4(blendSettings.noiseFreq || 0.5);
      const noiseAmp = float4(blendSettings.noiseAmp || 0.3);
      const noiseUV = positionWorld4.xz.mul(noiseFreq);
      const noiseSample = tslTexture3(noiseTexture, noiseUV).r;
      const distFromEdge = blendSample.sub(0.5).mul(2).clamp(0, 1);
      const cameraDist = positionWorld4.sub(cameraPosition3).length();
      const distSoften = smoothstep2(float4(20), float4(120), cameraDist);
      const distScale = smoothstep2(float4(10), float4(100), cameraDist).mul(float4(blendSettings.distanceExaggeration || 1.5)).add(1);
      const noiseUV2 = positionWorld4.xz.mul(noiseFreq.mul(3.2));
      const noiseSample2 = tslTexture3(noiseTexture, noiseUV2).r;
      const combinedNoise = noiseSample.mul(0.6).add(noiseSample2.mul(0.4));
      const effectiveNoiseAmp = noiseAmp.mul(float4(1).sub(distSoften.mul(0.7)));
      const scaledNoiseAmp = effectiveNoiseAmp.mul(distScale);
      const cutoff = combinedNoise.mul(scaledNoiseAmp);
      const transitionWidth = float4(0.02).add(distSoften.mul(0.15));
      const isSand = smoothstep2(cutoff, cutoff.add(transitionWidth), distFromEdge);
      const dirtColor = vec34(
        new THREE5.Color(blendSettings.dirtTint || "#5a4a32").r,
        new THREE5.Color(blendSettings.dirtTint || "#5a4a32").g,
        new THREE5.Color(blendSettings.dirtTint || "#5a4a32").b
      );
      const dirtWidth = float4(blendSettings.dirtWidth || 0.15).mul(distScale);
      const dirtAmount = smoothstep2(cutoff.sub(dirtWidth), cutoff, distFromEdge).mul(float4(blendSettings.dirtStrength || 0.5));
      const tintedGrass = mix3(neighborColor, vec43(dirtColor, 1), dirtAmount);
      const lipWidth = float4(0.08).mul(distScale);
      const lipStart = cutoff.sub(lipWidth);
      const lipEnd = cutoff.add(0.02);
      const lipStrength = float4(blendSettings.lipDarken || 0.25);
      const lipAmount = smoothstep2(lipStart, lipEnd, distFromEdge).mul(float4(1).sub(smoothstep2(lipEnd, lipEnd.add(0.05), distFromEdge)));
      const lipDarken = float4(1).sub(lipAmount.mul(lipStrength));
      const surfaceColor = mix3(tintedGrass, finalSand, isSand);
      this.material.colorNode = surfaceColor.mul(lipDarken);
    } else {
      this.material.colorNode = finalSand;
    }
    baseMesh.material = this.material;
  }
  dispose() {
    this.material.dispose();
  }
};

// upstream/fuse/src/shaders/water/lake.ts
import * as THREE7 from "three";

// upstream/fuse/src/shaders/water/index.ts
import * as THREE6 from "three/webgpu";
import { MeshPhysicalNodeMaterial } from "three/webgpu";
import {
  texture as texture2,
  uv as uv3,
  uniform as uniform3,
  vec2 as vec24,
  vec3 as vec35,
  float as float5,
  fract as fract2,
  abs,
  mix as mix4,
  clamp,
  pow,
  sub,
  dot as dot2,
  normalize as normalize2,
  positionWorld as positionWorld5,
  normalWorld,
  cameraPosition as cameraPosition4,
  normalMap as normalMap2,
  pmremTexture,
  viewportDepthTexture,
  linearDepth,
  smoothstep as tslSmoothstep2,
  cameraFar
} from "three/tsl";

// upstream/fuse/src/images/waternormals.jpg
var waternormals_default = "/vendor/fuse/waternormals-ZWMLDQMS.jpg";

// upstream/fuse/src/shaders/water/index.ts
var WaterSurface = class {
  /** Override to supply a custom UV node (e.g. world-space UVs for an ocean). */
  uvNode() {
    return uv3();
  }
  constructor(waterObject, flowMapData, options = {}) {
    this.material = new MeshPhysicalNodeMaterial({
      transparent: true,
      side: THREE6.DoubleSide,
      depthWrite: false
    });
    this.water = new THREE6.Mesh(waterObject.geometry.clone(), this.material);
    this.water.renderOrder = -1;
    if (options.yOffset) {
      this.water.position.set(this.water.position.x, this.water.position.y - options.yOffset, this.water.position.z);
    }
    this.timeUniform = uniform3(0);
    const pos = this.water.geometry.attributes.position;
    const uvAttr = new Float32Array(pos.count * 2);
    let minX = Infinity, minZ = Infinity, maxX = -Infinity, maxZ = -Infinity;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      if (x < minX) minX = x;
      if (z < minZ) minZ = z;
      if (x > maxX) maxX = x;
      if (z > maxZ) maxZ = z;
    }
    const rangeX = maxX - minX || 1;
    const rangeZ = maxZ - minZ || 1;
    for (let i = 0; i < pos.count; i++) {
      uvAttr[i * 2] = (pos.getX(i) - minX) / rangeX;
      uvAttr[i * 2 + 1] = (pos.getZ(i) - minZ) / rangeZ;
    }
    this.water.geometry.setAttribute("uv", new THREE6.BufferAttribute(uvAttr, 2));
    const opts = {
      speed: 0.25,
      flowStrength: 0.15,
      sideFlowStrength: 0.2,
      envMapIntensity: 0.5,
      uvTiling: [6, 6],
      normalStrength: 1,
      shallowColor: new THREE6.Color("#243f42"),
      deepColor: new THREE6.Color("#0a1f2a"),
      specularColor: new THREE6.Color("#ffffff"),
      opacity: 0.7,
      roughness: 0.15,
      depthRange: 5,
      foamWidth: 1,
      foamColor: new THREE6.Color("#7a9889"),
      foamDensity: 0.98,
      foamSharpness: 0.25,
      foamOpacity: 0.2,
      ...options
    };
    this.speed = opts.speed;
    const flowSpeed = float5(opts.speed);
    const flowStrength = float5(opts.flowStrength);
    const sideFlowStrength = float5(opts.sideFlowStrength);
    const tileSize = Math.min(rangeX, rangeZ) / opts.uvTiling[0];
    const tiling = vec24(rangeX / tileSize, rangeZ / tileSize);
    const normStrength = float5(opts.normalStrength);
    const textureLoader = new THREE6.TextureLoader();
    const waterNormalTex = textureLoader.load(waternormals_default, () => {
      this.material.needsUpdate = true;
    });
    waterNormalTex.wrapS = waterNormalTex.wrapT = THREE6.RepeatWrapping;
    let flowMapTexture;
    if (flowMapData) {
      flowMapTexture = new THREE6.DataTexture(
        new Uint8Array(flowMapData.data),
        flowMapData.width,
        flowMapData.height,
        THREE6.RGBAFormat
      );
    } else {
      flowMapTexture = new THREE6.DataTexture(
        new Uint8Array([160, 180, 200, 255]),
        1,
        1,
        THREE6.RGBAFormat
      );
    }
    flowMapTexture.needsUpdate = true;
    flowMapTexture.minFilter = THREE6.LinearFilter;
    flowMapTexture.magFilter = THREE6.LinearFilter;
    flowMapTexture.wrapS = flowMapTexture.wrapT = THREE6.ClampToEdgeWrapping;
    const baseUV = this.uvNode();
    const flow = texture2(flowMapTexture, baseUV).rg.sub(0.5).mul(2).mul(flowStrength).negate();
    const speed = texture2(flowMapTexture, baseUV).b;
    const t = this.timeUniform.mul(flowSpeed);
    const phase0 = fract2(t);
    const phase1 = fract2(t.add(0.5));
    const blend = abs(phase0.mul(2).sub(1));
    const tiledUV = baseUV.mul(tiling);
    const uv0 = tiledUV.add(flow.mul(speed).mul(phase0));
    const uv1 = tiledUV.add(flow.mul(speed).mul(phase1));
    const n0 = texture2(waterNormalTex, uv0);
    const n1 = texture2(waterNormalTex, uv1);
    const blendedNormals = mix4(n0, n1, blend);
    const detailTiling = vec24(rangeX / tileSize * 2.5, rangeZ / tileSize * 2.5);
    const detailTime = this.timeUniform.mul(0.23);
    const detailPhase0 = fract2(detailTime);
    const detailPhase1 = fract2(detailTime.add(0.5));
    const detailBlend = abs(detailPhase0.mul(2).sub(1));
    const detailFlow = vec24(flow.y.negate(), flow.x).mul(0.5);
    const detailUV = baseUV.mul(detailTiling);
    const d0 = texture2(waterNormalTex, detailUV.add(detailFlow.mul(detailPhase0)));
    const d1 = texture2(waterNormalTex, detailUV.add(detailFlow.mul(detailPhase1)));
    const detailNormals = mix4(d0, d1, detailBlend);
    const combinedNormals = mix4(blendedNormals, detailNormals, sideFlowStrength);
    this.material.normalNode = normalMap2(combinedNormals, vec24(normStrength));
    const viewDir = normalize2(cameraPosition4.sub(positionWorld5));
    const NdotV = clamp(dot2(normalWorld, viewDir), 0, 1);
    const fresnel = pow(sub(float5(1), NdotV), float5(3));
    let depthDiff;
    if (opts.qualityLevel === 0 /* Low */) {
      depthDiff = float5(opts.depthRange);
    } else {
      const sceneDepth = linearDepth(viewportDepthTexture());
      const waterDepth = linearDepth();
      depthDiff = sceneDepth.sub(waterDepth).max(0).mul(cameraFar);
    }
    const depthFade = tslSmoothstep2(float5(0), float5(opts.depthRange), depthDiff);
    const baseOpacity = mix4(float5(0.05), float5(opts.opacity), depthFade);
    this.material.opacityNode = clamp(
      mix4(baseOpacity, float5(0.95), fresnel),
      0,
      1
    );
    const shallowCol = vec35(opts.shallowColor.r, opts.shallowColor.g, opts.shallowColor.b);
    const deepCol = vec35(opts.deepColor.r, opts.deepColor.g, opts.deepColor.b);
    const waterColor = mix4(shallowCol, deepCol, depthFade);
    const foamThreshold = float5(opts.foamWidth);
    const foamFactor = tslSmoothstep2(foamThreshold, float5(0), depthDiff);
    const foamN0_a = texture2(waterNormalTex, uv0.mul(1.5)).r;
    const foamN1_a = texture2(waterNormalTex, uv1.mul(1.5)).r;
    const foamLarge = mix4(foamN0_a, foamN1_a, blend);
    const foamN0_b = texture2(waterNormalTex, uv0.mul(4)).g;
    const foamN1_b = texture2(waterNormalTex, uv1.mul(4)).g;
    const foamSmall = mix4(foamN0_b, foamN1_b, blend);
    const foamNoise = foamLarge.mul(foamSmall);
    const foamCutoff = float5(1).sub(foamFactor.mul(opts.foamDensity));
    const foamPatches = tslSmoothstep2(foamCutoff, foamCutoff.add(opts.foamSharpness), foamNoise);
    const foam = foamPatches.mul(opts.foamOpacity);
    const foamCol = vec35(opts.foamColor.r, opts.foamColor.g, opts.foamColor.b);
    this.material.colorNode = mix4(waterColor, foamCol, foam);
    this.material.roughness = opts.roughness;
    this.material.metalness = 0;
    this.material.specularIntensity = 1;
    this.material.specularColor = opts.specularColor;
    this.material.envMapIntensity = opts.envMapIntensity;
    this.material.emissive = opts.shallowColor.clone().multiplyScalar(0.15);
  }
  updateEnvironment(envMap) {
    this.material.envMap = envMap;
    this.material.envNode = pmremTexture(envMap);
    this.material.needsUpdate = true;
  }
  update(_dt) {
    this.timeUniform.value += this.speed / 60;
  }
};

// upstream/fuse/src/shaders/water/lake.ts
var LakeSurface = class extends WaterSurface {
  constructor(waterObject, options = {}) {
    super(waterObject, void 0, {
      speed: 0.25,
      flowStrength: 0.8,
      sideFlowStrength: 0.35,
      uvTiling: [6, 6],
      normalStrength: 0.8,
      shallowColor: new THREE7.Color("#27383b"),
      deepColor: new THREE7.Color("#050d0f"),
      depthRange: 5,
      roughness: 0.05,
      // shallowColor: new THREE.Color('#88ccbb'),
      // roughness: 0.8,
      opacity: 0.9,
      yOffset: 0,
      envMapIntensity: 0.1,
      ...options
    });
  }
};

// upstream/fuse/src/shaders/putting.ts
import * as THREE8 from "three/webgpu";
import {
  vec2 as vec25,
  vec3 as vec36,
  vec4 as vec44,
  float as float6,
  uniform as tslUniform3,
  positionWorld as positionWorld6,
  smoothstep as tslSmoothstep3,
  mix as mix5,
  fwidth,
  Fn,
  Discard
} from "three/tsl";
var pristineGridAxis = (coord, uvLW) => {
  const gridDist = coord.fract().mul(2).sub(1).abs().oneMinus();
  const dd = fwidth(coord);
  const drawW = uvLW.max(dd.mul(2));
  const aa = dd.mul(1.5);
  const mask = tslSmoothstep3(drawW.add(aa), drawW.sub(aa), gridDist).mul(uvLW.div(drawW).clamp(0.3, 1));
  const moire = dd.mul(2).sub(1).clamp(0, 1);
  return mix5(mask, uvLW, moire);
};
var PuttingGridMaterial = class {
  constructor(object, options = {}) {
    this.fadeSpeed = 6;
    this.gridAngleUniform = tslUniform3(0);
    this.intensityUniform = tslUniform3(0);
    this.cellSizeVUniform = tslUniform3(1);
    this.holePosUniform = tslUniform3(new THREE8.Vector3());
    this.cameraPosUniform = tslUniform3(new THREE8.Vector3());
    this.targetIntensity = 1;
    this.currentIntensity = 0;
    this.elapsed = 0;
    this.edges = [];
    this.mesh = null;
    this.gridCenter = new THREE8.Vector3();
    this.currentAngle = 0;
    this.compression = 1;
    this.gridSize = options.gridSize ?? 0.7;
    this.lineWidth = options.lineWidth ?? 5e-3;
    this.lineColor = options.lineColor ?? new THREE8.Color(1, 0.5, 0.02);
    this.lineOpacity = options.lineOpacity ?? 0.2;
    this.dotRadius = options.dotRadius ?? 8e-3;
    this.dotColor = options.dotColor ?? new THREE8.Color(1, 1, 1);
    this.dotOpacity = options.dotOpacity ?? 0.1;
    this.baseSpeed = options.baseSpeed ?? 5;
    this.minSpeed = options.minSpeed ?? 0.05;
    if (options.holeWorldPos) {
      this.holePosUniform.value.set(options.holeWorldPos.x, 0, options.holeWorldPos.z);
    }
    if (!(object instanceof THREE8.Mesh)) return;
    this.mesh = object;
    this.setupMaterial(object, options);
    this.buildGrid(0);
  }
  // -----------------------------------------------------------------
  // Grid line shader (Pristine Grid — lines only, no dots)
  // -----------------------------------------------------------------
  setupMaterial(object, options) {
    const origMat = object.material;
    const mat = new GrassSurface(origMat, options.surfaceOptions ?? {});
    const cellSizeU = float6(this.gridSize);
    const uvLW = float6(this.lineWidth / this.gridSize);
    const lineColorRGB = vec36(this.lineColor.r, this.lineColor.g, this.lineColor.b);
    const lineOpacityU = float6(this.lineOpacity);
    const xz = positionWorld6.xz;
    const rotate2D = (v, angle) => {
      const c = angle.cos();
      const s = angle.sin();
      return vec25(
        v.x.mul(c).sub(v.y.mul(s)),
        v.x.mul(s).add(v.y.mul(c))
      );
    };
    const xzGrid = rotate2D(xz, this.gridAngleUniform);
    const uvU = xzGrid.x.div(cellSizeU);
    const uvV = xzGrid.y.div(this.cellSizeVUniform);
    const lineU = pristineGridAxis(uvU, uvLW);
    const lineV = pristineGridAxis(uvV, uvLW);
    const grid = lineU.add(lineV).sub(lineU.mul(lineV));
    const gridBlend = grid.mul(lineOpacityU).mul(this.intensityUniform);
    const baseColor = mat.surfaceColor;
    const color = baseColor.add(lineColorRGB.mul(gridBlend));
    const fragDist = positionWorld6.sub(this.cameraPosUniform).length();
    const distFade = tslSmoothstep3(float6(40), float6(20), fragDist);
    const fadedColor = mix5(baseColor, color, distFade);
    const holeRadius = float6(0.054);
    const holeDist = positionWorld6.xz.sub(this.holePosUniform.xz).length();
    const g = fwidth(holeDist).clamp(8e-4, 0.02);
    const holeMask = tslSmoothstep3(holeRadius.sub(g), holeRadius.add(g), holeDist);
    const finalColor = fadedColor;
    mat.colorNode = Fn(() => {
      Discard(holeMask.lessThan(0.5));
      return vec44(finalColor.rgb, 1);
    })();
    mat.transparent = false;
    mat.needsUpdate = true;
    object.material = mat;
    this.material = mat;
  }
  // -----------------------------------------------------------------
  // Raycast to find the green surface at a world XZ position
  // -----------------------------------------------------------------
  sampleSurface(x, z) {
    if (!this.mesh) return { point: new THREE8.Vector3(x, 0, z), found: false };
    const rc = new THREE8.Raycaster(
      new THREE8.Vector3(x, 100, z),
      new THREE8.Vector3(0, -1, 0)
    );
    const hits = rc.intersectObject(this.mesh, false);
    if (hits.length > 0) return { point: hits[0].point.clone(), found: true };
    return { point: new THREE8.Vector3(x, 0, z), found: false };
  }
  // -----------------------------------------------------------------
  // Build / rebuild the dot grid at a given angle + compression
  // -----------------------------------------------------------------
  buildGrid(angle, compression = 1) {
    if (!this.mesh) return;
    if (this.dotsMesh) {
      this.dotsMesh.parent?.remove(this.dotsMesh);
      this.dotsMesh.geometry.dispose();
      this.dotsMesh.material.dispose();
      this.dotsMesh = void 0;
    }
    this.currentAngle = angle;
    this.compression = compression;
    this.gridAngleUniform.value = angle;
    this.edges = [];
    this.elapsed = 0;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const box = new THREE8.Box3().setFromObject(this.mesh);
    this.gridCenter.copy(box.getCenter(new THREE8.Vector3()));
    const gsH = this.gridSize;
    const gsV = this.gridSize * compression;
    this.cellSizeVUniform.value = gsV;
    let minN = Infinity, maxN = -Infinity;
    let minM = Infinity, maxM = -Infinity;
    for (let i = 0; i < 8; i++) {
      const cx = i & 1 ? box.max.x : box.min.x;
      const cz = i & 4 ? box.max.z : box.min.z;
      const rotX = cx * cosA - cz * sinA;
      const rotY = cx * sinA + cz * cosA;
      minN = Math.min(minN, rotX / gsH);
      maxN = Math.max(maxN, rotX / gsH);
      minM = Math.min(minM, rotY / gsV);
      maxM = Math.max(maxM, rotY / gsV);
    }
    const n0 = Math.floor(minN);
    const n1 = Math.ceil(maxN);
    const m0 = Math.floor(minM);
    const m1 = Math.ceil(maxM);
    const cols = n1 - n0 + 1;
    const rows = m1 - m0 + 1;
    const pts = [];
    for (let mi = 0; mi < rows; mi++) {
      pts[mi] = [];
      for (let ni = 0; ni < cols; ni++) {
        const n = n0 + ni;
        const m = m0 + mi;
        const wx = n * gsH * cosA + m * gsV * sinA;
        const wz = -n * gsH * sinA + m * gsV * cosA;
        const s = this.sampleSurface(wx, wz);
        pts[mi][ni] = s.found ? s.point : null;
      }
    }
    const addEdge = (a, b) => {
      if (!a || !b) {
        this.edges.push({ start: new THREE8.Vector3(), end: new THREE8.Vector3(), slope: 0, duration: 1, valid: false });
        return;
      }
      const dy = a.y - b.y;
      const start = dy >= 0 ? a : b;
      const end = dy >= 0 ? b : a;
      const dist = start.distanceTo(end);
      const slope = Math.abs(dy) / Math.max(dist, 1e-3);
      const speed = Math.max(this.minSpeed, this.baseSpeed * slope);
      this.edges.push({
        start: start.clone(),
        end: end.clone(),
        slope,
        duration: dist / speed,
        valid: true
      });
    };
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols - 1; c++)
        addEdge(pts[r][c], pts[r][c + 1]);
    for (let r = 0; r < rows - 1; r++)
      for (let c = 0; c < cols; c++)
        addEdge(pts[r][c], pts[r + 1][c]);
    if (this.edges.length === 0) return;
    const geo = new THREE8.SphereGeometry(1, 8, 6);
    const dotMat = new THREE8.MeshStandardMaterial({ color: this.dotColor, opacity: this.dotOpacity });
    this.dotsMesh = new THREE8.InstancedMesh(geo, dotMat, this.edges.length);
    this.dotsMesh.frustumCulled = false;
    if (this.mesh.parent) {
      this.mesh.parent.add(this.dotsMesh);
    }
  }
  // -----------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------
  setEnabled(enabled, immediate = false) {
    this.targetIntensity = enabled ? 1 : 0;
    if (immediate) {
      this.currentIntensity = this.targetIntensity;
      this.intensityUniform.value = this.targetIntensity;
    }
    if (this.dotsMesh) this.dotsMesh.visible = enabled;
  }
  setHolePosition(position) {
    this.holePosUniform.value.set(position.x, 0, position.z);
  }
  updateGrid(camera) {
    const dir = new THREE8.Vector3();
    camera.getWorldDirection(dir);
    const newAngle = Math.atan2(dir.x, dir.z);
    const cosA = Math.cos(newAngle);
    const sinA = Math.sin(newAngle);
    const c = this.gridCenter;
    const mx = camera.position.x + (c.x - camera.position.x) * 0.35;
    const mz = camera.position.z + (c.z - camera.position.z) * 0.35;
    const pA = new THREE8.Vector3(mx, c.y, mz).project(camera);
    const pH = new THREE8.Vector3(mx + cosA, c.y, mz - sinA).project(camera);
    const pV = new THREE8.Vector3(mx + sinA, c.y, mz + cosA).project(camera);
    const screenH = Math.sqrt((pH.x - pA.x) ** 2 + (pH.y - pA.y) ** 2);
    const screenV = Math.sqrt((pV.x - pA.x) ** 2 + (pV.y - pA.y) ** 2);
    const newCompression = screenV > 1e-3 ? Math.min(Math.max(screenH / screenV, 1), 5) : this.compression;
    if (Math.abs(newAngle - this.currentAngle) > 0.035 || Math.abs(newCompression - this.compression) > 0.3) {
      this.buildGrid(newAngle, newCompression);
    }
  }
  update(dt, camera) {
    this.elapsed += dt;
    const t = 1 - Math.exp(-this.fadeSpeed * dt);
    this.currentIntensity += (this.targetIntensity - this.currentIntensity) * t;
    this.intensityUniform.value = this.currentIntensity;
    this.cameraPosUniform.value.copy(camera.position);
    if (!this.dotsMesh) return;
    const mat4 = new THREE8.Matrix4();
    const sc = this.dotRadius;
    const projA = new THREE8.Vector3();
    const projB = new THREE8.Vector3();
    const targetScreenSpeed = 0.15;
    for (let i = 0; i < this.edges.length; i++) {
      const e = this.edges[i];
      if (!e.valid) {
        mat4.makeTranslation(0, -1e3, 0);
      } else {
        projA.copy(e.start).project(camera);
        projB.copy(e.end).project(camera);
        if (projA.z > 1 || projB.z > 1) {
          mat4.makeTranslation(0, -1e3, 0);
          this.dotsMesh.setMatrixAt(i, mat4);
          continue;
        }
        const dotDist = Math.sqrt(
          ((e.start.x + e.end.x) * 0.5 - camera.position.x) ** 2 + ((e.start.y + e.end.y) * 0.5 - camera.position.y) ** 2 + ((e.start.z + e.end.z) * 0.5 - camera.position.z) ** 2
        );
        const dotFade = Math.max(0, Math.min(1, (60 - dotDist) / 10));
        if (dotFade <= 0) {
          mat4.makeTranslation(0, -1e3, 0);
          this.dotsMesh.setMatrixAt(i, mat4);
          continue;
        }
        const tt = this.elapsed % e.duration / e.duration;
        const px = e.start.x + (e.end.x - e.start.x) * tt;
        const py = e.start.y + (e.end.y - e.start.y) * tt;
        const pz = e.start.z + (e.end.z - e.start.z) * tt;
        mat4.makeScale(sc * dotFade, sc * dotFade, sc * dotFade);
        mat4.setPosition(px, py, pz);
      }
      this.dotsMesh.setMatrixAt(i, mat4);
    }
    this.dotsMesh.instanceMatrix.needsUpdate = true;
  }
  dispose() {
    if (this.material) {
      this.material.dispose();
      this.material = void 0;
    }
    if (this.dotsMesh) {
      this.dotsMesh.parent?.remove(this.dotsMesh);
      this.dotsMesh.geometry.dispose();
      this.dotsMesh.material.dispose();
      this.dotsMesh = void 0;
    }
  }
};

// node_modules/three/examples/jsm/loaders/HDRLoader.js
import {
  DataTextureLoader,
  DataUtils,
  FloatType,
  HalfFloatType,
  LinearFilter as LinearFilter4,
  LinearSRGBColorSpace as LinearSRGBColorSpace2
} from "three";
var HDRLoader = class extends DataTextureLoader {
  /**
      * Constructs a new RGBE/HDR loader.
      *
      * @param {LoadingManager} [manager] - The loading manager.
      */
  constructor(manager) {
    super(manager);
    this.type = HalfFloatType;
  }
  /**
      * Parses the given RGBE texture data.
      *
      * @param {ArrayBuffer} buffer - The raw texture data.
      * @return {DataTextureLoader~TexData} An object representing the parsed texture data.
      */
  parse(buffer) {
    const rgbe_read_error = 1, rgbe_write_error = 2, rgbe_format_error = 3, rgbe_memory_error = 4, rgbe_error = function(rgbe_error_code, msg) {
      switch (rgbe_error_code) {
        case rgbe_read_error:
          throw new Error("THREE.HDRLoader: Read Error: " + (msg || ""));
        case rgbe_write_error:
          throw new Error("THREE.HDRLoader: Write Error: " + (msg || ""));
        case rgbe_format_error:
          throw new Error("THREE.HDRLoader: Bad File Format: " + (msg || ""));
        default:
        case rgbe_memory_error:
          throw new Error("THREE.HDRLoader: Memory Error: " + (msg || ""));
      }
    }, RGBE_VALID_PROGRAMTYPE = 1, RGBE_VALID_FORMAT = 2, RGBE_VALID_DIMENSIONS = 4, NEWLINE = "\n", fgets = function(buffer2, lineLimit, consume) {
      const chunkSize = 128;
      lineLimit = !lineLimit ? 1024 : lineLimit;
      let p = buffer2.pos, i = -1, len = 0, s = "", chunk = String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
      while (0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer2.byteLength) {
        s += chunk;
        len += chunk.length;
        p += chunkSize;
        chunk = String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
      }
      if (-1 < i) {
        if (false !== consume) buffer2.pos += len + i + 1;
        return s + chunk.slice(0, i);
      }
      return false;
    }, RGBE_ReadHeader = function(buffer2) {
      const magic_token_re = /^#\?(\S+)/, gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, format_re = /^\s*FORMAT=(\S+)\s*$/, dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, header = {
        valid: 0,
        /* indicate which fields are valid */
        string: "",
        /* the actual header string */
        comments: "",
        /* comments found in header */
        programtype: "RGBE",
        /* listed at beginning of file to identify it after "#?". defaults to "RGBE" */
        format: "",
        /* RGBE format, default 32-bit_rle_rgbe */
        gamma: 1,
        /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */
        exposure: 1,
        /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */
        width: 0,
        height: 0
        /* image dimensions, width/height */
      };
      let line, match;
      if (buffer2.pos >= buffer2.byteLength || !(line = fgets(buffer2))) {
        rgbe_error(rgbe_read_error, "no header found");
      }
      if (!(match = line.match(magic_token_re))) {
        rgbe_error(rgbe_format_error, "bad initial token");
      }
      header.valid |= RGBE_VALID_PROGRAMTYPE;
      header.programtype = match[1];
      header.string += line + "\n";
      while (true) {
        line = fgets(buffer2);
        if (false === line) break;
        header.string += line + "\n";
        if ("#" === line.charAt(0)) {
          header.comments += line + "\n";
          continue;
        }
        if (match = line.match(gamma_re)) {
          header.gamma = parseFloat(match[1]);
        }
        if (match = line.match(exposure_re)) {
          header.exposure = parseFloat(match[1]);
        }
        if (match = line.match(format_re)) {
          header.valid |= RGBE_VALID_FORMAT;
          header.format = match[1];
        }
        if (match = line.match(dimensions_re)) {
          header.valid |= RGBE_VALID_DIMENSIONS;
          header.height = parseInt(match[1], 10);
          header.width = parseInt(match[2], 10);
        }
        if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;
      }
      if (!(header.valid & RGBE_VALID_FORMAT)) {
        rgbe_error(rgbe_format_error, "missing format specifier");
      }
      if (!(header.valid & RGBE_VALID_DIMENSIONS)) {
        rgbe_error(rgbe_format_error, "missing image size specifier");
      }
      return header;
    }, RGBE_ReadPixels_RLE = function(buffer2, w2, h2) {
      const scanline_width = w2;
      if (
        // run length encoding is not allowed so read flat
        scanline_width < 8 || scanline_width > 32767 || // this file is not run length encoded
        (2 !== buffer2[0] || 2 !== buffer2[1] || buffer2[2] & 128)
      ) {
        return new Uint8Array(buffer2);
      }
      if (scanline_width !== (buffer2[2] << 8 | buffer2[3])) {
        rgbe_error(rgbe_format_error, "wrong scanline width");
      }
      const data_rgba = new Uint8Array(4 * w2 * h2);
      if (!data_rgba.length) {
        rgbe_error(rgbe_memory_error, "unable to allocate buffer space");
      }
      let offset = 0, pos = 0;
      const ptr_end = 4 * scanline_width;
      const rgbeStart = new Uint8Array(4);
      const scanline_buffer = new Uint8Array(ptr_end);
      let num_scanlines = h2;
      while (num_scanlines > 0 && pos < buffer2.byteLength) {
        if (pos + 4 > buffer2.byteLength) {
          rgbe_error(rgbe_read_error);
        }
        rgbeStart[0] = buffer2[pos++];
        rgbeStart[1] = buffer2[pos++];
        rgbeStart[2] = buffer2[pos++];
        rgbeStart[3] = buffer2[pos++];
        if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) {
          rgbe_error(rgbe_format_error, "bad rgbe scanline format");
        }
        let ptr = 0, count;
        while (ptr < ptr_end && pos < buffer2.byteLength) {
          count = buffer2[pos++];
          const isEncodedRun = count > 128;
          if (isEncodedRun) count -= 128;
          if (0 === count || ptr + count > ptr_end) {
            rgbe_error(rgbe_format_error, "bad scanline data");
          }
          if (isEncodedRun) {
            const byteValue = buffer2[pos++];
            for (let i = 0; i < count; i++) {
              scanline_buffer[ptr++] = byteValue;
            }
          } else {
            scanline_buffer.set(buffer2.subarray(pos, pos + count), ptr);
            ptr += count;
            pos += count;
          }
        }
        const l = scanline_width;
        for (let i = 0; i < l; i++) {
          let off = 0;
          data_rgba[offset] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 1] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 2] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 3] = scanline_buffer[i + off];
          offset += 4;
        }
        num_scanlines--;
      }
      return data_rgba;
    };
    const RGBEByteToRGBFloat = function(sourceArray, sourceOffset, destArray, destOffset) {
      const e = sourceArray[sourceOffset + 3];
      const scale = Math.pow(2, e - 128) / 255;
      destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;
      destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;
      destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;
      destArray[destOffset + 3] = 1;
    };
    const RGBEByteToRGBHalf = function(sourceArray, sourceOffset, destArray, destOffset) {
      const e = sourceArray[sourceOffset + 3];
      const scale = Math.pow(2, e - 128) / 255;
      destArray[destOffset + 0] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 0] * scale, 65504));
      destArray[destOffset + 1] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 1] * scale, 65504));
      destArray[destOffset + 2] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 2] * scale, 65504));
      destArray[destOffset + 3] = DataUtils.toHalfFloat(1);
    };
    const byteArray = new Uint8Array(buffer);
    byteArray.pos = 0;
    const rgbe_header_info = RGBE_ReadHeader(byteArray);
    const w = rgbe_header_info.width, h = rgbe_header_info.height, image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);
    let data, type;
    let numElements;
    switch (this.type) {
      case FloatType:
        numElements = image_rgba_data.length / 4;
        const floatArray = new Float32Array(numElements * 4);
        for (let j = 0; j < numElements; j++) {
          RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 4);
        }
        data = floatArray;
        type = FloatType;
        break;
      case HalfFloatType:
        numElements = image_rgba_data.length / 4;
        const halfArray = new Uint16Array(numElements * 4);
        for (let j = 0; j < numElements; j++) {
          RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 4);
        }
        data = halfArray;
        type = HalfFloatType;
        break;
      default:
        throw new Error("THREE.HDRLoader: Unsupported type: " + this.type);
    }
    return {
      width: w,
      height: h,
      data,
      header: rgbe_header_info.string,
      gamma: rgbe_header_info.gamma,
      exposure: rgbe_header_info.exposure,
      type,
      colorSpace: LinearSRGBColorSpace2,
      minFilter: LinearFilter4,
      magFilter: LinearFilter4,
      generateMipmaps: false,
      flipY: true
    };
  }
  /**
      * Sets the texture type.
      *
      * @param {(HalfFloatType|FloatType)} value - The texture type to set.
      * @return {HDRLoader} A reference to this loader.
      */
  setDataType(value) {
    this.type = value;
    return this;
  }
};
export {
  BallPhysics,
  CourseSurfaceType,
  CourseSurfaces,
  GrassBlades,
  GrassSurface,
  HDRLoader,
  LakeSurface,
  PuttingGridMaterial,
  SandMaterial,
  mergeGeometries
};
//# sourceMappingURL=/vendor/fuse/fuse.js.map
