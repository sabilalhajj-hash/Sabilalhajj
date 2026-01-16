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

export default function SectionIndicator({ sections: propSections, className, pageType = 'umrah' }: SectionIndicatorProps = {}) {
  const { t } = useTranslation();

  // Use predefined sections based on page type, or custom sections if provided
  const sections = propSections || (
    pageType === 'hajj' ? hajjSections :
    pageType === 'home' ? homeSections :
    umrahSections
  );
  const [activeSection, setActiveSection] = useState<string>('');

  // Initialize active section
  useEffect(() => {
    if (sections.length > 0) {
      setActiveSection(sections[0]?.labelKey ? t(sections[0].labelKey) : (sections[0]?.fallback || ''));
    }
  }, [sections, t]);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) {
              const translatedLabel = section.labelKey ? t(section.labelKey) : section.fallback;
              setActiveSection(translatedLabel);
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, t]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Don't render if no sections found
  if (sections.length === 0) return null;

  return (
    <>
      {/* Desktop Version - Right Side */}
      <div className={`fixed right-6 top-1/2 cursor-pointer -translate-y-1/2 z-[90] hidden lg:block ${className || ''}`}>
        <div className="bg-white/65  backdrop-blur-md border-3 border-emerald-300 p-4 rounded-2xl shadow-2xl min-w-[200px]">
          <div className="text-center mb-3">
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Page Navigation</span>
          </div>

          <div className="space-y-2">
            {sections.map((section) => {
              const translatedLabel = section.labelKey ? t(section.labelKey) : section.fallback;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-left group ${
                    activeSection === translatedLabel
                      ? 'bg-emerald-100 text-emerald-800 shadow-md'
                      : 'hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                  }`}
                >
                  {/* Active indicator */}
                  <div className={`w-1 h-6 rounded-full transition-all duration-300 ${
                    activeSection === translatedLabel
                      ? 'bg-emerald-600 animate-pulse'
                      : 'bg-transparent group-hover:bg-emerald-300'
                  }`} />

                  {/* Icon */}
                  <span className="text-sm">{section.icon}</span>

                  {/* Label */}
                  <span className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === translatedLabel ? 'font-bold' : ''
                  }`}>
                    {translatedLabel}
                  </span>

                  {/* Current indicator dot */}
                  {activeSection === translatedLabel && (
                    <div className="ml-auto w-2 h-2 bg-emerald-600 rounded-full animate-ping" />
                  )}
                </button>
              );
            })}
          </div>


        </div>
      </div>

      {/* Mobile Version - Sticky Under Navbar */}
      <div className={`fixed top-28 left-0 right-0 cursor-pointer z-[90] lg:hidden bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-lg ${className || ''}`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">


            {/* Horizontal Scrollable Section Buttons */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {sections.map((section) => {
                const translatedLabel = section.labelKey ? t(section.labelKey) : section.fallback;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 text-xs font-medium ${
                      activeSection === translatedLabel
                        ? 'bg-emerald-100 text-emerald-800 shadow-sm'
                        : 'hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                    }`}
                  >
                    {/* Active indicator */}
                    <div className={`w-1 h-4 rounded-full transition-all duration-300 ${
                      activeSection === translatedLabel
                        ? 'bg-emerald-600'
                        : 'bg-transparent'
                    }`} />

                    {/* Icon */}
                    <span className="text-sm">{section.icon}</span>

                    {/* Label - Shortened for mobile */}
                    <span className={`${activeSection === translatedLabel ? 'font-bold' : ''}`}>
                      {translatedLabel}
                    </span>

                    {/* Current indicator */}
                    {activeSection === translatedLabel && (
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}