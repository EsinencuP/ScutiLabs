import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { halftoneDisc } from "@/lib/halftone";

const dots = halftoneDisc(9.5, 2.6, 1.25, { x: -0.5, y: -0.6 });

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-10 -10 20 20" className={className} aria-hidden="true" focusable="false">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="currentColor" />
      ))}
    </svg>
  );
}

export function Logo({ locale, label }: { locale: Locale; label: string }) {
  return (
    <Link
      href={`/${locale}`}
      className="inline-flex items-center gap-2 rounded-full py-1 pr-1 text-[1.0625rem] font-semibold tracking-[-0.01em]"
      aria-label={label}
    >
      <LogoMark className="size-6" />
      <span>scutilabs</span>
    </Link>
  );
}
