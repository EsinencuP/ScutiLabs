"use client";

import { useMemo, useState } from "react";

type Option = { value: string; label: string };
export type CatalogItem = { slug: string; status: string; services: string[]; node: React.ReactNode };

/** Filters the server-rendered project cards by service and status. */
export function PortfolioCatalog({
  items,
  services,
  statuses,
  labels,
}: {
  items: CatalogItem[];
  services: Option[];
  statuses: Option[];
  labels: { direction: string; status: string; all: string; empty: string; reset: string; count: string };
}) {
  const [service, setService] = useState("all");
  const [status, setStatus] = useState("all");

  const visible = useMemo(
    () => items.filter((i) => (service === "all" || i.services.includes(service)) && (status === "all" || i.status === status)),
    [items, service, status],
  );

  const chip = (active: boolean) =>
    `inline-flex min-h-10 items-center rounded-full px-4 text-[0.9375rem] transition-colors ${
      active ? "bg-ink text-white" : "bg-white text-ink-2 ring-1 ring-line hover:text-ink hover:ring-ink-3"
    }`;

  const group = (legend: string, options: Option[], value: string, set: (v: string) => void) => (
    <fieldset>
      <legend className="text-sm text-ink-3">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {[{ value: "all", label: labels.all }, ...options].map((o) => (
          <button key={o.value} type="button" aria-pressed={value === o.value} className={chip(value === o.value)} onClick={() => set(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {group(labels.direction, services, service, setService)}
        {group(labels.status, statuses, status, setStatus)}
      </div>
      <p className="mt-8 text-sm text-ink-2" aria-live="polite">
        {labels.count.replace("{n}", String(visible.length))}
      </p>
      {visible.length > 0 ? (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {visible.map((i) => (
            <li key={i.slug}>{i.node}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-[1.5rem] bg-white px-6 py-14 text-center">
          <p className="text-lg">{labels.empty}</p>
          <button
            type="button"
            className="btn btn-ghost mt-6"
            onClick={() => {
              setService("all");
              setStatus("all");
            }}
          >
            {labels.reset}
          </button>
        </div>
      )}
    </div>
  );
}
