"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { roiConfig } from "@/content/roi";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { RoiInput, RoiResult } from "@/lib/roi";

const MANUAL = "#c2371d";
const AUTOMATED = "#2b59c3";

export const intlLocale = (locale: string) => (locale === "ru" ? "ru-RU" : locale === "ro" ? "ro-RO" : "en-GB");

export function money(locale: string, value: number, compact = false) {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency: roiConfig.currency,
    maximumFractionDigits: compact ? 1 : 0,
    notation: compact ? "compact" : "standard",
  }).format(Math.round(value));
}

export function number(locale: string, value: number, digits = 0) {
  return new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: digits }).format(value);
}

export function paybackText(t: Dictionary["roi"], locale: string, months: number | null) {
  if (months === null) return t.noPayback;
  if (months < 1) return t.underMonth;
  return t.months.replace("{n}", number(locale, months, 1));
}

function niceMax(value: number) {
  if (value <= 0) return 1;
  const exp = 10 ** Math.floor(Math.log10(value));
  const f = value / exp;
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  return (steps.find((st) => f <= st) ?? 10) * exp;
}

/** Cumulative cost of both options over the horizon, with the break-even point and a hover readout. */
function RoiChart({ result, t, locale }: { result: RoiResult; t: Dictionary["roi"]; locale: string }) {
  // Draw in real pixels of the container so labels keep their size on phones.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setW(Math.max(240, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const narrow = W < 520;
  const H = narrow ? 230 : 270;
  const n = result.horizon;
  const last = result.series[n];
  const yMax = niceMax(Math.max(last.manual, last.automated));
  const yTicks = (narrow ? [0, 0.5, 1] : [0, 0.25, 0.5, 0.75, 1]).map((k) => ({ v: yMax * k, label: money(locale, yMax * k, true) }));
  // left padding fits the longest axis label (≈6.4px per glyph at 11.5px)
  const labelW = Math.ceil(Math.max(...yTicks.map((tk) => tk.label.length)) * 6.4) + 12;
  const pad = narrow ? { l: labelW, r: 14, t: 22, b: 32 } : { l: Math.max(58, labelW), r: 128, t: 20, b: 34 };
  const x = (m: number) => pad.l + (m / n) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / yMax) * (H - pad.t - pad.b);
  const [hover, setHover] = useState<number | null>(null);

  const path = (key: "manual" | "automated") =>
    result.series.map((p, i) => `${i ? "L" : "M"}${x(p.month).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(" ");

  const be = result.paybackMonths !== null && result.paybackMonths <= n ? result.paybackMonths : null;
  // keep the two end labels apart
  let yManual = y(last.manual);
  let yAuto = y(last.automated);
  if (Math.abs(yManual - yAuto) < 30) {
    const mid = (yManual + yAuto) / 2;
    const up = yManual < yAuto;
    yManual = mid + (up ? -15 : 15);
    yAuto = mid + (up ? 15 : -15);
  }

  function onMove(e: React.PointerEvent<SVGRectElement>) {
    const rect = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const m = Math.round(((px - pad.l) / (W - pad.l - pad.r)) * n);
    setHover(Math.max(0, Math.min(n, m)));
  }

  const point = hover !== null ? result.series[hover] : null;

  return (
    <figure className="mt-8">
      <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <span className="font-medium">{t.chart.replace("{n}", String(n))}</span>
        <span className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-0.5 w-5 rounded-full" style={{ background: MANUAL }} />
            {t.manual}
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-0.5 w-5 rounded-full" style={{ background: AUTOMATED }} />
            {t.automated}
          </span>
        </span>
      </figcaption>
      <div ref={wrapRef} className="relative mt-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" aria-hidden="true">
          {yTicks.map((tk) => (
            <g key={tk.v}>
              <line x1={pad.l} x2={W - pad.r} y1={y(tk.v)} y2={y(tk.v)} className="stroke-line-2" strokeWidth={1} />
              <text x={pad.l - 10} y={y(tk.v) + 4} textAnchor="end" fontSize={11.5} className="fill-ink-3">
                {tk.label}
              </text>
            </g>
          ))}
          {(n === 36 ? (narrow ? [0, 18, 36] : [0, 12, 24, 36]) : narrow ? [0, 12, 24] : [0, 6, 12, 18, 24]).map((m) => {
            // on phones the unit rides on the last tick instead of a separate label
            const tail = narrow && m === n;
            return (
              <text key={m} x={x(m) + (tail ? 8 : 0)} y={H - 12} textAnchor={tail ? "end" : "middle"} fontSize={11.5} className="fill-ink-3">
                {tail ? `${m} ${t.monthAxis}` : m}
              </text>
            );
          })}
          {!narrow && (
            <text x={W - pad.r} y={H - 12} dx={14} fontSize={11.5} className="fill-ink-3">
              {t.monthAxis}
            </text>
          )}

          <path d={path("manual")} fill="none" stroke={MANUAL} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <path d={path("automated")} fill="none" stroke={AUTOMATED} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {/* direct labels at the line ends, in text ink; the legend covers narrow screens */}
          {!narrow && (
          <>
          <text x={x(n) + 10} y={yManual + 4} fontSize={12} className="fill-ink-2">
            {t.manual}
          </text>
          <text x={x(n) + 10} y={yAuto + 4} fontSize={12} className="fill-ink-2">
            {t.automated}
          </text>
          </>
          )}

          {be !== null && (
            <g transform={`translate(${x(be).toFixed(1)} ${y(result.manualMonthly * be).toFixed(1)})`}>
              <line y1={8} y2={H - pad.b - y(result.manualMonthly * be)} className="stroke-ink-4" strokeDasharray="2 4" />
              <circle r={5.5} fill="#fff" stroke="currentColor" strokeWidth={2} className="text-ink" />
              <text y={-14} textAnchor="middle" fontSize={12} fontWeight={600} className="fill-ink">
                {t.breakEven}
              </text>
            </g>
          )}

          {point && (
            <g pointerEvents="none">
              <line x1={x(point.month)} x2={x(point.month)} y1={pad.t} y2={H - pad.b} className="stroke-ink-3" strokeWidth={1} />
              <circle cx={x(point.month)} cy={y(point.manual)} r={4.5} fill={MANUAL} stroke="#fff" strokeWidth={2} />
              <circle cx={x(point.month)} cy={y(point.automated)} r={4.5} fill={AUTOMATED} stroke="#fff" strokeWidth={2} />
            </g>
          )}
          <rect
            x={pad.l}
            y={pad.t}
            width={W - pad.l - pad.r}
            height={H - pad.t - pad.b}
            fill="transparent"
            onPointerMove={onMove}
            onPointerDown={onMove}
            onPointerLeave={() => setHover(null)}
            className="cursor-crosshair"
          />
        </svg>
        {point && (
          <div
            className="pointer-events-none absolute top-0 z-10 w-max max-w-full whitespace-nowrap rounded-xl bg-white px-3 py-2 text-sm shadow-[0_0_0_1px_var(--color-line),0_12px_28px_-12px_rgb(0_0_0/0.3)]"
            style={{
              // left edge at f·(container − tooltip): follows the cursor, never leaves the chart
              left: `${(x(point.month) / W) * 100}%`,
              transform: `translateX(-${(x(point.month) / W) * 100}%)`,
            }}
          >
            <p className="font-medium">{t.month.replace("{n}", String(point.month))}</p>
            <p className="mt-1 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-ink-2">
                <span aria-hidden="true" className="size-2 rounded-full" style={{ background: MANUAL }} />
                {t.manual}
              </span>
              <span className="font-medium tabular-nums">{money(locale, point.manual)}</span>
            </p>
            <p className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-ink-2">
                <span aria-hidden="true" className="size-2 rounded-full" style={{ background: AUTOMATED }} />
                {t.automated}
              </span>
              <span className="font-medium tabular-nums">{money(locale, point.automated)}</span>
            </p>
          </div>
        )}
      </div>
      <table className="sr-only">
        <caption>{t.chart.replace("{n}", String(n))}</caption>
        <thead>
          <tr>
            <th scope="col">{t.monthAxis}</th>
            <th scope="col">{t.manual}</th>
            <th scope="col">{t.automated}</th>
          </tr>
        </thead>
        <tbody>
          {result.series
            .filter((p) => p.month % 6 === 0)
            .map((p) => (
              <tr key={p.month}>
                <th scope="row">{p.month}</th>
                <td>{money(locale, p.manual)}</td>
                <td>{money(locale, p.automated)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </figure>
  );
}

/** Whole-number field with − and + buttons; typing is allowed, the value is clamped on blur. */
function Stepper({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  less,
  more,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  less: string;
  more: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  const commit = (v: number) => onChange(Math.min(max, Math.max(min, Math.round(v / step) * step)));
  const btn =
    "flex size-11 shrink-0 items-center justify-center rounded-full ring-1 ring-line transition-colors hover:ring-ink-3 disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div>
      <label htmlFor={id} className="text-[0.9375rem] font-medium leading-snug">
        {label}
      </label>
      <div className="mt-3 flex items-center gap-2">
        <button type="button" className={btn} aria-label={less} disabled={value <= min} onClick={() => commit(value - step)}>
          <Minus className="size-4" strokeWidth={1.8} aria-hidden="true" />
        </button>
        <div className="relative min-w-0 flex-1">
          <input
            id={id}
            inputMode="numeric"
            value={text}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
              setText(digits);
              const v = Number(digits);
              if (digits && v >= min && v <= max) onChange(v);
            }}
            onBlur={() => commit(Number(text) || min)}
            className={`field h-11 text-center text-lg font-medium tabular-nums ${suffix ? "pr-9" : ""}`}
          />
          {suffix && <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-ink-3">{suffix}</span>}
        </div>
        <button type="button" className={btn} aria-label={more} disabled={value >= max} onClick={() => commit(value + step)}>
          <Plus className="size-4" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/** Compact savings module: three simple answers, the saving and payback, and the cost curve. */
export function RoiCalculator({
  t,
  locale,
  value,
  result,
  onChange,
  include,
  onInclude,
}: {
  t: Dictionary["roi"];
  locale: string;
  value: RoiInput;
  result: RoiResult;
  onChange: (next: RoiInput) => void;
  include: boolean;
  onInclude: (next: boolean) => void;
}) {
  const set = <K extends keyof RoiInput>(key: K, v: RoiInput[K]) => onChange({ ...value, [key]: v });
  const c = roiConfig;
  const symbol =
    new Intl.NumberFormat(intlLocale(locale), { style: "currency", currency: c.currency }).formatToParts(0).find((p) => p.type === "currency")?.value ?? "";

  return (
    <section aria-labelledby="roi-title" className="rounded-[1.75rem] bg-white p-6 md:p-8">
      <p className="text-sm text-ink-3">{t.extra}</p>
      <h2 id="roi-title" className="display h-block mt-1">
        {t.title}
      </h2>
      <p className="mt-2 leading-relaxed text-ink-2">{t.lead}</p>

      <div className="mt-7 space-y-6">
        <Stepper
          label={t.people}
          value={value.people}
          min={c.people.min}
          max={c.people.max}
          less={t.less}
          more={t.more}
          onChange={(v) => set("people", v)}
        />
        <fieldset>
          <legend className="text-[0.9375rem] font-medium leading-snug">{t.hours}</legend>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {c.hoursPerDay.options.map((h) => {
              const on = value.hoursPerDay === h;
              return (
                <label
                  key={h}
                  className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-2 text-center text-sm leading-tight ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                    on ? "bg-ink text-white ring-ink" : "ring-line hover:ring-ink-3"
                  }`}
                >
                  <input type="radio" name="roi-hours" className="sr-only" checked={on} onChange={() => set("hoursPerDay", h)} />
                  {h === 8 ? t.fullDay : `${h} ${t.unitHours}`}
                </label>
              );
            })}
          </div>
        </fieldset>
        <Stepper
          label={t.salary}
          value={value.salary}
          min={c.salary.min}
          max={c.salary.max}
          step={c.salary.step}
          suffix={symbol}
          less={t.less}
          more={t.more}
          onChange={(v) => set("salary", v)}
        />
      </div>

      <div className="mt-8 rounded-[1.5rem] bg-panel p-5 md:p-6" aria-live="polite">
        <p className="text-sm text-ink-2">{t.saving}</p>
        <p className="display mt-1 flex items-center gap-3 text-[clamp(2.2rem,4vw,3rem)] leading-none tabular-nums">
          <span aria-hidden="true" className="size-3 shrink-0 rounded-full" style={{ background: AUTOMATED }} />
          {money(locale, result.savingMonthly)}
        </p>
        <p className="mt-3 text-[0.9375rem] text-ink-2">
          {t.now.replace("{v}", money(locale, result.manualMonthly))}
          <span className="mx-2 text-ink-4">/</span>
          {t.freed.replace("{n}", number(locale, result.hoursFreed))}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4">
            <dt className="text-sm text-ink-2">{t.payback}</dt>
            <dd className="mt-1 text-xl font-medium tabular-nums">{paybackText(t, locale, result.paybackMonths)}</dd>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <dt className="text-sm text-ink-2">{t.net36}</dt>
            <dd className="mt-1 text-xl font-medium tabular-nums">{money(locale, result.net36)}</dd>
          </div>
        </dl>

        <RoiChart result={result} t={t} locale={locale} />

        <p className="mt-5 rounded-2xl bg-white p-4 text-[0.9375rem] leading-snug">
          {t.price.replace("{build}", money(locale, result.build)).replace("{support}", money(locale, result.support))}
        </p>
        <p className="mt-3 text-sm leading-snug text-ink-3">
          {t.assumptions.replace("{d}", String(c.workdaysPerMonth)).replace("{p}", String(Math.round(c.share * 100)))}
        </p>
      </div>

      <label className="mt-5 flex cursor-pointer items-center gap-3 text-[0.9375rem]">
        <input type="checkbox" checked={include} onChange={(e) => onInclude(e.target.checked)} className="size-5 accent-black" />
        {t.include}
      </label>
    </section>
  );
}
