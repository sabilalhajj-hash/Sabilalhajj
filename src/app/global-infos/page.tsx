'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShieldAlert, CreditCard, CheckCircle, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const dynamic = 'force-dynamic';

const GUIDE_GALLERY_IMAGES = ['/guides/guide-1.jpg', '/guides/guide-2.jpg', '/guides/guide-3.jpg'];

function GuideGallerySwiper() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const { t } = useTranslation();
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  return (
    <div className="relative">
      <Swiper
        onSwiper={setSwiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="guide-swiper rounded-2xl overflow-hidden"
      >
        {GUIDE_GALLERY_IMAGES.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden">
              {imgErrors[i] ? (
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-50">
                  <User className="w-16 h-16 text-emerald-400" />
                </div>
              ) : (
                <Image
                  src={src}
                  alt={t(`pages.global_infos.guide_gallery_alt_${i + 1}`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={() => setImgErrors((p) => ({ ...p, [i]: true }))}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        onClick={() => swiperRef?.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors rtl:left-auto rtl:right-0 rtl:translate-x-2 rtl:-translate-x-0"
        aria-label={t('pages.global_infos.gallery_prev')}
      >
        <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => swiperRef?.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors rtl:right-auto rtl:left-0 rtl:-translate-x-2 rtl:translate-x-0"
        aria-label={t('pages.global_infos.gallery_next')}
      >
        <ChevronRight className="w-5 h-5 rtl:rotate-180" />
      </button>
    </div>
  );
}

export default function GlobalInfosPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [guideProfileImgError, setGuideProfileImgError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse h-10 bg-slate-200 rounded w-1/3 mb-6" />
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 rounded" />
            <div className="h-4 bg-slate-200 rounded" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-8">
          {t('pages.global_infos.title')}
        </h1>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Tourist guide – featured (image 1 style) */}
          <section className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div className="shrink-0">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-slate-100 ring-4 ring-emerald-100">
                  {guideProfileImgError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-emerald-50">
                      <User className="w-16 h-16 text-emerald-400" />
                    </div>
                  ) : (
                    <Image
                      src="/guides/guide-1.jpg"
                      alt={t('pages.global_infos.guide_name')}
                      fill
                      className="object-cover"
                      sizes="160px"
                      priority
                      onError={() => setGuideProfileImgError(true)}
                    />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                  {t('pages.global_infos.guide_name')}
                </h2>
                <p className="text-emerald-700 font-medium text-sm sm:text-base mb-4">
                  {t('pages.global_infos.guide_badge')}
                </p>
                <div className="h-1 w-16 bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {t('pages.global_infos.guide_section_guidance_title')}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('pages.global_infos.guide_section_guidance_para')}
                </p>
                <p className="text-slate-600 leading-relaxed mt-3">
                  {t('pages.global_infos.guide_section_guidance_para2')}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {t('pages.global_infos.guide_section_role_title')}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t('pages.global_infos.guide_section_role_para')}
                </p>
                <ul className="space-y-2 text-slate-600">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{t(`pages.global_infos.guide_role_item_${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  {t('pages.global_infos.guide_section_why_title')}
                </h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{t(`pages.global_infos.guide_why_item_${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {t('pages.global_infos.guide_section_platform_title')}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('pages.global_infos.guide_section_platform_para')}
                </p>
              </div>
            </div>

            {/* Guide Gallery – Swiper */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 text-center mb-6">
                {t('pages.global_infos.guide_gallery_title')}
              </h3>
              <GuideGallerySwiper />
            </div>
          </section>

          {/* Payment methods & refund policy (image 2 style) */}
          <section className="border-t border-slate-200 p-6 sm:p-8 lg:p-10 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-6 h-6 text-emerald-600 shrink-0" />
              <h2 className="text-2xl font-bold text-slate-900">
                {t('pages.global_infos.payment_refund_title')}
              </h2>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {t('pages.global_infos.payment_methods_heading')}
                </h3>
                <ul className="space-y-2 text-slate-700">
                  {['bank_transfer', 'bank_card', 'paypal', 'wafacash', 'cash_agency'].map((key) => (
                    <li key={key} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{t(`pages.global_infos.payment_${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {t('pages.global_infos.cancellation_refund_heading')}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">
                      {t('pages.global_infos.refund_conditions_heading')}
                    </h4>
                    <ul className="space-y-1 text-slate-700 text-sm">
                      {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500">•</span>
                          <span>{t(`pages.global_infos.refund_condition_${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">
                      {t('pages.global_infos.refund_calculation_heading')}
                    </h4>
                    <ul className="space-y-1 text-slate-700 text-sm">
                      {[1, 2, 3, 4].map((i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500">•</span>
                          <span>{t(`pages.global_infos.refund_calculation_${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">
                      {t('pages.global_infos.refund_processing_heading')}
                    </h4>
                    <p className="text-slate-700 text-sm">
                      {t('pages.global_infos.refund_processing_text')}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {t('pages.global_infos.important_notes_heading')}
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{t(`pages.global_infos.important_note_${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Policies & disclaimer */}
          <section className="bg-amber-50/80 p-6 sm:p-8 border-t border-amber-200 border-s-4 border-s-amber-500">
            <div className="flex items-center gap-2 mb-4 text-amber-800">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h2 className="text-xl font-semibold">
                {t('pages.global_infos.policies_title')}
              </h2>
            </div>
            <ul className="space-y-3 text-slate-700 leading-relaxed">
              {['policy_1', 'policy_2', 'policy_3'].map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t(`pages.global_infos.${key}`)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
