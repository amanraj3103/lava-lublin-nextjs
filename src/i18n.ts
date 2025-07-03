import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from '../public/locales/en/translation.json';
import plTranslation from '../public/locales/pl/translation.json';
import ukTranslation from '../public/locales/uk/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  pl: {
    translation: plTranslation,
  },
  uk: {
    translation: ukTranslation,
  },
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
      // Add these options to prevent hydration issues
      react: {
        useSuspense: false,
      },
      // Ensure consistent initialization
      initImmediate: false,
  });

export default i18n; 