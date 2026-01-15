'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {
  Plane, Hotel, FileText, UserCircle, MapPin, Search,
  Star, Clock, CheckCircle,
  Users, Share2, Eye, Bus, Info, Calendar, Plus, Minus,
  ArrowLeft, ShieldCheck, LayoutGrid,
  CreditCard, Building, AlertCircle,
  ShieldCheck as ShieldCheckIcon, PlaneTakeoff, UserPlus, Euro
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import StickyCTA from '@/components/Umrah/StickyCTA';
import SectionIndicator from '@/components/SectionIndicator';
// import 'swiper/css/pagination';

// --- Static Data ---
const programs = [
  {
    id: 'ramadan-journey',
    name: 'Program 1 — Ramadan Journey',
    ApproximateDuration: '15 days',
    departure: '5 March 2026',
    return: '20th March 2026',
    from: 'Casablanca, Morocco',
    to: 'Medina, Saudi Arabia',
    description: 'Experience the blessed month of Ramadan in the holy lands with guided Umrah rituals',
    highlights: ['Direct flights from Casablanca', 'VIP airport transfers', '4-star hotel accommodations', 'Guided prayers and lectures', 'Traditional Iftar meals'],
    price: '€2,450 per person',
    includes: ['Airfare', 'Hotel accommodation', 'Visa processing', 'Transportation', 'Guided tours', 'Meals during Ramadan']
  },
  {
    id: 'ramadan-last-ten',
    name: 'Program 2 — Last Ten Days of Ramadan Program',
    ApproximateDuration: '17 days',
    departure: '15th June 2026',
    return: '1st July 2026',
    from: 'Casablanca, Morocco',
    to: 'Medina, Saudi Arabia',
    description: 'Join the most blessed nights of Ramadan with special prayers and spiritual activities',
    highlights: ['Laylat al-Qadr focus', 'Special Taraweeh prayers', 'Spiritual lectures by scholars', 'Community Iftar gatherings', 'Zamzam water distribution'],
    price: '€2,650 per person',
    includes: ['Premium airfare', '5-star hotel accommodation', 'Express visa processing', 'Private transportation', 'Scholar-led guidance', 'Special Ramadan meals']
  },
  {
    id: 'long-stay',
    name: 'Program 3 — Long Stay Program',
    ApproximateDuration: 'Up to 35 days',
    departure: '1st July 2026',
    return: '31st August 2026',
    from: 'Casablanca, Morocco',
    to: 'Medina, Saudi Arabia',
    description: 'Extended stay program for deep spiritual immersion and comprehensive pilgrimage experience',
    highlights: ['Flexible duration options', 'Cultural immersion activities', 'Arabic language classes', 'Community service opportunities', 'Extended ziyarah tours'],
    price: '€3,200 per person',
    includes: ['Flexible airfare', 'Premium accommodation', 'Long-stay visa support', 'Complete transportation', 'Educational programs', 'Cultural activities']
  }
];
const roomTypes = [
  {
    id: 'twin',
    name: 'Twin Room',
    size: '2 Separate Beds (2 Twin Beds)',
    price: '€1,200 per person',
    description: 'Suitable for two people – greater comfort and privacy.',
    features: ['Private bathroom', 'Air conditioning', 'Mini refrigerator', 'Complimentary WiFi', 'Room service', 'Daily housekeeping'],
    capacity: '2 guests',
    view: 'City or courtyard view',
    amenities: ['Television', 'Safe box', 'Coffee/tea maker', 'Hair dryer', 'Prayer direction indicator']
  },
  {
    id: 'triple',
    name: 'Triple Room',
    size: '3 Separate Beds (3 Twin Beds)',
    price: '€1,800 per person',
    description: 'Suitable for three people – ideal for family groups or friends traveling together.',
    features: ['Spacious layout', 'Multiple bathrooms', 'Climate control', 'Complimentary WiFi', 'Room service', 'Enhanced cleaning'],
    capacity: '3 guests',
    view: 'City or Haram view',
    amenities: ['Television', 'Safe box', 'Coffee/tea maker', 'Hair dryer', 'Prayer direction indicator', 'Extra bedding']
  },
  {
    id: 'quad',
    name: 'Quad Room',
    size: '4 Separate Beds (4 Twin Beds)',
    price: '€2,400 per person',
    description: 'Suitable for four people – spacious and comfortable for larger groups.',
    features: ['Extra spacious', 'Multiple bathrooms', 'Premium amenities', 'High-speed WiFi', '24/7 concierge', 'Priority cleaning'],
    capacity: '4 guests',
    view: 'Haram or Kaaba view',
    amenities: ['Smart TV', 'Safe box', 'Coffee/tea maker', 'Hair dryer', 'Prayer direction indicator', 'Living area', 'Mini kitchen']
  },
  {
    id: 'penta',
    name: 'Penthouse Suite',
    size: '5 Separate Beds (5 Twin Beds)',
    price: '€3,000 per person',
    description: 'Suitable for five people – luxurious and exclusive for larger groups.',
    features: ['Penthouse level', 'Panoramic views', 'Butler service', 'Premium amenities', 'Private elevator', 'VIP treatment'],
    capacity: '5 guests',
    view: 'Panoramic Haram and Kaaba view',
    amenities: ['Smart TV', 'Safe box', 'Coffee/tea maker', 'Hair dryer', 'Prayer direction indicator', 'Full kitchen', 'Dining area', 'Private terrace']
  }
];
const visaTypes = [
  {
    id: 'umrah',
    name: 'Umrah Visa',
    detail: 'Dedicated for religious pilgrimage',
    description: 'Official Saudi visa specifically for Umrah pilgrimage activities',
    validity: '90 days from issuance',
    stay_duration: 'Up to 90 days',
    processing_time: '7-14 business days',
    requirements: ['Valid passport (6+ months)', 'Recent passport photos', 'Umrah booking confirmation', 'Health insurance', 'Proof of financial means'],
    benefits: ['Dedicated pilgrimage visa', 'Multiple entry allowed', 'Extends stay permissions', 'Official religious travel status', 'Priority processing for groups'],
    price: '€85 per person'
  },
  {
    id: 'tourist',
    name: 'Tourist Visa',
    detail: 'Multi-purpose travel visa',
    description: 'Standard tourist visa allowing Umrah alongside tourism activities',
    validity: '90 days from issuance',
    stay_duration: 'Up to 90 days',
    processing_time: '3-7 business days',
    requirements: ['Valid passport (6+ months)', 'Recent passport photos', 'Hotel booking confirmation', 'Return flight tickets', 'Bank statements'],
    benefits: ['Flexible travel options', 'Combines tourism and pilgrimage', 'Cost-effective for families', 'Easier processing', 'Extended validity period'],
    price: '€65 per person'
  }
];

