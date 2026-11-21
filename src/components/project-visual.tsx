import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";

/** Small deterministic PRNG so every project gets its own, stable constellation. */
function random(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const hash = (text: string) => [...text].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);

/**
 * A project's process drawn as a constellation: each stage is a star, the path is the workflow.
 * In-development projects end on a star that hasn't ignited yet.
 */
export function Constellation({
  stages,
  seed,
  dormant = false,
  wide = false,
  className = "",
}: {
  stages: string[];
  seed: string;
  dormant?: boolean;
  wide?: boolean;
  className?: string;
}) {
  const W = wide ? 1000 : 640;
  const H = wide ? 360 : 400;
  const rand = random(hash(seed));
  const n = stages.length;
  const padX = wide ? 90 : 70;
  const mid = H / 2;
  const amp = wide ? 85 + rand() * 20 : 105 + rand() * 25;
  const phase = rand() * Math.PI * 2;
  const freq = 1.05 + rand() * 0.5;

  const pts = stages.map((_, i) => ({
    x: padX + (i * (W - padX * 2)) / Math.max(1, n - 1),
    y: mid + Math.sin(i * freq + phase) * amp + (rand() - 0.5) * 36,
  }));

  // Put each label on the side away from the lines that meet at its star,
  // and flip it when it would collide with the previous label on that side.
  const FONT = wide ? 18 : 21;
  const placed: { left: number; right: number; y: number }[] = [];
  const labelY = (p: { y: number }, up: boolean) => p.y + (up ? -24 : 36);
  const collides = (left: number, right: number, y: number) =>
    placed.some((q) => left < q.right + 10 && right > q.left - 10 && Math.abs(y - q.y) < FONT + 6);
  const above = pts.map((p, i) => {
    const neighbours = [pts[i - 1], pts[i + 1]].filter(Boolean);
    const avg = neighbours.reduce((sum, q) => sum + q.y, 0) / neighbours.length;
    const width = stages[i].length * FONT * 0.56;
    const left = i === 0 ? p.x - 8 : i === n - 1 ? p.x + 8 - width : p.x - width / 2;
    let up = p.y <= avg;
    if (collides(left, left + width, labelY(p, up)) && !collides(left, left + width, labelY(p, !up))) up = !up;
    placed.push({ left, right: left + width, y: labelY(p, up) });
    return up;
  });

  const path = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const field = Array.from({ length: wide ? 110 : 70 }, () => ({
    x: rand() * W,
    y: rand() * H,
    r: rand() > 0.88 ? 1.3 : 0.7,
    o: 0.15 + rand() * 0.25,
  }));

  return (
    <div className={`overflow-hidden rounded-[1.25rem] bg-[#0d0e12] text-white ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={stages.join(" → ")}>
        {field.map((f, i) => (
          <circle key={i} cx={f.x.toFixed(1)} cy={f.y.toFixed(1)} r={f.r} fill="#fff" opacity={f.o.toFixed(2)} />
        ))}
        <path d={path} fill="none" stroke="#fff" strokeOpacity={0.45} strokeWidth={1} strokeDasharray="3 5" />
        {pts.map((p, i) => {
          const last = i === n - 1;
          const first = i === 0;
          return (
            <g key={i} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
              <circle r={14} fill="#fff" opacity={0.08} />
              {last && dormant ? (
                <circle r={6} fill="none" stroke="#ff7a45" strokeWidth={1.5} strokeDasharray="2 2.5" />
              ) : (
                <circle r={last ? 6 : 4.5} fill={last ? "#ff7a45" : "#fff"} />
              )}
              <text
                y={labelY({ y: 0 }, above[i])}
                x={first ? -8 : last ? 8 : 0}
                textAnchor={first ? "start" : last ? "end" : "middle"}
                fontSize={FONT}
                fill="#fff"
                fontWeight={500}
                opacity={last && dormant ? 0.6 : 1}
              >
                {stages[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function ProjectVisual({ project, locale, wide = false }: { project: Project; locale: Locale; wide?: boolean }) {
  return (
    <Constellation
      stages={project.text[locale].stages}
      seed={project.slug}
      dormant={project.status === "development"}
      wide={wide}
    />
  );
}
