'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Import all language packs here. Add more as needed.
import en from '../i18n/en.json';
import cy from '../i18n/cy.json';
import es from '../i18n/es.json';
import fr from '../i18n/fr.json';
import de from '../i18n/de.json';
import it from '../i18n/it.json';
import ja from '../i18n/ja.json';
import zh from '../i18n/zh.json';
import ko from '../i18n/ko.json';
import ptBR from '../i18n/pt-BR.json';
import ar from '../i18n/ar.json';

// Dynamically typed map
const packs: Record<string, any> = {
  en, cy, es, fr, de, it, ja, zh, ko, 'pt-BR': ptBR, ar
};

type Lang = keyof typeof packs;

// Context & provider
const I18nContext = createContext<{
  t: (k: string) => string;
  lang: Lang;
  setLang: (l: Lang) => void;
}>({
  t: k => k,
  lang: 'en',
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const t = (k: string) =>
    (packs[lang]?.[k]) || packs['en'][k] || k;

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
