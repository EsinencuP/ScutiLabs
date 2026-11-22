"use client";

import { Clock } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { roiConfig, type ScheduleId } from "@/content/roi";
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

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.9375rem] font-medium leading-snug">
          {label}
        </label>
        <output htmlFor={id} className="shrink-0 font-medium tabular-nums">
          {display}
        </output>
      </div>
      {hint && <p className="mt-0.5 text-sm leading-snug text-ink-3">{hint}</p>}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer accent-black"
      />
    </div>
  );
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
  const n = roiConfig.horizonMonths;
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
        <span className="font-medium">{t.chart}</span>
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
          {(narrow ? [0, 12, 24] : [0, 6, 12, 18, 24]).map((m) => {
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
        <caption>{t.chart}</caption>
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
  const schedule = useMemo(() => roiConfig.schedules.find((s) => s.id === value.schedule) ?? roiConfig.schedules[0], [value.schedule]);
  const c = roiConfig;
  const legend = "text-sm text-ink-3";

  return (
    <section aria-labelledby="roi-title" className="rounded-[1.75rem] bg-white p-6 md:p-10">
      <h2 id="roi-title" className="display h-block">
        {t.title}
      </h2>
      <p className="mt-3 max-w-[60ch] leading-relaxed text-ink-2">{t.lead}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-10 lg:col-span-5">
          <fieldset className="space-y-6">
            <legend className={legend}>{t.now}</legend>
            <Slider
              label={t.people}
              value={value.people}
              min={c.people.min}
              max={c.people.max}
              step={c.people.step}
              display={number(locale, value.people)}
              onChange={(v) => set("people", v)}
            />
            <div>
              <p className="text-[0.9375rem] font-medium">{t.schedule}</p>
              <div role="radiogroup" aria-label={t.schedule} className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {c.schedules.map((s) => {
                  const on = value.schedule === s.id;
                  return (
                    <label
                      key={s.id}
                      className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-3 text-center text-sm leading-tight ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                        on ? "bg-ink text-white ring-ink" : "ring-line hover:ring-ink-3"
                      }`}
                    >
                      <input
                        type="radio"
                        name="roi-schedule"
                        className="sr-only"
                        checked={on}
                        onChange={() =>
                          onChange({ ...value, schedule: s.id as ScheduleId, hoursPerDay: Math.min(value.hoursPerDay, s.hoursPerDay) })
                        }
                      />
                      {t.schedules[s.id as keyof typeof t.schedules]}
                    </label>
                  );
                })}
              </div>
            </div>
            <Slider
              label={t.hours}
              value={value.hoursPerDay}
              min={c.hoursPerDay.min}
              max={schedule.hoursPerDay}
              step={c.hoursPerDay.step}
              display={`${number(locale, value.hoursPerDay, 1)} ${t.unitHours}`}
              onChange={(v) => set("hoursPerDay", v)}
            />
            <Slider
              label={t.rate}
              hint={t.rateHint}
              value={value.rate}
              min={c.rate.min}
              max={c.rate.max}
              step={c.rate.step}
              display={money(locale, value.rate)}
              onChange={(v) => set("rate", v)}
            />
            <Slider
              label={t.share}
              hint={t.shareHint}
              value={value.share}
              min={c.share.min}
              max={c.share.max}
              step={c.share.step}
              display={`${value.share}%`}
              onChange={(v) => set("share", v)}
            />
          </fieldset>

          <fieldset className="space-y-6 border-t border-line pt-8">
            <legend className="sr-only">{t.auto}</legend>
            <p aria-hidden="true" className={legend}>
              {t.auto}
            </p>
            <Slider
              label={t.build}
              value={value.build}
              min={c.build.min}
              max={c.build.max}
              step={c.build.step}
              display={money(locale, value.build)}
              onChange={(v) => set("build", v)}
            />
            <Slider
              label={t.hosting}
              value={value.hosting}
              min={c.hosting.min}
              max={c.hosting.max}
              step={c.hosting.step}
              display={money(locale, value.hosting)}
              onChange={(v) => set("hosting", v)}
            />
            <p className="text-sm leading-snug text-ink-3">{t.autoNote}</p>
          </fieldset>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[1.5rem] bg-panel p-6 md:p-8" aria-live="polite">
            <p className="text-sm text-ink-2">{t.manualMonthly}</p>
            <p className="display mt-1 flex items-center gap-3 text-[clamp(2.4rem,5vw,3.6rem)] leading-none tabular-nums">
              <span aria-hidden="true" className="size-3 shrink-0 rounded-full" style={{ background: MANUAL }} />
              {money(locale, result.manualMonthly)}
            </p>
            <p className="mt-3 text-ink-2">
              {t.perYear.replace("{v}", money(locale, result.manualYearly))}
              <span className="mx-2 text-ink-4">/</span>
              {t.hoursMonth.replace("{n}", number(locale, result.hoursMonth))}
            </p>

            <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4">
                <dt className="text-sm text-ink-2">{t.saving}</dt>
                <dd className="mt-1 text-xl font-medium tabular-nums sm:text-2xl">{money(locale, result.savingMonthly)}</dd>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <dt className="text-sm text-ink-2">{t.payback}</dt>
                <dd className="mt-1 text-xl font-medium tabular-nums sm:text-2xl">{paybackText(t, locale, result.paybackMonths)}</dd>
              </div>
              <div className="col-span-2 rounded-2xl bg-white p-4 sm:col-span-1">
                <dt className="text-sm text-ink-2">{t.net36}</dt>
                <dd className="mt-1 text-xl font-medium tabular-nums sm:text-2xl">{money(locale, result.net36)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-[0.9375rem] text-ink-2">
              {result.savingMonthly > 0
                ? t.freed.replace("{n}", number(locale, result.hoursFreed))
                : t.noPaybackNote}
            </p>

            <RoiChart result={result} t={t} locale={locale} />

            <p className="mt-6 flex gap-3 rounded-2xl bg-white p-4 text-[0.9375rem] leading-snug text-ink-2">
              <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-ink" strokeWidth={1.6} />
              {t.idle.replace("{n}", number(locale, result.idleHoursWeek)).replace("{p}", number(locale, result.idleShare * 100))}
            </p>
          </div>

          <label className="mt-5 flex cursor-pointer items-center gap-3 text-[0.9375rem]">
            <input type="checkbox" checked={include} onChange={(e) => onInclude(e.target.checked)} className="size-5 accent-black" />
            {t.include}
          </label>
        </div>
      </div>
    </section>
  );
}
