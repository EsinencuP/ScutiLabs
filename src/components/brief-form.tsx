"use client";

import Link from "next/link";
import { Plus, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { DownloadIcon } from "./icons";

type Draft = {
  company: string;
  task: string;
  /** indexes into the localized option lists, so a draft survives switching language */
  systems: number[];
  /** the visitor's own answers to "what you already use" */
  ownSystems: string[];
  timing: number;
  phone: string;
  email: string;
};

const EMPTY: Draft = { company: "", task: "", systems: [], ownSystems: [], timing: -1, phone: "", email: "" };

const STORAGE_KEY = "scutilabs:brief:v3";
const LEGACY_KEYS = ["scutilabs:brief:v1", "scutilabs:brief:v2"];

const isEmpty = (d: Draft) =>
  d.systems.length === 0 && d.ownSystems.length === 0 && d.timing < 0 && [d.company, d.task, d.phone, d.email].every((v) => !v.trim());

const str = (v: unknown) => (typeof v === "string" ? v : "");

function readStored(): Draft | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Record<keyof Draft, unknown>>;
    return {
      company: str(parsed.company),
      task: str(parsed.task),
      systems: Array.isArray(parsed.systems) ? parsed.systems.filter((n): n is number => Number.isInteger(n)) : [],
      ownSystems: Array.isArray(parsed.ownSystems) ? parsed.ownSystems.filter((s): s is string => typeof s === "string" && !!s.trim()) : [],
      timing: Number.isInteger(parsed.timing) ? (parsed.timing as number) : -1,
      phone: str(parsed.phone),
      email: str(parsed.email),
    };
  } catch {
    return null;
  }
}

const chip = (on: boolean) =>
  `inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-[0.9375rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
    on ? "bg-ink text-white" : "bg-white ring-1 ring-line hover:ring-ink-3"
  }`;

