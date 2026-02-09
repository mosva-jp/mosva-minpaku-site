import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '民泊備品・消耗品まとめ | MOSVA',
  description: '民泊運営に必要な備品・消耗品をカテゴリ別にまとめました。Amazon アソシエイトリンク付きで簡単に購入できます。',
  keywords: '民泊,備品,消耗品,Airbnb,民泊運営,アメニティ',
  openGraph: {
    title: '民泊備品・消耗品まとめ | MOSVA',
    description: '民泊運営に必要な備品・消耗品をカテゴリ別にまとめました',
    url: 'https://mosva.jp',
    siteName: 'MOSVA 民泊備品まとめ',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '民泊備品・消耗品まとめ | MOSVA',
    description: '民泊運営に必要な備品・消耗品をカテゴリ別にまとめました',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
