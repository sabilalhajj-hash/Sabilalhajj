'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Star, ChevronDown, Plus, Minus } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Testimonials() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // All hooks must be called before any conditional returns
  const testimonialData = useMemo((): Array<{ name: string; location: string; text: string }> => {
    return [
    {
      name: t('testimonials.name1', 'Mouad'),
      location: t('testimonials.location1', 'Italy'),
      text: t('testimonials.text1', 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.')
    },
    {
      name: t('testimonials.name2', 'Mouad'),
      location: t('testimonials.location2', 'Italy'),
      text: t('testimonials.text2', 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.')
    },
    {
      name: t('testimonials.name2', 'Mouad'),
      location: t('testimonials.location2', 'Italy'),
      text: t('testimonials.text2', 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.')
    },
    {
      name: t('testimonials.name2', 'Mouad'),
      location: t('testimonials.location2', 'Italy'),
      text: t('testimonials.text2', 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.')
    },
    {
      name: t('testimonials.name2', 'Mouad'),
      location: t('testimonials.location2', 'Italy'),
      text: t('testimonials.text2', 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.')
    },
    {
      name: t('testimonials.name2', 'Mouad'),
      location: t('testimonials.location2', 'Italy'),
      text: t('testimonials.text2', 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.')
    },
    {
      name: t('testimonials.name3', 'Mouad'),
      location: t('testimonials.location3', 'Italy'),
      text: t('testimonials.text3', 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.')
    }
    ];
  }, [mounted, t]);

  const commonQuestions = useMemo((): Array<{ q: string; a: string }> => {
    return [
    {
      q: t('testimonials.questions.customize_package'),
      a: t('testimonials.questions.customize_package_answer')
    },
    {
      q: t('testimonials.questions.required_documents'),
      a: t('testimonials.questions.required_documents_answer')
    },
    {
      q: t('testimonials.questions.first_time_guidance'),
      a: t('testimonials.questions.first_time_guidance_answer')
    },
    {
      q: t('testimonials.questions.health_safety'),
      a: t('testimonials.questions.health_safety_answer')
    },
    {
      q: t('testimonials.questions.visa_processing_time'),
      a: t('testimonials.questions.visa_processing_time_answer')
    },
    {
      q: t('testimonials.questions.form_assistance'),
      a: t('testimonials.questions.form_assistance_answer')
    },
    {
      q: t('testimonials.questions.package_includes'),
      a: t('testimonials.questions.package_includes_answer')
    },
    {
      q: t('testimonials.questions.room_type'),
      a: t('testimonials.questions.room_type_answer')
    },
    {
      q: t('testimonials.questions.elderly_suitable'),
      a: t('testimonials.questions.elderly_suitable_answer')
    }
    ];
  }, [mounted, t]);

  // Wait for component to mount (client-side only) to avoid hydration mismatch
  if (!mounted) {
    return (
      <section className="py-24 px-4 w-full mx-auto border-t border-gray-50">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('Loading...')}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 w-full mx-auto border-t border-gray-50">
      {/* Testimonials Grid */}
      <div className="text-center mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('testimonials.title')}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {t('testimonials.subtitle')}
        </p>
      </div>

      <div className="mb-24 ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          speed={5000}
          // navigation={true}
          // pagination={{
          //   clickable: true,
          //   dynamicBullets: true,
          // }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          loop={true}
          className="testimonials-swiper"
        >
          {testimonialData.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col border-2 border-green-400 rounded-4xl shadow-lg items-center text-center h-full px-4 py-8">
                <div className="flex items-center gap-4 mb-6 text-left w-full">
                  <div className="bg-gray-100 p-4 rounded-full flex-shrink-0">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <p className="text-gray-400 text-sm">{t.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed italic text-sm">"{t.text}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Common Q&A Block Replacement */}
      <div className="max-w-3xl mx-auto mt-16 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{t('testimonials.common_questions')}</h3>
        <div className="space-y-4">
          {commonQuestions.map((item, index) => (
            <div key={index} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left py-2 hover:text-emerald-600 transition-colors"
              >
                <span className="font-semibold text-gray-800 text-sm">{item.q}</span>
                {openIndex === index ? (
                  <Minus className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="mt-2 text-sm text-gray-500 leading-relaxed animate-in fade-in slide-in-from-top-1">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}