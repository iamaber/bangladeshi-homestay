"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Lang = "EN" | "DE" | "FR" | "IT";

type TranslationKey =
  | "brandFirst"
  | "brandSecond"
  | "navHow"
  | "navPackages"
  | "navHosts"
  | "navFaq"
  | "navExperience"
  | "navStudentPackages"
  | "navIncludes"
  | "navPricing"
  | "navCulturalLife"
  | "bookNow"
  | "heroHeadlineA"
  | "heroHeadlineB"
  | "heroSub"
  | "explorePackages"
  | "howItWorks"
  | "featureLifeTitle"
  | "featureLifeDesc"
  | "featureCareTitle"
  | "featureCareDesc"
  | "featureSmallTitle"
  | "featureSmallDesc"
  | "aboutEyebrow"
  | "aboutHeadlineA"
  | "aboutHeadlineB"
  | "aboutP1"
  | "aboutP2"
  | "aboutP3"
  | "journeyEyebrow"
  | "journeyHeadlineA"
  | "journeyHeadlineB"
  | "step1Title"
  | "step1Desc"
  | "step2Title"
  | "step2Desc"
  | "step3Title"
  | "step3Desc"
  | "packagesEyebrow"
  | "packagesHeadlineA"
  | "packagesHeadlineB"
  | "standardDesc"
  | "premiumDesc"
  | "bookYourStay"
  | "comparePackages"
  | "ctaEyebrow"
  | "ctaHeadlineA"
  | "ctaHeadlineB"
  | "ctaDesc"
  | "footerDesc"
  | "footerExperience"
  | "footerSupport"
  | "footerContact"
  | "footerRights"
  | "footerPayment";

