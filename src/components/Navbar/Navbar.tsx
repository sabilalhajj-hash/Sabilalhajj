'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import CurrencySwitcher from './CurrencySwitcher';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  // Ensure component only renders translation after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Memoize navItems to avoid recalculating and to prevent hydration issues
  const navItems = useMemo(() => [
    { name: t('nav.umrah'), href: '/umrah' },
    { name: t('nav.hajj'), href: '/hajj' },
    { name: t('nav.flights'), href: '/flights' },
    { name: t('nav.hotels'), href: '/hotels' },
    { name: t('nav.visa'), href: '/visa' },
    { name: t('nav.about'), href: '/about' },
  ], [t]);

  if (!isClient) {
    return (
      <nav className="sticky top-0 transition-all duration-300 z-[200] bg-white shadow-lg" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-25">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/Logo-filtred.png"
                  alt="Sabil Al-Hajj Logo"
                  width={200}
                  height={90}
                  className="h-25 w-auto"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>
          </div>
        </div>
      </nav>
    );
  }

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
                src="/Logo-filtred.png"
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
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-green-600 bg-green-100 border-2 border-green-200 '
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
                suppressHydrationWarning
              >
                {item.name}
              </Link>
            ))}

            {/* Language Selector */}
            <LanguageSwitcher />
            {/* Currency Selector */}
            <CurrencySwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
      {isClient && (
        <div className={`${isMenuOpen ? 'block' : 'hidden'}  md:hidden relative z-[200] ${
          isScrolled ? 'bg-gray-50/95 backdrop-blur-md ' : 'bg-gray-50'
        } transition-all duration-300 ` }>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
                suppressHydrationWarning
              >
                {item.name}
              </Link>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
}