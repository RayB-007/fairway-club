// Rendering budgets are independent of the 120 Hz golf physics clock.
export const presets={fast:{ratio:.85,shadow:512,grassRange:9,grassDensity:.35,grassBlades:4},balanced:{ratio:1.2,shadow:1024,grassRange:14,grassDensity:.65,grassBlades:5},high:{ratio:1.6,shadow:1536,grassRange:19,grassDensity:1,grassBlades:6}};
let setting='auto';try{setting=localStorage.getItem('fairway-graphics')||'auto';}catch{}if(!['auto',...Object.keys(presets)].includes(setting))setting='auto';
export const quality={mode:setting,tier:setting==='auto'?'balanced':setting,...presets[setting==='auto'?'balanced':setting]};
export function changeQuality(mode){quality.mode=mode;quality.tier=mode==='auto'?'balanced':mode;Object.assign(quality,presets[quality.tier]);try{localStorage.setItem('fairway-graphics',mode);}catch{}return quality;}
export class FrameBudget{
 constructor(renderer,onChange){this.renderer=renderer;this.onChange=onChange;this.ratio=Math.min(devicePixelRatio,quality.ratio);this.frames=[];this.lastCheck=0;this.start=performance.now();this.fps=0;this.renderer.setPixelRatio(this.ratio);}
 update(now,frameMs){if(frameMs>0&&frameMs<1000)this.frames.push(frameMs);if(now-this.lastCheck<1200)return;this.lastCheck=now;const samples=this.frames.splice(0);if(samples.length<8)return;const mean=samples.reduce((s,n)=>s+n,0)/samples.length;this.fps=Math.round(1000/mean);if(quality.mode!=='auto'||now-this.start<3500)return;const target=Math.min(devicePixelRatio,quality.ratio);let next=Math.min(this.ratio,target);if(mean>23)next=Math.max(.7,this.ratio-.1);else if(mean<18&&this.ratio<target)next=Math.min(target,this.ratio+.05);if(Math.abs(next-this.ratio)>.01){this.ratio=next;this.renderer.setPixelRatio(next);}if(mean>35&&quality.tier!=='fast'){quality.tier='fast';Object.assign(quality,presets.fast);this.onChange();}}
 reset(){this.ratio=Math.min(devicePixelRatio,quality.ratio);this.renderer.setPixelRatio(this.ratio);this.frames=[];this.start=performance.now();}
 snapshot(){return {fps:this.fps,mode:quality.mode,tier:quality.tier,pixelRatio:this.ratio};}
}
