"use client";

import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-white/15 bg-night/50 p-1 text-xs font-bold tracking-[0.18em] text-white/70 backdrop-blur-md"
      aria-label="Language switcher"
    >
      {routing.locales.map((item) => (
        <Link
          key={item}
          href={pathname}
          locale={item}
          className={`rounded-full px-3 py-2 transition ${
            locale === item ? "bg-lantern text-night" : "hover:bg-white/10 hover:text-white"
          }`}
        >
          {item === "ja" ? "JP" : "EN"}
        </Link>
      ))}
    </div>
  );
}
