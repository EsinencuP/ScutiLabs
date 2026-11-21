import Image from "next/image";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { halftoneDisc } from "@/lib/halftone";

/** A project's workflow drawn as a constellation: each actor is a star, the path is the process. */
export function Constellation({ steps, className = "" }: { steps: { actor: string; result?: string }[]; className?: string }) {
  const W = 640;
  const H = 400;
  const n = steps.length;
  const pts = steps.map((_, i) => {
    const x = 70 + (i * (W - 140)) / Math.max(1, n - 1);
    const y = 200 + Math.sin(i * 1.25 + 0.4) * 105 + (i % 2 ? 18 : -18);
    return { x, y };
  });
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  // a sparse field of background stars, deterministic
  const field = Array.from({ length: 70 }, (_, i) => {
    const s = Math.sin(i * 91.7) * 43758.5453;
    const t = Math.sin(i * 37.3) * 12543.123;
    return { x: (s - Math.floor(s)) * W, y: (t - Math.floor(t)) * H, r: i % 9 === 0 ? 1.3 : 0.7 };
  });

  return (
    <div className={`overflow-hidden rounded-[1.25rem] bg-[#0d0e12] text-white ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
        {field.map((f, i) => (
          <circle key={i} cx={f.x} cy={f.y} r={f.r} fill="#fff" opacity={0.28} />
        ))}
        <path d={path} fill="none" stroke="#fff" strokeOpacity={0.45} strokeWidth={1} strokeDasharray="3 5" />
        {pts.map((p, i) => {
          const above = i % 2 === 0;
          const last = i === n - 1;
          return (
            <g key={i} transform={`translate(${p.x} ${p.y})`}>
              <circle r={14} fill="#fff" opacity={0.08} />
              <circle r={last ? 6 : 4.5} fill={last ? "#ff7a45" : "#fff"} />
              <text
                y={above ? -24 : 34}
                textAnchor={i === 0 ? "start" : last ? "end" : "middle"}
                x={i === 0 ? -8 : last ? 8 : 0}
                fontSize={18}
                fill="#fff"
                fontWeight={500}
              >
                {steps[i].actor}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function ProjectVisual({
  project,
  locale,
  priority = false,
  sizes = "(min-width: 1024px) 58vw, 100vw",
}: {
  project: Project;
  locale: Locale;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.cover) {
    const c = project.cover;
    return (
      <div className="shot">
        <Image
          src={c.src}
          width={c.width}
          height={c.height}
          alt={c.alt[locale]}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    );
  }
  const workflow = project.text[locale].workflow;
  if (workflow) return <Constellation steps={workflow} />;
  return <Protostar name={project.text[locale].name} />;
}

/** A project still in development: a body that hasn't ignited yet. Light direction varies per project. */
function Protostar({ name }: { name: string }) {
  const seed = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const angle = (seed % 360) * (Math.PI / 180);
  const protoDots = halftoneDisc(120, 9, 3.6, { x: Math.cos(angle) * 0.75, y: Math.sin(angle) * 0.75 });
  return (
    <div className="relative flex aspect-[16/10] items-end overflow-hidden rounded-[1.25rem] bg-[#0d0e12] p-6 text-white md:p-8">
      <svg viewBox="-160 -160 320 320" className="absolute -right-10 -top-10 h-[115%] w-auto" aria-hidden="true">
        <circle r="150" fill="none" stroke="#fff" strokeOpacity={0.12} strokeDasharray="2 6" />
        {protoDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#fff" opacity={0.55} />
        ))}
      </svg>
      <p className="display relative text-4xl leading-none text-white/90 md:text-5xl">{name}</p>
    </div>
  );
}
