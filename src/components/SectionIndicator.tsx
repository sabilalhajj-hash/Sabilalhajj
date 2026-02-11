'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Section {
  id: string;
  labelKey: string;
  icon: string;
  fallback: string;
}

interface SectionIndicatorProps {
  sections?: Section[];
  className?: string;
  pageType?: 'umrah' | 'hajj' | 'home' | 'generic';
  vertical?: boolean;
}

const umrahSections: Section[] = [
  { id: 'hero', labelKey: 'navigation.overview', icon: '🏠', fallback: 'Overview' },
  { id: 'config', labelKey: 'navigation.package_options', icon: '⚙️', fallback: 'Package Options' },
  { id: 'madinah', labelKey: 'navigation.madinah_itinerary', icon: '🕌', fallback: 'Madinah Itinerary' },
  { id: 'makkah', labelKey: 'navigation.makkah_itinerary', icon: '⛩️', fallback: 'Makkah Itinerary' },
  { id: 'policies', labelKey: 'navigation.terms_policies', icon: '📋', fallback: 'Terms & Policies' },
  { id: 'responsibility', labelKey: 'navigation.responsibility_policy', icon: '🛡️', fallback: 'Responsibility Policy' },
];

const hajjSections: Section[] = [
  { id: 'hero', labelKey: 'navigation.overview', icon: '🏠', fallback: 'Overview' },
  { id: 'hajj-info', labelKey: 'navigation.hajj_info', icon: '🕋', fallback: 'Hajj Information' },
  { id: 'requirements', labelKey: 'navigation.requirements', icon: '📋', fallback: 'Requirements' },
  { id: 'packages', labelKey: 'navigation.packages', icon: '📦', fallback: 'Packages' },
  { id: 'policies', labelKey: 'navigation.terms_policies', icon: '📋', fallback: 'Terms & Policies' },
];

const homeSections: Section[] = [
  { id: 'hero', labelKey: 'navigation.overview', icon: '🏠', fallback: 'Home' },
  { id: 'package-selection', labelKey: 'navigation.package_options', icon: '📦', fallback: 'Packages' },
  { id: 'services', labelKey: 'services.title', icon: '🛎️', fallback: 'Services' },
  { id: 'why-choose-us', labelKey: 'whyChooseUs.title', icon: '⭐', fallback: 'Why Choose Us' },
  { id: 'testimonials', labelKey: 'testimonials.title', icon: '💬', fallback: 'Testimonials' },
  { id: 'gallery', labelKey: 'gallery.title', icon: '🖼️', fallback: 'Gallery' },
];

export default function SectionIndicator({ sections: propSections, className, pageType = 'umrah', vertical = false }: SectionIndicatorProps = {}) {
  const { t } = useTranslation();

  // Use predefined sections based on page type, or custom sections if provided
  const sections = propSections || (
    pageType === 'hajj' ? hajjSections :
    pageType === 'home' ? homeSections :
    umrahSections
  );
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  // Only render translated UI after mount to avoid SSR/client hydration mismatch (e.g. on language switch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize active section by id (stable across language changes)
  useEffect(() => {
    if (sections.length > 0 && sections[0]) {
      setActiveSectionId(sections[0].id);
    }
  }, [sections]);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) setActiveSectionId(section.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (!mounted || sections.length === 0) return null;

  return (
    <div className={`fixed top-28 left-0 right-0 cursor-pointer z-[90] bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-lg ${vertical ? 'md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-6 lg:right-8 md:w-auto md:h-auto md:border-b-0 md:border-r md:border-l-0 md:rounded-r-lg md:rounded-l-none' : ''} ${className || ''}`}>
      <div className={`px-4 py-3 ${vertical ? 'md:px-3 md:py-4' : ''}`}>
        <div className={`flex items-center justify-between ${vertical ? 'md:flex-col md:items-stretch md:justify-center' : ''}`}>
          <div className={`flex gap-2 w-full items-center justify-center overflow-x-auto scrollbar-hide ${vertical ? 'md:flex-col md:gap-3 md:overflow-y-auto md:overflow-x-hidden' : ''}`}>
            {sections.map((section) => {
              const translatedLabel = section.labelKey ? t(section.labelKey) : section.fallback;
              const isActive = activeSectionId === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-xs font-medium ${vertical ? 'md:w-full md:justify-start' : ''} ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800 shadow-sm'
                      : 'hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                  }`}
                >
                  <div className={`w-1 h-4 rounded-full transition-all duration-300 shrink-0 ${vertical ? 'md:h-1 md:w-4' : ''} ${
                    isActive ? 'bg-emerald-600' : 'bg-transparent'
                  }`} />
                  <span className="text-sm">{section.icon}</span>
                  <span className={isActive ? 'font-bold' : ''}>
                    {translatedLabel}
                  </span>
                  {isActive && (
                    <div className={`w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse shrink-0 ${vertical ? 'ml-auto md:ml-0' : ''}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}