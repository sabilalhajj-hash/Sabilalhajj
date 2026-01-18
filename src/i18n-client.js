import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Initialize i18n - use HTTP backend only in browser
if (!i18n.isInitialized) {
  if (isBrowser) {
    // Browser: use HTTP backend for loading translations
    i18n
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: '/locales/{{lng}}/common.json',
        },
        detection: {
          order: ['localStorage', 'navigator', 'htmlTag'],
          caches: ['localStorage'],
        },
      });
  } else {
    // SSR/Build: initialize without HTTP backend to avoid build-time requests
    i18n
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        lng: 'en',
        interpolation: {
          escapeValue: false,
        },
        // Empty resources - translations will load on client side
        resources: {
          en: { common: {} },
          fr: { common: {} },
          it: { common: {} },
          ar: { common: {} },
        },
      });
  }
}

export default i18n;