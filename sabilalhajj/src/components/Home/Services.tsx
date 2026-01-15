import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t('services.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-4xl mb-4">🕋</div>
            <h3 className="text-xl font-semibold mb-2">{t('services.hajj.title')}</h3>
            <p className="text-gray-600">{t('services.hajj.description')}</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-4xl mb-4">🌙</div>
            <h3 className="text-xl font-semibold mb-2">{t('services.umrah.title')}</h3>
            <p className="text-gray-600">{t('services.umrah.description')}</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-4xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold mb-2">{t('services.transportation.title')}</h3>
            <p className="text-gray-600">{t('services.transportation.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}