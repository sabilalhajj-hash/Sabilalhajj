'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const galleryImages = [
  { id: 1, src: '/hajj1.jpg', alt: 'Al-Masjid An-Nabawi', className: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: '/hajj2.jpg', alt: 'Holy Kaaba Makkah', className: 'md:col-span-1 md:row-span-1' },
  { id: 3, src: '/hajj3.jpg', alt: 'Mount Arafat', className: 'md:col-span-1 md:row-span-1' },
  { id: 4, src: '/hajj4.jpg', alt: 'Mina Tents', className: 'md:col-span-1 md:row-span-2' },
  { id: 5, src: '/hajj1.jpg', alt: 'Pilgrims praying', className: 'md:col-span-1 md:row-span-1' },
];

export default function BentoGallery() {
  const { t } = useTranslation();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-[#1B3C33] tracking-tight">{t('gallery.title')}</h2>
        <p className="text-slate-500 mt-2">{t('gallery.subtitle')}</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImg(image.src)}
            className={`relative group overflow-hidden rounded-[2rem] cursor-pointer bg-slate-100 ${image.className}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
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

      {/* Lightbox Modal */}
      {selectedImg && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedImg(null)}
            className="absolute top-10 right-10 text-white/70 hover:text-white transition-colors"
          >
            <X size={40} />
          </button>
          
          <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
            <Image
              src={selectedImg}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}