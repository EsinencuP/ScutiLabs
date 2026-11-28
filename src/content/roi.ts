/**
 * Savings calculator settings for the brief page.
 *
 * The visitor answers three questions; the implementation price is not an input. It is derived
 * from the saving so that it pays back in about `targetPaybackMonths`, within `minBuild`–`maxBuild`.
 * These numbers are shown to visitors as a starting price ("from"), so set them to what you are
 * actually willing to quote.
 */
export const roiConfig = {
  currency: "EUR",
  workdaysPerMonth: 21,
  workHoursPerMonth: 168,
  people: { min: 1, max: 50, value: 3 },
  hoursPerDay: { options: [1, 2, 4, 8], value: 2 },
  salary: { min: 500, max: 8000, step: 100, value: 1200 },
  /** Share of the routine work automation takes over. */
  share: 0.75,
  pricing: {
    targetPaybackMonths: 6,
    minBuild: 1000,
    maxBuild: 30000,
    buildStep: 500,
    /** Monthly server and support as a share of the gross saving, rounded to `supportStep`. */
    supportShare: 0.1,
    minSupport: 10,
    maxSupport: 300,
    supportStep: 5,
  },
} as const;
