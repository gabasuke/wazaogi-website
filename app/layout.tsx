import type { Metadata, Viewport } from "next";
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

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
