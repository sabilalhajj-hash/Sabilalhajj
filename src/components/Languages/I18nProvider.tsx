'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // Detect and set language after component mounts (client-side only)
    const detectedLanguage = i18n.services.languageDetector.detect();
    if (detectedLanguage && detectedLanguage !== i18n.language) {
      i18n.changeLanguage(detectedLanguage);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}