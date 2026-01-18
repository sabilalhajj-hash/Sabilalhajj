'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

interface Program {
  id: string;
  name: string;
  ApproximateDuration: string;
  price: string;
  highlights: string[];
}

interface ProgramSelectionOverlayProps {
  programs: Program[];
  onSelect: (programName: string) => void;
}

export default function ProgramSelectionOverlay({
  programs,
  onSelect,
}: ProgramSelectionOverlayProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{t('overlay.choose_program')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {t('overlay.select_spiritual_journey')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('overlay.choose_program_description')}
            </p>
          </div>

          {/* Program Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div
                key={program.id}
                onClick={() => onSelect(program.name)}
                className="group relative bg-gradient-to-br from-white to-emerald-50/30 border-2 border-emerald-100 rounded-2xl p-6 cursor-pointer hover:border-emerald-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Program {index + 1}
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-emerald-200 transition-colors">
                    <span className="text-2xl">🕋</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {program.name}
                  </h3>

                  {/* Duration Badge */}
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    <span>⏱️</span>
                    {program.ApproximateDuration}
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-black text-emerald-600">
                    {program.price}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-700">Highlights:</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {program.highlights.slice(0, 2).map((highlight: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          {highlight}
                        </li>
                      ))}
                      {program.highlights.length > 2 && (
                        <li className="text-emerald-600 font-medium">
                          +{program.highlights.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                      Select This Program
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {t('overlay.programs_footer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
