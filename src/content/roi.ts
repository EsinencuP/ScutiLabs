/**
 * Savings calculator settings for the brief page.
 * `build` and `hosting` defaults are an example for comparison, not a price list:
 * set them to the ranges you actually quote.
 */
export const roiConfig = {
  currency: "EUR",
  horizonMonths: 24,
  people: { min: 1, max: 50, step: 1, value: 3 },
  hoursPerDay: { min: 0.5, step: 0.5, value: 2 },
  rate: { min: 2, max: 60, step: 1, value: 8 },
  share: { min: 20, max: 95, step: 5, value: 70 },
  build: { min: 1000, max: 60000, step: 500, value: 6000 },
  hosting: { min: 0, max: 1000, step: 10, value: 60 },
  schedules: [
    { id: "5x8", daysPerMonth: 22, hoursPerDay: 8, hoursPerWeek: 40 },
    { id: "6x8", daysPerMonth: 26, hoursPerDay: 8, hoursPerWeek: 48 },
    { id: "2x2", daysPerMonth: 15, hoursPerDay: 12, hoursPerWeek: 42 },
  ],
} as const;

export type ScheduleId = (typeof roiConfig.schedules)[number]["id"];