const translations: Record<Lang, Record<TranslationKey, string>> = {
  EN: {
    brandFirst: "Bengali",
    brandSecond: "Homestay",
    navHow: "How It Works",
    navPackages: "Packages",
    navHosts: "Host Families",
    navFaq: "FAQ",
    navExperience: "Experience",
    navStudentPackages: "Student Packages",
    navIncludes: "What's Included",
    navPricing: "Pricing & Payment",
    navCulturalLife: "Cultural Life",
    bookNow: "Book Now",
    heroHeadlineA: "Live Bangladesh.",
    heroHeadlineB: "Don't Just Visit It.",
    heroSub:
      "Stay with a real Bangladeshi family, share their meals, join their daily life, and experience a culture that no hotel can offer.",
    explorePackages: "Explore Packages",
    howItWorks: "How It Works",
    featureLifeTitle: "Authentic Daily Life",
    featureLifeDesc:
      "Eat, cook, and live alongside your host family. Every meal, every conversation, every moment is genuinely Bangladeshi.",
    featureCareTitle: "Everything Taken Care Of",
    featureCareDesc:
      "From airport pickup to local transport, all meals and cultural activities, your stay is fully organised so you can simply enjoy.",
    featureSmallTitle: "Personal & Small-Scale",
    featureSmallDesc:
      "We work with a carefully selected host family to ensure an intimate, meaningful experience, not a crowded tour group.",
    aboutEyebrow: "A Different Kind of Travel",
    aboutHeadlineA: "A Different Kind",
    aboutHeadlineB: "of Travel",
    aboutP1:
      "Bangladesh isn't just a destination. It's an experience that stays with you. Bengali Homestay connects you with warm, welcoming host families across Bangladesh for a 2-week immersion like no other.",
    aboutP2:
      "Wake up to home-cooked breakfasts, explore local markets, learn to cook traditional recipes, and build friendships that last a lifetime.",
    aboutP3: "This isn't tourism. This is belonging.",
    journeyEyebrow: "The Journey",
    journeyHeadlineA: "Simple from",
    journeyHeadlineB: "Start to Finish",
    step1Title: "Choose your package",
    step1Desc: "Pick Standard or Premium, with or without a flight ticket included.",
    step2Title: "Submit your booking",
    step2Desc:
      "Fill out a short form and receive your confirmation and payment invoice by email within 24 hours.",
    step3Title: "Arrive & immerse yourself",
    step3Desc:
      "Your host family will be at the airport to welcome you. From there, your Bengali adventure begins.",
    packagesEyebrow: "Packages & Pricing",
    packagesHeadlineA: "Choose your",
    packagesHeadlineB: "experience",
    standardDesc:
      "A complete cultural immersion. Stay with your host family, join basic cultural activities, and enjoy all meals and local transport.",
    premiumDesc:
      "Everything in Standard, plus extended cooking classes, music sessions, crafts workshops, and additional local tours. More time, more depth.",
    bookYourStay: "Book Your Stay",
    comparePackages: "Compare Packages",
    ctaEyebrow: "Book Now",
    ctaHeadlineA: "Ready to Experience",
    ctaHeadlineB: "Bangladesh Like a Local?",
    ctaDesc: "There are only a handful of spots available each season. Don't miss yours.",
    footerDesc:
      "Authentic Bangladeshi homestay experiences for international travellers seeking something real.",
    footerExperience: "Experience",
    footerSupport: "Support",
    footerContact: "Contact",
    footerRights: "All rights reserved.",
    footerPayment: "Prices in CHF · Payment by invoice",
  },
  DE: {
    brandFirst: "Bengali",
    brandSecond: "Homestay",
    navHow: "So funktioniert es",
    navPackages: "Pakete",
    navHosts: "Gastfamilien",
    navFaq: "FAQ",
    navExperience: "Erlebnis",
    navStudentPackages: "Studentenpakete",
    navIncludes: "Leistungen",
    navPricing: "Preise & Zahlung",
    navCulturalLife: "Kulturelles Leben",
    bookNow: "Jetzt buchen",
    heroHeadlineA: "Lebe Bangladesch.",
    heroHeadlineB: "Besuche es nicht nur.",
    heroSub:
      "Wohne bei einer echten bangladeschischen Familie, teile ihre Mahlzeiten, erlebe ihren Alltag und entdecke eine Kultur, die kein Hotel bieten kann.",
    explorePackages: "Pakete ansehen",
    howItWorks: "So funktioniert es",
    featureLifeTitle: "Authentischer Alltag",
    featureLifeDesc:
      "Iss, koche und lebe mit deiner Gastfamilie. Jede Mahlzeit, jedes Gespräch und jeder Moment ist echt bangladeschisch.",
    featureCareTitle: "Alles ist organisiert",
    featureCareDesc:
      "Von der Abholung am Flughafen bis zum lokalen Transport, allen Mahlzeiten und kulturellen Aktivitäten ist dein Aufenthalt organisiert.",
    featureSmallTitle: "Persönlich & klein",
    featureSmallDesc:
      "Wir arbeiten mit sorgfältig ausgewählten Gastfamilien, damit die Erfahrung persönlich und bedeutungsvoll bleibt.",
    aboutEyebrow: "Eine andere Art zu reisen",
    aboutHeadlineA: "Eine andere Art",
    aboutHeadlineB: "zu reisen",
    aboutP1:
      "Bangladesch ist nicht nur ein Reiseziel. Es ist eine Erfahrung, die bleibt. Bengali Homestay verbindet dich mit herzlichen Gastfamilien für eine zweiwöchige Immersion.",
    aboutP2:
      "Wache mit hausgemachtem Frühstück auf, besuche lokale Märkte, lerne traditionelle Rezepte und knüpfe Freundschaften fürs Leben.",
    aboutP3: "Das ist kein Tourismus. Das ist Zugehörigkeit.",
    journeyEyebrow: "Die Reise",
    journeyHeadlineA: "Einfach von",
    journeyHeadlineB: "Anfang bis Ende",
    step1Title: "Paket wählen",
    step1Desc: "Wähle Standard oder Premium, mit oder ohne Flugticket.",
    step2Title: "Buchung senden",
    step2Desc:
      "Fülle ein kurzes Formular aus und erhalte Bestätigung und Zahlungsrechnung innerhalb von 24 Stunden per E-Mail.",
    step3Title: "Ankommen & eintauchen",
    step3Desc:
      "Deine Gastfamilie empfängt dich am Flughafen. Von dort beginnt dein bengalisches Abenteuer.",
    packagesEyebrow: "Pakete & Preise",
    packagesHeadlineA: "Wähle dein",
    packagesHeadlineB: "Erlebnis",
    standardDesc:
      "Eine vollständige kulturelle Immersion mit Gastfamilie, grundlegenden Aktivitäten, allen Mahlzeiten und lokalem Transport.",
    premiumDesc:
      "Alles aus Standard plus erweiterte Kochkurse, Musik, Handwerk und zusätzliche lokale Touren. Mehr Zeit, mehr Tiefe.",
    bookYourStay: "Aufenthalt buchen",
    comparePackages: "Pakete vergleichen",
    ctaEyebrow: "Jetzt buchen",
    ctaHeadlineA: "Bereit, Bangladesch",
    ctaHeadlineB: "wie ein Einheimischer zu erleben?",
    ctaDesc: "Pro Saison gibt es nur wenige Plätze. Verpasse deinen nicht.",
    footerDesc:
      "Authentische Homestay-Erlebnisse in Bangladesch für Reisende, die etwas Echtes suchen.",
    footerExperience: "Erlebnis",
    footerSupport: "Support",
    footerContact: "Kontakt",
    footerRights: "Alle Rechte vorbehalten.",
    footerPayment: "Preise in CHF · Zahlung per Rechnung",
  },
  FR: {
    brandFirst: "Bengali",
    brandSecond: "Homestay",
    navHow: "Comment ça marche",
    navPackages: "Forfaits",
    navHosts: "Familles d'accueil",
    navFaq: "FAQ",
    navExperience: "Expérience",
    navStudentPackages: "Forfaits étudiants",
    navIncludes: "Ce qui est inclus",
    navPricing: "Prix & paiement",
    navCulturalLife: "Vie culturelle",
    bookNow: "Réserver",
    heroHeadlineA: "Vivez le Bangladesh.",
    heroHeadlineB: "Ne faites pas que le visiter.",
    heroSub:
      "Séjournez chez une vraie famille bangladaise, partagez ses repas, participez à son quotidien et découvrez une culture qu'aucun hôtel ne peut offrir.",
    explorePackages: "Voir les forfaits",
    howItWorks: "Comment ça marche",
    featureLifeTitle: "Vie quotidienne authentique",
    featureLifeDesc:
      "Mangez, cuisinez et vivez avec votre famille d'accueil. Chaque repas, chaque conversation et chaque moment est réellement bangladais.",
    featureCareTitle: "Tout est pris en charge",
    featureCareDesc:
      "De l'accueil à l'aéroport au transport local, en passant par les repas et activités culturelles, tout est organisé.",
    featureSmallTitle: "Personnel & à petite échelle",
    featureSmallDesc:
      "Nous travaillons avec des familles soigneusement sélectionnées pour une expérience intime et pleine de sens.",
    aboutEyebrow: "Une autre façon de voyager",
    aboutHeadlineA: "Une autre façon",
    aboutHeadlineB: "de voyager",
    aboutP1:
      "Le Bangladesh n'est pas seulement une destination. C'est une expérience qui reste avec vous. Bengali Homestay vous relie à des familles chaleureuses pour une immersion de deux semaines.",
    aboutP2:
      "Réveillez-vous avec des petits-déjeuners maison, explorez les marchés locaux, apprenez des recettes traditionnelles et créez des amitiés durables.",
    aboutP3: "Ce n'est pas du tourisme. C'est un sentiment d'appartenance.",
    journeyEyebrow: "Le parcours",
    journeyHeadlineA: "Simple du",
    journeyHeadlineB: "début à la fin",
    step1Title: "Choisissez votre forfait",
    step1Desc: "Choisissez Standard ou Premium, avec ou sans billet d'avion.",
    step2Title: "Envoyez votre réservation",
    step2Desc:
      "Remplissez un court formulaire et recevez votre confirmation et votre facture de paiement par e-mail sous 24 heures.",
    step3Title: "Arrivez et immergez-vous",
    step3Desc:
      "Votre famille d'accueil vous accueillera à l'aéroport. Votre aventure bengalie commence là.",
    packagesEyebrow: "Forfaits & prix",
    packagesHeadlineA: "Choisissez votre",
    packagesHeadlineB: "expérience",
    standardDesc:
      "Une immersion culturelle complète avec famille d'accueil, activités de base, repas et transport local.",
    premiumDesc:
      "Tout le Standard, plus cours de cuisine, musique, ateliers d'artisanat et visites locales supplémentaires. Plus de temps, plus de profondeur.",
    bookYourStay: "Réserver le séjour",
    comparePackages: "Comparer les forfaits",
    ctaEyebrow: "Réserver",
    ctaHeadlineA: "Prêt à vivre le Bangladesh",
    ctaHeadlineB: "comme un local ?",
    ctaDesc: "Il n'y a que quelques places par saison. Ne manquez pas la vôtre.",
    footerDesc:
      "Expériences authentiques de homestay au Bangladesh pour les voyageurs en quête de réel.",
    footerExperience: "Expérience",
    footerSupport: "Aide",
    footerContact: "Contact",
    footerRights: "Tous droits réservés.",
    footerPayment: "Prix en CHF · Paiement par facture",
  },
  IT: {
    brandFirst: "Bengali",
    brandSecond: "Homestay",
    navHow: "Come funziona",
    navPackages: "Pacchetti",
    navHosts: "Famiglie ospitanti",
    navFaq: "FAQ",
    navExperience: "Esperienza",
    navStudentPackages: "Pacchetti studenti",
    navIncludes: "Cosa è incluso",
    navPricing: "Prezzi & pagamento",
    navCulturalLife: "Vita culturale",
    bookNow: "Prenota ora",
    heroHeadlineA: "Vivi il Bangladesh.",
    heroHeadlineB: "Non limitarti a visitarlo.",
    heroSub:
      "Soggiorna con una vera famiglia bangladese, condividi i pasti, partecipa alla vita quotidiana e scopri una cultura che nessun hotel può offrire.",
    explorePackages: "Scopri i pacchetti",
    howItWorks: "Come funziona",
    featureLifeTitle: "Vita quotidiana autentica",
    featureLifeDesc:
      "Mangia, cucina e vivi con la tua famiglia ospitante. Ogni pasto, conversazione e momento è davvero bangladese.",
    featureCareTitle: "Tutto organizzato",
    featureCareDesc:
      "Dal transfer in aeroporto al trasporto locale, pasti e attività culturali, il soggiorno è organizzato per farti godere l'esperienza.",
    featureSmallTitle: "Personale & piccolo",
    featureSmallDesc:
      "Collaboriamo con famiglie selezionate con cura per offrire un'esperienza intima e significativa.",
    aboutEyebrow: "Un modo diverso di viaggiare",
    aboutHeadlineA: "Un modo diverso",
    aboutHeadlineB: "di viaggiare",
    aboutP1:
      "Il Bangladesh non è solo una destinazione. È un'esperienza che resta con te. Bengali Homestay ti collega a famiglie accoglienti per un'immersione di due settimane.",
    aboutP2:
      "Svegliati con colazioni fatte in casa, esplora mercati locali, impara ricette tradizionali e crea amicizie che durano.",
    aboutP3: "Questo non è turismo. È appartenenza.",
    journeyEyebrow: "Il percorso",
    journeyHeadlineA: "Semplice",
    journeyHeadlineB: "dall'inizio alla fine",
    step1Title: "Scegli il pacchetto",
    step1Desc: "Scegli Standard o Premium, con o senza biglietto aereo incluso.",
    step2Title: "Invia la prenotazione",
    step2Desc:
      "Compila un breve modulo e ricevi conferma e fattura di pagamento via e-mail entro 24 ore.",
    step3Title: "Arriva e immergiti",
    step3Desc:
      "La tua famiglia ospitante ti accoglierà in aeroporto. Da lì inizia la tua avventura bengalese.",
    packagesEyebrow: "Pacchetti & prezzi",
    packagesHeadlineA: "Scegli la tua",
    packagesHeadlineB: "esperienza",
    standardDesc:
      "Un'immersione culturale completa con famiglia ospitante, attività culturali di base, pasti e trasporto locale.",
    premiumDesc:
      "Tutto nello Standard, più corsi di cucina, musica, laboratori artigianali e tour locali aggiuntivi. Più tempo, più profondità.",
    bookYourStay: "Prenota il soggiorno",
    comparePackages: "Confronta pacchetti",
    ctaEyebrow: "Prenota ora",
    ctaHeadlineA: "Pronto a vivere il Bangladesh",
    ctaHeadlineB: "come una persona del posto?",
    ctaDesc: "Ci sono solo pochi posti disponibili ogni stagione. Non perdere il tuo.",
    footerDesc:
      "Esperienze autentiche di homestay in Bangladesh per viaggiatori che cercano qualcosa di vero.",
    footerExperience: "Esperienza",
    footerSupport: "Supporto",
    footerContact: "Contatto",
    footerRights: "Tutti i diritti riservati.",
    footerPayment: "Prezzi in CHF · Pagamento tramite fattura",
  },
};

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

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

export function I18nProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore<Lang>(subscribeLang, getStoredLang, () => "EN");

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const setLang = (nextLang: Lang) => {
    window.localStorage.setItem(LANG_STORAGE_KEY, nextLang);
    window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (key) => translations[lang][key],
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
}
