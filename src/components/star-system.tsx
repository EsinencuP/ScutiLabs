"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { halftoneDisc } from "@/lib/halftone";

export type SystemService = {
  slug: string;
  name: string;
  short: string;
  processes: string[];
  orbit: 0 | 1 | 2;
  angle: number;
  size: number;
};

type Labels = { processes: string; more: string; map: string; orbits: string[]; mapNote: string; all: string };

const W = 1000;
const H = 520;
const CX = W / 2;
const CY = 255;
const SCALE = 2;
const ORBITS = [215, 320, 440].map((rx) => ({ rx, ry: rx * 0.37 }));
const STAR_R = 78;

const starDots = halftoneDisc(STAR_R, 5.2, 2.6, { x: 0, y: 0 });

// A sparse, deterministic star field behind the chart
const field = Array.from({ length: 90 }, (_, i) => {
  const a = Math.sin(i * 91.7) * 43758.5453;
  const b = Math.sin(i * 37.3) * 12543.123;
  return { x: (a - Math.floor(a)) * W, y: (b - Math.floor(b)) * H, r: i % 7 === 0 ? 1.4 : 0.8 };
});

function position(s: SystemService) {
  const { rx, ry } = ORBITS[s.orbit];
  const a = (s.angle * Math.PI) / 180;
  return { x: CX + rx * Math.cos(a), y: CY + ry * Math.sin(a), behind: Math.sin(a) < 0 };
}

/**
 * The six services as bodies orbiting the star. Planets (mouse) and the module row below
 * (keyboard and screen readers) choose a service; one text panel shows the chosen one.
 */
