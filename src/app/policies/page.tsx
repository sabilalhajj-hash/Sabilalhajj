'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CheckCircle, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function PoliciesPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-32 h-32 rounded-2xl bg-emerald-100 animate-pulse mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900 mt-4 animate-pulse">{t('Loading...')}</h1>
          </div>
        </div>
      </div>
    );
  }

  const paymentList = t('policies.payment_policy_list', { returnObjects: true }) as string[];
  const visaList = t('policies.visa_refund_list', { returnObjects: true }) as string[];
  const flightList = t('policies.flight_refund_list', { returnObjects: true }) as string[];
  const hotelList = t('policies.hotel_refund_list', { returnObjects: true }) as string[];
  const cancellationList = t('policies.cancellation_processing_list', { returnObjects: true }) as string[];
  const importantTermsList = t('policies.important_terms_list', { returnObjects: true }) as string[];

  const commitmentItems = [
    { key: 'clear_pricing', icon: CheckCircle },
    { key: 'flexible_installments', icon: CheckCircle },
    { key: 'fair_policies', icon: CheckCircle },
    { key: 'transparent_processing', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/sabilalhajj-slogen-removebg.png"
              alt="Sabil Al-Hajj"
              width={200}
              height={120}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-3">
            {t('policies.title')}
          </h1>
          <p className="text-emerald-700 font-semibold mb-2">{t('policies.subtitle')}</p>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('policies.description')}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Payment Policy */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              {t('policies.payment_policy_title')}
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{t('policies.payment_policy_content')}</p>
            <ul className="space-y-3 mb-4">
              {Array.isArray(paymentList) && paymentList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 italic">{t('policies.payment_policy_footer')}</p>
          </section>

          {/* Visa Refund */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-emerald-900 mb-4">{t('policies.visa_refund_title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{t('policies.visa_refund_content')}</p>
            <ul className="space-y-3 mb-4">
              {Array.isArray(visaList) && visaList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 italic">{t('policies.visa_refund_footer')}</p>
          </section>

          {/* Flight Refund */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-emerald-900 mb-4">{t('policies.flight_refund_title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{t('policies.flight_refund_content')}</p>
            <ul className="space-y-3 mb-4">
              {Array.isArray(flightList) && flightList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 italic">{t('policies.flight_refund_footer')}</p>
          </section>

          {/* Hotel Refund */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-emerald-900 mb-4">{t('policies.hotel_refund_title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{t('policies.hotel_refund_content')}</p>
            <ul className="space-y-3 mb-4">
              {Array.isArray(hotelList) && hotelList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 italic">{t('policies.hotel_refund_footer')}</p>
          </section>

          {/* Cancellation Processing */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-emerald-900 mb-4">{t('policies.cancellation_processing_title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{t('policies.cancellation_processing_content')}</p>
            <ul className="space-y-3 mb-4">
              {Array.isArray(cancellationList) && cancellationList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 italic">{t('policies.cancellation_processing_footer')}</p>
          </section>

          {/* Important Terms */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-emerald-900 mb-4">{t('policies.important_terms_title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{t('policies.important_terms_content')}</p>
            <ul className="space-y-3">
              {Array.isArray(importantTermsList) && importantTermsList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Financial Commitment */}
          <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
            <h2 className="text-xl font-bold mb-6">{t('policies.financial_commitment_title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {commitmentItems.map(({ key, icon: Icon }) => (
                <div key={key} className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                  <Icon className="w-6 h-6 text-emerald-200 shrink-0" />
                  <span className="font-medium">{t(`policies.${key}`)}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-emerald-100 text-sm font-medium text-center">
              {t('policies.transparency_slogan')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
