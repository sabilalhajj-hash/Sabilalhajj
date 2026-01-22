'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Building2,
  Plane,
  Hotel,
  FileText,
  UserCircle,
} from 'lucide-react';

const SERVICE_KEYS = [
  { key: 'packages.umrah_packages', icon: Calendar, path: '/umrah' },
  { key: 'packages.hajj', icon: Building2, path: '/hajj' },
  { key: 'packages.flight_booking', icon: Plane, path: '/flights' },
  { key: 'packages.hotel_booking', icon: Hotel, path: '/hotels' },
  { key: 'packages.visa_services', icon: FileText, path: '/visa' },
  { key: 'packages.personalized_umrah', icon: UserCircle, path: '/umrah/personalized' },
] as const;

const FALLBACK_NAMES: Record<string, string> = {
  'packages.umrah_packages': 'Umrah Packages',
  'packages.hajj': 'Hajj',
  'packages.flight_booking': 'Flight Booking',
  'packages.hotel_booking': 'Hotel Booking',
  'packages.visa_services': 'Visa Services',
  'packages.personalized_umrah': 'Personalized Umrah',
};

export default function ServiceCards() {
  const { t } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = useMemo(() => {
    return SERVICE_KEYS.map(({ key, icon, path }) => ({
      name: mounted ? t(key) : FALLBACK_NAMES[key],
      icon,
      path,
    }));
  }, [mounted, t]);

  return (
    <section className="bg-white py-5 px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 lg:flex-nowrap">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                onClick={() => router.push(service.path)}
                className="flex flex-col   items-center justify-center w-[140px] md:w-[160px] h-[140px] md:h-[160px] bg-white rounded-3xl border border-green-600 hover:border-green-400 hover:shadow-md transition-all duration-300 cursor-pointer group flex-shrink-0"
              >
                <div className="mb-3 text-green-700 group-hover:text-green-700 group-hover:scale-110  transition-all">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                </div>
                <span className="text-sm md:text-base font-medium text-gray-700 group-hover:text-gray-900 text-center px-2 leading-tight">
                  {service.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
