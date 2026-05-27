import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/AnimatedSection";
import { InstagramMark } from "@/components/InstagramMark";
import { SectionHeading } from "@/components/SectionHeading";
import { INSTAGRAM_URL } from "@/lib/site";

const postImages = {
  teppan: "/images/menu-teppan-meat.svg",
  roll: "/images/menu-nebaneba-roll.svg",
  interior: "/images/gallery-interior.svg",
  local: "/images/menu-teppan-veg.svg",
  night: "/images/hero-teppan-night.svg"
};

type Post = {
  key: keyof typeof postImages;
  title: string;
  time: string;
  likes: string;
  text: string;
};

export function InstagramFeed() {
  const t = useTranslations("instagram");
  const posts = t.raw("posts") as Post[];

  return (
    <AnimatedSection className="overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} align="left" />
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-lantern/30 bg-lantern/10 px-5 py-3 text-sm font-bold text-lantern transition hover:-translate-y-1 hover:bg-lantern hover:text-night hover:shadow-glow"
          >
            <InstagramMark className="size-9" />
            {t("view")}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-368">
        <div className="hide-scrollbar flex snap-x gap-5 overflow-x-auto px-5 pb-5 sm:px-8">
          {posts.map((post) => (
            <a
              key={post.key}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group izakaya-card block min-w-[78vw] snap-center overflow-hidden transition duration-500 hover:-translate-y-2 hover:border-lantern/40 hover:shadow-glow sm:min-w-84"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={postImages[post.key]}
                  alt={post.title}
                  width={720}
                  height={520}
                  sizes="(min-width: 768px) 336px, 78vw"
                  className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-night/82 via-transparent to-transparent" />
                <div className="absolute left-4 top-4">
                  <InstagramMark className="size-10" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4 text-xs text-mist/55">
                  <span>{post.time}</span>
                  <span className="inline-flex items-center gap-1">
                    <Heart className="size-4 fill-lantern text-lantern" />
                    {post.likes}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">{post.title}</h3>
                <p className="mt-2 text-sm leading-7 text-mist/74">{post.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-lantern">
                  <MessageCircle className="size-4" />
                  Instagram
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
