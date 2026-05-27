import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/AnimatedSection";
import { InstagramMark } from "@/components/InstagramMark";
import { INSTAGRAM_URL } from "@/lib/site";

export function InstagramCTA() {
  const t = useTranslations("instagram.cta");

  return (
    <AnimatedSection className="px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl border border-lantern/25 bg-[radial-gradient(circle_at_20%_10%,rgba(255,159,67,.24),transparent_24rem),linear-gradient(135deg,rgba(8,18,33,.98),rgba(20,20,20,.92)_45%,rgba(255,159,67,.16))] p-6 shadow-[0_24px_90px_rgba(0,0,0,.5)] sm:p-10">
        <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
          <InstagramMark className="size-20 rounded-[1.6rem]" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-lantern">{t("eyebrow")}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-8 text-mist/78 sm:text-lg">{t("description")}</p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="lantern-glow inline-flex items-center justify-center gap-2 rounded-full bg-lantern px-6 py-4 text-sm font-bold tracking-[0.16em] text-night transition hover:-translate-y-1 hover:bg-[#ffb464] active:scale-[0.98]"
          >
            {t("button")}
            <ArrowUpRight className="size-5" />
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
