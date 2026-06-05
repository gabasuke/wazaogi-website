import Image from "next/image";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  const t = useTranslations("about");

  return (
    <AnimatedSection id="about" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
        {/* 画像 */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
          <Image
            src="/images/about-teppan-room.svg"
            alt={t("imageAlt")}
            width={1040}
            height={820}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[1.12/1] rounded-[1.45rem] object-cover transition duration-700 hover:scale-[1.02]"
          />
          {/* オーバーレイバッジ */}
          <div className="absolute bottom-7 left-7 rounded-2xl border border-lantern/30 bg-[#081221]/84 px-5 py-4 backdrop-blur-md">
            <p className="font-display text-2xl text-lantern">{t("badgeTitle")}</p>
            <p className="mt-1 text-sm text-mist/78">{t("badgeText")}</p>
          </div>
        </div>

        {/* テキスト */}
        <div>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="left"
          />

          {/* 特徴カード */}
          <div className="mt-9 grid grid-cols-1 gap-4 min-[500px]:grid-cols-3">
            {(["local", "travel", "warm"] as const).map((item) => (
              <div
                key={item}
                className="group glass-card rounded-3xl p-5 transition duration-400 hover:-translate-y-1 hover:border-lantern/30"
              >
                <p className="font-display text-lg text-lantern">{t(`features.${item}.title`)}</p>
                <p className="mt-2 text-sm leading-6 text-mist/72">
                  {t(`features.${item}.text`)}
                </p>
              </div>
            ))}
          </div>

          {/* 統計バッジ */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="font-display text-2xl text-lantern">深夜1時</span>
              <span className="text-sm text-mist/60">まで営業</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="font-display text-2xl text-lantern">年中</span>
              <span className="text-sm text-mist/60">無休</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="font-display text-2xl text-lantern">¥3,000〜</span>
              <span className="text-sm text-mist/60">予算</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
