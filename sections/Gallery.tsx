"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import { SectionHeading } from "@/components/SectionHeading";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { galleryImages } from "@/lib/site";

type GalleryItem = {
  key: string;
  title: string;
  description: string;
};

export function Gallery() {
  const t = useTranslations("gallery");
  const items = t.raw("items") as GalleryItem[];
  const [selected, setSelected] = useState<number | null>(null);

  const selectedItem = selected !== null ? items[selected] : null;
  const selectedImage =
    selected !== null
      ? galleryImages.find((img) => img.key === items[selected].key)
      : null;

  useLockBodyScroll(selected !== null);

  const prev = useCallback(() => {
    setSelected((prev) => (prev !== null && prev > 0 ? prev - 1 : items.length - 1));
  }, [items.length]);

  const next = useCallback(() => {
    setSelected((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : 0));
  }, [items.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setSelected(null);
    },
    [prev, next]
  );

  return (
    <section id="gallery" className="overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      </div>

      {/* 水平スクロールギャラリー */}
      <div className="mx-auto mt-12 max-w-[94rem]">
        <div className="hide-scrollbar flex snap-x gap-5 overflow-x-auto px-5 pb-5 sm:px-8">
          {items.map((item, index) => {
            const image = galleryImages.find((entry) => entry.key === item.key);
            if (!image) return null;

            return (
              <motion.button
                key={item.key}
                type="button"
                onClick={() => setSelected(index)}
                className="group relative min-w-[80vw] snap-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 text-left shadow-2xl transition sm:min-w-[26rem]"
                whileHover={{ y: -7, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={image.src}
                  alt={item.title}
                  width={900}
                  height={640}
                  sizes="(min-width: 768px) 416px, 80vw"
                  className="aspect-[1.25/1] object-cover transition duration-[1200ms] group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081221]/90 via-[#081221]/20 to-transparent" />

                {/* インデックスバッジ */}
                <div className="absolute left-5 top-5 grid size-8 place-items-center rounded-full border border-white/20 bg-night/60 text-xs font-bold text-white/70 backdrop-blur-md">
                  {index + 1}
                </div>

                <div className="absolute bottom-0 p-6">
                  <p className="font-display text-2xl text-white">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-6 text-mist/70">{item.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ページドット */}
        <div className="mt-5 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selected === i ? "w-6 bg-lantern" : "w-1.5 bg-white/25 hover:bg-white/45"
              }`}
              aria-label={`画像 ${i + 1} を表示`}
            />
          ))}
        </div>
      </div>

      {/* ライトボックスモーダル */}
      <AnimatePresence>
        {selectedItem && selectedImage ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#081221]/92 p-4 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/12 bg-[#0d1a2d] shadow-[0_32px_100px_rgba(0,0,0,0.7)]"
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 閉じるボタン */}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-night/80 text-white backdrop-blur-md transition hover:bg-lantern hover:text-night"
                aria-label={t("close")}
              >
                <X className="size-5" />
              </button>

              {/* 前へ */}
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-night/80 text-white backdrop-blur-md transition hover:bg-lantern hover:text-night"
                aria-label="前の画像"
              >
                <ChevronLeft className="size-5" />
              </button>

              {/* 次へ */}
              <button
                type="button"
                onClick={next}
                className="absolute right-16 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-night/80 text-white backdrop-blur-md transition hover:bg-lantern hover:text-night"
                aria-label="次の画像"
              >
                <ChevronRight className="size-5" />
              </button>

              <Image
                src={selectedImage.src}
                alt={selectedItem.title}
                width={1280}
                height={860}
                sizes="100vw"
                className="max-h-[74vh] w-full object-cover"
              />
              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="font-display text-2xl text-lantern">{selectedItem.title}</p>
                  <p className="mt-1.5 text-mist/75">{selectedItem.description}</p>
                </div>
                {/* カウンター */}
                <p className="text-sm text-mist/40">
                  {selected !== null ? selected + 1 : 1} / {items.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
