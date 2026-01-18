'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Star } from 'lucide-react';

interface ItineraryItem {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  badge?: string;
}

interface ItinerarySectionProps {
  title: string;
  subtitle: string;
  accommodationTitle: string;
  accommodationSubtitle: string;
  hotelName: string;
  hotelLocation: string;
  hotelDescription: string;
  hotelImage: string;
  hotelStars: number;
  hotelFeatures?: string[];
  items: ItineraryItem[];
  headerColor?: string;
}

const ItineraryItemComponent = ({ title, subtitle, description, imageSrc, badge }: ItineraryItem) => (
  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 border-b border-gray-100 last:border-0">
    <div className="w-full lg:w-1/3">
      <div className="relative rounded-xl overflow-hidden shadow-sm">
        <Image className="w-full h-48 object-cover" src={imageSrc} alt={title} width={400} height={200} />
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

export default function ItinerarySection({
  title,
  subtitle,
  accommodationTitle,
  accommodationSubtitle,
  hotelName,
  hotelLocation,
  hotelDescription,
  hotelImage,
  hotelStars,
  hotelFeatures = [],
  items,
  headerColor = 'emerald',
}: ItinerarySectionProps) {
  const { t } = useTranslation();
  const colorClasses = {
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-800',
    blue: 'bg-blue-50 border-blue-100 text-blue-800',
  };

  return (
    <>
      {/* Header */}
      <div className={`${colorClasses[headerColor as keyof typeof colorClasses] || colorClasses.emerald} py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center border-b`}>
        <h1 className={`font-bold flex items-center gap-2 text-lg sm:text-xl`}>
          <Calendar size={20} /> {title}
        </h1>
      </div>

      {/* Accommodation Section */}
      <section className="p-4 sm:p-6 lg:p-8 bg-slate-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-emerald-800 font-bold text-lg sm:text-xl mb-1">{accommodationTitle}</h2>
          <p className="text-emerald-600 text-xs sm:text-sm mb-4 sm:mb-6">{accommodationSubtitle}</p>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="w-full lg:w-1/3">
              <img src={hotelImage} alt="Hotel" className="rounded-lg object-cover w-full h-40 sm:h-48 lg:h-56" />
            </div>
            <div className="w-full lg:w-2/3">
              <div className="flex text-yellow-400 mb-2">
                {Array.from({ length: hotelStars }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <h3 className="font-bold text-emerald-900 text-lg sm:text-xl mb-2">{hotelName}</h3>
              <div className="flex items-center gap-1 text-emerald-700 text-xs sm:text-sm font-bold mb-3">
                <MapPin size={14} /> {hotelLocation}
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{hotelDescription}</p>
              {hotelFeatures.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-600">
                  {hotelFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="py-4 sm:py-6 text-center">
            <h2 className="text-emerald-900 text-xl sm:text-2xl lg:text-3xl font-bold">{subtitle}</h2>
            <p className="text-emerald-600 text-sm sm:text-base mt-2 font-medium">{t('itinerary.spiritual_journey')}</p>
          </div>

          {items.map((item, index) => (
            <ItineraryItemComponent key={index} {...item} />
          ))}
        </div>
      </section>
    </>
  );
}
