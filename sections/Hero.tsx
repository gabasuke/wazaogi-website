"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Clock, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTAButton } from "@/components/CTAButton";
import { HeroInstagramCard } from "@/components/HeroInstagramCard";
import { Mascot } from "@/components/Mascot";
import { Navbar } from "@/components/Navbar";

export function Hero() {
  const t = useTranslations();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 90]);
  const imageScale = useTransform(scrollY, [0, 700], [1.06, 1.18]);

  return (
    <section id="top" className="relative min-h-svh overflow-hidden">
      {/* パララックス背景 */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src="/images/hero-teppan-night.svg"
          alt={t("hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,33,0.55)_0%,rgba(8,18,33,0.3)_35%,rgba(8,18,33,0.82)_80%,rgba(8,18,33,0.97)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_35%,rgba(255,159,67,0.22),transparent_20rem)]" />

      {/* 煙エフェクト */}
      <div className="smoke-effect left-[8%] top-[32%] h-40 w-64" />
      <div className="smoke-effect bottom-[20%] right-[18%] h-52 w-72 [animation-delay:3s]" />

      {/* ナビバー（固定・スティッキー） */}
      <Navbar />

      {/* メインコンテンツ */}
      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pb-24 pt-28 sm:px-8 sm:pb-28 sm:pt-32">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ロケーションバッジ */}
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-[11px] font-bold tracking-[0.14em] text-mist backdrop-blur-md sm:mb-6 sm:px-4 sm:text-xs sm:tracking-[0.2em]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <MapPin className="size-3.5 text-lantern" />
            {t("hero.location")}
          </motion.div>

          {/* メインキャッチコピー */}
          <h1 className="font-display text-[2rem] font-semibold leading-[1.13] tracking-[-0.03em] text-white min-[360px]:text-[2.4rem] min-[380px]:text-5xl sm:text-7xl lg:text-8xl xl:text-9xl">
            {t("hero.title")}
          </h1>

          <p className="mt-5 max-w-76 text-sm leading-7 text-mist/82 min-[380px]:max-w-sm min-[380px]:text-base sm:mt-6 sm:max-w-xl sm:text-xl sm:leading-9">
            {t("hero.subtitle")}
          </p>

          {/* CTAボタン */}
          <div className="mt-7 flex flex-col gap-3 min-[420px]:max-w-sm sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4 sm:max-w-none">
            <CTAButton href="#reserve" className="w-full px-6 py-3.5 text-xs sm:w-auto sm:px-8 sm:py-4 sm:text-sm">
              {t("hero.reserve")}
            </CTAButton>
            <CTAButton href="#menu" variant="secondary" className="w-full px-6 py-3.5 text-xs sm:w-auto sm:px-8 sm:py-4 sm:text-sm">
              {t("hero.menu")}
            </CTAButton>
          </div>

          {/* 営業時間インジケーター */}
          <motion.div
            className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-mist/60 sm:mt-8 sm:inline-flex sm:text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Clock className="size-3.5 text-lantern/80" />
            <span>毎日 17:00 〜 翌1:00</span>
            <span className="inline-block size-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            <span className="text-green-400/90">本日営業中</span>
          </motion.div>

          <div className="mt-4 max-w-76 min-[380px]:max-w-sm sm:hidden">
            <HeroInstagramCard />
          </div>
        </motion.div>

        {/* マスコット */}
        <motion.div
          className="pointer-events-none absolute bottom-52 right-4 hidden w-36 opacity-95 drop-shadow-2xl sm:block md:right-10 md:w-44 lg:bottom-60 lg:w-56"
          initial={{ opacity: 0, y: 20, rotate: -6 }}
          animate={{ opacity: 0.95, y: 0, rotate: -3 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Mascot alt={t("hero.mascot")} priority className="h-auto w-full" />
        </motion.div>

        {/* Instagramカード */}
        <div className="absolute bottom-20 right-4 z-20 hidden w-[calc(100%-2rem)] max-w-xs sm:block sm:right-8 sm:w-72 lg:right-10 lg:bottom-24">
          <HeroInstagramCard />
        </div>
      </div>

      {/* スクロールダウン */}
      <motion.a
        href="#about"
        aria-label={t("hero.scroll")}
        className="absolute bottom-7 left-1/2 z-20 grid -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-white/8 p-3 text-white/70 backdrop-blur-md transition hover:border-lantern/50 hover:text-lantern"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-5" />
      </motion.a>
    </section>
  );
}