export function StarSystem({ locale, services, labels }: { locale: Locale; services: SystemService[]; labels: Labels }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const planets = useMemo(
    () =>
      services.map((s) => {
        const p = position(s);
        const size = s.size * SCALE;
        const len = Math.hypot(CX - p.x, CY - p.y) || 1;
        return {
          ...s,
          ...p,
          size,
          dots: halftoneDisc(size, size / 4.6, size / 9.5, { x: (CX - p.x) / len, y: (CY - p.y) / len }),
        };
      }),
    [services],
  );

  const current = planets[active];

  // On narrow screens the module row scrolls sideways: keep the chosen one in view.
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - list.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  function onKey(e: React.KeyboardEvent, i: number) {
    const last = services.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i + 1) % services.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i - 1 + services.length) % services.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const planet = (p: (typeof planets)[number], i: number) => {
    const selected = i === active;
    const labelY = p.behind ? -p.size - 14 : p.size + 26;
    return (
      <g
        key={p.slug}
        transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}
        className="group cursor-pointer"
        onClick={() => setActive(i)}
      >
        <circle r={p.size + 14} fill="transparent" />
        {p.dots.map((d, k) => (
          <circle
            key={k}
            cx={d.x}
            cy={d.y}
            r={d.r}
            className={`transition-[fill] duration-300 ${
              selected ? "fill-ink" : p.behind ? "fill-ink-4/70 group-hover:fill-ink-2" : "fill-ink-4 group-hover:fill-ink-2"
            }`}
          />
        ))}
        <text
          y={labelY}
          textAnchor="middle"
          fontSize={15}
          fontWeight={selected ? 600 : 500}
          className={`transition-[fill] duration-300 max-md:hidden ${selected ? "fill-ink" : "fill-ink-3 group-hover:fill-ink"}`}
          stroke="#fff"
          strokeWidth={6}
          paintOrder="stroke"
        >
          {p.name}
        </text>
      </g>
    );
  };

  return (
    <div>
      <figure className="mx-auto max-w-[68rem]">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none" aria-hidden="true">
          {field.map((f, i) => (
            <circle key={i} cx={f.x.toFixed(1)} cy={f.y.toFixed(1)} r={f.r} className="fill-line" />
          ))}
          {/* star-chart axes */}
          <line x1={24} y1={CY} x2={W - 24} y2={CY} className="stroke-line-2" strokeWidth={1} strokeDasharray="1 7" />
          <line x1={CX} y1={16} x2={CX} y2={H - 16} className="stroke-line-2" strokeWidth={1} strokeDasharray="1 7" />
          {ORBITS.map((o, i) => (
            <ellipse
              key={i}
              cx={CX}
              cy={CY}
              rx={o.rx}
              ry={o.ry}
              fill="none"
              className={i === current.orbit ? "stroke-ink-4" : "stroke-line"}
              strokeWidth={i === current.orbit ? 1.25 : 1}
              strokeDasharray={i === current.orbit ? undefined : "2 6"}
            />
          ))}
          {planets.map((p, i) => (p.behind ? planet(p, i) : null))}

          {/* the star with its corona */}
          <g transform={`translate(${CX} ${CY})`}>
            <circle r={STAR_R + 16} fill="none" className="stroke-line" strokeDasharray="1 5" />
            <circle r={STAR_R + 32} fill="none" className="stroke-line-2" strokeDasharray="1 9" />
            {starDots.map((d, k) => (
              <circle key={k} cx={d.x} cy={d.y} r={d.r} className={Math.hypot(d.x, d.y) < 30 ? "fill-scuti" : "fill-ink"} />
            ))}
          </g>

          {/* a ray from the star to the chosen body */}
          <line
            x1={CX + ((current.x - CX) / Math.hypot(current.x - CX, current.y - CY)) * (STAR_R + 20)}
            y1={CY + ((current.y - CY) / Math.hypot(current.x - CX, current.y - CY)) * (STAR_R + 20)}
            x2={current.x - ((current.x - CX) / Math.hypot(current.x - CX, current.y - CY)) * (current.size + 14)}
            y2={current.y - ((current.y - CY) / Math.hypot(current.x - CX, current.y - CY)) * (current.size + 14)}
            className="stroke-scuti"
            strokeWidth={1.25}
            strokeDasharray="3 5"
          />

          {planets.map((p, i) => (!p.behind ? planet(p, i) : null))}

          <g
            style={{
              transform: `translate(${current.x}px, ${current.y}px)`,
              transition: "transform 0.6s cubic-bezier(.2,.7,.2,1)",
            }}
            pointerEvents="none"
          >
            <circle r={current.size + 10} fill="none" className="stroke-ink" strokeWidth={1.5} />
          </g>

          {/* only the chosen body's orbit is named, to keep the chart readable */}
          {ORBITS.map((o, i) => i !== current.orbit ? null : (
            <text
              key={i}
              x={CX}
              y={CY + o.ry + 17}
              textAnchor="middle"
              fontSize={12.5}
              letterSpacing={0.2}
              className="fill-ink-2 max-md:hidden"
              stroke="#fff"
              strokeWidth={6}
              paintOrder="stroke"
            >
              {labels.orbits[i]}
            </text>
          ))}
        </svg>
        <figcaption className="mt-2 text-center text-sm text-ink-3">{labels.mapNote}</figcaption>
      </figure>

      <div
        ref={listRef}
        role="tablist"
        aria-label={labels.map}
        className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:pb-0"
      >
        {services.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.slug}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 text-sm transition-colors ${
                selected ? "bg-ink text-white" : "bg-panel text-ink-2 hover:bg-line-2 hover:text-ink"
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        className="mx-auto mt-6 max-w-5xl rounded-[1.5rem] bg-panel p-6 md:p-10"
      >
        <div key={current.slug} className="fade-up grid gap-8 md:min-h-[17rem] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
          <div>
            <p className="text-sm text-ink-3">{labels.orbits[current.orbit]}</p>
            <h3 className="display h-block mt-2">{current.name}</h3>
            <p className="mt-4 text-lg leading-snug text-ink-2">{current.short}</p>
            <Link href={`/${locale}/services/${current.slug}`} className="btn btn-primary btn-sm mt-6">
              {labels.more}
              <span className="sr-only">: {current.name}</span>
            </Link>
          </div>
          <div>
            <p className="text-sm text-ink-3">{labels.processes}</p>
            <ul className="mt-3 space-y-2">
              {current.processes.map((p) => (
                <li key={p} className="flex gap-3 leading-snug">
                  <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-ink" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center">
        <Link href={`/${locale}/services`} className="link font-medium">
          {labels.all}
        </Link>
      </p>
    </div>
  );
}
