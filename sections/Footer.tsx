import { MessageCircle, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { InstagramMark } from "@/components/InstagramMark";
import { Mascot } from "@/components/Mascot";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, navItems, restaurant } from "@/lib/site";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const address = locale === "en" ? restaurant.addressEn : restaurant.addressJa;
  const hours = locale === "en" ? restaurant.hoursEn : restaurant.hours;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 px-5 pt-14 pb-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 上段 */}
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto]">
          {/* ブランド */}
          <div>
            <div className="flex items-center gap-4">
              <Mascot
                alt={t("footer.mascot")}
                className="size-14 rounded-full border border-lantern/25 bg-lantern/10 p-1"
              />
              <div>
                <p className="font-display text-2xl text-white">{restaurant.name}</p>
                <p className="text-xs tracking-[0.2em] text-mist/45">Teppan Izakaya · Ishigaki Island</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-mist/60">{t("footer.lead")}</p>

            {/* ソーシャルリンク */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-sm text-mist/80 transition hover:border-lantern/40 hover:text-lantern"
              >
                <InstagramMark className="size-7" />
                <span>
                  <span className="block text-xs text-mist/45">{t("footer.instagram")}</span>
                  <span className="block text-sm font-bold">{INSTAGRAM_HANDLE}</span>
                </span>
              </a>
              <a
                href={restaurant.line}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-sm text-mist/75 transition hover:border-lantern/40 hover:text-lantern"
              >
                <MessageCircle className="size-4" />
                LINE
              </a>
              <a
                href={`tel:${restaurant.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-sm text-mist/75 transition hover:border-lantern/40 hover:text-lantern"
              >
                <Phone className="size-4" />
                {restaurant.phone}
              </a>
            </div>
          </div>

          {/* ナビ */}
          <nav className="hidden md:block">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-mist/40">Menu</p>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="text-sm text-mist/65 transition hover:text-lantern"
                  >
                    {t(`nav.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 店舗情報 */}
          <div className="text-sm leading-8 text-mist/65 md:text-right">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.28em] text-mist/40">Info</p>
            <p>{address}</p>
            <p>
              {t("footer.hours")}: {hours}
            </p>
            <p className="mt-2">
              <a
                href={`tel:${restaurant.phone}`}
                className="transition hover:text-lantern"
              >
                {restaurant.phone}
              </a>
            </p>
          </div>
        </div>

        {/* 下段: コピーライト */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-mist/35">
            © {currentYear} 鉄板居酒屋 わざおぎ. All rights reserved.
          </p>
          <p className="text-xs text-mist/25">石垣島・大川287-2</p>
        </div>
      </div>
    </footer>
  );
}
