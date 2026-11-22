"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { DownloadIcon } from "./icons";

type Draft = {
  company: string;
  direction: string;
  current: string;
  problem: string;
  /** indexes into the localized option lists, so a draft survives switching language */
  systems: number[];
  people: string;
  result: string;
  timing: number;
  contact: string;
};

const EMPTY: Draft = {
  company: "",
  direction: "",
  current: "",
  problem: "",
  systems: [],
  people: "",
  result: "",
  timing: -1,
  contact: "",
};

const STORAGE_KEY = "scutilabs:brief:v2";
const LEGACY_KEY = "scutilabs:brief:v1";

const isEmpty = (d: Draft) =>
  d.systems.length === 0 && d.timing < 0 && [d.company, d.direction, d.current, d.problem, d.people, d.result, d.contact].every((v) => !v.trim());

function readStored(): Draft | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Draft>;
    return {
      ...EMPTY,
      ...parsed,
      systems: Array.isArray(parsed.systems) ? parsed.systems.filter((n): n is number => Number.isInteger(n)) : [],
      timing: Number.isInteger(parsed.timing) ? (parsed.timing as number) : -1,
    };
  } catch {
    return null;
  }
}

export function BriefForm({
  t,
  services,
  locale,
  contacts,
}: {
  t: Dictionary["brief"];
  services: { slug: string; name: string }[];
  locale: string;
  contacts: { email: string | null; telegram: string | null };
}) {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [status, setStatus] = useState("");
  const loaded = useRef(false);
  const f = t.fields;

  // Restore the saved draft, or preselect the service passed from a service page.
  useEffect(() => {
    try {
      window.localStorage.removeItem(LEGACY_KEY);
    } catch {
      /* ignore */
    }
    const stored = readStored();
    const fromUrl = new URLSearchParams(window.location.search).get("service");
    const preset = fromUrl && services.some((s) => s.slug === fromUrl) ? fromUrl : "";
    setDraft(stored ? { ...stored, direction: preset || stored.direction } : { ...EMPTY, direction: preset });
    loaded.current = true;
  }, [services]);

  useEffect(() => {
    if (!loaded.current) return;
    const id = window.setTimeout(() => {
      try {
        if (isEmpty(draft)) window.localStorage.removeItem(STORAGE_KEY);
        else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      } catch {
        /* storage unavailable: the draft simply isn't persisted */
      }
    }, 300);
    return () => window.clearTimeout(id);
  }, [draft]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const toggleSystem = (i: number) =>
    setDraft((d) => ({ ...d, systems: d.systems.includes(i) ? d.systems.filter((x) => x !== i) : [...d.systems, i] }));

  const directionName =
    draft.direction === "unsure" ? f.direction.unsure : services.find((s) => s.slug === draft.direction)?.name ?? "";

  const text = useMemo(() => {
    const rows: [string, string][] = [
      [f.company.label, draft.company],
      [f.direction.label, directionName],
      [f.current.label, draft.current],
      [f.problem.label, draft.problem],
      [f.systems.label, [...draft.systems].sort((a, b) => a - b).map((i) => f.systems.options[i]).filter(Boolean).join(", ")],
      [f.people.label, draft.people],
      [f.result.label, draft.result],
      [f.timing.label, f.timing.options[draft.timing] ?? ""],
      [f.contact.label, draft.contact],
    ];
    const filled = rows.filter(([, v]) => v.trim());
    if (filled.length === 0) return "";
    const date = new Date().toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
    return [`# ${t.fileTitle}`, `${t.fileDate}: ${date}`, ...filled.map(([k, v]) => `\n## ${k}\n${v.trim()}`)].join("\n");
  }, [draft, directionName, f, locale, t.fileDate, t.fileTitle]);

  function download() {
    if (!text) return;
    const blob = new Blob([text + "\n"], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${t.fileName}-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus(t.downloaded);
  }

  async function copy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setStatus(t.copied);
    } catch {
      setStatus(t.copyFailed);
    }
  }

  function clear() {
    setDraft(EMPTY);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setStatus(t.cleared);
  }

  const label = "block font-medium";
  const area = "field mt-2 min-h-28 resize-y";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-12">
      <form className="space-y-7 rounded-[1.5rem] bg-white p-6 md:p-10 lg:col-span-7" onSubmit={(e) => e.preventDefault()}>
        <label className={label}>
          {f.company.label}
          <input className="field mt-2 font-normal" value={draft.company} onChange={(e) => set("company", e.target.value)} placeholder={f.company.placeholder} autoComplete="organization" />
        </label>

        <label className={label}>
          {f.direction.label}
          <select className="field mt-2 font-normal" value={draft.direction} onChange={(e) => set("direction", e.target.value)}>
            <option value="">—</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value="unsure">{f.direction.unsure}</option>
          </select>
        </label>

        <label className={label}>
          {f.current.label}
          <textarea className={`${area} font-normal`} value={draft.current} onChange={(e) => set("current", e.target.value)} placeholder={f.current.placeholder} />
        </label>

        <label className={label}>
          {f.problem.label}
          <textarea className={`${area} font-normal`} value={draft.problem} onChange={(e) => set("problem", e.target.value)} placeholder={f.problem.placeholder} />
        </label>

        <fieldset>
          <legend className={label}>{f.systems.label}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {f.systems.options.map((o, i) => {
              const on = draft.systems.includes(i);
              return (
                <label
                  key={o}
                  className={`inline-flex min-h-10 cursor-pointer items-center rounded-full px-4 text-[0.9375rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                    on ? "bg-ink text-white" : "bg-white ring-1 ring-line hover:ring-ink-3"
                  }`}
                >
                  <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleSystem(i)} />
                  {o}
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className={label}>
          {f.people.label}
          <input className="field mt-2 font-normal" value={draft.people} onChange={(e) => set("people", e.target.value)} placeholder={f.people.placeholder} />
        </label>

        <label className={label}>
          {f.result.label}
          <textarea className={`${area} font-normal`} value={draft.result} onChange={(e) => set("result", e.target.value)} placeholder={f.result.placeholder} />
        </label>

        <fieldset>
          <legend className={label}>{f.timing.label}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {f.timing.options.map((o, i) => (
              <label
                key={o}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-4 text-[0.9375rem] ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                  draft.timing === i ? "ring-ink" : "ring-line hover:ring-ink-3"
                }`}
              >
                <input type="radio" name="timing" className="accent-black" checked={draft.timing === i} onChange={() => set("timing", i)} />
                {o}
              </label>
            ))}
          </div>
        </fieldset>

        <label className={label}>
          {f.contact.label}
          <input className="field mt-2 font-normal" value={draft.contact} onChange={(e) => set("contact", e.target.value)} placeholder={f.contact.placeholder} />
        </label>
      </form>

      <aside className="lg:sticky lg:top-24 lg:col-span-5">
        <div className="sky-surface rounded-[1.5rem] p-6 text-white md:p-8">
          <h2 className="text-sm text-white/55">{t.preview}</h2>
          {text ? (
            <pre className="mt-4 max-h-[26rem] overflow-auto whitespace-pre-wrap break-words font-sans text-[0.9375rem] leading-relaxed text-white/90">
              {text}
            </pre>
          ) : (
            <p className="mt-4 text-white/60">{t.previewEmpty}</p>
          )}
          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/15 pt-6">
            <button type="button" onClick={download} disabled={!text} className="btn bg-white text-ink hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40">
              <DownloadIcon />
              {t.download}
            </button>
            <button type="button" onClick={copy} disabled={!text} className="btn border border-white/25 text-white hover:border-white disabled:cursor-not-allowed disabled:opacity-40">
              {t.copy}
            </button>
            <button type="button" onClick={clear} className="btn text-white/70 hover:text-white">
              {t.clear}
            </button>
          </div>
          <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm text-white/70">
            {status || (text ? t.saved : "")}
          </p>
        </div>
        {(contacts.email || contacts.telegram) && (
          <div className="mt-4 rounded-[1.25rem] bg-white p-5">
            <p className="text-sm text-ink-2">{t.sendTo}</p>
            <ul className="mt-2 space-y-1 font-medium">
              {contacts.email && (
                <li>
                  <a className="link" href={`mailto:${contacts.email}?subject=${encodeURIComponent(t.fileTitle)}`}>
                    {contacts.email}
                  </a>
                </li>
              )}
              {contacts.telegram && (
                <li>
                  <a className="link" href={`https://t.me/${contacts.telegram}`} target="_blank" rel="noopener noreferrer">
                    Telegram: @{contacts.telegram}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
        <p className="mt-4 px-2 text-sm leading-relaxed text-ink-2">
          {t.note}{" "}
          <Link href={`/${locale}/privacy`} className="link">
            {t.privacyLink}
          </Link>
        </p>
      </aside>
    </div>
  );
}
