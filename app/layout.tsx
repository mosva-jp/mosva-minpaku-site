import type { Metadata } from "next";
import { ShoppingListProvider } from "./components/ShoppingListContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "民泊備品・消耗品まとめ | MOSVA",
  description: "民泊運営に必要な備品・消耗品をカテゴリ別にご紹介",
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
