'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import {
  ArrowLeft, Plane, Hotel, FileText, Calendar, Users, Star, CheckCircle, Minus, Plus,
  MapPin, Clock, User, Eye, LayoutGrid, CreditCard, Building, AlertCircle,
  ShieldCheck, ShieldCheck as ShieldCheckIcon, PlaneTakeoff, UserPlus, Euro, Info
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import StickyCTA from '@/components/Umrah/StickyCTA';
import SectionIndicator from '@/components/SectionIndicator';
import { exportBookingData } from '@/lib/excelExport';

const gallery = [
  { id: '1', image: '/hajj1.jpg', alt: 'Gallery For Hajj images1' },
  { id: '2', image: '/hajj2.jpg', alt: 'Gallery For Hajj images2' },
  { id: '3', image: '/hajj3.jpg', alt: 'Gallery For Hajj images3' },
  { id: '4', image: '/hajj4.jpg', alt: 'Gallery For Hajj images4' }
];

export const dynamic = 'force-dynamic';

export default function UmrahPersonalized() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedDays, setSelectedDays] = useState({ makka: 7, madina: 5 });
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
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

  const isConfigured = selectedPackage && selectedRoom && selectedVisa;

  // Handle user data input changes
  const handleUserDataChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setValidationErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) return t('validation.first_name_required');
    if (name.trim().length < 2) return t('validation.first_name_min_length');
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return t('validation.first_name_letters_only');
    return '';
  };

  const validateLastName = (lastName: string): string => {
    if (!lastName.trim()) return t('validation.last_name_required');
    if (lastName.trim().length < 2) return t('validation.last_name_min_length');
    if (!/^[a-zA-Z\s]+$/.test(lastName.trim())) return t('validation.last_name_letters_only');
    return '';
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return t('validation.email_required');
    if (!emailRegex.test(email)) return t('validation.email_invalid');
    return '';
  };

  const validatePhone = (phone: string): string => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phone) return t('validation.phone_required');
    if (phone.length < 8) return t('validation.phone_min_digits');
    if (phone.length > 15) return t('validation.phone_max_digits');
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) return t('validation.phone_invalid');
    return '';
  };

  const validateCity = (city: string): string => {
    if (!city.trim()) return t('validation.city_required');
    if (city.trim().length < 2) return t('validation.city_min_length');
    return '';
  };

  const validateAddress = (address: string): string => {
    if (!address.trim()) return t('validation.address_required');
    if (address.trim().length < 5) return t('validation.address_min_length');
    return '';
  };

  const validateGender = (gender: string): string => {
    if (!gender) return t('validation.gender_required');
    return '';
  };

  const validateZip = (zip: string): string => {
    const zipRegex = /^[0-9]{4,10}$/;
    if (!zip) return t('validation.zip_required');
    if (!zipRegex.test(zip.replace(/\s+/g, ''))) return t('validation.zip_invalid');
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

  useEffect(() => {
    if (hasAttemptedSubmit) {
      validateForm();
    }
  }, [userData.name, userData.lastName, userData.email, userData.phone, userData.city, userData.address, userData.gender, userData.zip, hasAttemptedSubmit]);

  const customizationOptions = [
    {
      icon: <Calendar size={20} />,
      title: t('umrah.flexible_duration'),
      description: t('umrah.flexible_desc')
    },
    {
      icon: <Hotel size={20} />,
      title: t('umrah.hotel_selection'),
      description: t('umrah.hotel_desc')
    },
    {
      icon: <Plane size={20} />,
      title: t('umrah.flight_options'),
      description: t('umrah.flight_desc')
    },
    {
      icon: <Users size={20} />,
      title: t('umrah.group_size'),
      description: t('umrah.group_desc')
    }
  ];

  const packages = [
    {
      id: 'essential',
      name: t('umrah.essential_package'),
      duration: "7 Days",
      features: [t('packages.flight'), t('packages.hotels'), t('packages.visa'), t('packages.guide')],
      recommended: false
    },
    {
      id: 'premium',
      name: t('umrah.premium_package'),
      duration: "10 Days",
      features: [t('packages.flight'), t('packages.hotels'), t('packages.visa'), t('packages.guide')],
      recommended: true
    },
    {
      id: 'luxury',
      name: t('umrah.luxury_package'),
      duration: "14 Days",
      features: [t('packages.flight'), t('packages.hotels'), t('packages.visa'), t('packages.guide')],
      recommended: false
    }
  ];

  const roomTypes = [
    {
      id: 'twin',
      name: t('rooms.twin.name'),
      size: t('rooms.twin.size'),
      description: t('rooms.twin.description'),
      features: t('rooms.twin.features', { returnObjects: true }),
      capacity: t('rooms.twin.capacity'),
      view: t('rooms.twin.view'),
      amenities: t('rooms.twin.amenities', { returnObjects: true })
    },
    {
      id: 'triple',
      name: t('rooms.triple.name'),
      size: t('rooms.triple.size'),
      description: t('rooms.triple.description'),
      features: t('rooms.triple.features', { returnObjects: true }),
      capacity: t('rooms.triple.capacity'),
      view: t('rooms.triple.view'),
      amenities: t('rooms.triple.amenities', { returnObjects: true })
    },
    {
      id: 'quad',
      name: t('rooms.quad.name'),
      size: t('rooms.quad.size'),
      description: t('rooms.quad.description'),
      features: t('rooms.quad.features', { returnObjects: true }),
      capacity: t('rooms.quad.capacity'),
      view: t('rooms.quad.view'),
      amenities: t('rooms.quad.amenities', { returnObjects: true })
    },
    {
      id: 'penta',
      name: t('rooms.penta.name'),
      size: t('rooms.penta.size'),
      description: t('rooms.penta.description'),
      features: t('rooms.penta.features', { returnObjects: true }),
      capacity: t('rooms.penta.capacity'),
      view: t('rooms.penta.view'),
      amenities: t('rooms.penta.amenities', { returnObjects: true })
    }
  ];

  const visaTypes = [
    {
      id: 'umrah',
      name: 'Umrah Visa',
      detail: 'Dedicated visa for religious pilgrimage',
      description: 'Official Umrah visa for performing religious rituals in Mecca and Medina.',
      validity: '90 Days',
      stay_duration: '30 Days',
      processing_time: '3-5 Business Days',
      requirements: ['Valid Passport', 'Application Form', 'Medical Certificate', 'Hotel Booking', 'Flight Tickets'],
      benefits: ['Religious Activities', 'Extended Stay', 'Group Activities', 'Guided Tours'],
    },
    {
      id: 'tourist',
      name: 'Tourist Visa',
      detail: 'General purpose tourist visa',
      description: 'Standard tourist visa for visiting Saudi Arabia with flexible travel options.',
      validity: '90 Days',
      stay_duration: '15 Days',
      processing_time: '2-3 Business Days',
      requirements: ['Valid Passport', 'Application Form', 'Hotel Booking', 'Bank Statements', 'Employment Letter'],
      benefits: ['Flexible Travel', 'Sightseeing', 'Cultural Experience', 'Modern Amenities'],
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
        title: t('itinerary.madinah_masjid'),
        description: t('itinerary.madinah_masjid_desc'),
        imageSrc: "/hajj1.jpg",
        badge: "1/5"
      },
      {
        title: t('itinerary.quba_mosque'),
        subtitle: t('itinerary.first_mosque'),
        description: t('itinerary.quba_mosque_desc'),
        imageSrc: "/hajj1.jpg",
        badge: "1/4"
      },
      {
        title: t('itinerary.qiblatain_mosque'),
        subtitle: t('itinerary.two_qiblahs'),
        description: t('itinerary.qiblatain_desc'),
        imageSrc: "/hajj1.jpg",
        badge: "1/4"
      }
    ];

    return (
      <>
        <div className="bg-emerald-50 py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center border-b border-emerald-100">
          <h1 className="text-emerald-800 font-bold flex items-center gap-2 text-lg sm:text-xl">
            <Calendar size={20} /> {t('itinerary.madinah_header')}
          </h1>
        </div>
        <section className="p-4 sm:p-6 lg:p-8 bg-slate-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-emerald-800 font-bold text-lg sm:text-xl mb-1">{t('itinerary.your_accommodation')}</h2>
            <p className="text-emerald-600 text-xs sm:text-sm mb-4 sm:mb-6">{t('itinerary.included_in_package')}</p>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="w-full lg:w-1/3">
                <img src="https://via.placeholder.com/400x300/10b981/ffffff?text=Hotel" alt="Hotel" className="rounded-full object-cover w-full h-40 sm:h-48 lg:h-56" />
              </div>
              <div className="w-full lg:w-2/3">
                <div className="flex text-yellow-400 mb-2"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                <h3 className="font-bold text-emerald-900 text-lg sm:text-xl mb-2">{t('itinerary.central_hotel')}</h3>
                <div className="flex items-center gap-1 text-emerald-700 text-xs sm:text-sm font-bold mb-3">
                  <MapPin size={14} /> {t('itinerary.location')}
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t('itinerary.central_area_desc')}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="py-4 sm:py-6 text-center">
              <h2 className="text-emerald-900 text-xl sm:text-2xl lg:text-3xl font-bold">{t('itinerary.your_program')} Madinah</h2>
              <p className="text-emerald-600 text-sm sm:text-base mt-2 font-medium">{t('itinerary.spiritual_journey')}</p>
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
        title: t('itinerary.sacred_mosque'),
        subtitle: t('itinerary.holy_kaaba'),
        description: t('itinerary.sacred_mosque_desc'),
        imageSrc: "/hajj2.jpg",
        badge: "Days 5-9"
      },
      {
        title: t('itinerary.mount_arafat'),
        subtitle: t('itinerary.day_arafah'),
        description: t('itinerary.mount_arafat_desc'),
        imageSrc: "/hajj3.jpg",
        badge: "Day 8"
      },
      {
        title: t('itinerary.mina_valley'),
        subtitle: t('itinerary.stoning_devil'),
        description: t('itinerary.mina_valley_desc'),
        imageSrc: "/hajj4.jpg",
        badge: "Days 7 & 9"
      },
      {
        title: t('itinerary.cave_of_hira'),
        subtitle: t('itinerary.first_revelation'),
        description: t('itinerary.cave_of_hira_desc'),
        imageSrc: "/hajj1.jpg",
        badge: "Day 6"
      },
      {
        title: t('itinerary.mount_noor'),
        subtitle: t('itinerary.hera_home'),
        description: t('itinerary.mount_noor_desc'),
        imageSrc: "/hajj2.jpg",
        badge: "Day 6"
      }
    ];

    return (
      <>
        <div className="bg-emerald-50 py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center border-b border-emerald-100">
          <h1 className="text-emerald-800 font-bold flex items-center gap-2 text-lg sm:text-xl">
            <Calendar size={20} /> {t('itinerary.makkah_header')}
          </h1>
        </div>
        <section className="p-4 sm:p-6 lg:p-8 bg-slate-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-emerald-800 font-bold text-lg sm:text-xl mb-1">{t('itinerary.makkah_accommodation')}</h2>
            <p className="text-emerald-600 text-xs sm:text-sm mb-4 sm:mb-6">{t('itinerary.premium_hotels')}</p>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="w-full lg:w-1/3">
                <img src="https://via.placeholder.com/400x300/10b981/ffffff?text=Hotel" alt="Hotel" className="rounded-full object-cover w-full h-40 sm:h-48 lg:h-56" />
              </div>
              <div className="w-full lg:w-2/3">
                <div className="flex text-yellow-400 mb-2">
                  <Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/>
                </div>
                <h3 className="font-bold text-emerald-900 text-lg sm:text-xl mb-2">{t('itinerary.haram_hotel')}</h3>
                <div className="flex items-center gap-1 text-emerald-700 text-xs sm:text-sm font-bold mb-3">
                  <MapPin size={14} /> {t('itinerary.location')}
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t('itinerary.haram_desc')}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {t('itinerary.kaaba_view')}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {t('itinerary.haram_access')}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {t('itinerary.prayer_notification')}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {t('itinerary.zamzam_service')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="py-4 sm:py-6 text-center">
              <h2 className="text-emerald-900 text-xl sm:text-2xl lg:text-3xl font-bold">{t('itinerary.your_program')} Makkah</h2>
              <p className="text-emerald-600 text-sm sm:text-base mt-2 font-medium">{t('itinerary.sacred_journey')}</p>
            </div>
            {makkahLandmarks.map((item, index) => (
              <ItineraryItemComponent key={index} {...item}/>
            ))}
          </div>
        </section> */}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-100 pb-20">
      {/* Hero Gallery Section */}
      <section className="text-white text-center relative overflow-hidden w-full">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={15}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="overflow-hidden h-[400px] md:h-[500px] w-full"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end md:p-8 text-white">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-7xl font-bold">{t('umrah.customize_title')}</h3>
                  <p className="text-sm md:text-lg opacity-90">{t('umrah.customize_subtitle')}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-20 px-4 bg-white/90">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm border border-emerald-200 rounded-full text-emerald-600 hover:text-emerald-700 hover:bg-white/95 mb-8 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={20} className="mr-2" />
            {t('umrah.back_to_umrah_plans')}
          </button>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('umrah.customize_title')}
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            {t('umrah.customize_subtitle')}
          </p>
        </div>

        {/* Customization Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {customizationOptions.map((option, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
              <div className="text-emerald-600 mb-4 flex justify-center">{option.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600 text-sm">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Duration Selector */}
        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('umrah.customize_duration')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">{t('umrah.days_makka')}</h4>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => setSelectedDays(prev => ({ ...prev, makka: Math.max(3, prev.makka - 1) }))}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-2xl font-bold text-emerald-600 min-w-[3rem]">{selectedDays.makka}</span>
                <button
                  onClick={() => setSelectedDays(prev => ({ ...prev, makka: Math.min(21, prev.makka + 1) }))}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-gray-600">{t('umrah.days_label')}: {selectedDays.makka}</p>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">{t('umrah.days_madina')}</h4>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => setSelectedDays(prev => ({ ...prev, madina: Math.max(3, prev.madina - 1) }))}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-2xl font-bold text-emerald-600 min-w-[3rem]">{selectedDays.madina}</span>
                <button
                  onClick={() => setSelectedDays(prev => ({ ...prev, madina: Math.min(14, prev.madina + 1) }))}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-gray-600">{t('umrah.days_label')}: {selectedDays.madina}</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 text-lg">
              {t('umrah.total_duration')}: <span className="font-bold text-emerald-600">{selectedDays.makka + selectedDays.madina} days</span>
            </p>
          </div>
        </div>

        {/* Package Options */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('umrah.choose_package')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white p-8 rounded-[2.5rem] shadow-xl border-2 transition-all duration-300 ${
                  pkg.recommended ? 'border-emerald-400 transform scale-105' : 'border-gray-100 hover:border-emerald-300'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-400 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                      <Star size={14} className="mr-1" />
                      {t('umrah.recommended')}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                  <p className="text-emerald-600 font-semibold">{pkg.duration}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPackage(pkg.name)}
                  className={`w-full py-3 rounded-full font-bold transition-colors ${
                    pkg.recommended
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {t('umrah.select_package')}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Package Configuration Section */}
        {selectedPackage && (
          <div className="bg-white rounded-[3rem] shadow-2xl w-full p-8 md:p-12 space-y-12 mb-16">
            <div className="text-center border-b border-slate-50 pb-8">
              <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">{t('package.package_details')}</div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedPackage}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Room Selector */}
              <div className={`p-8 rounded-[2rem] border-2 transition-all ${selectedRoom ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50'}`}>
                <div className="flex justify-between items-center mb-6">
                  <span className="flex items-center gap-2 text-emerald-700 font-bold text-sm"><Hotel size={18}/> {t('selection.selected_room')}</span>
                  {selectedRoom && <button onClick={() => setSelectedRoom(null)} className="text-[10px] uppercase font-black bg-emerald-600 text-white px-3 py-1 rounded-full">{t('selection.change')}</button>}
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
                                <span className="font-semibold">Capacity:</span> {room.capacity}
                              </div>
                              <div className="flex items-center gap-2 text-slate-600">
                                <Eye size={16} />
                                <span className="font-semibold">View:</span> {room.view}
                              </div>
                              <div className="flex items-center gap-2 text-slate-600">
                                <LayoutGrid size={16} />
                                <span className="font-semibold">Size:</span> {room.size}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              {/* Visa Selector */}
              <div className={`p-8 rounded-[2rem] border-2 transition-all ${selectedVisa ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50'}`}>
                <div className="flex justify-between items-center mb-6">
                  <span className="flex items-center gap-2 text-emerald-700 font-bold text-sm"><FileText size={18}/> {t('selection.selected_visa')}</span>
                  {selectedVisa && <button onClick={() => setSelectedVisa(null)} className="text-[10px] uppercase font-black bg-emerald-600 text-white px-3 py-1 rounded-full">{t('selection.change')}</button>}
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
                                <span className="font-semibold">Validity:</span> {visa.validity}
                              </div>
                              <div className="flex items-center gap-2 text-slate-600">
                                <Clock size={16} />
                                <span className="font-semibold">Stay Duration:</span> {visa.stay_duration}
                              </div>
                              <div className="flex items-center gap-2 text-slate-600">
                                <Clock size={16} />
                                <span className="font-semibold">Processing:</span> {visa.processing_time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              {/* Package Info */}
              <div className="p-8 rounded-[2rem] border-2 border-emerald-500 bg-emerald-50">
                <div className="mb-6">
                  <span className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-4"><Clock size={18}/> {t('selection.selected_program')}</span>
                  {selectedPackage && <button onClick={() => setSelectedPackage(null)} className="text-[10px] uppercase font-black bg-emerald-600 text-white px-3 py-1 rounded-full">{t('selection.change')}</button>}
                </div>
                {(() => {
                  const pkg = packages.find(p => p.name === selectedPackage);
                  return pkg ? (
                    <div className="space-y-4">
                      <div className="font-black text-xl text-slate-900">{pkg.name}</div>
                      <div className="text-emerald-600 font-semibold">{pkg.duration}</div>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                            <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null;
                })()}
              </div>
            </div>

            {/* User Data Form */}
            {isConfigured && (
              <div className="p-8 rounded-[2rem] border-2 border-emerald-500 transition-all">
                <div className="mb-6">
                  <span className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-4"><User size={18}/> {t('form.user_data')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black placeholder-gray-400 w-full">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-emerald-800">
                      {t('form.first_name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t('form.first_name_placeholder')}
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
                      {t('form.last_name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t('form.last_name_placeholder')}
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
                      {t('form.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder={t('form.email_placeholder')}
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
                      {t('form.phone')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder={t('form.phone_placeholder')}
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
                      {t('form.city')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t('form.city_placeholder')}
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
                      {t('form.address')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t('form.address_placeholder')}
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
                      {t('form.gender')} <span className="text-red-500">*</span>
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
                      <option value="">{t('form.select_gender')}</option>
                      <option value="male">{t('form.male')}</option>
                      <option value="female">{t('form.female')}</option>
                    </select>
                    {validationErrors.gender && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.gender}</p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-emerald-800">
                      {t('form.zip_code')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t('form.zip_code_placeholder')}
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

                {/* Booking Button */}
                <div className="mt-8 space-y-4 items-center">
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {t('booking.complete_form_message')}
                  </p>
                  <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                    <h4 className="text-emerald-900 font-black mb-4 flex items-center gap-2 italic underline decoration-emerald-200 underline-offset-4">{t('booking.why_choose_us')}</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-800 text-sm font-bold">
                      <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.features.expert_guidance')}</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.features.premium_accommodations')}</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.features.comprehensive_support')}</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.features.spiritual_experience')}</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setHasAttemptedSubmit(true);
                      if (!validateForm()) {
                        return;
                      }
                      const selectedPackages = selectedPackage ? [packages.find((p: any) => p.name === selectedPackage)].filter(Boolean) : [];
                      const selectedRoomTypes = selectedRoom ? [roomTypes.find((r: any) => r.name === selectedRoom)].filter(Boolean) : [];
                      const selectedVisaTypes = selectedVisa ? [visaTypes.find((v: any) => v.name === selectedVisa)].filter(Boolean) : [];
                      exportBookingData(selectedPackages, selectedRoomTypes, selectedVisaTypes, {
                        program: selectedPackage || undefined,
                        room: selectedRoom || undefined,
                        visa: selectedVisa || undefined
                      }, userData);
                      setToggle(true);
                    }}
                    className="w-full bg-[#1B3C33] text-white py-6 rounded-[2rem] font-black text-xl hover:bg-emerald-800 transition-all shadow-2xl shadow-emerald-900/20 flex items-center justify-center gap-3"
                  >
                    <CheckCircle size={24} /> {t('booking.confirm_book_now')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Booking Confirmation Modal */}
        {toggle && (
          <div className='fixed inset-0 flex items-center justify-center z-[1000] w-full h-full bg-black/70 backdrop-blur-sm'>
            <div className='bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md mx-4 text-center border border-emerald-100'>
              <div className='mb-6'>
                <div className='w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Image
                    src="/sabilalhajj-removebg.png"
                    alt="Sabil Hajj Logo"
                    width={180}
                    height={180}
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <h2 className='text-2xl font-bold text-emerald-900 mb-2'>
                {t('booking.confirmed_title')}
              </h2>
              <p className='text-emerald-700 text-sm mb-6 leading-relaxed'>
                {t('booking.confirmed_message')}
              </p>
              <div className='flex justify-center mb-4'>
                <div className='flex space-x-2'>
                  <div className='w-3 h-3 bg-emerald-500 rounded-full animate-bounce'></div>
                  <div className='w-3 h-3 bg-emerald-500 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                  <div className='w-3 h-3 bg-emerald-500 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              <p className='text-emerald-600 text-md font-medium'>
                إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا
              </p>
              <p className='text-slate-500 text-xs mt-1'>
                "Indeed, prayer has been decreed upon the believers a decree of specified times."
              </p>
            </div>
          </div>
        )}
      </div>
      </section>

      {/* Madinah Itinerary */}
      {/* {selectedPackage && (
        <div id="madinah">
          <MadinahItinerary />
        </div>
      )} */}

      {/* Makkah Itinerary */}
      {/* {selectedPackage && (
        <div id="makkah">
          <MakkahItinerary />
        </div>
      )} */}

      {/* Terms & Policies */}
      {/* {selectedPackage && (
        <div id="policies">
          <div className="w-full bg-white font-sans text-slate-800 border-t border-gray-100">
            <div className="w-full bg-emerald-50/50 py-6 px-4 md:px-12 border-b border-emerald-100 text-center">
              <h1 className="text-2xl font-bold text-emerald-900">{t('policies.title')}</h1>
              <p className="text-emerald-700 text-sm mt-2 font-medium">{t('policies.subtitle')}</p>
            </div>
            <div className="w-full px-4 md:px-12 py-10 max-w-7xl mx-auto">
              <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-4xl mx-auto">
                {t('policies.description')}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    id: 1,
                    title: t('policies.payment_policy_title'),
                    icon: <CreditCard className="text-emerald-700" size={20} />,
                    content: t('policies.payment_policy_content'),
                    list: t('policies.payment_policy_list', { returnObjects: true }),
                    footer: t('policies.payment_policy_footer')
                  },
                  {
                    id: 2,
                    title: t('policies.visa_refund_title'),
                    icon: <FileText className="text-emerald-700" size={20} />,
                    content: t('policies.visa_refund_content'),
                    list: t('policies.visa_refund_list', { returnObjects: true }),
                    footer: t('policies.visa_refund_footer')
                  },
                  {
                    id: 3,
                    title: t('policies.flight_refund_title'),
                    icon: <Plane className="text-emerald-700" size={20} />,
                    content: t('policies.flight_refund_content'),
                    list: t('policies.flight_refund_list', { returnObjects: true }),
                    footer: t('policies.flight_refund_footer')
                  },
                  {
                    id: 4,
                    title: t('policies.hotel_refund_title'),
                    icon: <Building className="text-emerald-700" size={20} />,
                    content: t('policies.hotel_refund_content'),
                    list: t('policies.hotel_refund_list', { returnObjects: true }),
                    footer: t('policies.hotel_refund_footer')
                  },
                  {
                    id: 5,
                    title: t('policies.cancellation_processing_title'),
                    icon: <AlertCircle className="text-emerald-700" size={20} />,
                    content: t('policies.cancellation_processing_content'),
                    list: t('policies.cancellation_processing_list', { returnObjects: true }),
                    footer: t('policies.cancellation_processing_footer')
                  }
                ].map((section) => (
                  <div key={section.id} className="p-6 rounded-xl border border-slate-100 bg-slate-50/30 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      {section.icon}
                      <h2 className="text-lg font-bold text-emerald-900">{section.title}</h2>
                    </div>
                    <p className="text-sm text-slate-700 mb-4 leading-relaxed">{section.content}</p>
                    <ul className="space-y-2 mb-4">
                      {section.list.map((item: string, i: number) => (
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
                <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/30 lg:col-span-2">
                  <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <Info size={20} /> {t('policies.important_terms_title')}
                  </h2>
                  <p className="text-sm text-slate-700 mb-3">{t('policies.important_terms_content')}</p>
                  <div className="flex flex-wrap gap-4">
                    {t('policies.important_terms_list', { returnObjects: true }).map((item: string, i: number) => (
                      <span key={i} className="bg-white px-3 py-1 rounded-full border border-emerald-100 text-xs text-emerald-800 font-medium">
                        • {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-16 text-center border-t border-slate-100 pt-10">
                <h3 className="text-xl font-bold text-emerald-900 mb-6">{t('policies.financial_commitment_title')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    t('policies.clear_pricing'),
                    t('policies.flexible_installments'),
                    t('policies.fair_policies'),
                    t('policies.transparent_processing')
                  ].map((text: string, i: number) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <p className="text-xs font-medium text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 opacity-60">
                  <p className="text-sm font-bold text-emerald-900">{t('policies.company_name')}</p>
                  <p className="text-xs text-slate-500">{t('policies.company_tagline')}</p>
                  <p className="text-xs font-bold text-emerald-800 mt-2 uppercase tracking-widest">
                    {t('policies.transparency_slogan')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Responsibility Policy */}
      {/* {selectedPackage && (
        <div id="responsibility">
          <div className="w-full bg-white font-sans text-slate-800 border-t border-gray-100">
            <div className="w-full bg-emerald-50/50 py-6 px-4 md:px-12 border-b border-emerald-100 text-center">
              <h1 className="text-2xl font-bold text-emerald-900">{t('responsibility.title')}</h1>
              <p className="text-emerald-700 text-sm mt-2 font-medium">{t('responsibility.subtitle')}</p>
            </div>
            <div className="w-full px-4 md:px-12 py-10 max-w-7xl mx-auto">
              <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-4xl mx-auto">
                {t('responsibility.description')}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    id: 1,
                    title: t('responsibility.scope_title'),
                    icon: <ShieldCheckIcon className="text-emerald-700" size={20} />,
                    content: t('responsibility.scope_content'),
                    list: t('responsibility.scope_list', { returnObjects: true }),
                    footer: t('responsibility.scope_footer')
                  },
                  {
                    id: 2,
                    title: t('responsibility.airlines_title'),
                    icon: <PlaneTakeoff className="text-emerald-700" size={20} />,
                    content: t('responsibility.airlines_content'),
                    list: t('responsibility.airlines_list', { returnObjects: true }),
                    footer: t('responsibility.airlines_footer')
                  },
                  {
                    id: 3,
                    title: t('responsibility.group_title'),
                    icon: <Users className="text-emerald-700" size={20} />,
                    content: t('responsibility.group_content'),
                    list: t('responsibility.group_list', { returnObjects: true }),
                    footer: t('responsibility.group_footer')
                  },
                  {
                    id: 4,
                    title: t('responsibility.requests_title'),
                    icon: <UserPlus className="text-emerald-700" size={20} />,
                    content: t('responsibility.requests_content'),
                    list: t('responsibility.requests_list', { returnObjects: true })
                  },
                  {
                    id: 5,
                    title: t('responsibility.visa_title'),
                    icon: <FileText className="text-emerald-700" size={20} />,
                    content: t('responsibility.visa_content'),
                    list: t('responsibility.visa_list', { returnObjects: true })
                  }
                ].map((section) => (
                  <div key={section.id} className="p-6 rounded-xl border border-slate-100 bg-slate-50/30 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      {section.icon}
                      <h2 className="text-lg font-bold text-emerald-900">{section.title}</h2>
                    </div>
                    <p className="text-sm text-slate-700 mb-4 leading-relaxed">{section.content}</p>
                    <ul className="space-y-2 mb-4">
                      {section.list.map((item: string, i: number) => (
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
                <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/30 lg:col-span-2">
                  <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <Info size={20} /> {t('responsibility.transparency_title')}
                  </h2>
                  <p className="text-sm text-slate-700 mb-3">{t('responsibility.transparency_content')}</p>
                  <div className="flex flex-wrap gap-4">
                    {t('responsibility.transparency_list', { returnObjects: true }).map((item: string, i: number) => (
                      <span key={i} className="bg-white px-3 py-1 rounded-full border border-emerald-100 text-xs text-emerald-800 font-medium">
                        • {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-16 text-center border-t border-slate-100 pt-10">
                <h3 className="text-xl font-bold text-emerald-900 mb-6">{t('responsibility.commitment_title')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {t('responsibility.commitment_list', { returnObjects: true }).map((text: string, i: number) => (
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
                    {t('responsibility.slogan')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Sticky CTA */}
      {isConfigured && (
        <StickyCTA
          selectedProgram={packages.find(p => p.name === selectedPackage) || null}
        />
      )}

      {/* Section Indicator */}
      <SectionIndicator />

      <style jsx global>{`
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