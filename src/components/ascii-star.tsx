"use client";

import { useEffect, useRef } from "react";

const RAMP = " .:;+?%S#@";
const INK = "#0a0a0a";
const SCUTI = "#c2371d";
const TAU = Math.PI * 2;

/** Horizontally tileable fractal value noise, baked once into a texture. */
function bakeNoise(w: number, h: number, seed: number) {
  const out = new Float32Array(w * h);
  const rand = (x: number, y: number) => {
    const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const octaves = [
    { cells: 14, amp: 0.55 },
    { cells: 28, amp: 0.3 },
    { cells: 56, amp: 0.15 },
  ];
  let min = Infinity;
  let max = -Infinity;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (const o of octaves) {
        const gx = (x / w) * o.cells;
        const gy = (y / h) * o.cells * 0.6;
        const x0 = Math.floor(gx);
        const y0 = Math.floor(gy);
        const fx = smooth(gx - x0);
        const fy = smooth(gy - y0);
        const xa = x0 % o.cells;
        const xb = (x0 + 1) % o.cells;
        const a = rand(xa, y0) + (rand(xb, y0) - rand(xa, y0)) * fx;
        const b = rand(xa, y0 + 1) + (rand(xb, y0 + 1) - rand(xa, y0 + 1)) * fx;
        v += (a + (b - a) * fy) * o.amp;
      }
      out[y * w + x] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  // stretch to the full 0..1 range so convection cells read clearly
  for (let i = 0; i < out.length; i++) out[i] = (out[i] - min) / (max - min || 1);
  return out;
}

type Cell = { x: number; y: number; d: number; lon: number; lat: number; limb: number; seed: number };

/**
 * UY Scuti as a field of characters: a limb-darkened sphere with slowly turning convection cells.
 * The cursor pushes glyphs aside. Respects prefers-reduced-motion and pauses off-screen.
 */
export function AsciiStar({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !box || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const TEX_W = 256;
    const TEX_H = 128;
    const texA = bakeNoise(TEX_W, TEX_H, 1);
    const texB = bakeNoise(TEX_W, TEX_H, 7);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cw = 12;
    let ch = 14;
    let fontPx = 12;
    let cells: Cell[] = [];
    let atlas: HTMLCanvasElement | null = null;
    let raf = 0;
    let running = false;
    let visible = true;
    let lastFrame = 0;
    const born = performance.now();
    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };

    const fontFamily =
      getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains").trim() || "monospace";

    function buildAtlas() {
      const a = document.createElement("canvas");
      a.width = Math.ceil(cw * dpr) * RAMP.length;
      a.height = Math.ceil(ch * dpr) * 2;
      const actx = a.getContext("2d");
      if (!actx) return null;
      actx.font = `500 ${fontPx * dpr}px ${fontFamily}`;
      actx.textAlign = "center";
      actx.textBaseline = "middle";
      const sw = Math.ceil(cw * dpr);
      const sh = Math.ceil(ch * dpr);
      [INK, SCUTI].forEach((color, row) => {
        actx.fillStyle = color;
        for (let i = 1; i < RAMP.length; i++) actx.fillText(RAMP[i], i * sw + sw / 2, row * sh + sh / 2);
      });
      return a;
    }

    function layout() {
      const rect = box!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;

      fontPx = width < 640 ? 9 : width < 1100 ? 11 : 12;
      cw = fontPx * 0.95;
      ch = fontPx * 1.12;
      atlas = buildAtlas();

      // The star is too large for the frame: only its upper cap rises into view.
      const R = Math.max(width * 0.4, 300);
      const cx = width / 2;
      const cy = height * 0.12 + R;
      const cols = Math.ceil(width / cw);
      const rows = Math.ceil(height / ch);
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) * cw;
          const y = (r + 0.5) * ch;
          const dx = (x - cx) / R;
          const dy = (y - cy) / R;
          const d = Math.hypot(dx, dy);
          if (d > 1.16) continue;
          const z = d < 1 ? Math.sqrt(1 - d * d) : 0;
          cells.push({
            x,
            y,
            d,
            lon: Math.atan2(dx, z || 0.0001),
            lat: Math.asin(Math.max(-1, Math.min(1, dy))),
            limb: d < 1 ? Math.pow(z, 0.55) : 0,
            seed: Math.abs((Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1),
          });
        }
      }
    }

    function sample(tex: Float32Array, u: number, v: number) {
      const x = ((Math.floor(u * TEX_W) % TEX_W) + TEX_W) % TEX_W;
      const y = Math.max(0, Math.min(TEX_H - 1, Math.floor(v * TEX_H)));
      return tex[y * TEX_W + x];
    }

    function draw(now: number) {
      if (!atlas) return;
      const t = reduce ? 40 : (now - born) / 1000;
      const reveal = reduce ? 2 : Math.min(1, t / 1.8);
      const front = 1.25 * (1 - Math.pow(1 - reveal, 3));
      const spin = t * 0.018;
      const boil = 0.5 + 0.5 * Math.sin(t * 0.35);

      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      const reach = width < 640 ? 80 : 120;

      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const sw = Math.ceil(cw * dpr);
      const sh = Math.ceil(ch * dpr);

      for (const cell of cells) {
        if (cell.d > front) continue;
        let value: number;
        let hot = false;
        if (cell.d < 1) {
          const u = (cell.lon + spin) / TAU;
          const v = cell.lat / Math.PI + 0.5;
          const n = sample(texA, u, v) * (1 - boil) + sample(texB, u + 0.31, v) * boil;
          value = Math.pow(cell.limb, 0.8) * (0.6 + (n - 0.5) * 1.05);
          hot = n > 0.7 && cell.limb > 0.4;
        } else {
          const fall = 1 - (cell.d - 1) / 0.16;
          const shimmer = 0.5 + 0.5 * Math.sin(t * 1.3 + cell.seed * 40);
          value = cell.seed > 0.55 ? fall * fall * 0.28 * (0.6 + shimmer * 0.4) : 0;
        }

        let x = cell.x;
        let y = cell.y;
        if (!reduce) {
          const ddx = x - pointer.x;
          const ddy = y - pointer.y;
          const dist = Math.hypot(ddx, ddy);
          if (dist < reach && dist > 0.01) {
            const f = 1 - dist / reach;
            const push = f * f * 22;
            x += (ddx / dist) * push;
            y += (ddy / dist) * push;
            value += f * 0.25;
          }
        }

        // the ignition front scrambles glyphs as it passes
        let idx = Math.round(Math.max(0, Math.min(1, value)) * (RAMP.length - 1));
        if (front - cell.d < 0.06 && reveal < 1) idx = 1 + Math.floor(Math.abs(cell.seed * 997 + t * 30) % (RAMP.length - 1));
        if (idx <= 0) continue;

        ctx!.globalAlpha = 0.3 + 0.7 * Math.min(1, value + 0.15);
        ctx!.drawImage(
          atlas,
          idx * sw,
          hot ? sh : 0,
          sw,
          sh,
          Math.round((x - cw / 2) * dpr),
          Math.round((y - ch / 2) * dpr),
          sw,
          sh,
        );
      }
      ctx!.globalAlpha = 1;
    }

    function loop(now: number) {
      if (!running) return;
      if (now - lastFrame > 33) {
        lastFrame = now;
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduce || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.tx = -1e4;
      pointer.ty = -1e4;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(() => {
      layout();
      draw(performance.now());
    });
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });

    let cancelled = false;
    const ready = document.fonts?.load(`500 ${fontPx}px ${fontFamily}`).catch(() => undefined) ?? Promise.resolve();
    ready.then(() => {
      if (cancelled) return;
      layout();
      draw(performance.now());
      resizeObserver.observe(box);
      io.observe(canvas);
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      start();
    });

    return () => {
      cancelled = true;
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={`block ${className}`} aria-hidden="true" />;
}
