"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { InstagramMark } from "@/components/InstagramMark";
import { INSTAGRAM_URL } from "@/lib/site";

export function HeroInstagramCard() {
  const t = useTranslations("hero.instagram");
  const tags = t.raw("tags") as string[];

  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-[20px] border border-white/10 bg-[rgba(20,20,20,.75)] p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,.38)] backdrop-blur-md transition hover:-translate-y-1 hover:border-lantern/45 hover:shadow-glow active:scale-[0.98]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start gap-3">
        <InstagramMark className="size-11 shrink-0" />
        <div>
          <p className="text-sm font-bold leading-6">{t("title")}</p>
          <p className="mt-1 inline-flex items-center gap-2 text-xs text-mist/70">
            <span className="size-2 rounded-full bg-lantern shadow-[0_0_14px_rgba(255,159,67,.8)]" />
            {t("status")}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[11px] font-bold text-mist/78 transition group-hover:border-lantern/35"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
