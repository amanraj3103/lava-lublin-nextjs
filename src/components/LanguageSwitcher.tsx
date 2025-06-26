'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get language from localStorage if available, otherwise use default
    const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const languages = [
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'pl', name: 'PL', flag: '🇵🇱' },
    { code: 'uk', name: 'UK', flag: '🇺🇦' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', languageCode);
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative group">
        <button className="bg-transparent border-none flex items-center gap-2 text-white hover:text-orange-400 p-3">
          <span className="text-2xl">🌐</span>
          <span className="hidden sm:inline text-2xl">EN</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '1.25rem', height: '1.25rem' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button className="bg-transparent border-none flex items-center gap-2 text-white hover:text-orange-400 p-3">
        <span className="text-2xl">
          {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
        </span>
        <span className="hidden sm:inline text-2xl">
          {languages.find(lang => lang.code === i18n.language)?.name || 'EN'}
        </span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '1.25rem', height: '1.25rem' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-40 bg-gray-800 border border-gray-600 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-700 ${
              i18n.language === language.code ? 'text-orange-400 bg-gray-700' : 'text-white'
            }`}
          >
            <span className="text-2xl">{language.flag}</span>
            <span className="text-2xl">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher; 