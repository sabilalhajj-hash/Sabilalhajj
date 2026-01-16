// components/WhyChooseUs.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, HeartHandshake, Headset, Star, UserCheck } from 'lucide-react';
import Image from 'next/image';

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      title: t('whyChooseUs.features.secure_trusted.title'),
      description: t('whyChooseUs.features.secure_trusted.description')
    },
    {
      icon: <Zap className="w-6 h-6 text-green-600" />,
      title: t('whyChooseUs.features.fast_processing.title'),
      description: t('whyChooseUs.features.fast_processing.description')
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-green-600" />,
      title: t('whyChooseUs.features.support_journey.title'),
      description: t('whyChooseUs.features.support_journey.description')
    },
    {
      icon: <Headset className="w-6 h-6 text-green-600" />,
      title: t('whyChooseUs.features.support_247.title'),
      description: t('whyChooseUs.features.support_247.description')
    },
    {
      icon: <Star className="w-6 h-6 text-green-600" />,
      title: t('whyChooseUs.features.premium_quality.title'),
      description: t('whyChooseUs.features.premium_quality.description')
    },
    {
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
      title: t('whyChooseUs.features.expert_team.title'),
      description: t('whyChooseUs.features.expert_team.description')
    },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* <h2 className="text-emerald-600 font-medium mb-2 underline decoration-sky-400 underline-offset-8">{t('whyChooseUs.title')}</h2> */}
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('whyChooseUs.title')}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('whyChooseUs.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">{feature.icon}</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('whyChooseUs.trusted_partner_title')}</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('whyChooseUs.trusted_partner_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-12">
            <div>
              <h4 className="text-emerald-700 font-bold text-xl border-b-2 border-emerald-700 inline-block">{t('whyChooseUs.excellence_title')}</h4>
              <p className="text-gray-500 text-sm mt-4">{t('whyChooseUs.excellence_description')}</p>
            </div>
            <div>
              <h4 className="text-emerald-700 font-bold text-xl border-b-2 border-emerald-700 inline-block">{t('whyChooseUs.guidance_title')}</h4>
              <p className="text-gray-500 text-sm mt-4">{t('whyChooseUs.guidance_description')}</p>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl">
               <Image src="/hajj1.jpg" alt="Kaaba" fill className="object-cover" sizes="256px" />
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h4 className="text-emerald-700 font-bold text-xl border-b-2 border-emerald-700 inline-block">{t('whyChooseUs.certified_title')}</h4>
              <p className="text-gray-500 text-sm mt-4">{t('whyChooseUs.certified_description')}</p>
            </div>
            <div>
              <h4 className="text-emerald-700 font-bold text-xl border-b-2 border-emerald-700 inline-block">{t('whyChooseUs.care_title')}</h4>
              <p className="text-gray-500 text-sm mt-4">{t('whyChooseUs.care_description')}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all">
            {t('whyChooseUs.reserve_button')}
          </button>
        </div>
      </div>
    </section>
  );
}