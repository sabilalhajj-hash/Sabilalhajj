'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={languageRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium uppercase"
      >
        <span className="text-lg">
          {languages.find(l => l.code === i18n.language)?.flag || '🌐'}
        </span>
        <span>{i18n.language.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-[200] overflow-hidden">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  i18n.changeLanguage(language.code);
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors group"
              >
                <span className="text-2xl mr-3">
                  {language.flag}
                </span>
                <div className="flex flex-col items-start">
                  <span className={`text-sm font-medium ${i18n.language === language.code ? 'text-emerald-600' : 'text-gray-700'}`}>
                    {language.name}
                  </span>
                  <span className="text-xs text-gray-400">{language.nativeName}</span>
                </div>
                {i18n.language === language.code && (
                  <svg className="ml-auto w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}