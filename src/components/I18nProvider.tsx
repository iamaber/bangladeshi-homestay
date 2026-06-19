"use client";

import {
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { I18nContext, type I18nContextValue } from "@/lib/i18n-context";
import { translations, type Lang } from "@/lib/i18n-data";

const LANG_STORAGE_KEY = "bh-lang";
const LANG_CHANGE_EVENT = "bh-lang-change";

function isLang(value: string | null): value is Lang {
  return !!value && value in translations;
}

function getStoredLang(): Lang {
  if (typeof window === "undefined") return "EN";
  const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
  return isLang(saved) ? saved : "EN";
}

function subscribeLang(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANG_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_CHANGE_EVENT, callback);
  };
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore<Lang>(subscribeLang, getStoredLang, () => "EN");

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang: (nextLang) => {
        window.localStorage.setItem(LANG_STORAGE_KEY, nextLang);
        window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
      },
      t: (key) => translations[lang][key],
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
