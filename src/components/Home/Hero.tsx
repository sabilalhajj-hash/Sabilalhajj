'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Hero() {
  const { t } = useTranslation();
  const heroSlides = [
    {
      title: t('hero.title1'),
      subtitle: t('hero.subtitle1'),
      // bgClass: "bg-gradient-to-r from-blue-600 to-green-600",
      image: "/hajj1.jpg",
      ctaPrimary: t('hero.cta1_primary'),
      ctaSecondary: t('hero.cta1_secondary')
    },
    {
      title: t('hero.title2'),
      subtitle: t('hero.subtitle2'),
      // bgClass: "bg-gradient-to-r from-emerald-600 to-teal-600",
      image: "/hajj2.jpg",
      ctaPrimary: t('hero.cta2_primary'),
      ctaSecondary: t('hero.cta2_secondary')
    },
    {
      title: t('hero.title3'),
      subtitle: t('hero.subtitle3'),
      // bgClass: "bg-gradient-to-r from-purple-600 to-indigo-600",
      image: "/hajj3.jpg",
      ctaPrimary: t('hero.cta3_primary'),
      ctaSecondary: t('hero.cta3_secondary')
    },
    {
      title: t('hero.title4'),
      subtitle: t('hero.subtitle4'),
      // bgClass: "bg-gradient-to-r from-amber-600 to-orange-600",
      image: "/hajj4.jpg",
      ctaPrimary: t('hero.cta4_primary'),
      ctaSecondary: t('hero.cta4_secondary')
    }
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="hero-swiper h-[70vh]"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={` z-100 text-white min-h-[70vh] flex items-center relative overflow-hidden`}>
              {slide.image && (
                <Image
                  src={slide.image}
                  alt={`Hero slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              )}
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black opacity-50 bg-opacity-50"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full relative z-10">
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                      {slide.ctaPrimary}
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors transform hover:scale-105">
                      {slide.ctaSecondary}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for swiper */}
      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 30px !important;
        }

        .hero-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.7) !important;
          width: 12px !important;
          height: 12px !important;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          background: white !important;
        }

        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white !important;
          background: rgba(255, 255, 255, 0.1) !important;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50% !important;
          backdrop-filter: blur(10px) !important;
        }

        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2) !important;
        }

        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 18px !important;
          font-weight: bold !important;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-delay-2 {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in-delay-2 1s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}