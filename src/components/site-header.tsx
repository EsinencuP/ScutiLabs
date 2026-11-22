"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { ChevronDown, CloseIcon, MenuIcon } from "./icons";
import { Logo } from "./logo";

type NavService = { slug: string; name: string; short: string };

export function SiteHeader({
  locale,
  nav,
  services,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  services: NavService[];
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus after navigation
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!dropOpen && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // return focus to the control that opened the menu, so keyboard users don't lose their place
        if (menuOpen) burgerRef.current?.focus();
        else if (dropOpen) dropRef.current?.querySelector("button")?.focus();
        setDropOpen(false);
        setMenuOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dropOpen && dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [dropOpen, menuOpen]);

  useEffect(() => {
    const root = document.documentElement;
    if (menuOpen) {
      root.style.overflow = "hidden";
      menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    }
    return () => {
      root.style.overflow = "";
    };
  }, [menuOpen]);

  const rest = pathname.replace(/^\/(ru|ro|en)(?=\/|$)/, "");
  const inPortfolio = rest.startsWith("/portfolio");
  const inServices = rest.startsWith("/services");
  const solid = scrolled || menuOpen;

  const links = [
    { href: `/${locale}/portfolio`, label: nav.portfolio, current: inPortfolio },
    { href: `/${locale}#start`, label: nav.start, current: false },
    { href: `/${locale}#faq`, label: nav.faq, current: false },
  ];

  const langSwitch = (className: string) => (
    <ul className={`items-center gap-0.5 text-[0.9375rem] ${className}`} aria-label={nav.language}>
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`inline-flex min-h-10 min-w-9 items-center justify-center rounded-full px-2 transition-colors ${
              l === locale ? "font-semibold text-ink" : "text-ink-3 hover:text-ink"
            }`}
          >
            {l}
            <span className="sr-only"> {localeNames[l]}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 md:px-3 md:pt-3">
      <div
        className={`mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-4 rounded-full pl-4 pr-2 transition-[background-color,box-shadow] duration-300 md:pl-6 ${
          solid ? "bg-white/88 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_8px_30px_-12px_rgb(0_0_0/0.18)] backdrop-blur-md" : ""
        }`}
      >
        <Logo locale={locale} label={`scutilabs, ${nav.home}`} />

        <nav aria-label={nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.9375rem]">
            <li className="relative" ref={dropRef}>
              <button
                type="button"
                aria-expanded={dropOpen}
                aria-controls="services-menu"
                onClick={() => setDropOpen((v) => !v)}
                className={`inline-flex min-h-10 items-center gap-1 rounded-full px-3.5 transition-colors hover:bg-black/5 ${
                  inServices ? "font-medium" : ""
                }`}
              >
                {nav.services}
                <ChevronDown className={`size-4 transition-transform ${dropOpen ? "rotate-180" : ""}`} />
              </button>
              {dropOpen && (
                <div
                  id="services-menu"
                  className="absolute left-1/2 top-full mt-3 w-[40rem] -translate-x-1/2 rounded-[1.5rem] bg-white p-2 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_24px_60px_-20px_rgb(0_0_0/0.3)]"
                >
                  <ul className="grid grid-cols-2 gap-0.5">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${locale}/services/${s.slug}`}
                          className="block rounded-2xl px-4 py-3 transition-colors hover:bg-panel"
                          aria-current={rest === `/services/${s.slug}` ? "page" : undefined}
                        >
                          <span className="block font-medium">{s.name}</span>
                          <span className="mt-0.5 block text-sm leading-snug text-ink-2">{s.short}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-1 border-t border-line-2 px-4 pb-2 pt-3">
                    <Link href={`/${locale}/services`} className="link text-sm font-medium">
                      {nav.allServices}
                    </Link>
                  </div>
                </div>
              )}
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={l.current ? "page" : undefined}
                  className={`inline-flex min-h-10 items-center rounded-full px-3.5 transition-colors hover:bg-black/5 ${
                    l.current ? "font-medium" : ""
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          {langSwitch("hidden sm:flex")}
          <Link href={`/${locale}/brief`} className="btn btn-primary btn-sm hidden md:inline-flex">
            {nav.brief}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            ref={burgerRef}
            aria-label={menuOpen ? nav.close : nav.menu}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-x-2 bottom-2 top-[4.75rem] overflow-y-auto rounded-[1.75rem] bg-white px-6 pb-8 pt-6 shadow-[0_0_0_1px_rgb(0_0_0/0.06)] lg:hidden"
        >
          <nav aria-label={nav.primary}>
            <p className="text-sm text-ink-3">{nav.services}</p>
            <ul className="mt-2 space-y-0.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${locale}/services/${s.slug}`} className="block py-2 text-lg leading-snug">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-1 border-t border-line-2 pt-6">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="display block py-1.5 text-[2rem]" aria-current={l.current ? "page" : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            {langSwitch("flex")}
            <Link href={`/${locale}/brief`} className="btn btn-primary btn-glow">
              {nav.brief}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
