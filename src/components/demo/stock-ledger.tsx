"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";

type Kind = "IN" | "OUT" | "ADJUSTMENT" | "TRANSFER";
type Wh = "main" | "north";
type Entry = { n: number; kind: Kind | "INIT"; wh: string; qty: string; reason: string };

const MIN_STOCK = 10;
const INITIAL: Record<Wh, number> = { main: 24, north: 6 };

/** Interactive model of Evo ERP stock movements: balances, validation and an append-only ledger. */
export function StockLedger({ t }: { t: Dictionary["stock"] }) {
  const initialLedger = (): Entry[] => [
    { n: 1, kind: "INIT", wh: t.warehouses.main, qty: `+${INITIAL.main}`, reason: t.initial },
    { n: 2, kind: "INIT", wh: t.warehouses.north, qty: `+${INITIAL.north}`, reason: t.initial },
  ];
  const [stock, setStock] = useState<Record<Wh, number>>(INITIAL);
  const [ledger, setLedger] = useState<Entry[]>(initialLedger);
  const [kind, setKind] = useState<Kind>("OUT");
  const [wh, setWh] = useState<Wh>("main");
  const [target, setTarget] = useState<Wh>("north");
  const [qty, setQty] = useState("5");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const total = stock.main + stock.north;
  const state = total === 0 ? "out" : total <= MIN_STOCK ? "low" : "in";
  const stateTone = { in: "bg-live", low: "bg-dev", out: "bg-scuti" }[state];

  function post(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(qty);
    if (!Number.isInteger(n)) return setMessage({ ok: false, text: kind === "ADJUSTMENT" ? t.errors.adjust : t.errors.qty });
    if (kind === "ADJUSTMENT" ? n === 0 : n <= 0) return setMessage({ ok: false, text: kind === "ADJUSTMENT" ? t.errors.adjust : t.errors.qty });
    if (kind === "TRANSFER" && wh === target) return setMessage({ ok: false, text: t.errors.same });
    if ((kind === "OUT" || kind === "TRANSFER") && n > stock[wh])
      return setMessage({ ok: false, text: t.errors.insufficient.replace("{n}", String(stock[wh])) });
    if (kind === "ADJUSTMENT" && stock[wh] + n < 0) return setMessage({ ok: false, text: t.errors.negative });

    const next = { ...stock };
    let whLabel = t.warehouses[wh];
    let qtyLabel = "";
    if (kind === "IN") {
      next[wh] += n;
      qtyLabel = `+${n}`;
    } else if (kind === "OUT") {
      next[wh] -= n;
      qtyLabel = `−${n}`;
    } else if (kind === "ADJUSTMENT") {
      next[wh] += n;
      qtyLabel = n > 0 ? `+${n}` : `−${Math.abs(n)}`;
    } else {
      next[wh] -= n;
      next[target] += n;
      whLabel = `${t.warehouses[wh]} → ${t.warehouses[target]}`;
      qtyLabel = String(n);
    }
    setStock(next);
    setLedger((l) => [...l, { n: l.length + 1, kind, wh: whLabel, qty: qtyLabel, reason: reason.trim() || "—" }]);
    setReason("");
    setMessage({ ok: true, text: t.posted });
  }

  function reset() {
    setStock(INITIAL);
    setLedger(initialLedger());
    setMessage(null);
    setQty("5");
    setReason("");
  }

  const label = "block text-sm text-ink-2";

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="rounded-[1.5rem] bg-white p-6 md:p-8 lg:col-span-5">
        <h3 className="text-xl font-medium">{t.title}</h3>
        <p className="mt-1 text-ink-2">
          {t.product}, {t.sku}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          {(["main", "north"] as Wh[]).map((w) => (
            <div key={w} className="rounded-2xl bg-panel p-4">
              <dt className="text-sm text-ink-2">{t.warehouses[w]}</dt>
              <dd className="display mt-1 text-4xl leading-none tabular-nums">{stock[w]}</dd>
            </div>
          ))}
          <div className="col-span-2 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line p-4">
            <dt className="text-sm leading-snug text-ink-2">
              {t.total}
              <span className="block text-ink-3">
                {t.min}: {MIN_STOCK}
              </span>
            </dt>
            <dd className="flex items-center gap-3">
              <span className="text-2xl font-medium tabular-nums">{total}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-panel px-3 py-1 text-sm">
                <span aria-hidden="true" className={`size-2 rounded-full ${stateTone}`} />
                {t.states[state]}
              </span>
            </dd>
          </div>
        </dl>

        <form onSubmit={post} className="mt-6 space-y-4" noValidate>
          <fieldset>
            <legend className={label}>{t.type}</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["IN", "OUT", "ADJUSTMENT", "TRANSFER"] as Kind[]).map((k) => (
                <label
                  key={k}
                  className={`flex min-h-14 cursor-pointer flex-col justify-center rounded-xl px-3 py-1.5 text-[0.9375rem] leading-tight ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                    kind === k ? "bg-ink text-white ring-ink" : "ring-line hover:ring-ink-3"
                  }`}
                >
                  <input
                    type="radio"
                    name="kind"
                    value={k}
                    checked={kind === k}
                    onChange={() => {
                      setKind(k);
                      setMessage(null);
                      if (k === "ADJUSTMENT") setQty("-2");
                      else if (Number(qty) <= 0) setQty("5");
                    }}
                    className="sr-only"
                  />
                  <span className="font-medium">{t.types[k]}</span>
                  <span className={`text-xs ${kind === k ? "text-white/65" : "text-ink-3"}`}>{k}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={`grid gap-3 ${kind === "TRANSFER" ? "grid-cols-2" : ""}`}>
            <label className={label}>
              {kind === "TRANSFER" ? t.source : t.warehouse}
              <select value={wh} onChange={(e) => setWh(e.target.value as Wh)} className="field mt-1.5">
                <option value="main">{t.warehouses.main}</option>
                <option value="north">{t.warehouses.north}</option>
              </select>
            </label>
            {kind === "TRANSFER" && (
              <label className={label}>
                {t.target}
                <select value={target} onChange={(e) => setTarget(e.target.value as Wh)} className="field mt-1.5">
                  <option value="main">{t.warehouses.main}</option>
                  <option value="north">{t.warehouses.north}</option>
                </select>
              </label>
            )}
          </div>

          <div className="grid grid-cols-[8rem_1fr] gap-3">
            <label className={label}>
              {kind === "ADJUSTMENT" ? t.qtyAdjust : t.qty}
              <input
                type="number"
                inputMode="numeric"
                step={1}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="field mt-1.5 tabular-nums"
              />
            </label>
            <label className={label}>
              {t.reason}
              <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder={t.reasonPlaceholder} className="field mt-1.5" maxLength={60} />
            </label>
          </div>

          <p role="status" aria-live="polite" className={`min-h-6 text-[0.9375rem] ${message?.ok ? "text-live" : "text-scuti"}`}>
            {message?.text}
          </p>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn btn-primary">
              {t.post}
            </button>
            <button type="button" onClick={reset} className="btn btn-ghost">
              {t.reset}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-[1.5rem] bg-white p-6 md:p-8 lg:col-span-7">
        <h3 className="text-xl font-medium">{t.ledger}</h3>
        <p className="mt-1 text-[0.9375rem] text-ink-2">{t.ledgerNote}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-[0.9375rem]">
            <thead className="text-sm text-ink-3">
              <tr className="border-b border-line">
                <th scope="col" className="py-2 pr-3 font-normal">{t.cols.n}</th>
                <th scope="col" className="py-2 pr-3 font-normal">{t.cols.type}</th>
                <th scope="col" className="py-2 pr-3 font-normal">{t.cols.warehouse}</th>
                <th scope="col" className="py-2 pr-3 text-right font-normal">{t.cols.qty}</th>
                <th scope="col" className="py-2 font-normal">{t.cols.reason}</th>
              </tr>
            </thead>
            <tbody>
              {[...ledger].reverse().map((e) => (
                <tr key={e.n} className="border-b border-line-2 align-top">
                  <td className="py-2.5 pr-3 tabular-nums text-ink-3">{e.n}</td>
                  <td className="py-2.5 pr-3 font-medium">{e.kind === "INIT" ? "—" : e.kind}</td>
                  <td className="py-2.5 pr-3">{e.wh}</td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">{e.qty}</td>
                  <td className="py-2.5 text-ink-2">{e.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
