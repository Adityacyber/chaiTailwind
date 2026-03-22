/*
HELPER UTILITIES
*/

import { COLORS, SCALE } from "../config/tokens.js";

export function color(val) {
  if (!val) return null;
  if (val.startsWith("[") && val.endsWith("]")) return val.slice(1, -1);
  return COLORS[val] || val;
}

export function px(n) {
  const num = parseFloat(n);
  return isNaN(num) ? null : `${num * SCALE}px`;
}

export function sides(val, prop) {
  const v = px(val);
  if (!v) return null;

  return {
    [`${prop}Top`]: v,
    [`${prop}Right`]: v,
    [`${prop}Bottom`]: v,
    [`${prop}Left`]: v,
  };
}
