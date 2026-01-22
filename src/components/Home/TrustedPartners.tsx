'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface Partner {
  name: string;
  logo: string;
  alt: string;
}

export default function TrustedPartners() {
  const { t } = useTranslation();

  // Partner logos - add actual logo images to /public/partners/ folder
  const partners: Partner[] = [
    { name: 'flynas', logo: '/partners/flynas.png', alt: 'flynas' },
    { name: 'Saudia', logo: '/partners/Logo_of_Saudia.svg', alt: 'Saudia' },
    { name: 'THE INTL FAIR AND MUSEUM', logo: '/partners/meseum.png', alt: 'THE INTL FAIR AND MUSEUM' },
    { name: 'WebBeds', logo: '/partners/webbeds.png', alt: 'WebBeds' },
    { name: 'Royal Air Maroc', logo: '/partners/royalairmaroc.png', alt: 'Royal Air Maroc' },
    { name: 'nusuk', logo: '/partners/nusuk.png', alt: 'nusuk' },
    { name: 'train', logo: '/partners/9itar.png', alt: '9ITAR' },
    { name: 'accor', logo: '/partners/accor.png', alt: 'accor' }
  ];

  return (
    <section className="bg-white w-full py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('trustedPartners.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('trustedPartners.subtitle')}
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={1}
          slidesPerView={2}
          loop={true}
          speed={9000}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          className="partners-swiper"
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center  p-4 rounded-lg  w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  width={250}
                  height={250}
                  className="object-contain max-h-50 w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
