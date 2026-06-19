"use client";

import { createContext } from "react";
import type { Lang, TranslationKey } from "@/lib/i18n-data";

export type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
};

export const I18nContext = createContext<I18nContextValue | null>(null);
