"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { roiConfig } from "@/content/roi";
import type { Dictionary } from "@/i18n/get-dictionary";
import { calcRoi, defaultRoiInput, type RoiInput } from "@/lib/roi";
import { BriefForm } from "./brief-form";
import { money, number, paybackText, RoiCalculator } from "./roi-calculator";

const STORAGE_KEY = "scutilabs:roi:v1";

function readStored(): { input: RoiInput; include: boolean } | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { input?: Partial<RoiInput>; include?: boolean };
    const input = { ...defaultRoiInput, ...parsed.input };
    if (!roiConfig.schedules.some((s) => s.id === input.schedule)) input.schedule = defaultRoiInput.schedule;
    for (const key of ["people", "hoursPerDay", "rate", "share", "build", "hosting"] as const) {
      if (!Number.isFinite(input[key])) input[key] = defaultRoiInput[key];
    }
    return { input, include: parsed.include === true };
  } catch {
    return null;
  }
}

/** The brief page: savings calculator on top, brief form below; the estimate can go into the draft. */
export function BriefPlanner({
  t,
  roi,
  locale,
  services,
  contacts,
}: {
  t: Dictionary["brief"];
  roi: Dictionary["roi"];
  locale: string;
  services: { slug: string; name: string }[];
  contacts: { email: string | null; telegram: string | null };
}) {
  const [input, setInput] = useState<RoiInput>(defaultRoiInput);
  const [include, setInclude] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setInput(stored.input);
      setInclude(stored.include);
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ input, include }));
    } catch {
      /* storage unavailable: the calculator still works for this visit */
    }
  }, [input, include]);

  const result = useMemo(() => calcRoi(input), [input]);

  const extra = useMemo(() => {
    if (!include) return null;
    return {
      title: roi.briefTitle,
      lines: [
        `${roi.people}: ${number(locale, input.people)}`,
        `${roi.schedule}: ${roi.schedules[input.schedule as keyof typeof roi.schedules]}`,
        `${roi.hours}: ${number(locale, input.hoursPerDay, 1)} ${roi.unitHours}`,
        `${roi.rate}: ${money(locale, input.rate)}`,
        `${roi.manualMonthly}: ${money(locale, result.manualMonthly)}`,
        `${roi.share}: ${input.share}%`,
        `${roi.build}: ${money(locale, input.build)}`,
        `${roi.hosting}: ${money(locale, input.hosting)}`,
        `${roi.saving}: ${money(locale, result.savingMonthly)}`,
        `${roi.payback}: ${paybackText(roi, locale, result.paybackMonths)}`,
      ],
    };
  }, [include, input, locale, result, roi]);

  return (
    <div className="space-y-6">
      <RoiCalculator
        t={roi}
        locale={locale}
        value={input}
        result={result}
        onChange={setInput}
        include={include}
        onInclude={setInclude}
      />
      <BriefForm t={t} locale={locale} services={services} contacts={contacts} extra={extra} />
    </div>
  );
}
