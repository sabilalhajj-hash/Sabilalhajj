'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Compass, Star, ArrowRight } from 'lucide-react';
import StickyCTA from '@/components/Umrah/StickyCTA';

export const dynamic = 'force-dynamic';

const WHATSAPP_HAJJ_URL = 'https://wa.me/2120606420326?text=Hello!%20I%20would%20like%20to%20book%20a%20hajj%20service.';
const WHATSAPP_HAJJ_MESSAGE = 'Hello! I would like to book a Hajj service.';

export default function Hajj() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  const hajjProgram = {
    name: t('pages.hajj.title'),
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50/80 to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-32 h-32 rounded-2xl bg-emerald-100 animate-pulse" />
            <div className="space-y-2">
              <div className="h-8 w-48 bg-gray-200 rounded-full animate-pulse mx-auto" />
              <div className="h-4 w-72 bg-gray-100 rounded animate-pulse mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-80/80 via-white to-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background image with fade effect */}
        <div className="absolute inset-0">
          <Image
            src="/hajj1.jpg"
            alt="Background"
            fill
            className="object-cover"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
            }}
            priority
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg shadow-emerald-900/5 border border-emerald-100/80 p-4 mb-8">
            <Image
              src="/sabilalhajj-slogen-removebg.png"
              alt="Sabil Al-Hajj"
              width={220}
              height={180}
              className="object-contain w-[180px] sm:w-[220px] h-auto"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            {t('pages.hajj.title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('pages.hajj.subtitle')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Intro card */}
          <article className="bg-white/50  rounded-2xl shadow-xl shadow-gray-200/50 border-3 border-green-600 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600">
                  <Star className="w-5 h-5" strokeWidth={2} />
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {t('pages.hajj.title0')}
                </h2>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {t('pages.hajj.description0')}
              </p>
            </div>
          </article>
          <article className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600">
                  <Star className="w-5 h-5" strokeWidth={2} />
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {t('pages.hajj.title')}
                </h2>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {t('pages.hajj.description1')}
              </p>
            </div>
          </article>

          {/* Services card */}
          <article className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600">
                  <Compass className="w-5 h-5" strokeWidth={2} />
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {t('services.hajj.title')}
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {t('pages.hajj.description2')}
              </p>
            </div>
          </article>

          {/* CTA callout */}
          <div className="relative rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 sm:p-10 shadow-xl shadow-emerald-900/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <p className="text-base sm:text-lg text-emerald-50 leading-relaxed max-w-2xl">
                {t('pages.hajj.description3')}
              </p>
            </div>
          </div>

          {/* Book Now CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={WHATSAPP_HAJJ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t('common.book_now_via_whatsapp')}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={"https://hajj.nusuk.sa/"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t('common.book_now_via_nusuk')}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <StickyCTA
        selectedProgram={hajjProgram}
        whatsappUrl={WHATSAPP_HAJJ_URL}
        whatsappMessage={WHATSAPP_HAJJ_MESSAGE}
        alwaysVisible
        showNusukButton
      />
    </div>
  );
}
