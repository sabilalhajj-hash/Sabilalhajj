'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Services() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // All hooks must be called before any conditional returns
  const services = useMemo(() => [
    {
      icon: '🕋',
      title: t('services.hajj.title'),
      description: t('services.hajj.description')
    },
    {
      icon: '🌙',
      title: t('services.umrah.title'),
      description: t('services.umrah.description')
    },
    {
      icon: '🌙',
      title: t('services.umrah.title'),
      description: t('services.umrah.description')
    },
    {
      icon: '🌙',
      title: t('services.umrah.title'),
      description: t('services.umrah.description')
    },
    {
      icon: '🌙',
      title: t('services.umrah.title'),
      description: t('services.umrah.description')
    },
    {
      icon: '🌙',
      title: t('services.umrah.title'),
      description: t('services.umrah.description')
    },
    {
      icon: '✈️',
      title: t('services.transportation.title'),
      description: t('services.transportation.description')
    }
  ], [mounted, t]);

  // Wait for component to mount (client-side only) to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('Loading...')}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t('services.title')}
        </h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        
          className="pb-12"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className=" text-center p-6 border-2 border-green-600  bg-white neon-glow rounded-lg md:rounded-4xl shadow-lg h-full">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}