import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-great-vibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Никита & Полина — Свадебное приглашение",
  description: "Приглашаем вас на нашу свадьбу 18 сентября 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${greatVibes.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
