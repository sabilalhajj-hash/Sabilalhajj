'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

interface Room {
  id: string;
  name: string;
  capacity: string;
  price: string;
  view: string;
  features: string[];
}

interface RoomSelectionOverlayProps {
  rooms: Room[];
  onSelect: (roomName: string) => void;
  onBack: () => void;
}

export default function RoomSelectionOverlay({
  rooms,
  onSelect,
  onBack,
}: RoomSelectionOverlayProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{t('overlay.choose_accommodation')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {t('overlay.select_room_type')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('overlay.choose_accommodation_description')}
            </p>
          </div>

          {/* Room Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                onClick={() => onSelect(room.name)}
                className="group relative bg-gradient-to-br from-white to-blue-50/30 border-2 border-blue-100 rounded-2xl p-6 cursor-pointer hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Option {index + 1}
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                    <span className="text-2xl">🏨</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {room.name}
                  </h3>

                  {/* Capacity Badge */}
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    <span>👥</span>
                    {room.capacity}
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-black text-blue-600">
                    {room.price}
                  </div>

                  {/* View */}
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">View:</span> {room.view}
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-700">Key Features:</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {room.features.slice(0, 2).map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                      {room.features.length > 2 && (
                        <li className="text-blue-600 font-medium">
                          +{room.features.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                      Select This Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('overlay.back_to_programs')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
