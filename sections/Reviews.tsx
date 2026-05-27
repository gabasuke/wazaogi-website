import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

type Review = {
  quote: string;
  name: string;
  source?: string;
};

export function Reviews() {
  const t = useTranslations("reviews");
  const reviews = t.raw("items") as Review[];

  return (
    <AnimatedSection className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="group glass-card relative flex flex-col rounded-[1.7rem] p-7 transition duration-500 hover:-translate-y-2 hover:border-lantern/30"
            >
              {/* 引用符デコレーション */}
              <Quote
                className="mb-5 size-8 text-lantern/30 transition duration-500 group-hover:text-lantern/50"
                strokeWidth={1.5}
              />

              {/* 星評価 */}
              <div className="flex gap-1 text-lantern" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>

              {/* レビュー本文 */}
              <p className="mt-5 flex-1 font-display text-xl leading-9 text-white/92">
                {review.quote}
              </p>

              {/* 投稿者 */}
              <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5">
                <div className="flex items-center gap-3">
                  <div className="grid size-8 place-items-center rounded-full bg-lantern/15 text-xs font-bold text-lantern">
                    {review.name.charAt(0)}
                  </div>
                  <p className="text-sm font-bold tracking-[0.14em] text-mist/70">{review.name}</p>
                </div>
                {review.source && (
                  <span className="text-xs text-mist/40">{review.source}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