export function BriefForm({
  t,
  locale,
  contacts,
  extra = null,
}: {
  t: Dictionary["brief"];
  locale: string;
  contacts: { email: string | null; telegram: string | null };
  /** Optional section appended to the draft, e.g. the savings estimate. */
  extra?: { title: string; lines: string[] } | null;
}) {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [own, setOwn] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const loaded = useRef(false);
  const f = t.fields;

  useEffect(() => {
    try {
      for (const key of LEGACY_KEYS) window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    const stored = readStored();
    if (stored) setDraft(stored);
    loaded.current = true;
  }, []);

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

  function addOwn() {
    const value = (own ?? "").trim().slice(0, 60);
    if (value && !draft.ownSystems.some((s) => s.toLowerCase() === value.toLowerCase())) {
      setDraft((d) => ({ ...d, ownSystems: [...d.ownSystems, value] }));
    }
    setOwn(null);
  }

  const text = useMemo(() => {
    const systems = [
      ...[...draft.systems].sort((a, b) => a - b).map((i) => f.systems.options[i]),
      ...draft.ownSystems,
    ].filter(Boolean);
    const rows: [string, string][] = [
      [f.company.label, draft.company],
      [f.task.label, draft.task],
      [f.systems.label, systems.join(", ")],
      [f.timing.label, f.timing.options[draft.timing] ?? ""],
      [f.phone.label, draft.phone],
      [f.email.label, draft.email],
    ];
    const filled = rows.filter(([, v]) => v.trim());
    if (filled.length === 0 && !extra) return "";
    const date = new Date().toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
    const sections = filled.map(([k, v]) => `\n## ${k}\n${v.trim()}`);
    if (extra) sections.push(`\n## ${extra.title}\n${extra.lines.map((l) => `- ${l}`).join("\n")}`);
    return [`# ${t.fileTitle}`, `${t.fileDate}: ${date}`, ...sections].join("\n");
  }, [draft, extra, f, locale, t.fileDate, t.fileTitle]);

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
    setOwn(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setStatus(t.cleared);
  }

  const label = "block font-medium";

  return (
    <div>
      <form className="space-y-7 rounded-[1.75rem] bg-white p-6 md:p-10" onSubmit={(e) => e.preventDefault()}>
        <label className={label}>
          {f.company.label}
          <input
            className="field mt-2 font-normal"
            value={draft.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder={f.company.placeholder}
            autoComplete="organization"
          />
        </label>

        <label className={label}>
          {f.task.label}
          <textarea
            className="field mt-2 min-h-28 resize-y font-normal"
            value={draft.task}
            onChange={(e) => set("task", e.target.value)}
            placeholder={f.task.placeholder}
          />
        </label>

        <fieldset>
          <legend className={label}>{f.systems.label}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {f.systems.options.map((o, i) => {
              const on = draft.systems.includes(i);
              return (
                <label key={o} className={chip(on)}>
                  <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleSystem(i)} />
                  {o}
                </label>
              );
            })}
            {draft.ownSystems.map((o) => (
              <span key={o} className={chip(true)}>
                {o}
                <button
                  type="button"
                  aria-label={f.systems.remove.replace("{v}", o)}
                  className="-mr-1 rounded-full p-0.5 text-white/70 hover:text-white"
                  onClick={() => set("ownSystems", draft.ownSystems.filter((s) => s !== o))}
                >
                  <X className="size-4" strokeWidth={1.8} aria-hidden="true" />
                </button>
              </span>
            ))}
            {own === null ? (
              <button type="button" className={`${chip(false)} border border-dashed border-ink-4 !ring-0`} onClick={() => setOwn("")}>
                <Plus className="size-4" strokeWidth={1.8} aria-hidden="true" />
                {f.systems.own}
              </button>
            ) : (
              <span className="inline-flex min-h-10 items-center gap-1 rounded-full bg-white pl-4 pr-1 ring-1 ring-ink">
                <input
                  autoFocus
                  aria-label={f.systems.own}
                  value={own}
                  maxLength={60}
                  onChange={(e) => setOwn(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addOwn();
                    } else if (e.key === "Escape") setOwn(null);
                  }}
                  onBlur={addOwn}
                  placeholder={f.systems.ownPlaceholder}
                  className="w-40 bg-transparent text-[0.9375rem] outline-none placeholder:text-ink-3"
                />
                <button
                  type="button"
                  aria-label={f.systems.add}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={addOwn}
                  className="flex size-8 items-center justify-center rounded-full bg-ink text-white"
                >
                  <Plus className="size-4" strokeWidth={1.8} aria-hidden="true" />
                </button>
              </span>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend className={label}>{f.timing.label}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {f.timing.options.map((o, i) => (
              <label key={o} className={chip(draft.timing === i)}>
                <input type="radio" name="timing" className="sr-only" checked={draft.timing === i} onChange={() => set("timing", i)} />
                {o}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={label}>
            {f.contactTitle} <span className="font-normal text-ink-3">{f.optional}</span>
          </legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm text-ink-2">
              {f.phone.label}
              <input
                type="tel"
                className="field mt-1.5 text-base text-ink"
                value={draft.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder={f.phone.placeholder}
                autoComplete="tel"
              />
            </label>
            <label className="block text-sm text-ink-2">
              {f.email.label}
              <input
                type="email"
                className="field mt-1.5 text-base text-ink"
                value={draft.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder={f.email.placeholder}
                autoComplete="email"
              />
            </label>
          </div>
        </fieldset>

        <div className="border-t border-line pt-7">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={download} disabled={!text} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-40">
              <DownloadIcon />
              {t.download}
            </button>
            <button type="button" onClick={copy} disabled={!text} className="btn btn-ghost disabled:cursor-not-allowed disabled:opacity-40">
              {t.copy}
            </button>
            <button type="button" onClick={clear} className="btn text-ink-2 hover:text-ink">
              {t.clear}
            </button>
          </div>
          <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm text-ink-2">
            {status || (text ? t.saved : t.previewEmpty)}
          </p>
          {text && (
            <details className="mt-2 rounded-2xl bg-panel">
              <summary className="cursor-pointer px-4 py-3 text-[0.9375rem] font-medium">{t.preview}</summary>
              <pre className="max-h-[22rem] overflow-auto whitespace-pre-wrap break-words px-4 pb-4 font-sans text-[0.9375rem] leading-relaxed text-ink-2">
                {text}
              </pre>
            </details>
          )}
        </div>
      </form>

      <div className="mt-4 space-y-3 px-2 text-sm leading-relaxed text-ink-2">
        {(contacts.email || contacts.telegram) && (
          <p>
            {t.sendTo}{" "}
            {contacts.email && (
              <a className="link font-medium text-ink" href={`mailto:${contacts.email}?subject=${encodeURIComponent(t.fileTitle)}`}>
                {contacts.email}
              </a>
            )}
            {contacts.email && contacts.telegram && ", "}
            {contacts.telegram && (
              <a className="link font-medium text-ink" href={`https://t.me/${contacts.telegram}`} target="_blank" rel="noopener noreferrer">
                Telegram @{contacts.telegram}
              </a>
            )}
          </p>
        )}
        <p>
          {t.note}{" "}
          <Link href={`/${locale}/privacy`} className="link">
            {t.privacyLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
