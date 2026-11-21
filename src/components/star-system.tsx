"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { halftoneDisc } from "@/lib/halftone";
import { ChevronDown } from "./icons";

export type SystemService = {
  slug: string;
  name: string;
  short: string;
  processes: string[];
  orbit: 0 | 1 | 2;
  angle: number;
  size: number;
};

type Labels = { processes: string; more: string; map: string; orbits: string[]; mapNote: string };

const W = 640;
const H = 420;
const CX = W / 2;
const CY = 196;
const SCALE = 1.45;
const ORBITS = [148, 222, 296].map((rx) => ({ rx, ry: rx * 0.37 }));

const starDots = halftoneDisc(54, 4.6, 2.25, { x: 0, y: 0 });

function position(s: SystemService) {
  const { rx, ry } = ORBITS[s.orbit];
  const a = (s.angle * Math.PI) / 180;
  return { x: CX + rx * Math.cos(a), y: CY + ry * Math.sin(a), behind: Math.sin(a) < 0 };
}

/**
 * The six services as bodies orbiting the star. The list on the left is a set of
 * disclosure buttons (one open at a time); the map mirrors the open item.
 */
export function StarSystem({ locale, services, labels }: { locale: Locale; services: SystemService[]; labels: Labels }) {
  const [active, setActive] = useState(0);
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
          dots: halftoneDisc(size, size / 3.4, size / 7.5, { x: (CX - p.x) / len, y: (CY - p.y) / len }),
        };
      }),
    [services],
  );

  const current = planets[active];

  const planet = (p: (typeof planets)[number], i: number) => {
    const selected = i === active;
    return (
      <g key={p.slug} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`} className="cursor-pointer" onClick={() => setActive(i)}>
        <title>{p.name}</title>
        <circle r={p.size + 10} fill="transparent" />
        {p.dots.map((d, k) => (
          <circle
            key={k}
            cx={d.x}
            cy={d.y}
            r={d.r}
            className={`transition-[fill] duration-300 ${selected ? "fill-ink" : p.behind ? "fill-ink-3/70" : "fill-ink-3"}`}
          />
        ))}
      </g>
    );
  };

  return (
    <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
      <div className="lg:order-2 lg:col-span-7">
        <figure className="lg:sticky lg:top-28">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none" role="img" aria-label={`${labels.map}: ${current.name}`}>
            {ORBITS.map((o, i) => (
              <ellipse
                key={i}
                cx={CX}
                cy={CY}
                rx={o.rx}
                ry={o.ry}
                fill="none"
                stroke="currentColor"
                className={i === current.orbit ? "text-ink-3" : "text-line"}
                strokeWidth={1}
                strokeDasharray={i === current.orbit ? undefined : "2 5"}
              />
            ))}
            {planets.map((p, i) => (p.behind ? planet(p, i) : null))}
            <g transform={`translate(${CX} ${CY})`}>
              {starDots.map((d, k) => (
                <circle key={k} cx={d.x} cy={d.y} r={d.r} className={Math.hypot(d.x, d.y) < 22 ? "fill-scuti" : "fill-ink"} />
              ))}
            </g>
            {planets.map((p, i) => (!p.behind ? planet(p, i) : null))}
            <g
              style={{
                transform: `translate(${current.x}px, ${current.y}px)`,
                transition: "transform 0.6s cubic-bezier(.2,.7,.2,1)",
              }}
              pointerEvents="none"
            >
              <circle r={current.size + 8} fill="none" stroke="currentColor" strokeWidth={1.25} className="text-ink" />
            </g>
            {ORBITS.map((o, i) => (
              <text
                key={i}
                x={CX}
                y={CY + o.ry + 15}
                textAnchor="middle"
                fontSize={12}
                className={i === current.orbit ? "fill-ink" : "fill-ink-3"}
                stroke="#fff"
                strokeWidth={5}
                paintOrder="stroke"
              >
                {labels.orbits[i]}
              </text>
            ))}
          </svg>
          <figcaption className="mt-3 text-center text-sm text-ink-3">{labels.mapNote}</figcaption>
        </figure>
      </div>

      <ul className="border-t border-ink lg:order-1 lg:col-span-5">
        {services.map((s, i) => {
          const open = i === active;
          const panelId = `${uid}-p-${i}`;
          return (
            <li key={s.slug} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center justify-between gap-4 py-4 text-left text-xl leading-snug transition-colors md:text-[1.375rem] ${
                    open ? "font-medium text-ink" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {s.name}
                  <ChevronDown className={`size-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                </button>
              </h3>
              <div id={panelId} hidden={!open} className="pb-7">
                <p className="max-w-[46ch] text-lg leading-snug text-ink-2">{s.short}</p>
                <p className="mt-5 text-sm text-ink-3">{labels.processes}</p>
                <ul className="mt-2 space-y-1.5">
                  {s.processes.map((p) => (
                    <li key={p} className="flex gap-3 leading-snug">
                      <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-ink" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}/services/${s.slug}`} className="btn btn-ghost btn-sm mt-6">
                  {labels.more}
                  <span className="sr-only">: {s.name}</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
