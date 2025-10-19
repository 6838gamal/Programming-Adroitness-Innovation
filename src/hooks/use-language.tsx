"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import locales from '@/lib/locales.json';

type Language = 'en' | 'ar';

type Translations = typeof locales;
type TranslationKey = keyof Translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ar') {
      setLanguage('ar');
    }
  }, []);

  const t = useCallback((key: TranslationKey, replacements?: Record<string, string | number>) => {
    const translation = locales[key]?.[language] || key;

    if (replacements) {
        return Object.entries(replacements).reduce((acc, [key, value]) => {
            return acc.replace(`{{${key}}}`, String(value));
        }, translation);
    }
    
    return translation;
  }, [language]);
  

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
