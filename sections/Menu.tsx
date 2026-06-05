"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
    <section id="menu" className="relative z-10 block w-full overflow-visible px-4 py-20 opacity-100 sm:px-8 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        {/* カテゴリフィルター */}
        <div className="hide-scrollbar -mx-4 mt-8 flex snap-x justify-start gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:mt-10 sm:justify-center sm:overflow-visible sm:px-0">
          {(Object.keys(categories) as Category[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 snap-start rounded-full px-4 py-2.5 text-xs font-bold tracking-[0.08em] transition duration-300 sm:px-5 sm:text-sm sm:tracking-[0.14em] ${
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
        <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {filteredItems.map((item, index) => {
            const Icon = menuIconMap[item.key];

            return (
              <article
                key={item.key}
                className="group glass-card relative block min-w-0 overflow-hidden rounded-3xl p-2.5 opacity-100 transition duration-500 hover:-translate-y-1 hover:border-lantern/40 hover:shadow-glow sm:p-3 sm:hover:-translate-y-2"
              >
                {/* 画像エリア */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-[1.25rem]">
                  <Image
                    src={menuImages[item.key]}
                    alt={item.name}
                    width={720}
                    height={520}
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[1.35/1] w-full object-cover transition duration-700 group-hover:scale-[1.04] sm:aspect-[1.22/1] sm:group-hover:scale-[1.06]"
                    priority={index < 2}
                  />
                  {/* アイコンバッジ */}
                  <div className="absolute right-2.5 top-2.5 grid size-9 place-items-center rounded-full bg-night/72 text-lantern backdrop-blur-md sm:right-3 sm:top-3 sm:size-10">
                    <Icon className="size-4" />
                  </div>
                  {/* 価格バッジ（画像上） */}
                  <div className="absolute bottom-2.5 left-2.5 rounded-full bg-night/80 px-3 py-1 text-xs font-bold text-lantern backdrop-blur-md sm:bottom-3 sm:left-3 sm:text-sm">
                    {item.price}
                  </div>
                </div>

                {/* テキストエリア */}
                <div className="p-3 sm:p-4">
                  <h3 className="jp-heading font-display text-[1.22rem] font-semibold leading-[1.28] text-white sm:text-xl sm:leading-tight">
                    {item.name}
                  </h3>
                  <p className="jp-copy mt-2 text-[13px] leading-6 text-mist/72 sm:mt-2.5 sm:text-sm">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
