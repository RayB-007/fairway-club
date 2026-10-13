export const YARD_TO_METERS=.9144;
export const CUP_RADIUS=.19;
export const CUP_DEPTH=.22/YARD_TO_METERS;
export const GREEN_SURFACE_OFFSET=.035;
export const VISIBLE_BALL_RADIUS=.065;
export function puttRange(ball,pin){return Math.max(3,Math.min(30,Math.hypot(pin.x-ball.x,pin.z-ball.z)*1.35));}
