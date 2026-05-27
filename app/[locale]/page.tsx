import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { restaurant } from "@/lib/site";
import { About } from "@/sections/About";
import { Access } from "@/sections/Access";
import { Features } from "@/sections/Features";
import { Footer } from "@/sections/Footer";
import { Gallery } from "@/sections/Gallery";
import { Hero } from "@/sections/Hero";
import { InstagramCTA } from "@/sections/InstagramCTA";
import { InstagramFeed } from "@/sections/InstagramFeed";
import { Menu } from "@/sections/Menu";
import { Reservation } from "@/sections/Reservation";
import { Reviews } from "@/sections/Reviews";
import { ScrollToTop } from "@/components/ScrollToTop";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "鉄板居酒屋 わざおぎ",
    image: "https://wazaogi-ishigaki.example.com/images/og-wazaogi.svg",
    servesCuisine: ["Teppanyaki", "Okinawan", "Japanese", "Izakaya"],
    priceRange: "¥¥",
    telephone: restaurant.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "大川287-2 ミカサ商事ビル1F",
      addressLocality: "石垣市",
      addressRegion: "沖縄県",
      addressCountry: "JP"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "17:00",
        closes: "01:00"
      }
    ],
    url: `https://wazaogi-ishigaki.example.com/${locale}`,
    acceptsReservations: true
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* 1. ヒーロー: ファーストビューで全情報を */}
        <Hero />

        {/* 2. About: お店のストーリーと雰囲気 */}
        <div className="section-divider" />
        <About />

        {/* 3. Menu: 何が食べられるかを見せる */}
        <div className="section-divider" />
        <Menu />

        {/* 4. Gallery: 店内の雰囲気を視覚的に */}
        <div className="section-divider" />
        <Gallery />

        {/* 5. Features: 使いやすさの理由 */}
        <div className="section-divider" />
        <Features />

        {/* 6. Reviews: 社会的証明 */}
        <div className="section-divider" />
        <Reviews />

        {/* 7. Reservation: 予約へのCTA（レビュー直後が最も転換率が高い） */}
        <div className="section-divider" />
        <Reservation />

        {/* 8. Access: 来店情報 */}
        <div className="section-divider" />
        <Access />

        {/* 9. Instagram Feed: SNSでの継続的なフォロー促進 */}
        <div className="section-divider" />
        <InstagramFeed />

        {/* 10. Instagram CTA: フォロー最終訴求 */}
        <InstagramCTA />
      </main>

      <Footer />

      {/* フローティング「トップへ戻る」ボタン */}
      <ScrollToTop />
    </>
  );
}
