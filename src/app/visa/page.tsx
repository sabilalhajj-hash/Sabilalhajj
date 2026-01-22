'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Landmark, BookOpenCheck,  Plane,
  Hotel,
  Bus,
  Users,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  Globe,
  MessageCircle  } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StickyCTA from '@/components/Umrah/StickyCTA';

export const dynamic = 'force-dynamic';

// Fallback translations for hydration stability
const FALLBACK_TEXTS: Record<string, string> = {
  'visa.hero.title': 'Saudi Visa Services',
  'visa.hero.subtitle': 'FAST & RELIABLE',
  'visa.hero.description': 'Professional visa processing services for Umrah and Hajj pilgrims. Get your Saudi visa quickly and hassle-free.',
  'visa.services.umrah': 'Umrah Visa',
  'visa.services.tourist': 'Tourist Visa',
  'visa.services.title': 'Choose Your Visa Service',
  'visa.services.subtitle': 'We provide comprehensive visa services for both religious and tourism purposes in Saudi Arabia.',
  'visa.umrah_section.title': 'Umrah Visa Requirements',
  'visa.umrah_section.description1': 'Our Umrah visa service includes comprehensive support for all your pilgrimage needs.',
  'visa.umrah_section.description2': 'We handle the entire visa process from application to approval.',
  'visa.umrah_section.services.flights': 'Flight Arrangements',
  'visa.umrah_section.services.accommodation': 'Hotel Booking',
  'visa.umrah_section.services.transportation': 'Local Transport',
  'visa.umrah_section.services.coordination': 'Trip Coordination',
  'visa.umrah_section.documents.title': 'Required Documents',
  'visa.umrah_section.documents.subtitle': 'Please prepare the following documents for your visa application.',
  'visa.umrah_section.documents.passport': 'Valid Passport (6+ months validity)',
  'visa.umrah_section.documents.personal_photo': 'Recent Passport Photo',
  'visa.umrah_section.documents.address': 'Address Proof',
  'visa.umrah_section.documents.residence_permit': 'Residence Permit',
  'visa.umrah_section.documents.residence_permit_title': 'European Residence Permit Holders',
  'visa.umrah_section.documents.passport_title': 'European Passport Holders',
  'visa.umrah_section.documents.additional_note': 'Additional documents may be required based on your nationality and specific circumstances.',
  'visa.umrah_section.processing.title': 'Processing Time',
  'visa.umrah_section.processing.time': '2-4 weeks',
  'visa.umrah_section.processing.note': 'Processing times may vary depending on the embassy workload.',
  'visa.booking_button': 'Book Now via WhatsApp',
  'visa.tourist_section.title': 'Tourist Visa Requirements',
  'visa.tourist_section.description': 'Experience Saudi Arabia with our tourist visa services.',
  'visa.tourist_section.documents.title': 'Required Documents',
  'visa.tourist_section.documents.subtitle': 'Please prepare the following documents for your tourist visa application.',
  'visa.tourist_section.processing.title': 'Processing Time',
  'visa.tourist_section.processing.time': '1-2 weeks',
  'visa.tourist_section.processing.note': 'Processing times may vary depending on the embassy workload.',
};


  
  
  
  



  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  const VisaServiceHero = () => {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Create visa object for StickyCTA
    const visa = useMemo(() => ({
      id: 'visa-service',
      name: mounted ? t('visa.hero.title') : FALLBACK_TEXTS['visa.hero.title'],
      duration: mounted ? t('visa.umrah_section.processing.time') : FALLBACK_TEXTS['visa.umrah_section.processing.time'],
      price: 'Contact us',
      description: mounted ? t('visa.hero.description') : FALLBACK_TEXTS['visa.hero.description'],
    }), [mounted, t]);

    const inclusiveServices = useMemo(() => [
      { icon: <Plane className="text-emerald-700" size={24} />, title: mounted ? t('visa.umrah_section.services.flights') : FALLBACK_TEXTS['visa.umrah_section.services.flights'] },
      { icon: <Hotel className="text-emerald-700" size={24} />, title: mounted ? t('visa.umrah_section.services.accommodation') : FALLBACK_TEXTS['visa.umrah_section.services.accommodation'] },
      { icon: <Bus className="text-emerald-700" size={24} />, title: mounted ? t('visa.umrah_section.services.transportation') : FALLBACK_TEXTS['visa.umrah_section.services.transportation'] },
      { icon: <Users className="text-emerald-700" size={24} />, title: mounted ? t('visa.umrah_section.services.coordination') : FALLBACK_TEXTS['visa.umrah_section.services.coordination'] },
    ], [mounted, t]);

    const requiredDocs = useMemo(() => [
      mounted ? t('visa.umrah_section.documents.passport') : FALLBACK_TEXTS['visa.umrah_section.documents.passport'],
      mounted ? t('visa.umrah_section.documents.personal_photo') : FALLBACK_TEXTS['visa.umrah_section.documents.personal_photo'],
      mounted ? t('visa.umrah_section.documents.address') : FALLBACK_TEXTS['visa.umrah_section.documents.address']
    ], [mounted, t]);

    const residencyDocs = useMemo(() => [
      mounted ? t('visa.umrah_section.documents.passport') : FALLBACK_TEXTS['visa.umrah_section.documents.passport'],
      mounted ? t('visa.umrah_section.documents.residence_permit') : FALLBACK_TEXTS['visa.umrah_section.documents.residence_permit'],
      mounted ? t('visa.umrah_section.documents.personal_photo') : FALLBACK_TEXTS['visa.umrah_section.documents.personal_photo']
    ], [mounted, t]);

    const passportDocs = useMemo(() => [
      mounted ? t('visa.umrah_section.documents.passport') : FALLBACK_TEXTS['visa.umrah_section.documents.passport'],
      mounted ? t('visa.umrah_section.documents.personal_photo') : FALLBACK_TEXTS['visa.umrah_section.documents.personal_photo']
    ], [mounted, t]);
  return (
    <div className="w-full font-sans">
      {/* --- HERO SLIDER SECTION --- */}
      <div className="relative w-full h-[400px] bg-gradient-to-br from-emerald-800 to-emerald-600 flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Navigation Arrows */}
        <button className="absolute left-4 p-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute right-4 p-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors">
          <ChevronRight size={24} />
        </button>

        {/* Hero Content */}
        <div className="max-w-2xl text-white">
          <div className="flex justify-center gap-1 mb-4">
            <div className="w-6 h-1 bg-white rounded-full"></div>
            <div className="w-2 h-1 bg-white/40 rounded-full"></div>
          </div>
          <h1 className="text-5xl font-bold mb-4">{mounted ? t('visa.hero.title') : FALLBACK_TEXTS['visa.hero.title']}</h1>
          <h2 className="text-xl text-yellow-500 font-medium mb-6 uppercase tracking-wide">
            {mounted ? t('visa.hero.subtitle') : FALLBACK_TEXTS['visa.hero.subtitle']}
          </h2>
          <p className="text-emerald-50 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            {mounted ? t('visa.hero.description') : FALLBACK_TEXTS['visa.hero.description']}
          </p>
        </div>
      </div>

      {/* --- VISA SELECTION SECTION --- */}
      <div className="w-full bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Service Cards Container */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 -mt-24 md:-mt-28 relative z-10">
            {/* Umrah Visa Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center w-64 border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <Landmark className="text-emerald-800" size={40} />
              </div>
              <span className="text-emerald-900 font-bold text-lg">{mounted ? t('visa.services.umrah') : FALLBACK_TEXTS['visa.services.umrah']}</span>
              
            </div>

            {/* Tourist Visa Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center w-64 border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <BookOpenCheck className="text-emerald-800" size={40} />
              </div>
              <span className="text-emerald-900 font-bold text-lg">{mounted ? t('visa.services.tourist') : FALLBACK_TEXTS['visa.services.tourist']}</span>
            </div>
          </div>

          {/* Heading and Subtext */}
          <div className="text-center">
            <h2 className="text-5xl font-bold text-emerald-900 mb-6">{mounted ? t('visa.services.title') : FALLBACK_TEXTS['visa.services.title']}</h2>
            <button className='bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl' onClick={() => window.open('https://wa.me/2120606420326?text=Hello!%20I%20would%20like%20to%20book%20a%20visa%20service.', '_blank')}>Book Now</button>
            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
              {mounted ? t('visa.services.subtitle') : FALLBACK_TEXTS['visa.services.subtitle']}
            </p>
          </div>
        </div>
      </div>

    
    <div className="w-full bg-white font-sans text-slate-800 py-12 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-50 p-2 rounded-lg">
            <Hotel className="text-emerald-700" size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {mounted ? t('visa.umrah_section.title') : FALLBACK_TEXTS['visa.umrah_section.title']}
          </h1>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mb-12">
          <p className="text-slate-600 leading-relaxed mb-4">
            {mounted ? t('visa.umrah_section.description1') : FALLBACK_TEXTS['visa.umrah_section.description1']}
          </p>
          <p className="text-slate-600 leading-relaxed">
            {mounted ? t('visa.umrah_section.description2') : FALLBACK_TEXTS['visa.umrah_section.description2']}
          </p>
        </div>

        {/* Inclusive Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {inclusiveServices.map((service, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="mb-4 bg-white p-3 rounded-xl shadow-sm italic">
                {service.icon}
              </div>
              <span className="text-sm font-semibold text-slate-700">{service.title}</span>
            </div>
          ))}
        </div>

        {/* Requirements Section */}
        <div className="space-y-12 mb-16">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{mounted ? t('visa.umrah_section.documents.title') : FALLBACK_TEXTS['visa.umrah_section.documents.title']}</h2>
            <p className="text-sm text-slate-500 mb-6">{mounted ? t('visa.umrah_section.documents.subtitle') : FALLBACK_TEXTS['visa.umrah_section.documents.subtitle']}</p>
            
            <div className="space-y-8">
              {/* European Residence Permit Holders */}
              <div>
                <h3 className="text-emerald-800 font-bold text-sm mb-4 uppercase tracking-wide">{mounted ? t('visa.umrah_section.documents.residence_permit_title') : FALLBACK_TEXTS['visa.umrah_section.documents.residence_permit_title']}</h3>
                <div className="space-y-3">
                  {residencyDocs.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100 max-w-2xl">
                      <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                      <span className="text-sm font-medium text-slate-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* European Passport Holders */}
              <div>
                <h3 className="text-emerald-800 font-bold text-sm mb-4 uppercase tracking-wide">{mounted ? t('visa.umrah_section.documents.passport_title') : FALLBACK_TEXTS['visa.umrah_section.documents.passport_title']}</h3>
                <div className="space-y-3">
                  {passportDocs.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100 max-w-2xl">
                      <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                      <span className="text-sm font-medium text-slate-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 italic">
            {t('visa.umrah_section.documents.additional_note')}
          </p>
        </div>

        {/* Processing Time Banner */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="bg-emerald-600 p-3 rounded-xl">
            <Clock className="text-white" size={32} />
          </div>
          <div>
            <h4 className="text-emerald-900 font-bold text-lg">{mounted ? t('visa.umrah_section.processing.title') : FALLBACK_TEXTS['visa.umrah_section.processing.title']}</h4>
            <p className="text-emerald-700 font-bold text-xl">{mounted ? t('visa.umrah_section.processing.time') : FALLBACK_TEXTS['visa.umrah_section.processing.time']}</p>
            <p className="text-xs text-emerald-600 mt-1">{mounted ? t('visa.umrah_section.processing.note') : FALLBACK_TEXTS['visa.umrah_section.processing.note']}</p>
          </div>
        </div>

        {/* Booking Button */}
        <div className="text-center mt-12">
          <a
            href="https://wa.me/2120606420326?text=Hello!%20I%20would%20like%20to%20book%20an%20Umrah%20visa."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="text-white" size={24} />
            {mounted ? t('visa.booking_button') : FALLBACK_TEXTS['visa.booking_button']}
          </a>
        </div>

      </div>
    </div>




  

    <div className="w-full bg-white font-sans text-slate-800 py-12 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-50 p-2 rounded-lg">
            <Globe className="text-emerald-700" size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {mounted ? t('visa.tourist_section.title') : FALLBACK_TEXTS['visa.tourist_section.title']}
          </h1>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mb-12">
          <p className="text-slate-600 leading-relaxed mb-4">
            {mounted ? t('visa.tourist_section.description') : FALLBACK_TEXTS['visa.tourist_section.description']}
          </p>
        </div>

        {/* Requirements Section */}
        <div className="space-y-12 mb-16">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{mounted ? t('visa.tourist_section.documents.title') : FALLBACK_TEXTS['visa.tourist_section.documents.title']}</h2>
            <p className="text-sm text-slate-500 mb-6">{mounted ? t('visa.tourist_section.documents.subtitle') : FALLBACK_TEXTS['visa.tourist_section.documents.subtitle']}</p>

            <div className="space-y-4">
              {requiredDocs.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100 max-w-2xl">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                  <span className="text-sm font-medium text-slate-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400 italic">
            {mounted ? t('visa.umrah_section.documents.additional_note') : FALLBACK_TEXTS['visa.umrah_section.documents.additional_note']}
          </p>
        </div>

        {/* Processing Time Banner */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="bg-emerald-600 p-3 rounded-xl">
            <Clock className="text-white" size={32} />
          </div>
          <div>
            <h4 className="text-emerald-900 font-bold text-lg">{mounted ? t('visa.tourist_section.processing.title') : FALLBACK_TEXTS['visa.tourist_section.processing.title']}</h4>
            <p className="text-emerald-700 font-bold text-xl">{mounted ? t('visa.tourist_section.processing.time') : FALLBACK_TEXTS['visa.tourist_section.processing.time']}</p>
            <p className="text-xs text-emerald-600 mt-1">{mounted ? t('visa.tourist_section.processing.note') : FALLBACK_TEXTS['visa.tourist_section.processing.note']}</p>
          </div>
        </div>

        {/* Booking Button */}
        <div className="text-center mt-12">
          <a
            href="https://wa.me/2120606420326?text=Hello!%20I%20would%20like%20to%20book%20a%20Tourist%20visa."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="text-white" size={24} />
            {mounted ? t('visa.booking_button') : FALLBACK_TEXTS['visa.booking_button']}
          </a>
        </div>

      </div>
    </div>



<StickyCTA 
  selectedProgram={visa} 
  whatsappUrl="https://wa.me/2120606420326?text=Hello!%20I%20would%20like%20to%20book%20a%20visa%20service."
  whatsappMessage="Hello! I would like to book a visa service."
/>







    </div>
  );
};

export default VisaServiceHero;