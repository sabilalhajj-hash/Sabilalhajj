'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Calendar, FileText, Plane, Building, AlertCircle, ShieldCheck, Info } from 'lucide-react';

const PolicyPage = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait for component to mount (client-side only) to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full bg-white font-sans text-slate-800 border-t border-gray-100">
        <div className="w-full bg-emerald-50/50 py-6 px-4 md:px-12 border-b border-emerald-100 text-center">
          <h1 className="text-2xl font-bold text-emerald-900">Loading...</h1>
        </div>
      </div>
    );
  }

  const sections = [
    {
      id: 1,
      title: t('policies.payment_policy_title'),
      icon: <CreditCard className="text-emerald-700" size={20} />,
      content: t('policies.payment_policy_content'),
      list: t('policies.payment_policy_list', { returnObjects: true }) as string[],
      footer: t('policies.payment_policy_footer')
    },
    {
      id: 2,
      title: t('policies.visa_refund_title'),
      icon: <FileText className="text-emerald-700" size={20} />,
      content: t('policies.visa_refund_content'),
      list: t('policies.visa_refund_list', { returnObjects: true }) as string[],
      footer: t('policies.visa_refund_footer')
    },
    {
      id: 3,
      title: t('policies.flight_refund_title'),
      icon: <Plane className="text-emerald-700" size={20} />,
      content: t('policies.flight_refund_content'),
      list: t('policies.flight_refund_list', { returnObjects: true }) as string[],
      footer: t('policies.flight_refund_footer')
    },
    {
      id: 4,
      title: t('policies.hotel_refund_title'),
      icon: <Building className="text-emerald-700" size={20} />,
      content: t('policies.hotel_refund_content'),
      list: t('policies.hotel_refund_list', { returnObjects: true }) as string[],
      footer: t('policies.hotel_refund_footer')
    },
    {
      id: 5,
      title: t('policies.cancellation_processing_title'),
      icon: <AlertCircle className="text-emerald-700" size={20} />,
      content: t('policies.cancellation_processing_content'),
      list: t('policies.cancellation_processing_list', { returnObjects: true }) as string[],
      footer: t('policies.cancellation_processing_footer')
    }
  ];

  return (
    <div className="w-full bg-white font-sans text-slate-800 border-t border-gray-100">
      {/* Policy Header */}
      <div className="w-full bg-emerald-50/50 py-6 px-4 md:px-12 border-b border-emerald-100 text-center">
        <h1 className="text-2xl font-bold text-emerald-900">{t('policies.title')}</h1>
        <p className="text-emerald-700 text-sm mt-2 font-medium">{t('policies.subtitle')}</p>
      </div>

      <div className="w-full px-4 md:px-12 py-10 max-w-7xl mx-auto">
        <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-4xl mx-auto">
          {t('policies.description')}
        </p>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.id} className="p-6 rounded-xl border border-slate-100 bg-slate-50/30 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                {section.icon}
                <h2 className="text-lg font-bold text-emerald-900">{section.title}</h2>
              </div>
              <p className="text-sm text-slate-700 mb-4 leading-relaxed">{section.content}</p>
              <ul className="space-y-2 mb-4">
                {section.list.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <ShieldCheck className="text-emerald-600 mt-1 shrink-0" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {section.footer && (
                <div className="pt-3 border-t border-slate-200 mt-auto italic text-xs text-slate-500">
                  {section.footer}
                </div>
              )}
            </div>
          ))}

          {/* Transparency & Consent Box */}
          <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/30 lg:col-span-2">
            <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <Info size={20} /> {t('policies.important_terms_title')}
            </h2>
            <p className="text-sm text-slate-700 mb-3">{t('policies.important_terms_content')}</p>
            <div className="flex flex-wrap gap-4">
               {(t('policies.important_terms_list', { returnObjects: true }) as string[]).map((item, i) => (
                <span key={i} className="bg-white px-3 py-1 rounded-full border border-emerald-100 text-xs text-emerald-800 font-medium">
                  • {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Commitment */}
        <div className="mt-16 text-center border-t border-slate-100 pt-10">
          <h3 className="text-xl font-bold text-emerald-900 mb-6">{t('policies.financial_commitment_title')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              t('policies.clear_pricing'),
              t('policies.flexible_installments'),
              t('policies.fair_policies'),
              t('policies.transparent_processing')
            ].map((text, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <p className="text-xs font-medium text-slate-600">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 opacity-60">
            <p className="text-sm font-bold text-emerald-900">{t('policies.company_name')}</p>
            <p className="text-xs text-slate-500">{t('policies.company_tagline')}</p>
            <p className="text-xs font-bold text-emerald-800 mt-2 uppercase tracking-widest">
              {t('policies.transparency_slogan')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;