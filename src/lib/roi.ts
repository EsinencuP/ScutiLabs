import { roiConfig, type ScheduleId } from "@/content/roi";

export type RoiInput = {
  people: number;
  hoursPerDay: number;
  rate: number;
  schedule: ScheduleId;
  /** Share of the manual work automation takes over, in percent. */
  share: number;
  build: number;
  hosting: number;
};

export const defaultRoiInput: RoiInput = {
  people: roiConfig.people.value,
  hoursPerDay: roiConfig.hoursPerDay.value,
  rate: roiConfig.rate.value,
  schedule: "5x8",
  share: roiConfig.share.value,
  build: roiConfig.build.value,
  hosting: roiConfig.hosting.value,
};

export function scheduleOf(id: ScheduleId) {
  return roiConfig.schedules.find((s) => s.id === id) ?? roiConfig.schedules[0];
}

/** Pure savings model: manual cost now vs. build once + hosting + the manual work that remains. */
export function calcRoi(input: RoiInput) {
  const schedule = scheduleOf(input.schedule);
  const share = input.share / 100;
  const hoursMonth = input.people * input.hoursPerDay * schedule.daysPerMonth;
  const manualMonthly = hoursMonth * input.rate;
  const autoMonthly = manualMonthly * (1 - share) + input.hosting;
  const savingMonthly = manualMonthly - autoMonthly;
  const paybackMonths = savingMonthly > 0 ? input.build / savingMonthly : null;
  const idleHoursWeek = 168 - schedule.hoursPerWeek;

  const series = Array.from({ length: roiConfig.horizonMonths + 1 }, (_, m) => ({
    month: m,
    manual: manualMonthly * m,
    automated: input.build + autoMonthly * m,
  }));

  return {
    hoursMonth,
    hoursFreed: hoursMonth * share,
    manualMonthly,
    manualYearly: manualMonthly * 12,
    autoMonthly,
    savingMonthly,
    paybackMonths,
    net12: savingMonthly * 12 - input.build,
    net36: savingMonthly * 36 - input.build,
    idleHoursWeek,
    idleShare: idleHoursWeek / 168,
    series,
  };
}

export type RoiResult = ReturnType<typeof calcRoi>;
