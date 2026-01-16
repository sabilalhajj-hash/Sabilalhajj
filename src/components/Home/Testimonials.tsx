'use client';

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Star, ChevronDown, Plus, Minus } from 'lucide-react';

export default function Testimonials() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const testimonialData = useMemo(() => [
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
      name: t('testimonials.name3', 'Mouad'),
      location: t('testimonials.location3', 'Italy'),
      text: t('testimonials.text3', 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.')
    }
  ], [t]);

  const commonQuestions = useMemo(() => [
    {
      q: t('testimonials.questions.secure_booking'),
      a: t('testimonials.questions.secure_booking_answer')
    },
    {
      q: t('testimonials.questions.support_247'),
      a: t('testimonials.questions.support_247_answer')
    },
    {
      q: t('testimonials.questions.customize_package'),
      a: t('testimonials.questions.customize_package_answer')
    }
  ], [t]);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto border-t border-gray-50">
      {/* Testimonials Grid */}
      <div className="text-center mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('testimonials.title')}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {t('testimonials.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
        {testimonialData.map((t, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-6 text-left">
              <div className="bg-gray-100 p-4 rounded-full">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{t.name}</h4>
                <p className="text-gray-400 text-sm">{t.location}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed italic text-sm">"{t.text}"</p>
          </div>
        ))}
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