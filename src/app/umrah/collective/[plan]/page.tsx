'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {
  Plane, Hotel, FileText, UserCircle, MapPin, Search,
  Star, Clock, CheckCircle, User,
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
import ExcelExportButton from '@/components/ExcelExportButton';
// import 'swiper/css/pagination';



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
  const [toggle, setToggle] = useState(false);

  // Auto-hide toggle overlay after 4 seconds
  useEffect(() => {
    if (toggle) {
      const timer = setTimeout(() => {
        setToggle(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [toggle]);

  // User data state
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    zip: '',
    gender: ''
  });

  // Validation state
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    gender: '',
    zip: ''
  });
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const isConfigured = selectedProgram && selectedRoom && selectedVisa;

  // Handle user data input changes
  const handleUserDataChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation errors when user starts typing
    setValidationErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) return 'First name is required';
    if (name.trim().length < 2) return 'First name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return 'First name can only contain letters and spaces';
    return '';
  };

  const validateLastName = (lastName: string): string => {
    if (!lastName.trim()) return 'Last name is required';
    if (lastName.trim().length < 2) return 'Last name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(lastName.trim())) return 'Last name can only contain letters and spaces';
    return '';
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone: string): string => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phone) return 'Phone number is required';
    if (phone.length < 8) return 'Phone number must be at least 8 digits';
    if (phone.length > 15) return 'Phone number must be less than 15 digits';
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) return 'Please enter a valid phone number';
    return '';
  };

  const validateCity = (city: string): string => {
    if (!city.trim()) return 'City is required';
    if (city.trim().length < 2) return 'City must be at least 2 characters';
    return '';
  };

  const validateAddress = (address: string): string => {
    if (!address.trim()) return 'Address is required';
    if (address.trim().length < 5) return 'Address must be at least 5 characters';
    return '';
  };

  const validateGender = (gender: string): string => {
    if (!gender) return 'Please select a gender';
    return '';
  };

  const validateZip = (zip: string): string => {
    const zipRegex = /^[0-9]{4,10}$/;
    if (!zip) return 'Zip code is required';
    if (!zipRegex.test(zip.replace(/\s+/g, ''))) return 'Please enter a valid zip code (4-10 digits)';
    return '';
  };

  // Validate all fields
  const validateForm = () => {
    const errors = {
      name: validateName(userData.name),
      lastName: validateLastName(userData.lastName),
      email: validateEmail(userData.email),
      phone: validatePhone(userData.phone),
      city: validateCity(userData.city),
      address: validateAddress(userData.address),
      gender: validateGender(userData.gender),
      zip: validateZip(userData.zip)
    };

    setValidationErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  // Run validation on mount and when hasAttemptedSubmit changes
  useEffect(() => {
    if (hasAttemptedSubmit) {
      validateForm();
    }
  }, [userData.name, userData.lastName, userData.email, userData.phone, userData.city, userData.address, userData.gender, userData.zip, hasAttemptedSubmit]);

  // --- Translated Data ---
  const programs = [
    {
      id: 'ramadan-journey',
      name: t('booking.programs.ramadan_journey.name'),
      ApproximateDuration: t('booking.programs.ramadan_journey.duration'),
      departure: t('booking.programs.ramadan_journey.departure'),
      return: t('booking.programs.ramadan_journey.return'),
      from: t('booking.programs.ramadan_journey.from'),
      to: t('booking.programs.ramadan_journey.to'),
      description: t('booking.programs.ramadan_journey.description'),
      highlights: JSON.parse(t('booking.programs.ramadan_journey.highlights')),
      price: t('booking.programs.ramadan_journey.price'),
      includes: JSON.parse(t('booking.programs.ramadan_journey.includes'))
    },
    {
      id: 'ramadan-last-ten',
      name: t('booking.programs.ramadan_last_ten.name'),
      ApproximateDuration: t('booking.programs.ramadan_last_ten.duration'),
      departure: t('booking.programs.ramadan_last_ten.departure'),
      return: t('booking.programs.ramadan_last_ten.return'),
      from: t('booking.programs.ramadan_last_ten.from'),
      to: t('booking.programs.ramadan_last_ten.to'),
      description: t('booking.programs.ramadan_last_ten.description'),
      highlights: JSON.parse(t('booking.programs.ramadan_last_ten.highlights')),
      price: t('booking.programs.ramadan_last_ten.price'),
      includes: JSON.parse(t('booking.programs.ramadan_last_ten.includes'))
    },
    {
      id: 'long-stay',
      name: t('booking.programs.long_stay.name'),
      ApproximateDuration: t('booking.programs.long_stay.duration'),
      departure: t('booking.programs.long_stay.departure'),
      return: t('booking.programs.long_stay.return'),
      from: t('booking.programs.long_stay.from'),
      to: t('booking.programs.long_stay.to'),
      description: t('booking.programs.long_stay.description'),
      highlights: JSON.parse(t('booking.programs.long_stay.highlights')),
      price: t('booking.programs.long_stay.price'),
      includes: JSON.parse(t('booking.programs.long_stay.includes'))
    }
  ];
  const roomTypes = [
    {
      id: 'twin',
      name: t('booking.rooms.twin.name'),
      size: t('booking.rooms.twin.size'),
      price: t('booking.rooms.twin.price'),
      description: t('booking.rooms.twin.description'),
      features: JSON.parse(t('booking.rooms.twin.features')),
      capacity: t('booking.rooms.twin.capacity'),
      view: t('booking.rooms.twin.view'),
      amenities: JSON.parse(t('booking.rooms.twin.amenities'))
    },
    {
      id: 'triple',
      name: t('booking.rooms.triple.name'),
      size: t('booking.rooms.triple.size'),
      price: t('booking.rooms.triple.price'),
      description: t('booking.rooms.triple.description'),
      features: JSON.parse(t('booking.rooms.triple.features')),
      capacity: t('booking.rooms.triple.capacity'),
      view: t('booking.rooms.triple.view'),
      amenities: JSON.parse(t('booking.rooms.triple.amenities'))
    },
    {
      id: 'quad',
      name: t('booking.rooms.quad.name'),
      size: t('booking.rooms.quad.size'),
      price: t('booking.rooms.quad.price'),
      description: t('booking.rooms.quad.description'),
      features: JSON.parse(t('booking.rooms.quad.features')),
      capacity: t('booking.rooms.quad.capacity'),
      view: t('booking.rooms.quad.view'),
      amenities: JSON.parse(t('booking.rooms.quad.amenities'))
    },
    {
      id: 'penta',
      name: t('booking.rooms.penta.name'),
      size: t('booking.rooms.penta.size'),
      price: t('booking.rooms.penta.price'),
      description: t('booking.rooms.penta.description'),
      features: JSON.parse(t('booking.rooms.penta.features')),
      capacity: t('booking.rooms.penta.capacity'),
      view: t('booking.rooms.penta.view'),
      amenities: JSON.parse(t('booking.rooms.penta.amenities'))
    }
  ];
  const visaTypes = [
    {
      id: 'umrah',
      name: t('booking.visas.umrah.name'),
      detail: t('booking.visas.umrah.detail'),
      description: t('booking.visas.umrah.description'),
      validity: t('booking.visas.umrah.validity'),
      stay_duration: t('booking.visas.umrah.stay_duration'),
      processing_time: t('booking.visas.umrah.processing_time'),
      requirements: JSON.parse(t('booking.visas.umrah.requirements')),
      benefits: JSON.parse(t('booking.visas.umrah.benefits')),
      price: t('booking.visas.umrah.price')
    },
    {
      id: 'tourist',
      name: t('booking.visas.tourist.name'),
      detail: t('booking.visas.tourist.detail'),
      description: t('booking.visas.tourist.description'),
      validity: t('booking.visas.tourist.validity'),
      stay_duration: t('booking.visas.tourist.stay_duration'),
      processing_time: t('booking.visas.tourist.processing_time'),
      requirements: JSON.parse(t('booking.visas.tourist.requirements')),
      benefits: JSON.parse(t('booking.visas.tourist.benefits')),
      price: t('booking.visas.tourist.price')
    }
  ];

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
                <img src="https://via.placeholder.com/400x300/10b981/ffffff?text=Hotel" alt="Hotel" className="rounded-lg object-cover w-full h-40 sm:h-48 lg:h-56" />
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
                <img src="https://via.placeholder.com/400x300/10b981/ffffff?text=Hotel" alt="Hotel" className="rounded-lg object-cover w-full h-40 sm:h-48 lg:h-56" />
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

      {/* Program Selection Overlay - Shows First */}
      {!selectedProgram && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 mb-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{t('booking.choose_program')}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  {t('booking.select_spiritual_journey')}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('booking.choose_program_description')}
                </p>
              </div>

              {/* Program Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {programs.map((program, index) => (
                  <div
                    key={program.id}
                    onClick={() => setSelectedProgram(program.name)}
                    className="group relative bg-gradient-to-br from-white to-emerald-50/30 border-2 border-emerald-100 rounded-2xl p-6 cursor-pointer hover:border-emerald-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Program {index + 1}
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-emerald-200 transition-colors">
                        <span className="text-2xl">🕋</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {program.name}
                      </h3>

                      {/* Duration Badge */}
                      <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                        <span>⏱️</span>
                        {program.ApproximateDuration}
                      </div>

                      {/* Price */}
                      <div className="text-2xl font-black text-emerald-600">
                        {program.price}
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-gray-700">Highlights:</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {program.highlights.slice(0, 2).map((highlight: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                              {highlight}
                            </li>
                          ))}
                          {program.highlights.length > 2 && (
                            <li className="text-emerald-600 font-medium">
                              +{program.highlights.length - 2} more...
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="pt-4">
                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                          {t('booking.select_this_program')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  All programs include comprehensive spiritual guidance, premium accommodations, and seamless logistics.
                  <br />
                  You can change your selection later if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Room Selection Overlay */}
      {selectedProgram && !selectedRoom && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{t('booking.choose_accommodation')}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  {t('booking.select_room_type')}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('booking.choose_room_description')}
                </p>
              </div>

              {/* Room Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomTypes.map((room, index) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room.name)}
                    className="group relative bg-gradient-to-br from-white to-blue-50/30 border-2 border-blue-100 rounded-2xl p-6 cursor-pointer hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Option {index + 1}
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                        <span className="text-2xl">🏨</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {room.name}
                      </h3>

                      {/* Capacity Badge */}
                      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        <span>👥</span>
                        {room.capacity}
                      </div>

                      {/* Price */}
                      <div className="text-2xl font-black text-blue-600">
                        {room.price}
                      </div>

                      {/* View */}
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">View:</span> {room.view}
                      </div>

                      {/* Key Features */}
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-gray-700">Key Features:</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {room.features.slice(0, 2).map((feature: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                          {room.features.length > 2 && (
                            <li className="text-blue-600 font-medium">
                              +{room.features.length - 2} more...
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="pt-4">
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                          {t('booking.select_this_room')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('booking.back_to_programs')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visa Selection Overlay */}
      {selectedProgram && selectedRoom && !selectedVisa && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 rounded-full px-4 py-2 mb-4">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{t('booking.choose_visa_type')}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  {t('booking.select_travel_visa')}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('booking.choose_visa_description')}
                </p>
              </div>

              {/* Visa Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visaTypes.map((visa, index) => (
                  <div
                    key={visa.id}
                    onClick={() => setSelectedVisa(visa.name)}
                    className="group relative bg-gradient-to-br from-white to-purple-50/30 border-2 border-purple-100 rounded-2xl p-6 cursor-pointer hover:border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Visa {index + 1}
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
                        <span className="text-2xl">🛂</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {visa.name}
                      </h3>

                      {/* Detail */}
                      <div className="text-sm text-gray-600 font-medium">
                        {visa.detail}
                      </div>

                      {/* Price */}
                      <div className="text-2xl font-black text-purple-600">
                        {visa.price}
                      </div>

                      {/* Validity */}
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Validity:</span> {visa.validity}
                      </div>

                      {/* Key Benefits */}
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-gray-700">Key Benefits:</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {visa.benefits.slice(0, 2).map((benefit: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                          {visa.benefits.length > 2 && (
                            <li className="text-purple-600 font-medium">
                              +{visa.benefits.length - 2} more...
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="pt-4">
                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                          {t('booking.select_this_visa')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('booking.back_to_rooms')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. HERO HEADER */}
      <section
        id="hero"
        className="  text-white text-center relative overflow-hidden w-full"
        
      >
        <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={15}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className=" overflow-hidden h-[400px] md:h-[500px] w-full"
        >
          {gallery.map((image, index) => (
            <SwiperSlide key={index} className="relative">
              <Image
                src={image.image}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end md:p-8 text-white">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-7xl font-bold">Ramadan Umrah 2026</h3>
                  <p className="text-sm md:text-lg opacity-90">Full Month of Ramadan - Medina & Makkah</p>
                  <p className="text-xs md:text-lg opacity-90">18 February 2026 - 4 March 2026</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>



      </section>


      {/* 3. SWIPER IMAGE GALLERY */}
    

      {/* 4. PACKAGE CONFIGURATION */}
      <section id="config" className=" w-full my-5  mx-auto px-6 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl w-full  p-8 md:p-12 space-y-12 ">
          <div className="text-center border-b border-slate-50 pb-8">
             <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">{t('booking.package_details')}</div>
             <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('booking.ramadan_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                              {program.highlights.map((highlight: string, i: number) => (
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
                              {program.includes.map((item: string, i: number) => (
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
                              {room.features.map((feature: string, i: number) => (
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
                              {room.amenities.map((amenity: string, i: number) => (
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
                              {visa.requirements.map((requirement: string, i: number) => (
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
                              {visa.benefits.map((benefit: string, i: number) => (
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
             {/* User Data Form */}
             <div className="p-8 rounded-[2rem]  border-2 border-emerald-500 transition-all">
               <div className="mb-6">
                 <span className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-4"><User size={18}/> {t('booking.user_data')}</span>

                 {/* User Data Form - Horizontal Layout */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black placeholder-gray-400 w-full">
                   <div className="space-y-2">
                     <label className="block text-sm font-medium text-emerald-800">
                       {t('booking.first_name_label')} <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="text"
                       placeholder={t('booking.first_name_label')}
                       value={userData.name}
                       onChange={(e) => handleUserDataChange('name', e.target.value)}
                       onBlur={() => {
                         const error = validateName(userData.name);
                         setValidationErrors(prev => ({ ...prev, name: error }));
                       }}
                       className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-black placeholder-gray-400 ${
                         validationErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                       }`}
                     />
                     {validationErrors.name && (
                       <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                     )}
                   </div>
                   <div className="space-y-2">
                     <label className="block text-sm font-medium text-emerald-800">
                       Last Name <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="text"
                       placeholder="Last Name"
                       value={userData.lastName}
                       onChange={(e) => handleUserDataChange('lastName', e.target.value)}
                       onBlur={() => {
                         const error = validateLastName(userData.lastName);
                         setValidationErrors(prev => ({ ...prev, lastName: error }));
                       }}
                       className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-black placeholder-gray-400 ${
                         validationErrors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                       }`}
                     />
                     {validationErrors.lastName && (
                       <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
                     )}
                   </div>
                   <div className="space-y-2">
                     <label className="block text-sm font-medium text-emerald-800">
                       {t('booking.email_label')} <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="email"
                       placeholder={t('booking.email_label')}
                       value={userData.email}
                       onChange={(e) => handleUserDataChange('email', e.target.value)}
                       onBlur={() => {
                         const error = validateEmail(userData.email);
                         setValidationErrors(prev => ({ ...prev, email: error }));
                       }}
                       className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-black placeholder-gray-400 ${
                         validationErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                       }`}
                     />
                     {validationErrors.email && (
                       <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                     )}
                   </div>
                   <div className="space-y-2">
                     <label className="block text-sm font-medium text-emerald-800">
                       {t('booking.phone_label')} <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="tel"
                       placeholder={t('booking.phone_label')}
                       value={userData.phone}
                       onChange={(e) => handleUserDataChange('phone', e.target.value)}
                       onBlur={() => {
                         const error = validatePhone(userData.phone);
                         setValidationErrors(prev => ({ ...prev, phone: error }));
                       }}
                       className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-black placeholder-gray-400 ${
                         validationErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                       }`}
                     />
                     {validationErrors.phone && (
                       <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                     )}
                   </div>
                   <div className="space-y-2">
                     <label className="block text-sm font-medium text-emerald-800">
                       City <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="text"
                       placeholder="City"
                       value={userData.city}
                       onChange={(e) => handleUserDataChange('city', e.target.value)}
                       onBlur={() => {
                         const error = validateCity(userData.city);
                         setValidationErrors(prev => ({ ...prev, city: error }));
                       }}
                       className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-black placeholder-gray-400 ${
                         validationErrors.city ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                       }`}
                     />
                     {validationErrors.city && (
                       <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
                     )}
                   </div>
                   <div className="space-y-2">
                     <label className="block text-sm font-medium text-emerald-800">
                       Address <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="text"
                       placeholder="Address"
                       value={userData.address}
                       onChange={(e) => handleUserDataChange('address', e.target.value)}
                       onBlur={() => {
                         const error = validateAddress(userData.address);
                         setValidationErrors(prev => ({ ...prev, address: error }));
                       }}
                       className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-black placeholder-gray-400 ${
                         validationErrors.address ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                       }`}
                     />
                     {validationErrors.address && (
                       <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>
                     )}
                   </div>
                   <div className="space-y-2 md:col-span-2 lg:col-span-1">
                     <label className="block text-sm font-medium text-emerald-800">
                       {t('booking.gender_label')} <span className="text-red-500">*</span>
                     </label>
                     <select
                       value={userData.gender}
                       onChange={(e) => handleUserDataChange('gender', e.target.value)}
                       onBlur={() => {
                         const error = validateGender(userData.gender);
                         setValidationErrors(prev => ({ ...prev, gender: error }));
                       }}
                       className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-black ${
                         validationErrors.gender ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                       }`}
                     >
                       <option value="">{t('booking.select_gender')}</option>
                       <option value="male">{t('booking.male')}</option>
                       <option value="female">{t('booking.female')}</option>
                     </select>
                     {validationErrors.gender && (
                       <p className="text-red-500 text-xs mt-1">{validationErrors.gender}</p>
                     )}
                   </div>
                   <div className="space-y-2 md:col-span-2 lg:col-span-1">
                     <label className="block text-sm font-medium text-emerald-800">
                       Zip Code <span className="text-red-500">*</span>
                     </label>
                     <input
                       type="text"
                       placeholder="Zip Code"
                       value={userData.zip}
                       onChange={(e) => handleUserDataChange('zip', e.target.value)}
                       onBlur={() => {
                         const error = validateZip(userData.zip);
                         setValidationErrors(prev => ({ ...prev, zip: error }));
                       }}
                       className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder-gray-400 ${
                         validationErrors.zip ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                       }`}
                     />
                     {validationErrors.zip && (
                       <p className="text-red-500 text-xs mt-1">{validationErrors.zip}</p>
                     )}
                   </div>
                 </div>
               </div>
             </div>

          {/* Hidden Content: Revealed After Selection */}
          {isConfigured ? (
            <div className="animate-in fade-in flex flex-col items-center slide-in-from-bottom-6 duration-700 space-y-12">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 py-8 border-y border-slate-50">
                {(() => {
                  const selectedProgramData = programs.find(p => p.name === selectedProgram);
                  if (!selectedProgramData) return [];

                  return [
                    { icon: <Clock />, label: `${t('booking.duration')}: ${selectedProgramData.ApproximateDuration}` },
                    { icon: <Plane />, label: `${t('booking.departure')}: ${selectedProgramData.departure}` },
                    { icon: <Plane />, label: `${t('booking.return')}: ${selectedProgramData.return}` },
                    { icon: <MapPin />, label: `${t('booking.from')}: ${selectedProgramData.from}` },
                    { icon: <MapPin />, label: `${t('booking.to')}: ${selectedProgramData.to}` }
                  ];
                })().map((item, i) => (
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

              <div className="space-y-4  items-center   md:w-[40%]">
                <button
                  onClick={() => {
                    setHasAttemptedSubmit(true);
                    // Validate form fields
                    if (!validateForm()) {
                      return;
                    }

                    const params = new URLSearchParams({
                      program: selectedProgram || '',
                      room: selectedRoom || '',
                      visa: selectedVisa || ''
                    });
                    setToggle(true)
                    // window.location.href = `/umrah/collective/${window.location.pathname.split('/').pop()}/booking?${params.toString()}`;
                  }}
                  className="w-full bg-[#1B3C33] text-white py-6 rounded-[2rem] font-black text-xl hover:bg-emerald-800 transition-all shadow-2xl shadow-emerald-900/20 flex items-center justify-center gap-3"
                >
                  <CheckCircle size={24} /> {t('booking.confirm_book_now')}
                </button>

                {/* Export Selected Options Button */}
                <ExcelExportButton
                  userData={userData}
                  programs={selectedProgram ? [programs.find(p => p.name === selectedProgram)].filter(Boolean) : []}
                  roomTypes={selectedRoom ? [roomTypes.find(r => r.name === selectedRoom)].filter(Boolean) : []}
                  visaTypes={selectedVisa ? [visaTypes.find(v => v.name === selectedVisa)].filter(Boolean) : []}
                  selectedOptions={{
                    program: selectedProgram || undefined,
                    room: selectedRoom || undefined,
                    visa: selectedVisa || undefined
                  }}
                  buttonText="Export Selected Package Details"
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
               <Info className="mx-auto text-slate-300 mb-4" size={40} />
               <p className="text-slate-400 font-bold max-w-xs mx-auto mb-6">{t('booking.complete_selection_message')}</p>

               {/* Export Options Button */}
               <ExcelExportButton
                 userData={userData}
                 programs={selectedProgram ? [programs.find(p => p.name === selectedProgram)].filter(Boolean) : []}
                 roomTypes={selectedRoom ? [roomTypes.find(r => r.name === selectedRoom)].filter(Boolean) : []}
                 visaTypes={selectedVisa ? [visaTypes.find(v => v.name === selectedVisa)].filter(Boolean) : []}
                 selectedOptions={{
                   program: selectedProgram || undefined,
                   room: selectedRoom || undefined,
                   visa: selectedVisa || undefined
                 }}
                 buttonText="Export Package Options to Excel"
                 className="bg-blue-600 hover:bg-blue-700"
               />
            </div>
          )}
        </div>
      </section>

      {toggle && (
        <div className='fixed inset-0 flex items-center justify-center z-[1000] w-full h-full bg-black/70 backdrop-blur-sm'
        >
          <div className='bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md mx-4 text-center border border-emerald-100'>
            {/* Islamic Symbol */}
            <div className='mb-6'>
              <div className='w-20 h-20  rounded-full flex items-center justify-center mx-auto mb-4'>
                
                <Image
                  src="/logo-filtred.png"
                  alt="Sabil Hajj Logo"
                  width={180}
                  height={180}
                  className="object-cover rounded-full"
                />
              </div>
            </div>

            {/* Main Message */}
            <h2 className='text-2xl font-bold text-emerald-900 mb-2'>
              Booking Confirmed!
            </h2>

            <p className='text-emerald-700 text-sm mb-6 leading-relaxed'>
              Your Umrah journey has been reserved. May Allah accept your pilgrimage and grant you peace.
            </p>

            {/* Loading Animation */}
            <div className='flex justify-center mb-4'>
              <div className='flex space-x-2'>
                <div className='w-3 h-3 bg-emerald-500 rounded-full animate-bounce'></div>
                <div className='w-3 h-3 bg-emerald-500 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                <div className='w-3 h-3 bg-emerald-500 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>

            {/* Arabic Prayer */}
            <p className='text-emerald-600 text-md  font-medium'>
              إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا
            </p>
            <p className='text-slate-500 text-xs mt-1'>
              "Indeed, prayer has been decreed upon the believers a decree of specified times."
            </p>
          </div>
        </div>
      )}


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