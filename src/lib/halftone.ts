export type Dot = { x: number; y: number; r: number };

/**
 * Dots of a limb-darkened sphere on a square grid: large in the middle, shrinking to the edge.
 * Used for the logo mark, the star-system map and planets.
 */
export function halftoneDisc(radius: number, step: number, maxDot = step * 0.46, light = { x: 0, y: 0 }): Dot[] {
  const dots: Dot[] = [];
  const n = Math.ceil(radius / step);
  for (let iy = -n; iy <= n; iy++) {
    for (let ix = -n; ix <= n; ix++) {
      const x = ix * step;
      const y = iy * step;
      const d = Math.hypot(x, y) / radius;
      if (d > 1) continue;
      const z = Math.sqrt(1 - d * d);
      // shift brightness towards the light direction
      const lit = Math.max(0, Math.min(1, z * 0.85 + ((x * light.x + y * light.y) / radius) * 0.35 + 0.1));
      const r = maxDot * Math.pow(lit, 0.75);
      if (r < 0.18) continue;
      dots.push({ x: round(x), y: round(y), r: round(r) });
    }
  }
  return dots;
}

const round = (v: number) => Math.round(v * 100) / 100;

const RAMP = " .:;+?%S#@";

/** A static ASCII rendering of a sphere, used where a canvas would be overkill. */
export function asciiDisc(cols: number, rows: number, aspect = 0.5, centerRow?: number) {
  const lines: string[] = [];
  const cx = (cols - 1) / 2;
  const cy = centerRow ?? (rows - 1) / 2;
  const R = cx;
  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < cols; c++) {
      const dx = (c - cx) / R;
      const dy = (r - cy) / (R * aspect);
      const d = Math.hypot(dx, dy);
      if (d > 1) {
        line += d < 1.12 && hash(c, r) > 0.72 ? "." : " ";
        continue;
      }
      const z = Math.sqrt(1 - d * d);
      const n = hash(c * 3, r * 7) * 0.35;
      const v = Math.min(0.999, Math.pow(z, 0.6) * 0.85 + n * z);
      line += RAMP[Math.max(1, Math.floor(v * RAMP.length))];
    }
    lines.push(line.replace(/\s+$/, ""));
  }
  return lines.join("\n");
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
