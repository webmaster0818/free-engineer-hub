import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://free-engineer-hub.pages.dev"),
  title:
    "フリーエンジニアHub｜フリーランスエンジニア向けエージェント比較【2026年最新】",
  description:
    "フリーランスエンジニア向けエージェント10社を徹底比較。案件数・単価・マージン率・リモート対応などを詳しく解説。会社員からフリーランスへの独立を検討中のエンジニアに最適なエージェントが見つかります。",
  keywords: [
    "フリーランスエンジニア",
    "エージェント比較",
    "フリーランス",
    "エンジニア",
    "独立",
    "案件",
    "高単価",
    "リモートワーク",
  ],
  openGraph: {
    title:
      "フリーエンジニアHub｜フリーランスエンジニア向けエージェント比較【2026年最新】",
    description:
      "フリーランスエンジニア向けエージェント10社を徹底比較。最適なエージェントが見つかります。",
    type: "website",
    locale: "ja_JP",
    siteName: "フリーエンジニアHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "フリーエンジニアHub｜エージェント比較【2026年最新】",
    description:
      "フリーランスエンジニア向けエージェント10社を徹底比較。",
  },
  other: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.className} h-full antialiased`}>
      <head>
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
