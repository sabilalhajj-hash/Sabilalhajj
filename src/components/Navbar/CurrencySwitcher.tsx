'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../context/CurrencyContext';

export default function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { currency, setCurrency } = useCurrency();

  const currencies = [
    { code: 'USD', name: t('currencies.usd.name'), symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: t('currencies.eur.name'), symbol: '€', flag: '🇪🇺' },
    { code: 'MAD', name: t('currencies.mad.name'), symbol: 'MAD', sub: t('currencies.mad.native'), flag: '🇲🇦' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative " ref={currencyRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium uppercase"
      >
        <span className="text-lg">
          {currencies.find(c => c.code === currency.code)?.symbol || '💰'}
        </span>
        <span>{currency.code}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-[200] overflow-hidden">
          <div className="py-2">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setCurrency(curr.code);
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors group"
              >
                <span className="text-2xl mr-3">
                  {curr.flag}
                </span>
                <span className="text-gray-500 font-bold w-8 text-left group-hover:text-emerald-600">
                  {curr.symbol}
                </span>
                <div className="flex flex-col items-start ml-2">
                  <span className={`text-sm font-medium ${currency.code === curr.code ? 'text-emerald-600' : 'text-gray-700'}`}>
                    {curr.name}
                  </span>
                  <span className="text-xs text-gray-400 uppercase">{curr.code} {curr.sub && `| ${curr.sub}`}</span>
                </div>
                {currency.code === curr.code && (
                  <svg className="ml-auto w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
