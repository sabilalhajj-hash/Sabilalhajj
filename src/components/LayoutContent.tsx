'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import WhatsappButton from "./WhatsappButton";
import DynamicHtml from "./DynamicHtml";
import { getDirection } from "../lib/i18n-utils";

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default language during SSR to avoid hydration mismatch
  const language = mounted ? i18n.language : 'ar';
  const dir = getDirection(language);

  return (
    <html lang={language} dir={dir} suppressHydrationWarning>
      <body className="antialiased" dir={dir} suppressHydrationWarning>
        <DynamicHtml>
          <Navbar />
          {children}
          <Footer />
          <WhatsappButton />
        </DynamicHtml>
      </body>
    </html>
  );
}