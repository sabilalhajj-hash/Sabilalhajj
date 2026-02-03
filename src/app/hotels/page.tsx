'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function Hotels() {
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
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🏨</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('Loading...')}</h1>
          </div>
        </div>
      </div>
    );
  }

  const hotelFeatures = [
    { icon: '📍', title: t('pages.hotels.features.location.title'), description: t('pages.hotels.features.location.description') },
    { icon: '🍽️', title: t('pages.hotels.features.cuisine.title'), description: t('pages.hotels.features.cuisine.description') },
    { icon: '🛏️', title: t('pages.hotels.features.rooms.title'), description: t('pages.hotels.features.rooms.description') },
    { icon: '🕌', title: t('pages.hotels.features.prayer.title'), description: t('pages.hotels.features.prayer.description') },
    { icon: '🚐', title: t('pages.hotels.features.transport.title'), description: t('pages.hotels.features.transport.description') },
    { icon: '👨‍💼', title: t('pages.hotels.features.support.title'), description: t('pages.hotels.features.support.description') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏨</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('pages.hotels.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('pages.hotels.subtitle')}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('pages.hotels.accommodations_title')}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('pages.hotels.description1')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('pages.hotels.description2')}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('pages.hotels.features_title')}</h3>
              <div className="grid grid-cols-1 gap-4">
                {hotelFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-full p-6">
          <p className="text-lg text-green-800 leading-relaxed">
            {t('pages.hotels.description3')}
          </p>
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => window.open('https://wa.me/2120606420326?text=Hello!%20I%20would%20like%20to%20inquire%20about%20hotel%20accommodations.', '_blank')}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            {t('common.view_details')}
          </button>
        </div>
      </div>
    </div>
  );
}