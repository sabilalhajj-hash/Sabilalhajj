'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { User, LogOut, ChevronDown, HelpCircle, Mail, Phone, type LucideIcon } from 'lucide-react';
import CurrencySwitcher from './CurrencySwitcher';
import LanguageSwitcher from './LanguageSwitcher';

interface UserData {
  id: string;
  email: string;
  name?: string;
  lastName?: string;
  role?: string;
  avatar?: string | null;
}

interface UserMenuLinkItem {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  show: boolean;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const userMenuDesktopRef = useRef<HTMLDivElement>(null);
  const userMenuMobileRef = useRef<HTMLDivElement>(null);

  // Ensure component only renders translation after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch user authentication status
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    if (isClient) {
      fetchUser();
    }
  }, [isClient, pathname]); // Re-fetch when pathname changes (e.g., after login)

  // Re-fetch user when profile is updated (e.g. avatar in admin Settings)
  useEffect(() => {
    const onProfileUpdated = () => {
      fetch('/api/auth/me', { credentials: 'include' })
        .then((res) => res.ok ? res.json() : null)
        .then((data) => data?.user != null ? setUser(data.user) : null)
        .catch(() => {});
    };
    window.addEventListener('user-profile-updated', onProfileUpdated);
    return () => window.removeEventListener('user-profile-updated', onProfileUpdated);
  }, []);

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside (check both desktop and mobile menu refs)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const inDesktop = userMenuDesktopRef.current?.contains(target);
      const inMobile = userMenuMobileRef.current?.contains(target);
      if (!inDesktop && !inMobile) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      setIsUserMenuOpen(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menus when navigating
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Dynamic navigation items based on user state and other conditions
  // This makes the menu fully controlled and reactive to state changes
  const navItems = useMemo(() => {
    const isAdmin = user?.role === 'admin';
    const baseItems: Array<{ name: string; href: string; show: boolean }> = [
      { name: t('nav.umrah'), href: '/umrah', show: true },
      { name: t('nav.hajj'), href: '/hajj', show: true },
      { name: t('nav.flights'), href: '/flights', show: true },
      { name: t('nav.hotels'), href: '/hotels', show: true },
      { name: t('nav.visa'), href: '/visa', show: true },
      { name: t('nav.global_infos'), href: '/global-infos', show: !isAdmin },
      { name: t('nav.about'), href: '/about', show: true },
    ];

    // Add admin items if user is admin
    if (isAdmin) {
      baseItems.push(
        { name: t('admin.dashboard') || 'Admin', href: '/admin', show: true }
      );
    }

    // Filter items based on show property and return only visible ones
    // This allows dynamic control of which items appear - you can control visibility
    // by setting show: false on any item, or add conditions like:
    // show: user ? true : false  // Only show when logged in
    return baseItems.filter(item => item.show);
  }, [t, user, isClient]); // Include isClient and user to ensure proper reactivity

  // Dynamic user menu links – single source of truth (only Profile)
  const userMenuLinks = useMemo((): UserMenuLinkItem[] => {
    const items: UserMenuLinkItem[] = [
      { href: '/user', labelKey: 'user.profile', icon: User, show: true },
    ];
    return items.filter((item) => item.show);
  }, []);

  if (!isClient) {
    return (
      <nav className=" sticky top-0 transition-all duration-300 z-[200] bg-white shadow-lg" suppressHydrationWarning>
        <div className=" border-5 border-gray-500 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-25">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/sabilalhajj-removebg.png"
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
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth"
                  className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                  suppressHydrationWarning
                >
                  {t('common.sign_up')} 
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`sticky w-full top-0 transition-all duration-300 z-[200]  ${
      isScrolled
        ? 'bg-white/80 backdrop-blur-md  shadow-lg'
        : 'bg-white   shadow-lg '
    }`} suppressHydrationWarning>
      <div className="w-full   mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between h-25">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/sabilalhajj-slogen-removebg.png"
                alt="Sabil Al-Hajj Logo"
                width={250}
                height={200}
                className="h-35 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex px-5 items-center space-x-8">
            {navItems.map((item) => {
              // Check if current path matches (handles query params)
              const isActive = pathname === item.href || 
                (item.href.startsWith('/user') && pathname.startsWith('/user')) ||
                (item.href.startsWith('/admin') && pathname.startsWith('/admin'));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsUserMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-green-600 bg-green-100 border-2 border-green-200 '
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                  suppressHydrationWarning
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Language Selector */}
            <LanguageSwitcher />
            {/* Currency Selector */}
            <CurrencySwitcher />

            {/* Auth buttons or User menu */}
            {!isLoadingUser && (
              <div className="flex items-center space-x-3">
                {user ? (
                  /* User Menu */
                  <div className="relative" ref={userMenuDesktopRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      aria-expanded={isUserMenuOpen}
                      aria-haspopup="true"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm overflow-hidden shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()
                        )}
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute  left-0   mt-7 w-56  overflow-y-auto rounded-lg shadow-xl bg-white ring-1 ring-gray-200 focus:outline-none z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="py-1">
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm overflow-hidden shrink-0">
                              {user.avatar ? (
                                <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {user.name && user.lastName 
                                  ? `${user.name} ${user.lastName}` 
                                  : user.name || user.email}
                              </p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                              {user.role === 'admin' && (
                                <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded">
                                  Admin
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Menu Items – dynamic from userMenuLinks */}
                          {userMenuLinks.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Icon className="w-4 h-4 mr-3 text-gray-500" />
                                {t(item.labelKey)}
                              </Link>
                            );
                          })}
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={() => {
                              setShowHelpModal(true);
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
                            {t('user.help_support') || 'Help & Support'}
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            {t('user.logout')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Sign Up Button */
                  <Link
                    href="/auth"
                    className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                    suppressHydrationWarning
                  >
                    {t('common.sign_in')}
                  </Link>  
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button and user menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* User Menu for Mobile */}
            {!isLoadingUser && user && (
              <div className="relative" ref={userMenuMobileRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm overflow-hidden shrink-0">
                    {user.avatar ? (
                      <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()
                    )}
                  </div>
                </button>

                {/* Mobile User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute  left-0  w-60  mt-7   overflow-y-auto rounded-lg shadow-xl bg-white ring-1 ring-gray-200 focus:outline-none z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-1">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm overflow-hidden shrink-0">
                          {user.avatar ? (
                            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name && user.lastName 
                              ? `${user.name} ${user.lastName}` 
                              : user.name || user.email}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                          {user.role === 'admin' && (
                            <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Menu Items – dynamic from userMenuLinks */}
                      {userMenuLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setIsMenuOpen(false);
                            }}
                          >
                            <Icon className="w-4 h-4 mr-3 text-gray-500" />
                            {t(item.labelKey)}
                          </Link>
                        );
                      })}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          setShowHelpModal(true);
                          setIsUserMenuOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
                        {t('user.help_support') || 'Help & Support'}
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsUserMenuOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        {t('user.logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger Menu Button */}
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
            {navItems.map((item) => {
              // Check if current path matches (handles query params)
              const isActive = pathname === item.href || 
                (item.href.startsWith('/user') && pathname.startsWith('/user')) ||
                (item.href.startsWith('/admin') && pathname.startsWith('/admin'));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  suppressHydrationWarning
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Auth buttons or User info for mobile */}
            {!isLoadingUser && (
              
              <div className="pt-4  mt-4 border-t border-gray-200 space-y-2">
                {user ? (
                  <>
                    {/* User Info */}
                    <div className="px-3 py-2 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm overflow-hidden shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name && user.lastName 
                            ? `${user.name} ${user.lastName}` 
                            : user.name || user.email}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        {user.role === 'admin' && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                    {/* User Menu Links – dynamic from userMenuLinks */}
                    {userMenuLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {t(item.labelKey)}
                        </Link>
                      );
                    })}
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={() => {
                        setShowHelpModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 mr-3" />
                      {t('user.help_support') || 'Help & Support'}
                    </button>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-2 rounded-full text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      {t('user.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth"
                      className="block w-full text-center px-4 py-2 rounded-full text-sm font-semibold text-gray-700 border border-gray-200 hover:border-green-300 hover:text-green-700 hover:bg-green-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      suppressHydrationWarning
                    >
                      {t('common.sign_in')}
                    </Link>
                    <Link
                      href="/auth"
                      className="block w-full text-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      suppressHydrationWarning
                    >
                      {t('common.sign_up')}
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[300]">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <HelpCircle className="w-6 h-6 mr-2 text-emerald-600" />
                {t('user.help_support') || 'Help & Support'}
              </h2>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('user.contact_us') || 'Contact Us'}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {t('user.contact_description') || 'Need help? Reach out to our support team.'}
                </p>
                <div className="space-y-2">
                  <a
                    href="mailto:support@sabilalhajj.com"
                    className="flex items-center text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    support@sabilalhajj.com
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">{t('user.faq') || 'Frequently Asked Questions'}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {t('user.faq_description') || 'Find answers to common questions.'}
                </p>
                <Link
                  href="/about"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  onClick={() => setShowHelpModal(false)}
                >
                  {t('user.view_faq') || 'View FAQ →'}
                </Link>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">{t('user.quick_links') || 'Quick Links'}</h3>
                <div className="space-y-2">
                  <Link
                    href="/about"
                    className="block text-sm text-emerald-600 hover:text-emerald-700"
                    onClick={() => setShowHelpModal(false)}
                  >
                    {t('nav.about')}
                  </Link>
                  <Link
                    href="/services"
                    className="block text-sm text-emerald-600 hover:text-emerald-700"
                    onClick={() => setShowHelpModal(false)}
                  >
                    {t('services.title')}
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full px-4 py-2 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors"
              >
                {t('common.close') || 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}