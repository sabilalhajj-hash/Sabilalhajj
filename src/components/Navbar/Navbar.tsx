'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import CurrencySwitcher from './CurrencySwitcher';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const pathname = usePathname();

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  const languages = [
    { code: 'en', name: t('languages.english'), flag: '🇺🇸' },
    { code: 'fr', name: t('languages.french'), flag: '🇫🇷' },
    { code: 'it', name: t('languages.italian'), flag: '🇮🇹' },
    { code: 'ar', name: t('languages.arabic'), flag: '🇸🇦' },
  ];

  const navItems = [
    { key: 'umrah', href: '/umrah' },
    { key: 'hajj', href: '/hajj' },
    { key: 'flights', href: '/flights' },
    { key: 'hotels', href: '/hotels' },
    { key: 'visa', href: '/visa' },
    { key: 'about', href: '/about' },
  ];

  return (
    <nav className={`sticky top-0 transition-all duration-300 z-[200]  ${
      isScrolled
        ? 'bg-white/80 backdrop-blur-md  shadow-lg'
        : 'bg-white   shadow-lg '
    }`} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-25">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo-filtered.png"
                alt="Sabil Al-Hajj Logo"
                width={200}
                height={90}
                className="h-25 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {t(`navigation.${item.key}`)}
              </Link>
            ))}

            {/* Currency Selector */}
            <CurrencySwitcher />

            {/* Language Selector */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                aria-expanded="false"
                suppressHydrationWarning={true}
              >
                <span className="text-lg" suppressHydrationWarning>
                  {languages.find(lang => lang.code === i18n.language)?.flag}
                </span>
                <span className="hidden lg:block" suppressHydrationWarning>
                  {languages.find(lang => lang.code === i18n.language)?.name}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Language Dropdown */}
              <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-[200] ${isLanguageOpen ? 'block' : 'hidden'}`}>
                <div className="py-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        i18n.language === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                      suppressHydrationWarning
                    >
                      <span className="text-lg mr-3" suppressHydrationWarning>{language.flag}</span>
                      <span suppressHydrationWarning>{language.name}</span>
                      {i18n.language === language.code && (
                        <svg className="ml-auto w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" suppressHydrationWarning>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'}  md:hidden relative z-[200] ${
        isScrolled ? 'bg-gray-50/95 backdrop-blur-md ' : 'bg-gray-50'
      } transition-all duration-300 ` }>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                pathname === item.href
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t(`navigation.${item.key}`)}
            </Link>
          ))}

          {/* Mobile Language Selector */}
          <div className="border-t border-gray-200  pt-3 mt-3" suppressHydrationWarning={true}>
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-900 mb-2">{t('languages.language')} / {t('languages.language_arabic')}</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      changeLanguage(language.code);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      i18n.language === language.code
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span className="text-xs">{language.code === 'it' ? 'IT' : language.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}