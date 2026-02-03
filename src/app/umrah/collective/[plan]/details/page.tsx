'use client';

import { useRouter, useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Users, Plane, Hotel, Bus, MapIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import ItinerarySection from '@/components/Umrah/collective/ItinerarySection';

export default function PackageDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('madinah');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const planSlug = params.plan as string;

  // Mock data - in real scenario, fetch from API based on planSlug (use keys until mounted to avoid hydration mismatch)
  const packageData = {
    name: mounted ? (t('umrah.ramadan_package_title') || 'Ramadan Umrah 2026') : 'Ramadan Umrah 2026',
    duration: '10 Days / 9 Nights',
    description: mounted ? (t('umrah.choose_package_subtitle') || 'Experience the spiritual journey of Umrah during the blessed month of Ramadan') : 'Experience the spiritual journey of Umrah during the blessed month of Ramadan',
  };

  // Itinerary tabs with different locations
  const itineraryTabs = [
    { id: 'madinah', label: 'Madinah Itinerary', icon: MapPin },
    { id: 'makkah', label: 'Makkah Itinerary', icon: MapIcon },
  ];

  // Sample itinerary data for Madinah
  const madinahItinerary = [
    {
      day: 1,
      title: 'Arrival in Madinah',
      description: 'Welcome to Madinah. Transfer to your accommodation and rest.',
      activities: ['Airport pickup', 'Hotel check-in', 'Orientation session'],
    },
    {
      day: 2,
      title: 'Madinah City Tour',
      description: 'Explore the holy city and visit sacred sites.',
      activities: ['Al-Masjid al-Nabawi visit', 'Quba Mosque', 'Uhud Mountain'],
    },
    {
      day: 3,
      title: 'Umrah Preparation',
      description: 'Prepare for your sacred journey to Makkah.',
      activities: ['Ihram preparation', 'Religious guidance', 'Health check'],
    },
  ];

  // Sample itinerary data for Makkah
  const makkahItinerary = [
    {
      day: 4,
      title: 'Travel to Makkah',
      description: 'Journey from Madinah to Makkah.',
      activities: ['Comfortable bus transfer', 'Iftar dinner', 'Hotel check-in'],
    },
    {
      day: 5,
      title: 'Umrah Ritual',
      description: 'Perform the sacred Umrah ritual.',
      activities: ['Tawaf', 'Sai', 'Hair cutting/shaving'],
    },
    {
      day: 6,
      title: 'Makkah Exploration',
      description: 'Explore the holy city and perform prayers.',
      activities: ['Al-Masjid al-Haram prayers', 'Mount Arafat visit', 'Free time for shopping'],
    },
    {
      day: 7,
      title: 'Return to Madinah',
      description: 'Return to Madinah for final days.',
      activities: ['Makkah to Madinah transfer', 'Hotel settling', 'Evening prayers'],
    },
  ];

  const itinerary = activeTab === 'madinah' ? madinahItinerary : makkahItinerary;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 hover:bg-white/20 rounded-full px-3 py-2 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{mounted ? t('common.back') : 'Back'}</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{packageData.name}</h1>
          <p className="text-emerald-100">{packageData.description}</p>
        </div>
      </div>

      {/* Package Info Cards */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-full">
              <Hotel className="text-emerald-600 w-8 h-8" />
              <div>
                <p className="text-sm text-gray-600">{mounted ? t('umrah.accommodation') : 'Accommodation'}</p>
                <p className="font-bold text-gray-900">5-Star Hotels</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-full">
              <Plane className="text-blue-600 w-8 h-8" />
              <div>
                <p className="text-sm text-gray-600">{mounted ? t('umrah.flights') : 'Flights'}</p>
                <p className="font-bold text-gray-900">Direct Flights</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-full">
              <Users className="text-purple-600 w-8 h-8" />
              <div>
                <p className="text-sm text-gray-600">{mounted ? t('umrah.duration') : 'Duration'}</p>
                <p className="font-bold text-gray-900">{packageData.duration}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {itineraryTabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <TabIcon size={20} />
                <span className="font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Itinerary Items */}
        <div className="space-y-6">
          {itinerary.map((item, index) => (
            <div key={index} className="bg-white rounded-full shadow-md p-6 border-l-4 border-emerald-600">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                    Day {item.day}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.activities.map((activity, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push(`/umrah/collective/${planSlug}`)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors shadow-lg"
          >
            {mounted ? t('umrah.book_now') : 'Book now'}
            <Plane size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
