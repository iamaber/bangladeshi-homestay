import type { Metadata } from "next";
import localFont from "next/font/local";
import I18nProvider from "@/components/I18nProvider";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gutu Gasthaus — Authentic Bangladeshi Homestay",
  description:
    "Stay with a real Bangladeshi family, share their meals, join their daily life, and experience a culture that no hotel can offer.",
  keywords: [
    "Bangladesh travel",
    "homestay",
    "cultural immersion",
    "Bengali experience",
    "host family",
    "authentic travel",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${satoshi.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-cream text-ink font-sans"
        suppressHydrationWarning
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
