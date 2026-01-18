'use client';

import FlightSearch from '@/components/Flight/FlightSearch';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { 
  Plane, MapPin, Clock, DollarSign, Shield, Star, TrendingDown, 
  Filter, SlidersHorizontal, CheckCircle, Info, Award, Users,
  Calendar, Globe, Zap, Heart, ArrowRight
} from 'lucide-react';

export default function Flights() {
  const { t } = useTranslation();

  const popularDestinations = [
    { city: 'Mecca', country: 'Saudi Arabia', code: 'JED', image: '/hajj1.jpg', price: `${t('flight.price_from')} $450`, badge: t('flight.badge_popular') },
    { city: 'Medina', country: 'Saudi Arabia', code: 'MED', image: '/hajj2.jpg', price: `${t('flight.price_from')} $480`, badge: t('flight.badge_best_value') },
    { city: 'Riyadh', country: 'Saudi Arabia', code: 'RUH', image: '/hajj3.jpg', price: `${t('flight.price_from')} $520`, badge: t('flight.badge_trending') },
    { city: 'Dubai', country: 'UAE', code: 'DXB', image: '/hajj4.jpg', price: `${t('flight.price_from')} $380`, badge: t('flight.badge_hot_deal') },
  ];

  const specialOffers = [
    {
      title: t('flight.early_bird_title'),
      description: t('flight.early_bird_desc'),
      discount: t('flight.discount_25_off'),
      icon: <Calendar className="w-6 h-6" />,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      badgeBg: 'bg-emerald-100',
      badgeColor: 'text-emerald-700'
    },
    {
      title: t('flight.group_discount_title'),
      description: t('flight.group_discount_desc'),
      discount: t('flight.discount_15_off'),
      icon: <Users className="w-6 h-6" />,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      badgeBg: 'bg-blue-100',
      badgeColor: 'text-blue-700'
    },
    {
      title: t('flight.last_minute_title'),
      description: t('flight.last_minute_desc'),
      discount: t('flight.discount_30_off'),
      icon: <Zap className="w-6 h-6" />,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      badgeBg: 'bg-orange-100',
      badgeColor: 'text-orange-700'
    },
    {
      title: t('flight.round_trip_bonus_title'),
      description: t('flight.round_trip_bonus_desc'),
      discount: t('flight.discount_free'),
      icon: <Shield className="w-6 h-6" />,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      badgeBg: 'bg-purple-100',
      badgeColor: 'text-purple-700'
    }
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('flight.secure_booking_title'),
      description: t('flight.secure_booking_desc')
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('flight.support_247_title'),
      description: t('flight.support_247_desc')
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('flight.best_prices_title'),
      description: t('flight.best_prices_desc')
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: t('flight.easy_booking_title'),
      description: t('flight.easy_booking_desc')
    }
  ];

  const travelTips = [
    {
      title: t('flight.best_time_title'),
      description: t('flight.best_time_desc'),
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: t('flight.flexible_dates_title'),
      description: t('flight.flexible_dates_desc'),
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: t('flight.baggage_title'),
      description: t('flight.baggage_desc'),
      icon: <Plane className="w-5 h-5" />
    },
    {
      title: t('flight.travel_docs_title'),
      description: t('flight.travel_docs_desc'),
      icon: <Shield className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Flight Search Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <FlightSearch />
      </div>

      {/* Popular Destinations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('flight.popular_destinations')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('flight.popular_destinations_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <div
                key={index}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={destination.image}
                  alt={destination.city}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {destination.badge}
                    </span>
                    <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                      {destination.code}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{destination.city}</h3>
                  <p className="text-sm text-gray-300 mb-3">{destination.country}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-400">{destination.price}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('flight.special_offers')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('flight.special_offers_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialOffers.map((offer, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-emerald-300 transition-all hover:shadow-xl"
              >
                <div className={`w-12 h-12 ${offer.iconBg} rounded-xl flex items-center justify-center ${offer.iconColor} mb-4`}>
                  {offer.icon}
                </div>
                <div className={`inline-block px-3 py-1 ${offer.badgeBg} ${offer.badgeColor} rounded-full text-xs font-bold mb-3`}>
                  {offer.discount}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-sm text-gray-600">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('flight.why_choose_us_flights')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('flight.why_choose_us_flights_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors"
              >
                <div className="text-emerald-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('flight.travel_tips')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('flight.travel_tips_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {travelTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-emerald-600 mb-3">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Assistance */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('flight.booking_assistance')}
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            {t('flight.booking_assistance_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Plane className="w-5 h-5" />
              {t('flight.contact_experts')}
            </button>
            <button className="bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 border-2 border-white/20">
              <Info className="w-5 h-5" />
              {t('flight.learn_more')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}