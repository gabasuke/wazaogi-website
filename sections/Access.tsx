import { Banknote, Building2, Clock, Footprints, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { restaurant } from "@/lib/site";

export function Access() {
  const t = useTranslations("access");
  const locale = useLocale();
  const address = locale === "en" ? restaurant.addressEn : restaurant.addressJa;
  const access = locale === "en" ? restaurant.accessEn : restaurant.accessJa;
  const hours = locale === "en" ? restaurant.hoursEn : restaurant.hours;

  const infoItems = [
    {
      icon: Building2,
      label: t("name"),
      value: locale === "en" ? "Teppan Izakaya Wazaogi" : restaurant.name,
    },
    {
      icon: MapPin,
      label: t("address"),
      value: address,
    },
    {
      icon: Footprints,
      label: t("access"),
      value: access,
    },
    {
      icon: Clock,
      label: t("hours"),
      value: hours,
    },
    {
      icon: Banknote,
      label: t("budget"),
      value: restaurant.budget,
    },
    {
      icon: Phone,
      label: t("phone"),
      value: restaurant.phone,
      href: `tel:${restaurant.phone}`,
    },
  ];

  return (
    <AnimatedSection id="access" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      </div>
      <div className="mx-auto mt-12 grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        {/* 店舗情報カード */}
        <div className="glass-card rounded-3xl p-7 sm:p-9">
          <dl className="space-y-5">
            {infoItems.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <div className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-lantern/12 text-lantern">
                  <Icon className="size-4" />
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.2em] text-mist/50">{label}</dt>
                  {href ? (
                    <dd className="mt-1">
                      <a href={href} className="text-mist/85 transition hover:text-lantern">
                        {value}
                      </a>
                    </dd>
                  ) : (
                    <dd className="mt-1 text-mist/85">{value}</dd>
                  )}
                </div>
              </div>
            ))}
          </dl>

          {/* 定休日なしバッジ */}
          <div className="mt-8 flex items-center gap-2 rounded-xl border border-green-500/25 bg-green-500/8 px-4 py-3">
            <span className="size-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            <p className="text-sm font-bold text-green-400/90">
              {locale === "en" ? "Open every day — no regular holidays" : "年中無休・定休日なし"}
            </p>
          </div>
        </div>

        {/* Google Map */}
        {/*
          TODO: 下記は住所検索ベースの簡易埋め込みURLです。
          正式な埋め込みURLへの差し替えを推奨します（APIキー不要）:
          1. maps.google.com で「沖縄県石垣市大川287-2 ミカサ商事ビル1F」を検索
          2. 「共有」→「地図を埋め込む」タブを選択
          3. 表示された iframe の src URL をコピーして下記 src と差し替え
        */}
        <div className="min-h-96 overflow-hidden rounded-3xl border border-white/12 bg-white/5 shadow-2xl lg:min-h-[480px]">
          <iframe
            title={t("mapTitle")}
            src="https://www.google.com/maps?q=%E6%B2%96%E7%B8%84%E7%9C%8C%E7%9F%B3%E5%9E%A3%E5%B8%82%E5%A4%A7%E5%B7%9D287-2%20%E3%83%9F%E3%82%AB%E3%82%B5%E5%95%86%E4%BA%8B%E3%83%93%E3%83%AB1F&output=embed"
            className="h-full min-h-96 w-full grayscale-[0.1] invert-[0.88] hue-rotate-180 lg:min-h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
