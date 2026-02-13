import type { Metadata } from "next";
import { ShoppingListProvider } from "./components/ShoppingListContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "民泊に使えるおすすめ商品 | MOSVA",
  description: "民泊運営に必要な備品・消耗品をカテゴリ別にご紹介。キッチン、トイレ、バス、ランドリーなど必要な備品がすぐ見つかる。",
  openGraph: {
    title: "民泊に使えるおすすめ商品 | MOSVA",
    description: "民泊運営に必要な備品・消耗品をカテゴリ別にご紹介。必要な備品がすぐ見つかる。",
    url: "https://items.mosva.jp",
    siteName: "MOSVA",
    images: [
      {
        url: "https://items.mosva.jp/og-image.png",
        width: 1200,
        height: 630,
        alt: "民泊に使えるおすすめ商品 | MOSVA",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "民泊に使えるおすすめ商品 | MOSVA",
    description: "民泊運営に必要な備品・消耗品をカテゴリ別にご紹介。必要な備品がすぐ見つかる。",
    images: ["https://items.mosva.jp/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ShoppingListProvider>
          {children}
        </ShoppingListProvider>
      </body>
    </html>
  );
}