const gallery = [
  { id: '1', image: '/hajj1.jpg', alt: 'Gallery For Hajj images1' },
  { id: '2', image: '/hajj2.jpg', alt: 'Gallery For Hajj images2' },
  { id: '3', image: '/hajj3.jpg', alt: 'Gallery For Hajj images3' },
  { id: '4', image: '/hajj4.jpg', alt: 'Gallery For Hajj images4' }
];

export default function SabilHajjPlatform() {
  const { t, i18n } = useTranslation();
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<string | null>(null);

  const isConfigured = selectedProgram && selectedRoom && selectedVisa;


  // Helper Components
  const ItineraryItemComponent = ({ title, subtitle, description, imageSrc, badge }: any) => (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 border-b border-gray-100 last:border-0">
      <div className="w-full lg:w-1/3">
        <div className="relative rounded-xl overflow-hidden shadow-sm">
          <Image className="w-full h-48 object-cover" src={imageSrc} alt={title} width={400} height={200} />

          {badge && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {badge}
            </div>
          )}
        </div>
      </div>
      <div className="w-full lg:w-2/3 space-y-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-emerald-900">{title}</h3>
          {subtitle && <p className="text-emerald-700 font-medium text-sm sm:text-base italic">{subtitle}</p>}
        </div>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );

  const MadinahItinerary = () => {
    const madinahLandmarks = [
      {
        title: "Al-Masjid An-Nabawi – Madinah",
        description: "Located in the heart of Madinah, Al-Masjid An-Nabawi is the second holiest mosque in Islam. It is renowned for its magnificent architecture and spacious courtyards. Visiting gives Muslims the honor of praying in the Rawdah Al-Sharifah and greeting the Prophet Muhammad (PBUH).",
        imageSrc: "/hajj1.jpg",
        badge: "1/5"
      },
      {
        title: "Quba Mosque – The First Mosque in Islam",
        subtitle: "The First Mosque in Islam",
        description: "Established after the Prophet Muhammad (PBUH) migrated to Madinah. Located south of Al-Masjid An-Nabawi, it is known for its peaceful atmosphere. A visit allows pilgrims to experience the spirit of the early days of Islam.",
        imageSrc: "/hajj1.jpg",
        badge: "1/4"
      },
      {
        title: "Masjid Al-Qiblatain",
        subtitle: "The Mosque of the Two Qiblahs",
        description: "One of the city's most significant historical landmarks. It is where the Prophet (PBUH) received the revelation to change the Qiblah direction from Jerusalem to the Kaaba in Makkah.",
        imageSrc: "/hajj1.jpg",
        badge: "1/4"
      }
    ];

    return (
      <>
        {/* Header */}
        <div className="bg-emerald-50 py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center border-b border-emerald-100">
          <h1 className="text-emerald-800 font-bold flex items-center gap-2 text-lg sm:text-xl">
            <Calendar size={20} /> Madinah Itinerary
          </h1>
        </div>

        {/* Accommodation Section */}
        <section className="p-4 sm:p-6 lg:p-8 bg-slate-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-emerald-800 font-bold text-lg sm:text-xl mb-1">Your Accommodation</h2>
            <p className="text-emerald-600 text-xs sm:text-sm mb-4 sm:mb-6">Included in your package</p>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="w-full lg:w-1/3">
                <img src="/api/placeholder/400/300" alt="Hotel" className="rounded-lg object-cover w-full h-40 sm:h-48 lg:h-56" />
              </div>
              <div className="w-full lg:w-2/3">
                <div className="flex text-yellow-400 mb-2"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                <h3 className="font-bold text-emerald-900 text-lg sm:text-xl mb-2">Central Area Hotel — Near Al-Masjid An-Nabawi</h3>
                <div className="flex items-center gap-1 text-emerald-700 text-xs sm:text-sm font-bold mb-3">
                  <MapPin size={14} /> Location
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Located inside the Central Area of Madinah, about a 7-minute walk from Al-Masjid An-Nabawi.
                  Provides practical proximity and easy access to the Haram throughout your stay.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Section */}
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="py-4 sm:py-6 text-center">
              <h2 className="text-emerald-900 text-xl sm:text-2xl lg:text-3xl font-bold">Your Program in Madinah</h2>
              <p className="text-emerald-600 text-sm sm:text-base mt-2 font-medium">Comprehensive spiritual journey with guided visits to holy sites</p>
            </div>

            {madinahLandmarks.map((item, index) => (
              <ItineraryItemComponent key={index} {...item}/>
            ))}
          </div>
        </section>
      </>
    );
  };

  const MakkahItinerary = () => {
    const makkahLandmarks = [
      {
        title: "Al-Masjid Al-Haram – The Sacred Mosque",
        subtitle: "Home to the Holy Kaaba",
        description: "The Grand Mosque of Makkah, also known as Al-Masjid Al-Haram, is the largest and most sacred mosque in Islam. It surrounds the Kaaba, the holiest site in Islam and the direction of prayer (Qiblah) for all Muslims worldwide. The mosque can accommodate up to 4 million worshippers and features the Zamzam Well and Maqam Ibrahim.",
        imageSrc: "/hajj2.jpg",
        badge: "Days 5-9"
      },
      {
        title: "Mount Arafat – The Mount of Mercy",
        subtitle: "Site of the Day of Arafah",
        description: "Located 20km southeast of Makkah, Mount Arafat holds immense significance in Islamic history. This is where Prophet Muhammad (PBUH) delivered his farewell sermon and where pilgrims gather for the most important day of Hajj. The plain of Arafat symbolizes mercy, forgiveness, and the Day of Judgment.",
        imageSrc: "/hajj3.jpg",
        badge: "Day 8"
      },
      {
        title: "Mina Valley – The Valley of Tents",
        subtitle: "Site of the Stoning of the Devil",
        description: "A valley located between Makkah and Muzdalifah, Mina is where pilgrims stay during Hajj and perform the ritual of stoning the devil. The valley contains Jamarat Bridge where pilgrims throw pebbles at three pillars symbolizing the rejection of evil. The area transforms dramatically during Hajj season.",
        imageSrc: "/hajj4.jpg",
        badge: "Days 7 & 9"
      },
      {
        title: "Cave of Hira – Revelation Begins",
        subtitle: "Where the First Revelation Occurred",
        description: "Located on the northwest side of Mount Nur, the Cave of Hira is where Prophet Muhammad (PBUH) received the first revelation from Allah through Angel Gabriel. This cave marks the beginning of Islam and is a place of deep spiritual reflection. The cave is about 4km from Makkah city center.",
        imageSrc: "/hajj1.jpg",
        badge: "Day 6"
      },
      {
        title: "Jabal Al-Noor – Mount of Light",
        subtitle: "Home to the Cave of Hira",
        description: "Mount Noor, also known as Jabal Al-Noor, is the mountain where the Cave of Hira is located. This mountain holds great significance as it was the place where the Prophet Muhammad (PBUH) would retreat for meditation and worship. The mountain offers stunning views and a peaceful environment for contemplation.",
        imageSrc: "/hajj2.jpg",
        badge: "Day 6"
      }
    ];

    return (
      <>
        {/* Header */}
        <div className="bg-emerald-50 py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center border-b border-emerald-100">
          <h1 className="text-emerald-800 font-bold flex items-center gap-2 text-lg sm:text-xl">
            <Calendar size={20} /> Makkah Itinerary
          </h1>
        </div>

        {/* Accommodation Section */}
        <section className="p-4 sm:p-6 lg:p-8 bg-slate-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-emerald-800 font-bold text-lg sm:text-xl mb-1">Your Accommodation in Makkah</h2>
            <p className="text-emerald-600 text-xs sm:text-sm mb-4 sm:mb-6">Premium hotels near Al-Masjid Al-Haram</p>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="w-full lg:w-1/3">
                <img src="/api/placeholder/400/300" alt="Hotel" className="rounded-lg object-cover w-full h-40 sm:h-48 lg:h-56" />
              </div>
              <div className="w-full lg:w-2/3">
                <div className="flex text-yellow-400 mb-2">
                  <Star size={16} fill="currentColor"/>
                  <Star size={16} fill="currentColor"/>
                  <Star size={16} fill="currentColor"/>
                  <Star size={16} fill="currentColor"/>
                  <Star size={16} fill="currentColor"/>
                </div>
                <h3 className="font-bold text-emerald-900 text-lg sm:text-xl mb-2">Al-Haram District Hotel — Steps from the Kaaba</h3>
                <div className="flex items-center gap-1 text-emerald-700 text-xs sm:text-sm font-bold mb-3">
                  <MapPin size={14} /> Location
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Located in the prestigious Al-Haram district, just steps away from the Grand Mosque and the Holy Kaaba.
                  Experience unparalleled proximity to the holiest sites in Islam with modern amenities and traditional hospitality.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Kaaba View Available
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    24/7 Haram Access
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Prayer Call Notification
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Zamzam Water Service
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Section */}
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="py-4 sm:py-6 text-center">
              <h2 className="text-emerald-900 text-xl sm:text-2xl lg:text-3xl font-bold">Your Program in Makkah</h2>
              <p className="text-emerald-600 text-sm sm:text-base mt-2 font-medium">Sacred journey around the Holy Kaaba and sacred sites</p>
            </div>

            {makkahLandmarks.map((item, index) => (
              <ItineraryItemComponent key={index} {...item}/>
            ))}
          </div>
        </section>
      </>
    );
  };


  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-100 pb-20">
      
      {/* 2. HERO HEADER */}
      <section
        id="hero"
        className="pt-20 pb-44 px-6 text-white text-center relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hajj1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Ramadan Umrah 2026 <span className="text-emerald-400 block md:inline">Full Month of Ramadan - Medina & Makkah</span>
          </h1>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')]" />
      </section>


      {/* 3. SWIPER IMAGE GALLERY */}
      <section className="max-w-6xl mx-auto -mt-8 px-6 mb-12 relative z-20">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={15}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 6000, disableOnInteraction: false }}


          className="rounded-[2rem] overflow-hidden"
        >
            {gallery.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group">
                  <Image src={image.image} alt={image.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />

                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      {/* 4. PACKAGE CONFIGURATION */}
      <section id="config" className="max-w-5xl my-5  mx-auto px-6 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl  p-8 md:p-12 space-y-12 border-2 border-green-500">
          <div className="text-center border-b border-slate-50 pb-8">
             <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">{t('booking.package_details')}</div>
             <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('booking.ramadan_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            {/* Program Selector */}
            <div className={`p-8 rounded-[2rem] border-2 transition-all ${selectedProgram ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50'}`}>
              <div className="flex justify-between items-center mb-6">
                <span className="flex items-center gap-2 text-emerald-700 font-bold text-sm"><Clock size={18}/> {t('booking.selected_program')}</span>
                {selectedProgram && <button onClick={() => setSelectedProgram(null)} className="text-[10px] uppercase font-black bg-emerald-600 text-white px-3 py-1 rounded-lg">{t('booking.change')}</button>}
              </div>
              {!selectedProgram ? (
                <div className="space-y-3">
                  {programs.map(p => (
                    <button key={p.id} onClick={() => setSelectedProgram(p.name)} className="w-full p-5 bg-white rounded-2xl border border-slate-200 text-left hover:border-emerald-500 transition-all font-bold group">
                      <div className="text-slate-900 group-hover:text-emerald-700 transition-colors">{p.name}</div>
                      <div className="text-xs text-slate-400 font-medium mt-1">{p.description}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {(() => {
                    const program = programs.find(p => p.name === selectedProgram);
                    return program ? (
                      <div className="space-y-4">
                        <div className="font-black text-xl text-slate-900">{program.name}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Clock size={16} />
                              <span className="font-semibold">{t('booking.duration')}</span> {program.ApproximateDuration}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Plane size={16} />
                              <span className="font-semibold">{t('booking.departure')}</span> {program.departure}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Plane size={16} />
                              <span className="font-semibold">{t('booking.return')}</span> {program.return}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin size={16} />
                              <span className="font-semibold">{t('booking.from')}</span> {program.from}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin size={16} />
                              <span className="font-semibold">{t('booking.to')}</span> {program.to}
                            </div>
                            <div className="flex items-center gap-2 text-emerald-600 font-bold">
                              <Euro size={16} />
                              <span>{program.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-slate-700 font-medium mb-3">{program.description}</p>
                          <div className="space-y-2">
                            <div className="font-semibold text-slate-900 text-sm">{t('booking.highlights')}</div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {program.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                                  <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2 mt-4">
                            <div className="font-semibold text-slate-900 text-sm">{t('booking.includes')}</div>
                            <div className="flex flex-wrap gap-2">
                              {program.includes.map((item, i) => (
                                <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="font-black text-xl text-slate-900">{selectedProgram}</div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Room Selector */}
            <div className={`p-8 rounded-[2rem]  border-2 transition-all ${selectedRoom ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50'}`}>
              <div className="flex justify-between items-center mb-6">
                <span className="flex items-center gap-2 text-emerald-700 font-bold text-sm"><Hotel size={18}/> {t('booking.selected_room')}</span>
                {selectedRoom && <button onClick={() => setSelectedRoom(null)} className="text-[10px] uppercase font-black bg-emerald-600 text-white px-3 py-1 rounded-lg">{t('booking.change')}</button>}
              </div>
              {!selectedRoom ? (
                <div className="space-y-3">
                  {roomTypes.map(r => (
                    <button key={r.id} onClick={() => setSelectedRoom(r.name)} className="w-full p-5 bg-white rounded-2xl border border-slate-200 text-left hover:border-emerald-500 transition-all font-bold group">
                      <div className="text-slate-900 group-hover:text-emerald-700 transition-colors">{r.name}</div>
                      <div className="text-xs text-slate-400 font-medium mt-1">{r.description}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {(() => {
                    const room = roomTypes.find(r => r.name === selectedRoom);
                    return room ? (
                      <div className="space-y-4">
                        <div className="font-black text-xl text-slate-900">{room.name}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Users size={16} />
                              <span className="font-semibold">{t('booking.capacity')}</span> {room.capacity}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Eye size={16} />
                              <span className="font-semibold">{t('booking.view')}</span> {room.view}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <LayoutGrid size={16} />
                              <span className="font-semibold">{t('booking.size')}</span> {room.size}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold">
                              <Euro size={16} />
                              <span>{room.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-slate-700 font-medium mb-3">{room.description}</p>
                          <div className="space-y-2">
                            <div className="font-semibold text-slate-900 text-sm">{t('booking.features')}</div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {room.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                                  <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2 mt-4">
                            <div className="font-semibold text-slate-900 text-sm">{t('booking.amenities')}</div>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map((amenity, i) => (
                                <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="font-black text-xl text-slate-900">{selectedRoom}</div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Visa Selector */}
            <div className={`p-8 rounded-[2rem] border-2 transition-all ${selectedVisa ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50'}`}>
              <div className="flex justify-between items-center mb-6">
                <span className="flex items-center gap-2 text-emerald-700 font-bold text-sm"><FileText size={18}/> {t('booking.selected_visa')}</span>
                {selectedVisa && <button onClick={() => setSelectedVisa(null)} className="text-[10px] uppercase font-black bg-emerald-600 text-white px-3 py-1 rounded-lg">{t('booking.change')}</button>}
              </div>
              {!selectedVisa ? (
                <div className="space-y-3">
                  {visaTypes.map(v => (
                    <button key={v.id} onClick={() => setSelectedVisa(v.name)} className="w-full p-5 bg-white rounded-2xl border border-slate-200 text-left hover:border-emerald-500 transition-all font-bold group">
                      <div className="text-slate-900 group-hover:text-emerald-700 transition-colors">{v.name}</div>
                      <div className="text-xs text-slate-400 font-medium mt-1">{v.detail}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {(() => {
                    const visa = visaTypes.find(v => v.name === selectedVisa);
                    return visa ? (
                      <div className="space-y-4">
                        <div className="font-black text-xl text-slate-900">{visa.name}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Calendar size={16} />
                              <span className="font-semibold">{t('booking.validity')}</span> {visa.validity}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Clock size={16} />
                              <span className="font-semibold">{t('booking.stay_duration')}</span> {visa.stay_duration}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Clock size={16} />
                              <span className="font-semibold">{t('booking.processing')}</span> {visa.processing_time}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold">
                              <Euro size={16} />
                              <span>{visa.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-slate-700 font-medium mb-3">{visa.description}</p>
                          <div className="space-y-2">
                            <div className="font-semibold text-slate-900 text-sm">{t('booking.requirements')}</div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {visa.requirements.map((requirement, i) => (
                                <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                                  <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                                  {requirement}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2 mt-4">
                            <div className="font-semibold text-slate-900 text-sm">{t('booking.benefits')}</div>
                            <div className="flex flex-wrap gap-2">
                              {visa.benefits.map((benefit, i) => (
                                <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="font-black text-xl text-slate-900">{selectedVisa}</div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Hidden Content: Revealed After Selection */}
          {isConfigured ? (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-12">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 py-8 border-y border-slate-50">
                {[
                  { icon: <Clock />, label: t('booking.nights_total') },
                  { icon: <Hotel />, label: t('booking.nights_madinah') },
                  { icon: <Hotel />, label: t('booking.nights_makkah') },
                  { icon: <Plane />, label: t('booking.direct_flights') },
                  { icon: <Bus />, label: t('booking.vip_transfers') }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-500 font-bold text-xs">
                    <span className="text-emerald-500">{item.icon}</span> {item.label}
                  </div>
                ))}
              </div>

              <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed font-medium">
                  {t('booking.description')}
                </p>
                <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 mt-8">
                  <h4 className="text-emerald-900 font-black mb-4 flex items-center gap-2 italic underline decoration-emerald-200 underline-offset-4">{t('booking.why_choose_title')}</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-800 text-sm font-bold">
                    <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.feature_1')}</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.feature_2')}</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.feature_3')}</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.feature_4')}</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  const params = new URLSearchParams({
                    program: selectedProgram || '',
                    room: selectedRoom || '',
                    visa: selectedVisa || ''
                  });
                  window.location.href = `/umrah/collective/${window.location.pathname.split('/').pop()}/booking?${params.toString()}`;
                }}
                className="w-full bg-[#1B3C33] text-white py-6 rounded-[2rem] font-black text-xl hover:bg-emerald-900 transition-all shadow-2xl shadow-emerald-900/20 flex items-center justify-center gap-3"
              >
                <CheckCircle size={24} /> {t('booking.confirm_book_now')}
              </button>
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
               <Info className="mx-auto text-slate-300 mb-4" size={40} />
               <p className="text-slate-400 font-bold max-w-xs mx-auto">{t('booking.complete_selection_message')}</p>
            </div>
          )}
        </div>
      </section>


      {/* 6. Medina Details */}
      <div id="madinah">
        {/* PackageDetails Component - Inline */}
        <MadinahItinerary />
      </div>

      {/* 7. Makkah Details */}
      <div id="makkah">
        <MakkahItinerary />
      </div>

      {/* 8. Terms & Policies */}
      <div id="policies">
        {/* PolicyPage Component - Inline */}
        <div className="w-full bg-white font-sans text-slate-800 border-t border-gray-100">
        {/* Policy Header */}
        <div className="w-full bg-emerald-50/50 py-6 px-4 md:px-12 border-b border-emerald-100 text-center">
          <h1 className="text-2xl font-bold text-emerald-900">Price Policy, Payment Methods & Cancellation Policy</h1>
          <p className="text-emerald-700 text-sm mt-2 font-medium">SabilHajj Platform — Transparent Pricing & Clear Terms</p>
        </div>

        <div className="w-full px-4 md:px-12 py-10 max-w-7xl mx-auto">
          <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-4xl mx-auto">
            At SabilHajj, we believe in complete transparency in our pricing and policies.
            Our payment structure and cancellation terms are designed to protect both pilgrims and service quality.
          </p>

          {/* Policy Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                title: "1. Payment Policy - Umrah Packages",
                icon: <CreditCard className="text-emerald-700" size={20} />,
                content: "We facilitate payment for our customers through a simple and clear installment system that ensures complete comfort and full transparency.",
                list: [
                  "First Payment (50%) - Upon Booking: Confirming the package and starting visa and hotel procedures",
                  "Second Payment (25%) - After 15 days: Confirming hotel arrangements and essential services",
                  "Third Payment (25%) - 30 days before travel: Completing the amount and issuing final travel tickets"
                ],
                footer: "All payments are processed securely through approved payment methods."
              },
              {
                id: 2,
                title: "2. Visa Refund Policy",
                icon: <FileText className="text-emerald-700" size={20} />,
                content: "Visa processing involves specific regulations and fees that affect refund policies:",
                list: [
                  "Once the visa is issued, its value cannot be refunded",
                  "Visa fees are deducted from any amount paid",
                  "Processing fees are non-refundable regardless of cancellation timing"
                ],
                footer: "Visa regulations are subject to the issuing country's policies and cannot be modified."
              },
              {
                id: 3,
                title: "3. Flight Tickets Refund Policy",
                icon: <Plane className="text-emerald-700" size={20} />,
                content: "Flight ticket refunds are governed by airline policies and fare conditions:",
                list: [
                  "Refund policy depends on the terms and conditions of the airline through which the booking was made",
                  "Cancellation or change fees are applied according to each airline's system",
                  "Some tickets may be non-refundable depending on the booked class"
                ],
                footer: "Airline policies vary and are beyond our direct control."
              },
              {
                id: 4,
                title: "4. Hotel Accommodation Refund Policy",
                icon: <Building className="text-emerald-700" size={20} />,
                content: "Hotel cancellation policies depend on booking terms and timing:",
                list: [
                  "Full refund is available if cancellation is requested 20 days before the trip date",
                  "Cancellations made less than 20 days in advance may incur deductions depending on hotel availability and provider policy",
                  "Special rates and packages may have different cancellation terms"
                ],
                footer: "Hotel policies are set by individual properties and booking platforms."
              },
              {
                id: 5,
                title: "5. Cancellation Processing",
                icon: <AlertCircle className="text-emerald-700" size={20} />,
                content: "All cancellation requests are handled with care and transparency:",
                list: [
                  "Cancellation requests are processed within a reasonable time frame",
                  "Customers are notified of the final refund percentage before processing",
                  "Refunds are issued to the original payment method within 7-14 business days",
                  "Processing fees may apply depending on the cancellation timing"
                ],
                footer: "We strive to minimize financial impact while maintaining service quality."
              }
            ].map((section) => (
              <div key={section.id} className="p-6 rounded-xl border border-slate-100 bg-slate-50/30 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-lg font-bold text-emerald-900">{section.title}</h2>
                </div>
                <p className="text-sm text-slate-700 mb-4 leading-relaxed">{section.content}</p>
                <ul className="space-y-2 mb-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <ShieldCheck className="text-emerald-600 mt-1 shrink-0" size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {section.footer && (
                  <div className="pt-3 border-t border-slate-200 mt-auto italic text-xs text-slate-500">
                    {section.footer}
                  </div>
                )}
              </div>
            ))}

            {/* Transparency & Consent Box */}
            <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/30 lg:col-span-2">
              <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Info size={20} /> 6. Important Financial Terms & Transparency Policy
              </h2>
              <p className="text-sm text-slate-700 mb-3">Completing the booking through SabilHajj constitutes explicit understanding of:</p>
              <div className="flex flex-wrap gap-4">
                {["Payment schedule and deadlines", "Cancellation and refund policies", "Processing fees and charges", "Third-party provider terms"].map((item, i) => (
                  <span key={i} className="bg-white px-3 py-1 rounded-full border border-emerald-100 text-xs text-emerald-800 font-medium">
                    • {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Commitment */}
          <div className="mt-16 text-center border-t border-slate-100 pt-10">
            <h3 className="text-xl font-bold text-emerald-900 mb-6">Our Financial Commitment to Pilgrims</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Clear pricing with no hidden fees",
                "Flexible payment installments",
                "Fair cancellation policies",
                "Transparent refund processing"
              ].map((text, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-xs font-medium text-slate-600">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 opacity-60">
              <p className="text-sm font-bold text-emerald-900">SabilHajj</p>
              <p className="text-xs text-slate-500">Global Islamic Travel Platform</p>
              <p className="text-xs font-bold text-emerald-800 mt-2 uppercase tracking-widest">
                Transparent Pricing • Fair Policies • Trust Built on Clarity
              </p>
            </div>
                   </div>
                 </div>
              </div>

      {/* 9. Responsibility Policy */}
      <div id="responsibility">
        {/* ResponsibilityPolicy Component - Inline */}
        <div className="w-full bg-white font-sans text-slate-800 border-t border-gray-100">
        {/* Policy Header */}
        <div className="w-full bg-emerald-50/50 py-6 px-4 md:px-12 border-b border-emerald-100 text-center">
          <h1 className="text-2xl font-bold text-emerald-900">Responsibility and Organization Policy</h1>
          <p className="text-emerald-700 text-sm mt-2 font-medium">SabilHajj Platform — SabilHajj</p>
        </div>

        <div className="w-full px-4 md:px-12 py-10 max-w-7xl mx-auto">
          <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-4xl mx-auto">
            SabilHajj is committed to providing an organized, transparent, and respectful religious travel experience,
            based on complete clarity in services and responsibilities, ensuring the pilgrim's rights and providing peace of mind.
          </p>

          {/* Policy Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                title: "1. Scope of Platform Commitments",
                icon: <ShieldCheckIcon className="text-emerald-700" size={20} />,
                content: "SabilHajj platform is committed to implementing the program as shown and announced within the selected package page, and this includes only the services mentioned within the program details, such as:",
                list: [
                  "Accommodation according to the specified category and location",
                  "Announced group transfers",
                  "Sites included in the program",
                  "Religious guidance and group accompaniment during Umrah performance"
                ],
                footer: "SabilHajj does not bear any commitment to services or requests not mentioned within the announced program."
              },
              {
                id: 2,
                title: "2. Airlines and External Providers",
                icon: <PlaneTakeoff className="text-emerald-700" size={20} />,
                content: "Some components of the trip depend on independent and approved providers (such as airlines, hotels, and transportation companies). SabilHajj therefore:",
                list: [
                  "Flight schedules, delays, cancellations, or modifications are subject to the terms and regulations of the operating airline",
                  "SabilHajj does not bear responsibility for circumstances beyond its control, such as: Weather conditions, Operational decisions of airlines, or Official/emergency decisions"
                ],
                footer: "SabilHajj is committed in all cases to informing the pilgrim and providing organizational support as much as possible without bearing direct responsibility for these situations."
              },
              {
                id: 3,
                title: "3. Nature of Group Programs",
                icon: <Users className="text-emerald-700" size={20} />,
                content: "All programs offered through SabilHajj are organized group programs, and are based on:",
                list: [
                  "Commitment to the announced schedule",
                  "Respecting the instructions of the guide and supervisors",
                  "Collective cooperation to ensure the smooth running of the trip"
                ],
                footer: "Any violation of these controls may affect the general organization without SabilHajj bearing responsibility for that."
              },
              {
                id: 4,
                title: "4. Individual Requests and Non-Included Services",
                icon: <UserPlus className="text-emerald-700" size={20} />,
                content: "In order to maintain the quality of organization and fairness among all group members at SabilHajj:",
                list: [
                  "Any requests or additional services outside the program framework (such as special arrangements, individual changes, or unannounced services) are not within SabilHajj's commitments",
                  "Any individual arrangements outside the program are made at the pilgrim's personal responsibility"
                ]
              },
              {
                id: 5,
                title: "5. Visas and Insurance",
                icon: <FileText className="text-emerald-700" size={20} />,
                content: "SabilHajj provides technical and organizational support to the pilgrim in visa procedures according to the selected type. Note that:",
                list: [
                  "The selected visa type (Umrah or tourist) may affect the nature of insurance, some services, and package cost",
                  "The official regulations approved by the competent authorities remain the final reference in all cases"
                ]
              }
            ].map((section) => (
              <div key={section.id} className="p-6 rounded-xl border border-slate-100 bg-slate-50/30 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-lg font-bold text-emerald-900">{section.title}</h2>
                </div>
                <p className="text-sm text-slate-700 mb-4 leading-relaxed">{section.content}</p>
                <ul className="space-y-2 mb-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="text-emerald-600 mt-1 shrink-0" size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {section.footer && (
                  <div className="pt-3 border-t border-slate-200 mt-auto italic text-xs text-slate-500">
                    {section.footer}
                  </div>
                )}
                 </div>
            ))}

            {/* Transparency & Consent Box */}
            <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/30 lg:col-span-2">
              <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Info size={20} /> 6. Transparency and Consent Policy
              </h2>
              <p className="text-sm text-slate-700 mb-3">Completing the booking through SabilHajj constitutes explicit consent from the pilgrim to:</p>
              <div className="flex flex-wrap gap-4">
                {["The details of the selected program", "Included and non-included services", "The responsibility and organization policy"].map((item, i) => (
                  <span key={i} className="bg-white px-3 py-1 rounded-full border border-emerald-100 text-xs text-emerald-800 font-medium">
                    • {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Commitment */}
          <div className="mt-16 text-center border-t border-slate-100 pt-10">
            <h3 className="text-xl font-bold text-emerald-900 mb-6">Our Commitment to the Pilgrim</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Do not make unfulfillable promises",
                "Do not burden the pilgrim with unclear commitments",
                "Work to organize the trip professionally and calmly",
                "Leave to the pilgrim what is most important: focusing on worship"
              ].map((text, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-xs font-medium text-slate-600">{text}</p>
                </div>
              ))}
              </div>

            <div className="mt-12 opacity-60">
              <p className="text-sm font-bold text-emerald-900">SabilHajj</p>
              <p className="text-xs text-slate-500">Global Islamic Travel Platform</p>
              <p className="text-xs font-bold text-emerald-800 mt-2 uppercase tracking-widest">
                Clear Organization • Defined Responsibility • Trust Built on Transparency
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      {/* 7. Makkah Details */}
      
      {/* Component Call - Only show when whole package is selected */}
      {isConfigured && (
        <StickyCTA
          selectedProgram={programs.find(p => p.name === selectedProgram) || null}
        />
      )}

      {/* Section Indicator */}
      <SectionIndicator />
      
      

      <style jsx global>{`
        /* Custom Scrollbar Styles */
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1B3C33; border-radius: 10px; }

        /* Swiper Custom Styles */
        .swiper-button-next,
        .swiper-button-prev {
          color: #065f46 !important;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          width: 40px !important;
          height: 40px !important;
          backdrop-filter: blur(4px);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
        }

        .swiper-pagination-bullet {
          background: #065f46 !important;
          opacity: 0.3;
        }

        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: #065f46 !important;
        }
      `}</style>
    </div>
  );
}