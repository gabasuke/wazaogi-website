import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";

import "@/app/globals.css";

type Props = {
  children: ReactNode;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "鉄板居酒屋 わざおぎ",
  description: "石垣島の鉄板居酒屋",
};

export default async function RootLayout({ children }: Props) {
  // /en では lang="en"、/ja では lang="ja" になるよう、リクエストのロケールを反映する
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
