'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Star, Calendar, Info } from 'lucide-react';
import Image from 'next/image';
interface ItineraryItemProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  badge?: string;
}

const ItineraryItem = ({ title, subtitle, description, imageSrc, badge }: ItineraryItemProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 border-b border-gray-100 last:border-0">
      <div className="w-full lg:w-1/3">
        <div className="relative rounded-xl overflow-hidden shadow-sm ">
          <Image className="" src={imageSrc} alt={title} width={100} height={100} />

          {badge && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {badge}
            </div>
          )}
        </div>
      </div>
      <div className="w-full lg:w-2/3 space-y-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-emerald-900">{title}</h3>
          {subtitle && <p className="text-emerald-700 font-medium text-sm sm:text-base italic">{subtitle}</p>}
        </div>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};

const MadinahItinerary = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait for component to mount (client-side only) to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full w-full mx-auto my-5 bg-white shadow-lg rounded-2xl overflow-hidden my-8 font-sans">
        <div className="bg-emerald-50 py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center border-b border-emerald-100">
          <h1 className="text-emerald-800 font-bold flex items-center gap-2 text-lg sm:text-xl">Loading...</h1>
        </div>
      </div>
    );
  }

  const madinahLandmarks = [
    {
      title: t('itinerary.madinah_masjid'),
      description: t('itinerary.madinah_masjid_desc'),
      imageSrc: "/hajj1.jpg",
      badge: "1/5"
    },
    {
      title: t('itinerary.quba_mosque'),
      subtitle: t('itinerary.first_mosque'),
      description: t('itinerary.quba_mosque_desc'),
      imageSrc: "/hajj1.jpg",
      badge: "1/4"
    },
    {
      title: t('itinerary.qiblatain_mosque'),
      subtitle: t('itinerary.two_qiblahs'),
      description: t('itinerary.qiblatain_desc'),
      imageSrc: "/hajj1.jpg",
      badge: "1/4"
    }
  ];

  const makkahLandmarks = [
    {
      title: t('itinerary.sacred_mosque'),
      subtitle: t('itinerary.holy_kaaba'),
      description: t('itinerary.sacred_mosque_desc'),
      imageSrc: "/hajj2.jpg",
      badge: "Days 5-9"
    },
    {
      title: t('itinerary.mount_arafat'),
      subtitle: t('itinerary.day_of_arafah'),
      description: t('itinerary.mount_arafat_desc'),
      imageSrc: "/hajj3.jpg",
      badge: "Day 8"
    },
    {
      title: t('itinerary.mina_valley'),
      subtitle: t('itinerary.stoning_devil'),
      description: t('itinerary.mina_valley_desc'),
      imageSrc: "/hajj4.jpg",
      badge: "Days 7 & 9"
    },
    {
      title: t('itinerary.cave_of_hira'),
      subtitle: t('itinerary.first_revelation'),
      description: t('itinerary.cave_of_hira_desc'),
      imageSrc: "/hajj1.jpg",
      badge: "Day 6"
    },
    {
      title: t('itinerary.mount_noor'),
      subtitle: t('itinerary.home_to_cave'),
      description: t('itinerary.mount_noor_desc'),
      imageSrc: "/hajj2.jpg",
      badge: "Day 6"
    }
  ];

  return (
    <div className="w-full w-full mx-auto my-5 bg-white shadow-lg rounded-2xl overflow-hidden my-8 font-sans">

      {/* Medinah Itinerary */}

      {/* Header */}
      <div className="bg-emerald-50 py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center border-b border-emerald-100">
        <h1 className="text-emerald-800 font-bold flex items-center gap-2 text-lg sm:text-xl">
          <Calendar size={20} /> {t('itinerary.madinah_header')}
        </h1>
      </div>

      {/* Accommodation Section */}
      <section className="p-4 sm:p-6 lg:p-8 bg-slate-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-emerald-800 font-bold text-lg sm:text-xl mb-1">{t('itinerary.your_accommodation')}</h2>
          <p className="text-emerald-600 text-xs sm:text-sm mb-4 sm:mb-6">{t('itinerary.included_in_package')}</p>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="w-full lg:w-1/3">
              <img src="https://via.placeholder.com/400x300/10b981/ffffff?text=Hotel" alt="Hotel" className="rounded-lg object-cover w-full h-40 sm:h-48 lg:h-56" />
            </div>
            <div className="w-full lg:w-2/3">
              <div className="flex text-yellow-400 mb-2"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
              <h3 className="font-bold text-emerald-900 text-lg sm:text-xl mb-2">Central Area Hotel — Near Al-Masjid An-Nabawi</h3>
              <div className="flex items-center gap-1 text-emerald-700 text-xs sm:text-sm font-bold mb-3">
                <MapPin size={14} /> Location
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Located inside the Central Area of Madinah, about a 7-minute walk from Al-Masjid An-Nabawi.
                Provides practical proximity and easy access to the Haram throughout your stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="py-4 sm:py-6 text-center">
            <h2 className="text-emerald-900 text-xl sm:text-2xl lg:text-3xl font-bold">Your Program in Madinah</h2>
            <p className="text-emerald-600 text-sm sm:text-base mt-2 font-medium">Comprehensive spiritual journey with guided visits to holy sites</p>
          </div>

          {madinahLandmarks.map((item, index) => (
            <ItineraryItem key={index} {...item}/>
          ))}
        </div>
      </section>

      {/* Makkah Itinerary */}

      {/* Header */}
      <div className="bg-emerald-50 py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center border-b border-emerald-100">
        <h1 className="text-emerald-800 font-bold flex items-center gap-2 text-lg sm:text-xl">
          <Calendar size={20} /> {t('itinerary.makkah_header')}
        </h1>
      </div>

      {/* Accommodation Section */}
      <section className="p-4 sm:p-6 lg:p-8 bg-slate-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-emerald-800 font-bold text-lg sm:text-xl mb-1">{t('itinerary.your_accommodation_makkah')}</h2>
          <p className="text-emerald-600 text-xs sm:text-sm mb-4 sm:mb-6">{t('itinerary.premium_hotels_haram')}</p>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="w-full lg:w-1/3">
              <img src="https://via.placeholder.com/400x300/10b981/ffffff?text=Hotel" alt="Hotel" className="rounded-lg object-cover w-full h-40 sm:h-48 lg:h-56" />
            </div>
            <div className="w-full lg:w-2/3">
              <div className="flex text-yellow-400 mb-2">
                <Star size={16} fill="currentColor"/>
                <Star size={16} fill="currentColor"/>
                <Star size={16} fill="currentColor"/>
                <Star size={16} fill="currentColor"/>
                <Star size={16} fill="currentColor"/>
              </div>
              <h3 className="font-bold text-emerald-900 text-lg sm:text-xl mb-2">{t('itinerary.haram_district_hotel')}</h3>
              <div className="flex items-center gap-1 text-emerald-700 text-xs sm:text-sm font-bold mb-3">
                <MapPin size={14} /> {t('itinerary.location')}
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {t('itinerary.haram_district_desc')}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {t('itinerary.kaaba_view_available')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {t('itinerary.haram_access_247')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {t('itinerary.prayer_call_notification')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {t('itinerary.zamzam_water_service')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
            <div className="py-4 sm:py-6 text-center">
              <h2 className="text-emerald-900 text-xl sm:text-2xl lg:text-3xl font-bold">{t('itinerary.your_program_makkah')}</h2>
              <p className="text-emerald-600 text-sm sm:text-base mt-2 font-medium">{t('itinerary.sacred_journey')}</p>
            </div>

          {/* Itinerary Section */}
          {makkahLandmarks.map((item, index) => (
            <ItineraryItem key={index} {...item}/>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MadinahItinerary;