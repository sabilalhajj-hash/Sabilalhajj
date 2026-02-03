'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const FALLBACK_SLIDES = [
  { title: 'Welcome to Sabil Al-Hajj', subtitle: 'Your trusted partner for Hajj and Umrah pilgrimage services. Experience a spiritual journey filled with peace, devotion, and unforgettable memories.', image: '/hajj1.jpg', ctaPrimary: 'Book Your Pilgrimage', ctaSecondary: 'Learn More' },
  { title: 'Experience Sacred Hajj', subtitle: 'Embark on the most sacred pilgrimage with our expert guidance. Every step of your journey is carefully planned for spiritual fulfillment.', image: '/hajj2.jpg', ctaPrimary: 'Plan Hajj Journey', ctaSecondary: 'View Packages' },
  { title: 'Discover Umrah Blessings', subtitle: 'Find inner peace through Umrah pilgrimage. Our comprehensive services ensure a meaningful and comfortable spiritual experience.', image: '/hajj3.jpg', ctaPrimary: 'Book Umrah Now', ctaSecondary: 'Explore Options' },
  { title: 'Premium Accommodations', subtitle: 'Stay in the most convenient and comfortable accommodations near the Holy Sites. Luxury meets spirituality in our premium hotels.', image: '/hajj4.jpg', ctaPrimary: 'View Hotels', ctaSecondary: 'Check Availability' },
];

export default function Hero() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroSlides = useMemo(() => {
    if (!mounted) return FALLBACK_SLIDES;
    const slides = t('hero.slides', { returnObjects: true }) as any[];
    if (!Array.isArray(slides)) return FALLBACK_SLIDES;
    return slides.map((slide: any, index: number) => ({
      title: slide.title,
      subtitle: slide.subtitle,
      image: `/hajj${index + 1}.jpg`,
      ctaPrimary: slide.ctaPrimary,
      ctaSecondary: slide.ctaSecondary
    }));
  }, [mounted, t]);

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        speed={2000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        //   dynamicBullets: true,
        // }}
        // navigation={true}
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
              <div className="absolute inset-0 bg-black opacity-70 bg-opacity-50"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full relative z-10">
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl text-green-400 font-bold mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                      {slide.ctaPrimary}
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors transform hover:scale-105">
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