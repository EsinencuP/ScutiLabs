import { roiConfig } from "@/content/roi";

export type RoiInput = {
  /** People busy with the routine. */
  people: number;
  /** Hours a day each of them spends on it. */
  hoursPerDay: number;
  /** Monthly cost of one employee, in the calculator currency. */
  salary: number;
};

export const defaultRoiInput: RoiInput = {
  people: roiConfig.people.value,
  hoursPerDay: roiConfig.hoursPerDay.value,
  salary: roiConfig.salary.value,
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const roundTo = (v: number, step: number) => Math.round(v / step) * step;

/** Bring any stored or typed value back into the supported ranges. */
export function sanitizeRoiInput(input: Partial<RoiInput>): RoiInput {
  const c = roiConfig;
  const num = (v: unknown, fallback: number) => (typeof v === "number" && Number.isFinite(v) ? v : fallback);
  const hours = num(input.hoursPerDay, c.hoursPerDay.value);
  return {
    people: clamp(Math.round(num(input.people, c.people.value)), c.people.min, c.people.max),
    hoursPerDay: (c.hoursPerDay.options as readonly number[]).includes(hours) ? hours : c.hoursPerDay.value,
    salary: clamp(roundTo(num(input.salary, c.salary.value), c.salary.step), c.salary.min, c.salary.max),
  };
}

/** Starting price: support scales with the saving, the build is sized to pay back in the target time. */
export function estimatePrice(grossSaving: number) {
  const p = roiConfig.pricing;
  const support = clamp(roundTo(grossSaving * p.supportShare, p.supportStep), p.minSupport, p.maxSupport);
  const build = clamp(roundTo((grossSaving - support) * p.targetPaybackMonths, p.buildStep), p.minBuild, p.maxBuild);
  return { build, support };
}

/** Pure savings model: routine cost now vs. a one-off build plus support and the work that remains. */
export function calcRoi(raw: RoiInput) {
  const input = sanitizeRoiInput(raw);
  const c = roiConfig;
  const hoursMonth = input.people * input.hoursPerDay * c.workdaysPerMonth;
  const manualMonthly = hoursMonth * (input.salary / c.workHoursPerMonth);
  const grossSaving = manualMonthly * c.share;
  const { build, support } = estimatePrice(grossSaving);
  const autoMonthly = manualMonthly - grossSaving + support;
  const savingMonthly = manualMonthly - autoMonthly;
  const paybackMonths = savingMonthly > 0 ? build / savingMonthly : null;
  const horizon = paybackMonths !== null && paybackMonths > 12 ? 36 : 24;

  const series = Array.from({ length: horizon + 1 }, (_, m) => ({
    month: m,
    manual: manualMonthly * m,
    automated: build + autoMonthly * m,
  }));

  return {
    hoursMonth,
    hoursFreed: hoursMonth * c.share,
    manualMonthly,
    build,
    support,
    savingMonthly,
    paybackMonths,
    net36: savingMonthly * 36 - build,
    horizon,
    series,
  };
}

export type RoiResult = ReturnType<typeof calcRoi>;
