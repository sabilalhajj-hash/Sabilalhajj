import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import WhatsappButton from "./../components/WhatsappButton";
import I18nProvider from "../components/Languages/I18nProvider";
import DynamicHtml from "../components/DynamicHtml";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sabil AlHajj",
  description: "Comprehensive Hajj and Umrah pilgrimage services with expert guidance and premium accommodations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <DynamicHtml>
            <Navbar />
            {children}
            <Footer />
            <WhatsappButton />
          </DynamicHtml>
        </I18nProvider>
      </body>
    </html>
  );
}
