import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bengali Homestay — Authentic Bangladeshi Homestay",
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
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col bg-cream text-ink font-sans"
        suppressHydrationWarning
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
