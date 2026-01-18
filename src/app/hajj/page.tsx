'use client';

import { useTranslation } from 'react-i18next';

export const dynamic = 'force-dynamic';

export default function Hajj() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🕋</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('pages.hajj.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('pages.hajj.subtitle')}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('pages.hajj.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('pages.hajj.description1')}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Hajj Services</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('pages.hajj.description2')}
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-lg text-blue-800 leading-relaxed">
              {t('pages.hajj.description3')}
            </p>
          </div>

          <div className="text-center pt-6">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              {t('common.book_now')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}