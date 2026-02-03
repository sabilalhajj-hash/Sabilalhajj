'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const galleryImages = [
  { id: 1, src: '/hajj1.jpg', alt: 'Al-Masjid An-Nabawi' },
  { id: 2, src: '/hajj2.jpg', alt: 'Holy Kaaba Makkah' },
  { id: 3, src: '/hajj3.jpg', alt: 'Mount Arafat' },
  { id: 4, src: '/hajj4.jpg', alt: 'Mina Tents' },
  { id: 5, src: '/hajj1.jpg', alt: 'Pilgrims praying' },
];

export default function BentoGallery() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait for component to mount (client-side only) to avoid hydration mismatch
  if (!mounted) {
    return (
      <section className="w-full mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-[#1B3C33] tracking-tight">{t('Loading...')}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-[#1B3C33] tracking-tight">{t('gallery.title')}</h2>
        <p className="text-slate-500 mt-2">{t('gallery.subtitle')}</p>
      </div>

      {/* Mobile Grid Layout (sm and below) */}
     <div className="block md:hidden">
        <div className="grid grid-cols-1 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImg(image.src)}
              className="relative group overflow-hidden rounded-[2rem] cursor-pointer bg-slate-100 h-64"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1000} height={1000}
                className="object-cover w-full h-full fill-object transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                  <Maximize2 className="text-white" size={24} />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-xs font-black uppercase tracking-widest">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Swiper Layout (md and above) */}
      <div className="hidden md:block w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 0,
             disableOnInteraction: false,
          }}
          speed={5000}
          // pagination={{
          //   clickable: true,
          //   dynamicBullets: true,
          // }}
          navigation={true}
          className="pb-12"
        >
          {galleryImages.map((image) => (
            <SwiperSlide key={image.id}>
              <div
                onClick={() => setSelectedImg(image.src)}
                className="relative group overflow-hidden rounded-[2rem] cursor-pointer bg-slate-100 h-80"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  // fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  width={1000} height={1000}
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                    <Maximize2 className="text-white" size={24} />
                  </div>
                </div>

                {/* Caption */}
                <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs font-black uppercase tracking-widest">{image.alt}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedImg(null)}
            className="absolute top-10 right-10 text-white/70 hover:text-white transition-colors"
          >
            <X size={40} />
          </button>
          
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={selectedImg}
              alt="Preview"
              // fill
              width={1000} height={1000}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}