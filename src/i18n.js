import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        umrah: "Umrah",
        hajj: "Hajj",
        flights: "Flights",
        hotels: "Hotels",
        visa: "Visa",
        about: "About"
      },
      hero: {
        slides: [
          {
            title: "Welcome to Sabil Al-Hajj",
            subtitle: "Your trusted partner for Hajj and Umrah pilgrimage services. Experience a spiritual journey filled with peace, devotion, and unforgettable memories.",
            ctaPrimary: "Book Your Pilgrimage",
            ctaSecondary: "Learn More"
          },
          {
            title: "Experience Sacred Hajj",
            subtitle: "Embark on the most sacred pilgrimage with our expert guidance. Every step of your journey is carefully planned for spiritual fulfillment.",
            ctaPrimary: "Plan Hajj Journey",
            ctaSecondary: "View Packages"
          },
          {
            title: "Discover Umrah Blessings",
            subtitle: "Find inner peace through Umrah pilgrimage. Our comprehensive services ensure a meaningful and comfortable spiritual experience.",
            ctaPrimary: "Book Umrah Now",
            ctaSecondary: "Explore Options"
          },
          {
            title: "Premium Accommodations",
            subtitle: "Stay in the most convenient and comfortable accommodations near the Holy Sites. Luxury meets spirituality in our premium hotels.",
            ctaPrimary: "View Hotels",
            ctaSecondary: "Check Availability"
          }
        ]
      }
    }
  }
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    resources,
  });

export default i18n;