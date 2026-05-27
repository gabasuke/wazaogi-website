import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { featureIconMap } from "@/lib/site";

type FeatureItem = {
  key: keyof typeof featureIconMap;
  title: string;
  text: string;
};

export function Features() {
  const t = useTranslations("features");
  const items = t.raw("items") as FeatureItem[];

  return (
    <AnimatedSection id="features" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, index) => {
            const Icon = featureIconMap[item.key];
            const isHighlight = index === 0; // "深夜1時まで" を大きくフィーチャー

            return (
              <article
                key={item.key}
                className={`group relative overflow-hidden rounded-3xl border transition duration-500 hover:-translate-y-2 ${
                  isHighlight
                    ? "border-lantern/35 bg-[radial-gradient(circle_at_30%_20%,rgba(255,159,67,0.18),transparent_70%),rgba(20,20,20,0.7)] col-span-1 sm:col-span-2 lg:col-span-1"
                    : "glass-card border-white/8"
                } p-5 lg:p-6`}
              >
                {/* 背景装飾（ハイライトカードのみ） */}
                {isHighlight && (
                  <div className="pointer-events-none absolute inset-0 rounded-3xl border border-lantern/20" />
                )}

                <div
                  className={`grid size-12 place-items-center rounded-full transition duration-500 group-hover:scale-110 ${
                    isHighlight
                      ? "bg-lantern/20 text-lantern shadow-[0_0_20px_rgba(255,159,67,0.3)]"
                      : "bg-lantern/12 text-lantern"
                  }`}
                >
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mist/70">{item.text}</p>

                {/* ハイライトカードにバッジ */}
                {isHighlight && (
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-lantern/30 bg-lantern/10 px-3 py-1 text-xs font-bold text-lantern">
                    <span className="size-1.5 rounded-full bg-lantern shadow-[0_0_6px_rgba(255,159,67,0.8)]" />
                    毎日営業
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
