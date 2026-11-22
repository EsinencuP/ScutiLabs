import type { ProjectLayout } from "@/content/projects";
import { halftoneDisc } from "@/lib/halftone";
import { ModuleIcon, type IconName } from "./module-icon";

type Item = { name: string; brief: string; icon: IconName };

function Icons({ items }: { items: Item[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {items.map((m) => (
        <li key={m.name}>
          <span className="flex size-12 items-center justify-center rounded-full border border-dashed border-ink-4 bg-white text-ink">
            <ModuleIcon name={m.icon} className="size-5" />
          </span>
          <p className="mt-4 font-medium leading-snug">{m.name}</p>
          <p className="mt-1 text-[0.9375rem] leading-snug text-ink-2">{m.brief}</p>
        </li>
      ))}
    </ul>
  );
}

function Table({ items }: { items: Item[] }) {
  return (
    <ul className="grid border-t border-ink lg:grid-cols-2 lg:gap-x-12 lg:border-t-0">
      {items.map((m) => (
        <li
          key={m.name}
          className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1 border-b border-line py-4 first:lg:border-t first:lg:border-t-ink sm:grid-cols-[1.75rem_minmax(0,11rem)_minmax(0,1fr)] [&:nth-child(2)]:lg:border-t [&:nth-child(2)]:lg:border-t-ink"
        >
          <ModuleIcon name={m.icon} className="size-5 translate-y-1 text-ink-2" />
          <span className="font-medium leading-snug">{m.name}</span>
          <span className="col-start-2 leading-snug text-ink-2 sm:col-start-3">{m.brief}</span>
        </li>
      ))}
    </ul>
  );
}

const SUN = { cx: 135, cy: 215, r: 100 };
const sunDots = halftoneDisc(SUN.r, 8, 3.7, { x: 0.35, y: -0.2 });

/** Solar: the product is the sun, its modules are planets on widening orbits. */
function Solar({ items, name }: { items: Item[]; name: string }) {
  const W = 1200;
  const H = 440;
  const first = 380;
  const last = 1110;
  const pts = items.map((_, i) => ({
    x: items.length === 1 ? first : first + (i * (last - first)) / (items.length - 1),
    y: SUN.cy + (i % 2 === 0 ? -42 : 42),
    above: i % 2 === 0,
  }));

  return (
    <>
      <div className="lg:hidden">
        <Icons items={items} />
      </div>
      <div className="relative hidden lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={SUN.cx}
              cy={SUN.cy}
              r={Math.hypot(p.x - SUN.cx, p.y - SUN.cy)}
              fill="none"
              className="stroke-ink-4"
              strokeOpacity={0.55}
              strokeDasharray="2 6"
            />
          ))}
          <g transform={`translate(${SUN.cx} ${SUN.cy})`}>
            {sunDots.map((d, k) => (
              <circle key={k} cx={d.x} cy={d.y} r={d.r} className={Math.hypot(d.x, d.y) < 42 ? "fill-scuti" : "fill-ink"} />
            ))}
          </g>
          <text x={SUN.cx} y={SUN.cy + SUN.r + 34} textAnchor="middle" fontSize={16} fontWeight={600} className="fill-ink">
            {name}
          </text>
        </svg>
        <ul>
          {items.map((m, i) => (
            <li
              key={m.name}
              className={`absolute flex w-36 -translate-x-1/2 flex-col items-center text-center ${
                pts[i].above ? "translate-y-[calc(-100%+1.75rem)]" : "-translate-y-7"
              }`}
              style={{ left: `${(pts[i].x / W) * 100}%`, top: `${(pts[i].y / H) * 100}%` }}
            >
              <span className={`flex size-14 items-center justify-center rounded-full bg-white text-ink ${pts[i].above ? "order-last" : ""} shadow-[0_0_0_1px_var(--color-line),0_10px_24px_-14px_rgb(0_0_0/0.35)]`}>
                <ModuleIcon name={m.icon} className="size-6" />
              </span>
              <span className={`font-medium leading-snug ${pts[i].above ? "mb-1" : "mt-3"}`}>{m.name}</span>
              <span className={`text-sm leading-snug text-ink-2 ${pts[i].above ? "mb-3" : "mt-1"}`}>{m.brief}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function Capabilities({
  modules,
  icons,
  variant,
  name,
}: {
  modules: { name: string; brief: string }[];
  icons: IconName[];
  variant: ProjectLayout["capabilities"];
  name: string;
}) {
  const items = modules.map((m, i) => ({ ...m, icon: icons[i] ?? "layers" }));
  if (variant === "table") return <Table items={items} />;
  if (variant === "solar") return <Solar items={items} name={name} />;
  return <Icons items={items} />;
}
