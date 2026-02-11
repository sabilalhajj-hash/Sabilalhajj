'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/context/SettingsContext';

interface Program {
  id?: string;
  name: string;
  ApproximateDuration?: string;
  duration?: string;
  departure?: string;
  return?: string;
  from?: string;
  to?: string;
  description?: string;
  highlights?: string[];
  features?: string[];
  includes?: string[];
  recommended?: boolean;
}

interface StickyCTAProps {
  selectedProgram: Program | null;
  whatsappUrl?: string;
  whatsappMessage?: string;
  /** When true, CTA is always visible (e.g. on Hajj page). When false, hidden at top until user scrolls. */
  alwaysVisible?: boolean;
  /** When true, shows the Nusuk booking button (only for Hajj page) */
  showNusukButton?: boolean;
  /** When set, the main CTA button scrolls to this element id (e.g. confirm booking button) instead of opening WhatsApp. */
  scrollToId?: string;
  /** When scrollToId is set, optional i18n key for the main button label (e.g. common.book_now_via_whatsapp). Defaults to booking.confirm_book_now. */
  scrollToButtonLabelKey?: string;
}

const StickyCTA = ({ selectedProgram, whatsappUrl, whatsappMessage, alwaysVisible = false, showNusukButton = false, scrollToId, scrollToButtonLabelKey }: StickyCTAProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const [mounted, setMounted] = useState(false);
  const { whatsappUrl: siteWhatsappUrl } = useSettings();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract package information
  const packageTitle = selectedProgram?.name || '';
  const packageDuration = selectedProgram?.ApproximateDuration || selectedProgram?.duration || '';
  const packageDates = selectedProgram?.departure && selectedProgram?.return
    ? `${selectedProgram.departure} - ${selectedProgram.return}`
    : packageDuration;

  // Use prop (page-specific) > dashboard setting from context
  const baseWhatsappUrl = whatsappUrl || siteWhatsappUrl;
  const defaultWhatsappMessage =
    whatsappMessage ||
    (selectedProgram?.name
      ? `Hello! I would like to book ${selectedProgram.name}.`
      : 'Hello! I would like to inquire about your services.');
  const finalWhatsappUrl = whatsappUrl || `${baseWhatsappUrl}?text=${encodeURIComponent(defaultWhatsappMessage)}`;

  const scrollToSection = () => {
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleBookClick = () => {
    if (scrollToId) {
      scrollToSection();
      return;
    }
    if (finalWhatsappUrl) {
      window.open(finalWhatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (alwaysVisible) return;
      if (currentScrollY > 100) {
        setIsVisible(true);
      } else if (currentScrollY < 50) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysVisible]);

  const effectiveVisible = alwaysVisible || isVisible;

  return (
    <div
      className={`fixed flex items-center  justify-center inset-x-0 bottom-0 z-[100] w-full transition-all duration-500 ease-out ${
        effectiveVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="md:w-200 md:rounded-full rounded-4xl opacity-90  mb-5 bg-green-900 shadow-lg  text-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-t border-gray-700/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Package info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-6 text-center sm:text-left">
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight">
                  {packageTitle}
                </h3>
                {packageDates && (
                  <p className="text-sm text-gray-300 mt-0.5">
                    {packageDates}
                  </p>
                )}
              </div>
              {/* {(hasNumericPrice || packagePrice) && (
                <div className="flex items-baseline gap-2">
                  {hasNumericPrice ? (
                    <>
                      <span className="text-xs uppercase text-gray-400 tracking-wider">
                        {mounted ? (t('sticky_cta.price_per_person') || 'Price per person') : 'Price per person'}
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-emerald-400">
                        {packageCurrency}
                        {packagePrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-300">{packagePrice}</span>
                  )}
                </div>
              )} */}
            </div>

            {/* Right: CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* WhatsApp Button */}
              <button
                onClick={handleBookClick}
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-gray-900 bg-white hover:bg-emerald-50 border-2 border-emerald-500 text-emerald-700 hover:border-emerald-500 hover:text-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {mounted ? (scrollToId ? (scrollToButtonLabelKey ? t(scrollToButtonLabelKey) : (t('booking.confirm_book_now') || 'Confirm Book Now')) : (t('sticky_cta.book_package') || 'Book Package')) : (scrollToId ? (scrollToButtonLabelKey ? t(scrollToButtonLabelKey) : 'Confirm Book Now') : 'Book Package')}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Nusuk Booking Button - Only visible on Hajj page. When scrollToId set, scrolls to section; otherwise links to Nusuk. */}
              {showNusukButton && (
                scrollToId ? (
                  <button
                    type="button"
                    onClick={scrollToSection}
                    className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {mounted ? (t('common.book_now_via_nusuk') || 'Book Now via Nusuk') : 'Book Now via Nusuk'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                ) : (
                  <a
                    href="https://hajj.nusuk.sa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {mounted ? (t('common.book_via_nusuk') || 'Book via Nusuk') : 'Book via Nusuk'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
