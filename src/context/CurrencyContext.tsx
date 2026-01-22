'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Currency {
  code: string;
  symbol: string;
  rate: number; // Exchange rate relative to EUR (base currency)
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: string) => void;
  formatPrice: (priceInEUR: number) => string;
  convertPrice: (priceInEUR: number) => number;
}

const currencies: Record<string, Currency> = {
  EUR: { code: 'EUR', symbol: '€', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: 1.08 },
  MAD: { code: 'MAD', symbol: 'MAD', rate: 10.85 },
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencies.EUR);

  // Load saved currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency && currencies[savedCurrency]) {
      setCurrencyState(currencies[savedCurrency]);
    }
  }, []);

  const setCurrency = (code: string) => {
    if (currencies[code]) {
      setCurrencyState(currencies[code]);
      localStorage.setItem('selectedCurrency', code);
    }
  };

  const convertPrice = (priceInEUR: number): number => {
    return Math.round(priceInEUR * currency.rate);
  };

  const formatPrice = (priceInEUR: number): string => {
    const converted = convertPrice(priceInEUR);
    if (currency.code === 'EUR') {
      return `${converted}€`;
    } else if (currency.code === 'USD') {
      return `$${converted}`;
    } else {
      return `${converted} ${currency.symbol}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
