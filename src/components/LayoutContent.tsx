'use client';

import { useTranslation } from 'react-i18next';
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

  const dir = getDirection(i18n.language);

  return (
    <html lang={i18n.language} dir={dir}>
      <body className="antialiased" dir={dir}>
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