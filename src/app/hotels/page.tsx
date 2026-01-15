'use client';

import { useTranslation } from 'react-i18next';

export default function Hotels() {
  const { t } = useTranslation();

  const hotelFeatures = [
    { icon: '📍', title: 'Prime Location', description: 'Walking distance to Holy Sites' },
    { icon: '🍽️', title: 'Halal Cuisine', description: 'Authentic meals and dietary requirements' },
    { icon: '🛏️', title: 'Comfortable Rooms', description: 'Modern amenities and clean facilities' },
    { icon: '🕌', title: 'Prayer Facilities', description: 'Dedicated prayer rooms and Qibla direction' },
    { icon: '🚐', title: 'Transportation', description: 'Free shuttle service to Haram' },
    { icon: '👨‍💼', title: '24/7 Support', description: 'Concierge and guest services' }
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Premium Accommodations</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('pages.hotels.description1')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('pages.hotels.description2')}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hotel Features</h3>
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

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-lg text-amber-800 leading-relaxed">
            {t('pages.hotels.description3')}
          </p>
        </div>

        <div className="text-center mt-8">
          <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
            {t('common.view_details')}
          </button>
        </div>
      </div>
    </div>
  );
}