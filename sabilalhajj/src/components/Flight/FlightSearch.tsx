'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Calendar, User, MapPin } from 'lucide-react';

export default function FlightSearch() {
  const { t } = useTranslation();
  const [tripType, setTripType] = useState('one-way');

  return (
    <section className="py-20 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('flights.title')}
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            {t('flights.subtitle')}
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
          
          {/* Trip Type Selectors */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { id: 'one-way', label: t('flights.trip_types.one_way') },
              { id: 'round-trip', label: t('flights.trip_types.round_trip') },
              { id: 'multi-route', label: t('flights.trip_types.multi_route') }
            ].map((type) => (
              <label key={type.id} className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="tripType"
                    className="sr-only"
                    checked={tripType === type.id}
                    onChange={() => setTripType(type.id)}
                  />
                  <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                    tripType === type.id 
                    ? 'border-emerald-600 bg-emerald-600' 
                    : 'border-gray-300 group-hover:border-emerald-400'
                  }`}>
                    {tripType === type.id && (
                      <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>
                </div>
                <span className={`text-sm font-semibold transition-colors ${
                  tripType === type.id ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {type.label}
                </span>
              </label>
            ))}
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* FROM */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/60 ml-1">{t('flights.from')}</label>
              <div className="relative group">
                <input 
                  type="text" 
                  defaultValue="Morocco"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* TO */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/60 ml-1">{t('flights.to')}</label>
              <input 
                type="text" 
                placeholder="Search by city name (e.g., Paris,"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* DEPARTURE DATE */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/60 ml-1">{t('flights.departure')}</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="29/12/2025"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* TRAVELERS */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/60 ml-1">{t('flights.passengers')}</label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer">
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>Family (3+)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex justify-center mb-10">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-emerald-900 peer-checked:border-emerald-900 transition-all flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-900">Include nearby airports</span>
            </label>
          </div>

          {/* Search Button */}
          <button className="w-full py-4.5 bg-[#2D4A31] hover:bg-[#1f3322] text-white rounded-xl font-bold flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg">
            <Search className="w-5 h-5" />
            <span className="text-lg">{t('flights.search_flights')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}