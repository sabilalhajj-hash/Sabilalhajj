'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function Services() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait for component to mount (client-side only) to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Loading...</h1>
        </div>
      </div>
    );
  }

  const services = [
    {
      key: 'hajj',
      icon: '🕋'
    },
    {
      key: 'umrah',
      icon: '🌙'
    },
    {
      key: 'visa',
      icon: '🛂'
    },
    {
      key: 'transportation',
      icon: '🚐'
    },
    {
      key: 'accommodation',
      icon: '🏨'
    },
    {
      key: 'spiritual',
      icon: '📿'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">{t('pages.services.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t(`pages.services.${service.key}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`pages.services.${service.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}