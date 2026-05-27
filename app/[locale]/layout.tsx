import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const title = isEnglish
    ? "Teppan Izakaya Wazaogi | Late-Night Local Favorite in Ishigaki"
    : "鉄板居酒屋 わざおぎ | 石垣島で深夜まで楽しめるローカル人気店";
  const description = isEnglish
    ? "Enjoy Wazaogi, a late-night local teppan izakaya in Ishigaki with healthy sticky nori rolls, sizzling teppan dishes, drinks, and awamori."
    : "石垣島で深夜まで楽しめる鉄板居酒屋わざおぎ。名物ネバネバのり巻きや鉄板料理を楽しめる地元人気店。";

  return {
    metadataBase: new URL("https://wazaogi-ishigaki.example.com"),
    title,
    description,
    keywords: isEnglish
      ? ["Ishigaki teppan izakaya", "late night Ishigaki", "Wazaogi", "awamori", "local izakaya"]
      : ["石垣島", "鉄板居酒屋", "わざおぎ", "深夜営業", "ネバネバのり巻き", "泡盛"],
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: isEnglish ? "Teppan Izakaya Wazaogi" : "鉄板居酒屋 わざおぎ",
      images: [
        {
          url: "/images/og-wazaogi.svg",
          width: 1200,
          height: 630,
          alt: isEnglish
            ? "Teppan Izakaya Wazaogi, a late-night local spot in Ishigaki"
            : "石垣島の夜に灯る鉄板居酒屋わざおぎ"
        }
      ],
      locale: isEnglish ? "en_US" : "ja_JP",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-wazaogi.svg"]
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ja: "/ja",
        en: "/en"
      }
    }
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
