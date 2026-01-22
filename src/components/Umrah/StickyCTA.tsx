'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  price: string;
  includes?: string[];
  recommended?: boolean;
}

interface StickyCTAProps {
  selectedProgram: Program | null;
  whatsappUrl?: string;
  whatsappMessage?: string;
}

const StickyCTA = ({ selectedProgram, whatsappUrl, whatsappMessage }: StickyCTAProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // Extract package information
  const packageTitle = selectedProgram?.name || '';
  const packageDuration = selectedProgram?.ApproximateDuration || selectedProgram?.duration || '';
  const packageDates = selectedProgram?.departure && selectedProgram?.return 
    ? `${selectedProgram.departure} - ${selectedProgram.return}` 
    : packageDuration;
  
  // Handle price - check if it's a numeric price or text like "Contact us"
  const hasNumericPrice = selectedProgram?.price && /[\d.,]/.test(selectedProgram.price);
  const packagePrice = hasNumericPrice 
    ? selectedProgram.price.replace(/[^\d.,]/g, '') || '0'
    : selectedProgram?.price || '';
  const packageCurrency = hasNumericPrice && selectedProgram?.price?.includes('€') ? '€' : hasNumericPrice ? '$' : '';
  
  // Default WhatsApp URL if not provided
  const defaultWhatsappUrl = 'https://wa.me/2120606420326';
  const defaultWhatsappMessage = whatsappMessage || (selectedProgram?.name 
    ? `Hello! I would like to book ${selectedProgram.name}.` 
    : 'Hello! I would like to inquire about your services.');
  const finalWhatsappUrl = whatsappUrl || `${defaultWhatsappUrl}?text=${encodeURIComponent(defaultWhatsappMessage)}`;
  
  // Handle button click
  const handleBookClick = () => {
    if (finalWhatsappUrl) {
      window.open(finalWhatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Hide/show based on scroll direction and position
      if (currentScrollY > 100) {
        setIsVisible(true);
      } else if (currentScrollY < 50) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translateY = Math.min(scrollY * 0.1, 20); // Subtle upward movement on scroll

  return (
    <div
      className={`fixed bottom-10 right-10 top-160 md:top-240 rounded-2xl z-50 transition-all duration-500 ease-out transform ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-4 opacity-0 scale-95'
      }`}
      style={{
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Floating animation effect */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-2  rounded-3xl blur-lg opacity-30 animate-pulse"></div>

        {/* Main card */}
        <div className="relative bg-black rounded-2xl text-white py-5 px-6 shadow-2xl shadow-green-500/25 border border-green-400/20 backdrop-blur-sm">
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl  opacity-20 animate-pulse"></div>

          <div className="relative flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Left Side: Text Info */}
            <div className="flex flex-col text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1 animate-pulse">
                {packageTitle}
              </h3>
              <p className="text-sm text-green-100 opacity-90">
                {packageDates}
              </p>
              {/* Mobile price display */}
              {hasNumericPrice && (
                <div className="sm:hidden mt-2">
                  <span className="block text-xs uppercase text-green-200">{t('sticky_cta.price_per_person') || 'Price per person'}</span>
                  <span className="text-xl font-bold">{packageCurrency}{packagePrice}</span>
                </div>
              )}
              {!hasNumericPrice && packagePrice && (
                <div className="sm:hidden mt-2">
                  <span className="text-sm text-green-200">{packagePrice}</span>
                </div>
              )}
            </div>

            {/* Right Side: Price and Button */}
            <div className="flex items-center gap-4">
              {hasNumericPrice && (
                <div className="text-right hidden sm:block">
                  <span className="block text-xs uppercase text-green-200">{t('sticky_cta.price_per_person') || 'Price per person'}</span>
                  <span className="text-2xl font-bold">{packageCurrency}{packagePrice}</span>
                </div>
              )}
              {!hasNumericPrice && packagePrice && (
                <div className="text-right hidden sm:block">
                  <span className="text-sm text-green-200">{packagePrice}</span>
                </div>
              )}

              <button
                onClick={handleBookClick}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:scale-105 hover:bg-yellow-50 hover:text-green-700 transform duration-300 cursor-pointer transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {t('sticky_cta.book_package') || 'Book Package'}
              </button>
            </div>
          </div>

          {/* Floating particles effect */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;