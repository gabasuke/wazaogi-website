"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { menuIconMap, menuImages } from "@/lib/site";

type MenuItem = {
  key: keyof typeof menuImages;
  name: string;
  description: string;
  price: string;
};

// カテゴリ分類
const categories = {
  all: null,
  food: ["nebanebaRoll", "teppanMeat", "ishigakiBeef", "sashimi", "umibudu", "teppanVeg"],
  drink: ["awamori", "drinks"],
} as const;

type Category = keyof typeof categories;

const categoryLabels: Record<Category, string> = {
  all: "すべて",
  food: "フード",
  drink: "ドリンク",
};

export function Menu() {
  const t = useTranslations("menu");
  const items = t.raw("items") as MenuItem[];
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredItems = items.filter((item) => {
    if (activeCategory === "all") return true;
    const list = categories[activeCategory] as readonly string[];
    return list.includes(item.key);
  });

  return (
    <AnimatedSection id="menu" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        {/* カテゴリフィルター */}
        <div className="mt-10 flex justify-center gap-2">
          {(Object.keys(categories) as Category[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold tracking-[0.14em] transition duration-300 ${
                activeCategory === cat
                  ? "bg-lantern text-night shadow-[0_0_20px_rgba(255,159,67,0.4)]"
                  : "border border-white/15 bg-white/6 text-mist/70 hover:border-lantern/40 hover:text-lantern"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* メニューグリッド */}
        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const Icon = menuIconMap[item.key];

              return (
                <motion.article
                  key={item.key}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="group glass-card relative overflow-hidden rounded-[1.7rem] p-3 transition duration-500 hover:-translate-y-2 hover:border-lantern/40 hover:shadow-glow"
                >
                  {/* 画像エリア */}
                  <div className="relative overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={menuImages[item.key]}
                      alt={item.name}
                      width={720}
                      height={520}
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[1.22/1] object-cover transition duration-700 group-hover:scale-[1.06]"
                      priority={index < 4}
                    />
                    {/* アイコンバッジ */}
                    <div className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-night/72 text-lantern backdrop-blur-md">
                      <Icon className="size-4" />
                    </div>
                    {/* 価格バッジ（画像上） */}
                    <div className="absolute bottom-3 left-3 rounded-full bg-night/80 px-3 py-1 text-sm font-bold text-lantern backdrop-blur-md">
                      {item.price}
                    </div>
                  </div>

                  {/* テキストエリア */}
                  <div className="p-4">
                    <h3 className="font-display text-xl font-semibold leading-tight text-white">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-mist/70">{item.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
