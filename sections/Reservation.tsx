import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Mascot } from "@/components/Mascot";
import { reservationCards } from "@/lib/site";

export function Reservation() {
  const t = useTranslations("reservation");

  return (
    <AnimatedSection id="reserve" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-lantern/22 shadow-[0_24px_80px_rgba(0,0,0,.55)]">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,159,67,0.22),transparent_24rem),radial-gradient(circle_at_80%_80%,rgba(47,125,94,0.28),transparent_20rem),linear-gradient(135deg,rgba(8,18,33,0.97),rgba(14,26,46,0.95))]" />

        <div className="relative p-6 sm:p-10 lg:p-14">
          {/* マスコット（デコ） */}
          <div className="pointer-events-none absolute -bottom-6 -left-5 hidden w-36 opacity-50 sm:block lg:w-44">
            <Mascot alt={t("mascotAlt")} className="h-auto w-full" />
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            {/* 左: コピー */}
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-lantern">
                {t("eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {t("title")}
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-mist/78 sm:text-lg">
                {t("description")}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold tracking-[0.14em] text-mist/70">
                <span className="size-1.5 rounded-full bg-lantern shadow-[0_0_8px_rgba(255,159,67,0.9)]" />
                {t("mascotNote")}
              </p>
            </div>

            {/* 右: 予約カード */}
            <div className="grid gap-4 sm:grid-cols-3">
              {reservationCards.map((card) => {
                const Icon = card.icon;

                return (
                  <a
                    key={card.key}
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative overflow-hidden rounded-[1.6rem] bg-linear-to-br ${card.className} p-5 text-white shadow-2xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,.5)] active:scale-[0.98]`}
                  >
                    {/* 光沢レイヤー */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_0%,rgba(255,255,255,0.28),transparent_14rem)] opacity-80" />
                    <div className="relative">
                      <div className="mb-8 flex items-center justify-between">
                        <span className="grid size-12 place-items-center rounded-full bg-white/18">
                          <Icon className="size-6" />
                        </span>
                        <ArrowUpRight className="size-5 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                      <h3 className="text-lg font-bold">{t(`cards.${card.key}.title`)}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/75">
                        {t(`cards.${card.key}.text`)}
                      </p>
                      <span className="mt-5 inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-bold tracking-[0.16em] backdrop-blur-sm">
                        {t("button")}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
