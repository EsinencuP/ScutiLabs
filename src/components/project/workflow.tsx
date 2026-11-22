import { ArrowDown, ArrowRight, CornerDownRight } from "lucide-react";
import type { ProjectLayout } from "@/content/projects";

type Step = { actor: string; action: string; result: string };

/**
 * Relay: who acts, what they do, what comes out. Actors sit on a vertical rail in order;
 * each action points to the result that the next actor picks up.
 */
function Relay({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative">
      <span aria-hidden="true" className="absolute bottom-8 left-5 top-8 w-px bg-line" />
      {steps.map((s, i) => (
        <li
          key={i}
          className="relative grid gap-3 py-5 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,19rem)] md:items-center md:gap-0"
        >
          <div className="flex items-center gap-4 md:pr-6">
            <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-medium text-white ring-8 ring-white">
              {i + 1}
            </span>
            <span className="font-medium leading-snug">{s.actor}</span>
          </div>
          <div className="pl-14 md:px-6 md:pl-6">
            <p className="leading-relaxed">{s.action}</p>
            <div aria-hidden="true" className="mt-3 hidden items-center text-ink-4 md:flex">
              <span className="h-px flex-1 border-t border-dashed border-ink-4" />
              <ArrowRight className="-ml-1 size-4" strokeWidth={1.6} />
            </div>
            <ArrowDown aria-hidden="true" className="mt-2 size-4 text-ink-4 md:hidden" strokeWidth={1.6} />
          </div>
          <p className="ml-14 rounded-2xl bg-panel px-4 py-3 text-[0.9375rem] leading-snug text-ink-2 ring-1 ring-line-2 md:ml-0">
            {s.result}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Path: the process as a constellation route across a night sky, steps alternating sides. */
function Path({ steps }: { steps: Step[] }) {
  return (
    <div className="sky">
      <div className="sky-surface px-5 py-10 text-white md:px-10 md:py-14">
        <ol className="relative">
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[0.6875rem] top-4 border-l border-dashed border-white/30 md:left-1/2"
          />
          {steps.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <li key={i} className="relative pb-8 pl-10 last:pb-0 md:grid md:grid-cols-[1fr_4rem_1fr] md:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-5 flex size-6 items-center justify-center md:static md:col-start-2 md:row-start-1 md:mx-auto md:mt-5"
                >
                  <span className="absolute size-6 rounded-full bg-white/10" />
                  <span className={`relative size-2.5 rounded-full ${i === steps.length - 1 ? "bg-[#ff7a45]" : "bg-white"}`} />
                </span>
                <div
                  className={`rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 md:row-start-1 ${
                    right ? "md:col-start-3" : "md:col-start-1"
                  }`}
                >
                  <p className="flex items-baseline gap-3 text-sm text-white/55">
                    <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-medium text-white">{s.actor}</span>
                  </p>
                  <p className="mt-2 leading-relaxed text-white/90">{s.action}</p>
                  <p className="mt-3 flex gap-2 text-[0.9375rem] leading-snug text-white/60">
                    <CornerDownRight aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
                    {s.result}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/** Orbit: an iterative process, steps placed along an arc that closes back on itself. */
function Orbit({ steps, center }: { steps: Step[]; center: string }) {
  const W = 1000;
  const H = 300;
  const cx = W / 2;
  const cy = 270;
  const rx = 430;
  const ry = 210;
  const n = steps.length;
  const pts = steps.map((_, i) => {
    const a = Math.PI + (Math.PI * (i + 0.5)) / n;
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
        <path
          d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`}
          fill="none"
          className="stroke-ink-4"
          strokeOpacity={0.6}
          strokeWidth={1.25}
        />
        {/* the loop back to the start: each round refines the previous one */}
        <path
          d={`M ${cx + rx} ${cy} Q ${cx} ${cy + 26} ${cx - rx + 14} ${cy + 2}`}
          fill="none"
          className="stroke-scuti"
          strokeWidth={1.25}
          strokeDasharray="4 6"
        />
        <path d={`M ${cx - rx + 22} ${cy - 6} L ${cx - rx + 10} ${cy + 2} L ${cx - rx + 24} ${cy + 8}`} fill="none" className="stroke-scuti" strokeWidth={1.25} />
        <text x={cx} y={cy - 70} textAnchor="middle" fontSize={22} fontWeight={600} className="fill-ink">
          {center}
        </text>
        {pts.map((p, i) => (
          <g key={i} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
            <circle r={26} className="fill-white stroke-line" strokeWidth={1} />
            <circle r={19} className={i === n - 1 ? "fill-scuti" : "fill-ink"} />
            <text y={7} textAnchor="middle" fontSize={18} fontWeight={600} fill="#fff">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
      <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={i} className="rounded-[1.25rem] bg-panel p-5 ring-1 ring-line-2">
            <p className="flex items-center gap-3">
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white ${
                  i === n - 1 ? "bg-scuti" : "bg-ink"
                }`}
              >
                {i + 1}
              </span>
              <span className="font-medium">{s.actor}</span>
            </p>
            <p className="mt-3 leading-relaxed">{s.action}</p>
            <p className="mt-3 flex gap-2 text-[0.9375rem] leading-snug text-ink-2">
              <CornerDownRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-4" strokeWidth={1.6} />
              {s.result}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Workflow({
  steps,
  variant,
  center,
}: {
  steps: Step[];
  variant: ProjectLayout["workflow"];
  center: string;
}) {
  if (variant === "path") return <Path steps={steps} />;
  if (variant === "orbit") return <Orbit steps={steps} center={center} />;
  return <Relay steps={steps} />;
}
