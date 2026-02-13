import type { Metadata } from "next";
import { ShoppingListProvider } from "./components/ShoppingListContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "民泊に使えるおすすめ商品 | MOSVA",
  description: "民泊運営に必要な備品・消耗品をカテゴリ別にご紹介。キッチン、トイレ、バス、ランドリーなど必要な備品がすぐ見つかる。",
  openGraph: {
    title: "民泊に使えるおすすめ商品 | MOSVA",
    description: "民泊運営に必要な備品・消耗品をカテゴリ別にご紹介。必要な備品がすぐ見つかる。",
    url: "https://items.mosva.jp",Changed all instances of "民泊備品・消耗品まとめ" to "民泊に使えるおすすめ商品" in layout metadata including:
- Main page title (line 6)
- OpenGraph title (line 9) 
- Image alt text (line 18)
- Twitter card title (line 26)

This improves SEO by using a more descriptive and relevant page title for search engines.
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
