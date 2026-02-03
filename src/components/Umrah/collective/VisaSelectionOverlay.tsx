'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

interface Visa {
  id: string;
  name: string;
  detail: string;
  validity: string;
  benefits: string[];
}

interface VisaSelectionOverlayProps {
  visas: Visa[];
  onSelect: (visaName: string) => void;
  onBack: () => void;
}

export default function VisaSelectionOverlay({
  visas,
  onSelect,
  onBack,
}: VisaSelectionOverlayProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{t('overlay.choose_visa_type')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {t('overlay.select_travel_visa')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('overlay.choose_visa_description')}
            </p>
          </div>

          {/* Visa Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visas.map((visa, index) => (
              <div
                key={visa.id}
                onClick={() => onSelect(visa.name)}
                className="group relative bg-gradient-to-br from-white to-purple-50/30 border-2 border-purple-100 rounded-2xl p-6 cursor-pointer hover:border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Visa {index + 1}
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
                    <span className="text-2xl">🛂</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                    {visa.name}
                  </h3>

                  {/* Detail */}
                  <div className="text-sm text-gray-600 font-medium">
                    {visa.detail}
                  </div>

                  {/* Validity */}
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Validity:</span> {visa.validity}
                  </div>

                  {/* Key Benefits */}
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-700">Key Benefits:</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {visa.benefits.slice(0, 2).map((benefit: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                      {visa.benefits.length > 2 && (
                        <li className="text-purple-600 font-medium">
                          +{visa.benefits.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                      {t('visa.select_this_visa')}
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
              {t('overlay.back_to_rooms')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
