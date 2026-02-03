'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const DEFAULT_WHATSAPP = '2120606420326';
const DEFAULT_WHATSAPP_URL = `https://wa.me/${DEFAULT_WHATSAPP}`;

interface SettingsState {
  whatsappNumber: string;
  whatsappUrl: string;
  loaded: boolean;
}

const defaultState: SettingsState = {
  whatsappNumber: DEFAULT_WHATSAPP,
  whatsappUrl: DEFAULT_WHATSAPP_URL,
  loaded: false,
};

const SettingsContext = createContext<SettingsState>(defaultState);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SettingsState>(defaultState);

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        const number = data.whatsappNumber && typeof data.whatsappNumber === 'string'
          ? data.whatsappNumber.replace(/\D/g, '') || DEFAULT_WHATSAPP
          : DEFAULT_WHATSAPP;
        const url = data.whatsappUrl && typeof data.whatsappUrl === 'string'
          ? data.whatsappUrl
          : `https://wa.me/${number}`;
        setState({ whatsappNumber: number, whatsappUrl: url, loaded: true });
      })
      .catch(() => setState((s) => ({ ...s, loaded: true })));
  }, []);

  return (
    <SettingsContext.Provider value={state}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

/** Build wa.me link with optional pre-filled message. */
export function useWhatsappUrl(defaultMessage?: string) {
  const { whatsappUrl } = useSettings();
  if (!defaultMessage) return whatsappUrl;
  const separator = whatsappUrl.includes('?') ? '&' : '?';
  return `${whatsappUrl}${separator}text=${encodeURIComponent(defaultMessage)}`;
}
