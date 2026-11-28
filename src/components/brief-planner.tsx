"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { calcRoi, defaultRoiInput, sanitizeRoiInput, type RoiInput } from "@/lib/roi";
import { BriefForm } from "./brief-form";
import { money, number, paybackText, RoiCalculator } from "./roi-calculator";

const STORAGE_KEY = "scutilabs:roi:v2";
const LEGACY_KEY = "scutilabs:roi:v1";

function readStored(): { input: RoiInput; include: boolean } | null {
  try {
    window.localStorage.removeItem(LEGACY_KEY);
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { input?: Partial<RoiInput>; include?: boolean };
    return { input: sanitizeRoiInput(parsed.input ?? {}), include: parsed.include === true };
  } catch {
    return null;
  }
}

/** The brief page: the form, with the savings calculator as a side module; the estimate can go into the draft. */
export function BriefPlanner({
  t,
  roi,
  locale,
  contacts,
}: {
  t: Dictionary["brief"];
  roi: Dictionary["roi"];
  locale: string;
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
        `${roi.hours}: ${input.hoursPerDay} ${roi.unitHours}`,
        `${roi.salary}: ${money(locale, input.salary)}`,
        roi.now.replace("{v}", money(locale, result.manualMonthly)),
        `${roi.saving}: ${money(locale, result.savingMonthly)}`,
        `${roi.payback}: ${paybackText(roi, locale, result.paybackMonths)}`,
        roi.price.replace("{build}", money(locale, result.build)).replace("{support}", money(locale, result.support)),
      ],
    };
  }, [include, input, locale, result, roi]);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <BriefForm t={t} locale={locale} contacts={contacts} extra={extra} />
      </div>
      <div className="lg:col-span-5">
        <RoiCalculator
          t={roi}
          locale={locale}
          value={input}
          result={result}
          onChange={setInput}
          include={include}
          onInclude={setInclude}
        />
      </div>
    </div>
  );
}
