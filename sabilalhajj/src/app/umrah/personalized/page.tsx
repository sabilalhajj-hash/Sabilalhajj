'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plane, Hotel, FileText, Calendar, Users, Star, CheckCircle, Globe, ChevronDown } from 'lucide-react';

export default function UmrahPersonalized() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [selectedDays, setSelectedDays] = useState({ makka: 7, madina: 5 });

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
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

  const customizationOptions = [
    {
      icon: <Calendar size={20} />,
      title: t('umrah.flexible_duration'),
      description: t('umrah.flexible_desc')
    },
    {
      icon: <Hotel size={20} />,
      title: t('umrah.hotel_selection'),
      description: t('umrah.hotel_desc')
    },
    {
      icon: <Plane size={20} />,
      title: t('umrah.flight_options'),
      description: t('umrah.flight_desc')
    },
    {
      icon: <Users size={20} />,
      title: t('umrah.group_size'),
      description: t('umrah.group_desc')
    }
  ];

  const packages = [
    {
      name: t('umrah.essential_package'),
      duration: "7 Days",
      price: `${t('umrah.starting_from')} $2,500`,
      features: [t('packages.flight'), t('packages.hotels'), t('packages.visa'), t('packages.guide')],
      recommended: false
    },
    {
      name: t('umrah.premium_package'),
      duration: "10 Days",
      price: `${t('umrah.starting_from')} $3,200`,
      features: [t('packages.flight'), t('packages.hotels'), t('packages.visa'), t('packages.guide')],
      recommended: true
    },
    {
      name: t('umrah.luxury_package'),
      duration: "14 Days",
      price: `${t('umrah.starting_from')} $4,500`,
      features: [t('packages.flight'), t('packages.hotels'), t('packages.visa'), t('packages.guide')],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Language Selector */}
          <div className="absolute top-6 right-6 z-10">
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-colors text-white"
              >
                <Globe size={18} />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === i18n.language)?.flag}
                </span>
                <span className="hidden sm:block text-sm">
                  {languages.find(lang => lang.code === i18n.language)?.name}
                </span>
                <ChevronDown size={16} className={`transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown */}
              <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50 ${isLanguageOpen ? 'block' : 'hidden'}`}>
                <div className="py-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      className={`flex items-center w-full px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                        i18n.language === language.code ? 'bg-amber-50 text-amber-700' : 'text-slate-700'
                      }`}
                    >
                      <span className="text-lg mr-3">{language.flag}</span>
                      <span>{language.name}</span>
                      {i18n.language === language.code && (
                        <CheckCircle size={16} className="ml-auto text-amber-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.back()}
            className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Umrah Plans
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('umrah.customize_title')}</h1>
          <p className="text-xl text-amber-100 max-w-3xl">
            {t('umrah.customize_subtitle')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Customization Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {customizationOptions.map((option, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
              <div className="text-amber-600 mb-4 flex justify-center">{option.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600 text-sm">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Duration Selector */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('umrah.customize_duration')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('umrah.days_makka')}</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => setSelectedDays(prev => ({ ...prev, makka: Math.max(3, prev.makka - 1) }))}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-amber-600">{selectedDays.makka}</span>
                <button
                  onClick={() => setSelectedDays(prev => ({ ...prev, makka: Math.min(21, prev.makka + 1) }))}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <p className="text-gray-600">Days: {selectedDays.makka}</p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('umrah.days_madina')}</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => setSelectedDays(prev => ({ ...prev, madina: Math.max(3, prev.madina - 1) }))}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-amber-600">{selectedDays.madina}</span>
                <button
                  onClick={() => setSelectedDays(prev => ({ ...prev, madina: Math.min(14, prev.madina + 1) }))}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <p className="text-gray-600">Days: {selectedDays.madina}</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              {t('umrah.total_duration')}: <span className="font-bold text-amber-600">{selectedDays.makka + selectedDays.madina} days</span>
            </p>
          </div>
        </div>

        {/* Package Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('umrah.choose_package')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white p-8 rounded-2xl shadow-xl border-2 transition-all duration-300 ${
                  pkg.recommended ? 'border-amber-400 transform scale-105' : 'border-gray-100 hover:border-amber-300'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-amber-400 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                      <Star size={14} className="mr-1" />
                      Recommended
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-amber-600 font-semibold">{pkg.duration}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{pkg.price}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-lg font-bold transition-colors ${
                  pkg.recommended
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}>
                  {t('umrah.select_package')}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('umrah.customize_title')}</h3>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              {t('umrah.customize_subtitle')}
            </p>
            <button className="bg-white text-amber-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              {t('umrah.start_planning')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}