'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n-client';
import { CurrencyProvider } from '../context/CurrencyContext';
import { SettingsProvider } from '../context/SettingsContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <CurrencyProvider>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </CurrencyProvider>
    </I18nextProvider>
  );
}