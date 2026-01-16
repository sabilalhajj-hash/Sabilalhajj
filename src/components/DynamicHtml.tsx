'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

interface DynamicHtmlProps {
  children: ReactNode;
}

export default function DynamicHtml({ children }: DynamicHtmlProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Update document attributes when language changes
  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    // Add RTL class to body for additional styling control
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [i18n.language, isRTL]);

  return <>{children}</>;
}