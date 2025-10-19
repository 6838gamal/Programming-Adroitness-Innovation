
"use client";

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import React from 'react';

// This is a workaround to allow metadata to be defined in a server component context
// while the rest of the layout uses client-side hooks.
const AppWithMetadata: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageProvider>
      <App>{children}</App>
    </LanguageProvider>
  );
};

function App({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  return (
    <html lang={language} dir={language === "ar" ? "rtl" : "ltr"} className="dark">
        <head>
          <title>PAI Smart Academy</title>
          <meta name="description" content="Your personalized path to mastering new skills with AI." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&family=Tajawal:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body className={`font-body antialiased ${language === "ar" ? "font-arabic" : ""}`}>
          {children}
          <Toaster />
        </body>
      </html>
  )
}

export default AppWithMetadata;
