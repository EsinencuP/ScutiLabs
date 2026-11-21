import Link from "next/link";
import type { ProjectStatus } from "@/content/projects";
import { ExternalIcon } from "./icons";

export const statusDot: Record<ProjectStatus, string> = {
  live: "bg-live",
  demo: "bg-demo",
  development: "bg-dev",
};

export function StatusBadge({ status, label, className = "" }: { status: ProjectStatus; label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm ${className}`}>
      <span aria-hidden="true" className={`size-2 rounded-full ${statusDot[status]}`} />
      {label}
    </span>
  );
}

export function Breadcrumbs({ items, label }: { items: { href?: string; name: string }[]; label: string }) {
  return (
    <nav aria-label={label} className="text-sm text-ink-2">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-ink-3">
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className="link">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ExternalLink({
  href,
  children,
  hint,
  className = "btn btn-ghost",
}: {
  href: string;
  children: React.ReactNode;
  hint: string;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ExternalIcon className="size-4 text-ink-3" />
      <span className="sr-only">({hint})</span>
    </a>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Top white panel every inner page starts with; leaves room for the fixed header. */
export function PageHero({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="frame pt-2 md:pt-3">
      <section className={`panel relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36 ${className}`}>
        <div className="wrap">{children}</div>
      </section>
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-20 md:py-28 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}
