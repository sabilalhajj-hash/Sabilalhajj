'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {
  Plane, Hotel, FileText, UserCircle, MapPin, Search,
  Star, Clock, CheckCircle, User,
  Users, Share2, Eye, Bus, Info, Calendar, Plus, Minus,
  ArrowLeft, ShieldCheck, LayoutGrid,
  CreditCard, Building, AlertCircle,
  ShieldCheck as ShieldCheckIcon, PlaneTakeoff, UserPlus, Euro,
  Pencil, Trash2, X
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import StickyCTA from '@/components/Umrah/StickyCTA';
import SectionIndicator from '@/components/SectionIndicator';
import { generateBookingReceiptPdf } from '@/lib/pdfReceipt';

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }

  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>)
      .filter((item): item is string => typeof item === 'string')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }

  return [];
};

const gallery = [
  { id: '1', image: '/hajj1.jpg', alt: 'Gallery For Hajj images1' },
  { id: '2', image: '/hajj2.jpg', alt: 'Gallery For Hajj images2' },
  { id: '3', image: '/hajj3.jpg', alt: 'Gallery For Hajj images3' },
  { id: '4', image: '/hajj4.jpg', alt: 'Gallery For Hajj images4' }
];

export default function CollectivePlanClient() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [passengerCount, setPassengerCount] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const params = useParams();
  const planSlug = params.plan as string;
  const [user, setUser] = useState<{ id: string; email: string; role?: string } | null>(null);
  const [savingBooking, setSavingBooking] = useState(false);
  const [itineraryView, setItineraryView] = useState<'madinah' | 'makkah' | null>(null);

  // Prevent SSR/client translation mismatch (hydration)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch current user on mount (to check if logged in)
  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else setUser(null);
      })
      .catch(() => setUser(null));
  }, []);

  // Auto-hide toggle overlay after 4 seconds
  useEffect(() => {
    if (toggle) {
      const timer = setTimeout(() => {
        setToggle(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [toggle]);

  // Passenger data - one object per passenger
  interface PassengerData {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    healthCondition: string;
  }

  const [passengersData, setPassengersData] = useState<PassengerData[]>([]);
  const [editingPassengerIndex, setEditingPassengerIndex] = useState<number | null>(null);

  // Validation state for each passenger
  const [validationErrors, setValidationErrors] = useState<Record<number, Record<string, string>>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const isConfigured = selectedProgram && selectedRoom && selectedVisa;

  const [packageData, setPackageData] = useState<{
    programs?: Array<Record<string, unknown>>;
    rooms?: Array<Record<string, unknown>>;
    visas?: Array<Record<string, unknown>>;
  } | null>(null);

  useEffect(() => {
    if (!planSlug) return;
    fetch(`/api/packages/slug/${encodeURIComponent(planSlug)}`)
      .then((res) => res.json())
      .then((data) => (data.package ? setPackageData(data.package) : setPackageData(null)))
      .catch(() => setPackageData(null));
  }, [planSlug]);

  // Initialize with exactly passengerCount passengers when configured (from step 1)
  useEffect(() => {
    if (!isConfigured || passengerCount == null || passengerCount < 1) return;
    setPassengersData((prev) => {
      if (prev.length === passengerCount) return prev;
      return Array.from({ length: passengerCount }, () => ({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        healthCondition: '',
      }));
    });
  }, [isConfigured, passengerCount]);

  // Handle passenger data change
  const handlePassengerChange = (index: number, field: keyof PassengerData, value: string) => {
    setPassengersData(prev => {
      const next = [...prev];
      if (!next[index]) return prev;
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    setValidationErrors(prev => ({
      ...prev,
      [index]: { ...(prev[index] || {}), [field]: '' }
    }));
  };

  const addPassenger = () => {
    setPassengersData(prev => [...prev, { name: '', lastName: '', email: '', phone: '', healthCondition: '' }]);
  };

  const deletePassenger = (index: number) => {
    setPassengersData(prev => prev.filter((_, i) => i !== index));
    setValidationErrors(prev => {
      const next: Record<number, Record<string, string>> = {};
      Object.entries(prev).forEach(([k, v]) => {
        const i = Number(k);
        if (i < index) next[i] = v;
        if (i > index) next[i - 1] = v;
      });
      return next;
    });
    setEditingPassengerIndex(prev => (prev === index ? null : prev != null && prev > index ? prev - 1 : prev));
  };

  const isPassengerFilled = (p: PassengerData) =>
    !!(p.name?.trim() && p.lastName?.trim() && p.phone?.trim());

  // Validation functions
  const validateName = (name: string): string => {
    const trimmed = name.trim();
    if (!trimmed) return t('validation.first_name_required');
    if (trimmed.length < 2) return t('validation.first_name_min_length');
    if (!/^[\p{L}\s'-]+$/u.test(trimmed)) return t('validation.first_name_letters_only');
    return '';
  };

  const validateLastName = (lastName: string): string => {
    const trimmed = lastName.trim();
    if (!trimmed) return t('validation.last_name_required');
    if (trimmed.length < 2) return t('validation.last_name_min_length');
    if (!/^[\p{L}\s'-]+$/u.test(trimmed)) return t('validation.last_name_letters_only');
    return '';
  };

  const validateEmail = (email: string): string => {
    const trimmed = (email || '').trim();
    if (!trimmed) return ''; // optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return t('validation.email_invalid');
    return '';
  };

  const validatePhone = (phone: string): string => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const normalized = (phone || '').replace(/\s+/g, '').trim();
    if (!normalized) return t('validation.phone_required');
    if (normalized.length < 8) return t('validation.phone_min_digits');
    if (normalized.length > 15) return t('validation.phone_max_digits');
    if (!phoneRegex.test(normalized)) return t('validation.phone_invalid');
    return '';
  };

  // Validate a single passenger (name, lastName, phone required; email optional)
  const validatePassenger = (p: PassengerData): Record<string, string> => ({
    name: validateName(p.name),
    lastName: validateLastName(p.lastName),
    email: validateEmail(p.email),
    phone: validatePhone(p.phone)
  });

  // Validate all passengers (must have exactly passengerCount entries, all required fields filled)
  const validateForm = () => {
    const requiredCount = passengerCount ?? 0;
    if (passengersData.length !== requiredCount) {
      setValidationErrors({});
      return false;
    }
    const allErrors: Record<number, Record<string, string>> = {};
    let valid = true;
    passengersData.forEach((p, i) => {
      const err = validatePassenger(p);
      allErrors[i] = err;
      if (Object.values(err).some(e => e !== '')) valid = false;
    });
    setValidationErrors(allErrors);
    return valid;
  };

  const [confirmed, setConfirmed] = useState(false);
  const [savedBookingId, setSavedBookingId] = useState<string | null>(null);

  // Run validation when hasAttemptedSubmit and passengersData change
  useEffect(() => {
    if (hasAttemptedSubmit) {
      validateForm();
    }
  }, [hasAttemptedSubmit, passengersData]);

  // Default visa types (useMemo must run on every render — before any early return)
  const defaultVisaTypes = useMemo(() => [
    {
      id: 'umrah',
      name: t('visa.overlay_umrah_name'),
      detail: t('visa.overlay_umrah_detail'),
      description: t('visa.overlay_umrah_description'),
      validity: t('visa.overlay_umrah_validity'),
      stay_duration: t('visa.overlay_umrah_stay_duration'),
      processing_time: t('visa.overlay_umrah_processing'),
      requirements: toStringArray(t('visa.overlay_umrah_requirements', { returnObjects: true })),
      benefits: toStringArray(t('visa.overlay_umrah_benefits', { returnObjects: true })),
    },
    {
      id: 'tourist',
      name: t('visa.overlay_tourist_name'),
      detail: t('visa.overlay_tourist_detail'),
      description: t('visa.overlay_tourist_description'),
      validity: t('visa.overlay_tourist_validity'),
      stay_duration: t('visa.overlay_tourist_stay_duration'),
      processing_time: t('visa.overlay_tourist_processing'),
      requirements: toStringArray(t('visa.overlay_tourist_requirements', { returnObjects: true })),
      benefits: toStringArray(t('visa.overlay_tourist_benefits', { returnObjects: true })),
    }
  ], [t]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans flex items-center justify-center p-8">
        <div className="animate-pulse text-emerald-700 font-semibold" suppressHydrationWarning>{t('common.loading')}</div>
      </div>
    );
  }

  // --- Program Data (from package API or static defaults) ---
  const defaultPrograms = [
    {
      id: 'ramadan-journey',
      name: t('programs.ramadan_journey.name'),
      ApproximateDuration: '15 Days',
      departure: 'March 1, 2024',
      return: 'March 15, 2024',
      from: 'Casablanca',
      to: 'Mecca & Medina',
      description: t('programs.ramadan_journey.description'),
      highlights: toStringArray(t('programs.ramadan_journey.highlights', { returnObjects: true })),
      includes: toStringArray(t('programs.ramadan_journey.includes', { returnObjects: true }))
    },
    {
      id: 'ramadan-last-ten',
      name: t('programs.ramadan_last_ten.name'),
      ApproximateDuration: '12 Days',
      departure: 'April 1, 2024',
      return: 'April 12, 2024',
      from: 'Casablanca',
      to: 'Mecca & Medina',
      description: t('programs.ramadan_last_ten.description'),
      highlights: toStringArray(t('programs.ramadan_last_ten.highlights', { returnObjects: true })),
      includes: toStringArray(t('programs.ramadan_last_ten.includes', { returnObjects: true }))
    },
    {
      id: 'long-stay',
      name: t('programs.long_stay.name'),
      ApproximateDuration: '30 Days',
      departure: 'May 1, 2024',
      return: 'May 30, 2024',
      from: 'Casablanca',
      to: 'Mecca & Medina',
      description: t('programs.long_stay.description'),
      highlights: toStringArray(t('programs.long_stay.highlights', { returnObjects: true })),
      includes: toStringArray(t('programs.long_stay.includes', { returnObjects: true }))
    }
  ];
  const programs = (packageData?.programs?.length) ? packageData.programs.map((p: Record<string, unknown>) => ({
    id: String(p.id ?? ''),
    name: String(p.name ?? ''),
    ApproximateDuration: String(p.ApproximateDuration ?? p.approximateDuration ?? ''),
    departure: String(p.departure ?? ''),
    return: String(p.return ?? ''),
    from: String(p.from ?? ''),
    to: String(p.to ?? ''),
    description: String(p.description ?? ''),
    highlights: Array.isArray(p.highlights) ? p.highlights.map(String) : [],
    includes: Array.isArray(p.includes) ? p.includes.map(String) : [],
  })) : defaultPrograms;

  const defaultRoomTypes = [
    {
      id: 'twin',
      name: t('rooms.twin.name'),
      size: t('rooms.twin.size'),
      description: t('rooms.twin.description'),
      features: toStringArray(t('rooms.twin.features', { returnObjects: true })),
      capacity: t('rooms.twin.capacity'),
      view: t('rooms.twin.view'),
      amenities: toStringArray(t('rooms.twin.amenities', { returnObjects: true }))
    },
    {
      id: 'triple',
      name: t('rooms.triple.name'),
      size: t('rooms.triple.size'),
      description: t('rooms.triple.description'),
      features: toStringArray(t('rooms.triple.features', { returnObjects: true })),
      capacity: t('rooms.triple.capacity'),
      view: t('rooms.triple.view'),
      amenities: toStringArray(t('rooms.triple.amenities', { returnObjects: true }))
    },
    {
      id: 'quad',
      name: t('rooms.quad.name'),
      size: t('rooms.quad.size'),
      description: t('rooms.quad.description'),
      features: toStringArray(t('rooms.quad.features', { returnObjects: true })),
      capacity: t('rooms.quad.capacity'),
      view: t('rooms.quad.view'),
      amenities: toStringArray(t('rooms.quad.amenities', { returnObjects: true }))
    },
    {
      id: 'penta',
      name: t('rooms.penta.name'),
      size: t('rooms.penta.size'),
      description: t('rooms.penta.description'),
      features: toStringArray(t('rooms.penta.features', { returnObjects: true })),
      capacity: t('rooms.penta.capacity'),
      view: t('rooms.penta.view'),
      amenities: toStringArray(t('rooms.penta.amenities', { returnObjects: true }))
    }
  ];
  const roomTypes = (packageData?.rooms?.length) ? packageData.rooms.map((r: Record<string, unknown>) => ({
    id: String(r.id ?? ''),
    name: String(r.name ?? ''),
    size: String(r.size ?? ''),
    description: String(r.description ?? ''),
    features: Array.isArray(r.features) ? r.features.map(String) : [],
    capacity: String(r.capacity ?? ''),
    view: String(r.view ?? ''),
    amenities: Array.isArray(r.amenities) ? r.amenities.map(String) : [],
  })) : defaultRoomTypes;

  const visaTypes = (packageData?.visas?.length) ? packageData.visas.map((v: Record<string, unknown>) => ({
    id: String(v.id ?? ''),
    name: String(v.name ?? ''),
    detail: String(v.detail ?? ''),
    description: String(v.description ?? ''),
    validity: String(v.validity ?? ''),
    stay_duration: String(v.stay_duration ?? ''),
    processing_time: String(v.processing_time ?? ''),
    requirements: Array.isArray(v.requirements) ? v.requirements.map(String) : [],
    benefits: Array.isArray(v.benefits) ? v.benefits.map(String) : [],
  })) : defaultVisaTypes;

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
        {/* Header */}
        <div className="bg-emerald-50 py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center border-b border-emerald-100">
          <h1 className="text-emerald-800 font-bold flex items-center gap-2 text-lg sm:text-xl">
            <Calendar size={20} /> {t('itinerary.madinah_header')}
          </h1>
        </div>

        {/* Accommodation Section */}
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

        {/* Program Section */}
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
        {/* Header */}
        <div className="bg-emerald-50 py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center border-b border-emerald-100">
          <h1 className="text-emerald-800 font-bold flex items-center gap-2 text-lg sm:text-xl">
            <Calendar size={20} /> {t('itinerary.makkah_header')}
          </h1>
        </div>

        {/* Accommodation Section */}
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
                  <Star size={16} fill="currentColor"/>
                  <Star size={16} fill="currentColor"/>
                  <Star size={16} fill="currentColor"/>
                  <Star size={16} fill="currentColor"/>
                  <Star size={16} fill="currentColor"/>
                </div>
                <h3 className="font-bold text-emerald-900 text-lg sm:text-xl mb-2">{t('itinerary.haram_hotel')}</h3>
                <div className="flex items-center gap-1 text-emerald-700 text-xs sm:text-sm font-bold mb-3">
                  <MapPin size={14} /> {t('itinerary.location')}
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {t('itinerary.haram_desc')}
                </p>
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

        {/* Program Section */}
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="py-4 sm:py-6 text-center">
              <h2 className="text-emerald-900 text-xl sm:text-2xl lg:text-3xl font-bold">{t('itinerary.your_program')} Makkah</h2>
              <p className="text-emerald-600 text-sm sm:text-base mt-2 font-medium">{t('itinerary.sacred_journey')}</p>
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


      {/* Passenger Count Overlay - Shows First */}
      {passengerCount === null && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-12 relative">
            <button
              type="button"
              onClick={() => router.push('/umrah/collective')}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label={t('common.cancel')}
            >
              <X size={22} />
            </button>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{t('overlay.step_one')}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                {t('overlay.how_many_passengers')}
              </h1>
              <p className="text-gray-600 mb-8">
                {t('overlay.passengers_description')}
              </p>

              {/* Custom Passenger Count Input */}
              <div className="mb-8 space-y-4">
                <label className="block text-left">
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">
                    {t('overlay.enter_passenger_count')}
                  </span>
                  <input 
                    type="number" 
                    min="1" 
                    id="customPassengers"
                    placeholder={t('overlay.enter_number_placeholder')} 
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold text-gray-700 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-200" 
                  />
                </label>
                <button
                  onClick={() => {
                    const input = document.getElementById('customPassengers') as HTMLInputElement;
                    const value = parseInt(input?.value || '0');
                    if (value > 0) {
                      setPassengerCount(value);
                    }
                  }}
                  className="w-full px-6 py-4 bg-emerald-600 text-white rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {t('common.confirm')}
                </button>
              </div>

              {/* Passenger Count Selection */}
              {/* <div className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <button
                    key={count}
                    onClick={() => setPassengerCount(count)}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold text-gray-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 group"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-600" />
                      {count} {count === 1 ? t('overlay.passenger') || 'Passenger' : t('overlay.passengers') || 'Passengers'}
                    </span>
                  </button>
                ))}
              </div> */}

              {/* More than 6 passengers option */}
              {/* <button
                onClick={() => {
                  const input = prompt(t('overlay.enter_passenger_count') || 'Enter number of passengers:');
                  if (input && /^\d+$/.test(input)) {
                    setPassengerCount(parseInt(input));
                  }
                }}
                className="w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-lg font-semibold text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200"
              >
                {t('overlay.more_passengers') || 'More than 6'}
              </button> */}
            </div>
          </div>
        </div>
      )}

      {/* Program Selection Overlay - Shows Second */}
      {passengerCount !== null && !selectedProgram && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white  rounded-3xl shadow-2xl max-w-4xl w-full h-[70%]  overflow-y-auto relative">
            <button
              type="button"
              onClick={() => router.push('/umrah/collective')}
              className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label={t('common.cancel')}
            >
              <X size={22} />
            </button>
            <div className="p-8 md:p-12">

              {/* Header */}
             
              <div className="text-center mb-8 ">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 mb-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{t('overlay.choose_program')}</span>
                </div>
                  <button
                  onClick={() => {
                    setSelectedProgram(null);
                    router.push('/umrah/collective');
                  }}
                  className="inline-flex bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 mb-4 items-center gap-2  text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('overlay.back_to_programs')}
                </button>


                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  {t('overlay.select_spiritual_journey')}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('overlay.choose_program_description')}
                </p>

                <div className="mt-8 text-center">
               
              </div>
              </div>

              {/* Program Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {programs.map((program, index) => (
                  <div
                    key={program.id}
                    onClick={() => setSelectedProgram(program.name)}
                    className="group  relative bg-gradient-to-br from-white to-emerald-50/30 border-2 border-emerald-100 rounded-2xl p-6 cursor-pointer hover:border-emerald-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                      {/* <div className="text-2xl font-black text-emerald-600">
                        {program.price}
                      </div> */}

                      {/* Highlights */}
                      <div className="text-sm text-gray-600">
                        {t('overlay.whatsapp_details')}
                      </div>
                      {/* <div className="space-y-2">
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
                      </div> */}

                      {/* CTA */}
                      <div className="pt-4">
                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                          {t('collective.select_this_program')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  {t('overlay.programs_footer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Room Selection Overlay */}
      {selectedProgram && !selectedRoom && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[80%] overflow-y-auto relative">
            <button
              type="button"
              onClick={() => router.push('/umrah/collective')}
              className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label={t('common.cancel')}
            >
              <X size={22} />
            </button>
            <div className="p-8 md:p-12">
         
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{t('overlay.choose_accommodation')}</span>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="inline-flex bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 mb-4 items-center gap-2  text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('overlay.back_to_programs')}
                </button>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  {t('overlay.select_room_type')}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('overlay.choose_accommodation_description')}
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
                      {t('overlay.option_number', { n: index + 1 })}
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

                      <div className="text-sm text-gray-600">
                        {t('overlay.whatsapp_details')}
                      </div>

                      {/* Price */}
                      {/* <div className="text-2xl font-black text-blue-600">
                        {room.price}
                      </div> */}

                      {/* View */}
                      {/* <div className="text-sm text-gray-600">
                        <span className="font-semibold">View:</span> {room.view}
                      </div> */}

                      {/* Key Features */}

                      
                      <div className="space-y-2">
                        
                        <ul className="text-sm text-gray-600 space-y-1">
                          {room.features.slice(0, 4).map((feature: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                          {/* {room.features.length > 2 && (
                            <li className="text-blue-600 font-medium">
                              +{room.features.length - 2} more...
                            </li>
                          )} */}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="pt-4">
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                          {t('overlay.select_this_room')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back Button */}
            
            </div>
          </div>
        </div>
      )}

      {/* Visa Selection Overlay */}
      {selectedProgram && selectedRoom && !selectedVisa && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[70vh] overflow-y-auto relative">
            <button
              type="button"
              onClick={() => router.push('/umrah/collective')}
              className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label={t('common.cancel')}
            >
              <X size={22} />
            </button>
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 rounded-full px-4 py-2 mb-4">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{t('overlay.choose_visa_type')}</span>
                </div>

                <button
                  onClick={() => setSelectedProgram(null)}
                  className="inline-flex bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 mb-4 items-center gap-2  text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('overlay.back_to_programs')}
                </button>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  {t('overlay.select_travel_visa')}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('overlay.choose_visa_description')}
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
                      {t('overlay.visa_number', { n: index + 1 })}
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


                      <div className="text-sm text-gray-600">
                        {t('overlay.whatsapp_details')}
                      </div>
                      {/* Price */}
                      {/* <div className="text-2xl font-black text-purple-600">
                        {visa.price}
                      </div> */}

                      {/* Validity */}
                      {/* <div className="text-sm text-gray-600">
                        <span className="font-semibold">{t('collective.validity')}:</span> {visa.validity}
                      </div> */}

                      {/* Key Benefits */}
                      <div className="space-y-2">
                        
                        <ul className="text-sm text-gray-600 space-y-1">
                          {visa.benefits.slice(0, 5).map((benefit: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                       
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="pt-4">
                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                          {t('visa.select_this_visa')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back Button */}
              {/* <div className="mt-8 text-center">
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('overlay.back_to_rooms')}
                </button>
              </div> */}
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
        // navigation
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
                  <h3 className="text-xl md:text-7xl font-bold">{t('package.hero_title')}</h3>
                  <p className="text-sm md:text-lg opacity-90">{t('package.hero_subtitle')}</p>
                  <p className="text-xs md:text-lg opacity-90">{t('package.hero_dates')}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>



      </section>


      {/* 3. SWIPER IMAGE GALLERY */}
    

      {/* 4. PACKAGE CONFIGURATION */}
      <section id="config" className="w-full my-5  mx-auto px-6 relative z-20">
        
        <div className="bg-white rounded-[3rem] shadow-2xl w-full  p-8 md:p-12 space-y-12 ">
          <div className="text-center border-b border-slate-50 pb-8">
             <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">{t('package.package_details')}</div>
             <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('package.ramadan_umrah_package')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Program Selector */}
            <div className={`p-8  rounded-[2rem] border-2 transition-all ${selectedProgram ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50'}`}>
              <div className="flex justify-between items-center mb-6">
                <span className="flex items-center gap-2 text-emerald-700 font-bold text-sm"><Clock size={18}/> {t('selection.selected_program')}</span>
                {selectedProgram && <button onClick={() => setSelectedProgram(null)} className="text-[10px] uppercase font-black bg-emerald-600 text-white px-3 py-1 rounded-full">{t('selection.change')}</button>}
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
                              <span className="font-semibold">{t('collective.duration')}:</span> {program.ApproximateDuration}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Plane size={16} />
                              <span className="font-semibold">{t('collective.departure')}:</span> {program.departure}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Plane size={16} />
                              <span className="font-semibold">{t('collective.return')}:</span> {program.return}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin size={16} />
                              <span className="font-semibold">From:</span> {program.from}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin size={16} />
                              <span className="font-semibold">{t('collective.to')}:</span> {program.to}
                            </div>
                            {/* <div className="flex items-center gap-2 text-emerald-600 font-bold">
                              <Euro size={16} />
                              <span>{program.price}</span>
                            </div> */}
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-slate-700 font-medium mb-3">{program.description}</p>
                          <div className="space-y-2">
                            <div className="font-semibold text-slate-900 text-sm">{t('collective.highlights')}</div>
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
                            <div className="font-semibold text-slate-900 text-sm">{t('collective.includes')}</div>
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
                              <span className="font-semibold">{t('collective.capacity')}:</span> {room.capacity}
                            </div>
                            {/* <div className="flex items-center gap-2 text-slate-600">
                              <Eye size={16} />
                              <span className="font-semibold">View:</span> {room.view}
                            </div> */}
                            {/* <div className="flex items-center gap-2 text-slate-600">
                              <LayoutGrid size={16} />
                              <span className="font-semibold">Size:</span> {room.size}
                            </div> */}
                          </div>
                          {/* <div className="space-y-2">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold">
                              <Euro size={16} />
                              <span>{room.price}</span>
                            </div>
                          </div> */}
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-slate-700 font-medium mb-3">{room.description}</p>
                          <div className="space-y-2">
                            <div className="font-semibold text-slate-900 text-sm">Features</div>
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
                            <div className="font-semibold text-slate-900 text-sm">{t('collective.amenities')}</div>
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
                              <span className="font-semibold">{t('collective.validity')}:</span> {visa.validity}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Clock size={16} />
                              <span className="font-semibold">{t('collective.stay_duration')}:</span> {visa.stay_duration}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Clock size={16} />
                              <span className="font-semibold">{t('collective.processing')}:</span> {visa.processing_time}
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-slate-700 font-medium mb-3">{visa.description}</p>
                          <div className="space-y-2">
                            <div className="font-semibold text-slate-900 text-sm">{t('collective.requirements')}</div>
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
                            <div className="font-semibold text-slate-900 text-sm">{t('collective.benefits')}</div>
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
             {/* User Data Form - Inline passenger inputs */}
             {isConfigured && (
               <div className="p-8 rounded-[2rem] border-2 border-emerald-500 transition-all">
                 <div className="mb-6">
                   <span className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-4">
                     <User size={18} /> {t('form.user_data')}
                   </span>
                   {passengerCount != null && passengerCount > 0 && (
                     <p className="text-slate-600 text-sm mb-4">
                       {t('form.passenger_count_required', { count: passengerCount })}
                     </p>
                   )}
                   <div className="space-y-4">
                     {passengersData.map((passenger, index) => {
                       const filled = isPassengerFilled(passenger);
                       const isEditing = editingPassengerIndex === index;
                       const showCollapsed = filled && !isEditing;
                       const displayName = filled ? [passenger.name, passenger.lastName].filter(Boolean).join(' ') : '';

                       return (
                       <div
                         key={index}
                         className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                           showCollapsed
                             ? 'p-4 bg-emerald-50 border-emerald-200'
                             : 'p-6 bg-slate-50 border-slate-200'
                         }`}
                       >
                         {showCollapsed ? (
                           <div className="flex items-center justify-between gap-4">
                             <div className="flex items-center gap-3 min-w-0">
                               <UserCircle size={24} className="text-emerald-600 shrink-0" />
                               <span className="font-bold text-emerald-900 truncate">{displayName}</span>
                             </div>
                             <div className="flex items-center gap-2 shrink-0">
                               <button
                                 type="button"
                                 onClick={() => setEditingPassengerIndex(index)}
                                 className="p-2 rounded-full text-emerald-700 hover:bg-emerald-100 transition-colors"
                                 title={t('form.modify')}
                               >
                                 <Pencil size={18} />
                               </button>
                               {(passengerCount == null || passengersData.length > passengerCount) && (
                                 <button
                                   type="button"
                                   onClick={() => deletePassenger(index)}
                                   className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                                   title={t('form.delete')}
                                 >
                                   <Trash2 size={18} />
                                 </button>
                               )}
                             </div>
                           </div>
                         ) : (
                           <>
                         <div className="flex items-center justify-between mb-4">
                           <h4 className="text-emerald-800 font-bold flex items-center gap-2">
                             <UserCircle size={18} />
                             {t('form.passenger')} {index + 1}
                             {passengerCount != null && (
                               <span className="text-slate-500 font-normal text-sm">
                                 ({index + 1} / {passengerCount})
                               </span>
                             )}
                           </h4>
                           {isEditing && (
                             <button
                               type="button"
                               onClick={() => setEditingPassengerIndex(null)}
                               className="text-sm px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200"
                             >
                               {t('form.done')}
                             </button>
                           )}
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black placeholder-gray-400">
                           <div className="space-y-2">
                             <label className="block text-sm font-medium text-emerald-800">{t('form.first_name')}</label>
                             <input
                               type="text"
                               placeholder={t('form.first_name_placeholder')}
                               value={passenger.name}
                               onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                               onBlur={() => {
                                 const err = validateName(passenger.name);
                                 setValidationErrors(prev => ({ ...prev, [index]: { ...(prev[index] || {}), name: err } }));
                               }}
                               className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 ${
                                 validationErrors[index]?.name ? 'border-red-500' : 'border-slate-200'
                               }`}
                             />
                             {validationErrors[index]?.name && <p className="text-red-500 text-xs">{validationErrors[index].name}</p>}
                           </div>
                           <div className="space-y-2">
                             <label className="block text-sm font-medium text-emerald-800">{t('form.last_name')}</label>
                             <input
                               type="text"
                               placeholder={t('form.last_name_placeholder')}
                               value={passenger.lastName}
                               onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                               onBlur={() => {
                                 const err = validateLastName(passenger.lastName);
                                 setValidationErrors(prev => ({ ...prev, [index]: { ...(prev[index] || {}), lastName: err } }));
                               }}
                               className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 ${
                                 validationErrors[index]?.lastName ? 'border-red-500' : 'border-slate-200'
                               }`}
                             />
                             {validationErrors[index]?.lastName && <p className="text-red-500 text-xs">{validationErrors[index].lastName}</p>}
                           </div>
                           <div className="space-y-2">
                             <label className="block text-sm font-medium text-emerald-800">{t('form.email')}</label>
                             <input
                               type="email"
                               placeholder={t('form.email_placeholder')}
                               value={passenger.email}
                               onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                               onBlur={() => {
                                 const err = validateEmail(passenger.email);
                                 setValidationErrors(prev => ({ ...prev, [index]: { ...(prev[index] || {}), email: err } }));
                               }}
                               className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 ${
                                 validationErrors[index]?.email ? 'border-red-500' : 'border-slate-200'
                               }`}
                             />
                             {validationErrors[index]?.email && <p className="text-red-500 text-xs">{validationErrors[index].email}</p>}
                           </div>
                           <div className="space-y-2">
                             <label className="block text-sm font-medium text-emerald-800">{t('form.phone')}</label>
                             <input
                               type="tel"
                               placeholder={t('form.phone_placeholder')}
                               value={passenger.phone}
                               onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                               onBlur={() => {
                                 const err = validatePhone(passenger.phone);
                                 setValidationErrors(prev => ({ ...prev, [index]: { ...(prev[index] || {}), phone: err } }));
                               }}
                               className={`w-full p-4 bg-[#F8FAFB] border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 ${
                                 validationErrors[index]?.phone ? 'border-red-500' : 'border-slate-200'
                               }`}
                               required={true}
                             />
                             {validationErrors[index]?.phone && <p className="text-red-500 text-xs">{validationErrors[index].phone}</p>}
                           </div>
                           <div className="space-y-2 md:col-span-2">
                             <label className="block text-sm font-medium text-emerald-800">{t('form.health_condition')}</label>
                             <input
                               type="text"
                               placeholder={t('form.health_condition_placeholder')}
                               value={passenger.healthCondition}
                               onChange={(e) => handlePassengerChange(index, 'healthCondition', e.target.value)}
                               className="w-full p-4 bg-[#F8FAFB] border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                             />
                           </div>
                         </div>
                           </>
                         )}
                       </div>
                     );
                     })}
                   </div>

                   {(passengerCount == null || passengersData.length < passengerCount) && (
                     <button
                       type="button"
                       onClick={addPassenger}
                       className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-emerald-400 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors"
                     >
                       <UserPlus size={18} />
                       {t('form.add_passenger')}
                     </button>
                   )}
                 </div>
               </div>
             )}

             

          {/* Hidden Content: Revealed After Selection */}
          {isConfigured ? (
            <div className="animate-in fade-in flex flex-col items-center slide-in-from-bottom-6 duration-700 space-y-12">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 py-8 border-y border-slate-50">
                {(() => {
                  const selectedProgramData = programs.find(p => p.name === selectedProgram);
                  if (!selectedProgramData) return [];

                  return [
                    { icon: <Clock />, label: `${t('collective.duration')}: ${selectedProgramData.ApproximateDuration}` },
                    { icon: <Plane />, label: `${t('collective.departure')}: ${selectedProgramData.departure}` },
                    { icon: <Plane />, label: `${t('collective.return')}: ${selectedProgramData.return}` },
                    { icon: <MapPin />, label: `${t('collective.from')}: ${selectedProgramData.from}` },
                    { icon: <MapPin />, label: `${t('collective.to')}: ${selectedProgramData.to}` }
                  ];
                })().map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-500 font-bold text-xs">
                    <span className="text-emerald-500">{item.icon}</span> {item.label}
                  </div>
                ))}
              </div>

              <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed font-medium">
                  {t('booking.complete_form_message')}
                </p>
                <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 mt-8">
                  <h4 className="text-emerald-900 font-black mb-4 flex items-center gap-2 italic underline decoration-emerald-200 underline-offset-4">{t('booking.why_choose_us')}</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-800 text-sm font-bold">
                    <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.features.expert_guidance')}</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.features.premium_accommodations')}</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.features.comprehensive_support')}</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16}/> {t('booking.features.spiritual_experience')}</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 w-full mt-6 p-4">
            <button
              type="button"
              onClick={() => setItineraryView(prev => prev === 'madinah' ? null : 'madinah')}
              className={`inline-flex items-center justify-center gap-2 min-w-[140px] px-6 py-3 rounded-xl font-semibold text-sm shadow-md active:scale-[0.98] transition-all duration-200 ${
                itineraryView === 'madinah'
                  ? 'bg-emerald-600 text-white shadow-emerald-900/20 ring-2 ring-emerald-400 ring-offset-2'
                  : 'bg-emerald-500 text-white shadow-emerald-900/10 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-900/15'
              }`}
            >
              <Info size={18} aria-hidden />
              {t('itinerary.madinah_header')}
            </button>
            <button
              type="button"
              onClick={() => setItineraryView(prev => prev === 'makkah' ? null : 'makkah')}
              className={`inline-flex items-center justify-center gap-2 min-w-[140px] px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98] transition-all duration-200 ${
                itineraryView === 'makkah'
                  ? 'bg-white text-emerald-700 border-2 border-emerald-500 shadow-lg ring-2 ring-emerald-400 ring-offset-2'
                  : 'bg-white text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50'
              }`}
            >
              <FileText size={18} aria-hidden />
              {t('itinerary.makkah_header')}
            </button>
          </div>

          {/* Itinerary big section: Madinah or Makkah program */}
          {itineraryView && (
            <section id="itinerary" className="w-full mt-8 mx-auto relative z-20">
              <div className="bg-white rounded-[3rem] shadow-2xl w-full overflow-hidden border border-slate-100">
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                  <span className="text-emerald-800 font-bold flex items-center gap-2">
                    <Calendar size={20} />
                    {itineraryView === 'madinah' ? t('itinerary.madinah_header') : t('itinerary.makkah_header')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setItineraryView(null)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                    aria-label={t('common.cancel')}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                  {itineraryView === 'madinah' && <MadinahItinerary />}
                  {itineraryView === 'makkah' && <MakkahItinerary />}
                </div>
              </div>
            </section>
          )}

              <div className="space-y-4  items-center   md:w-[40%]">
                <button
                  onClick={async () => {
                    if (confirmed) return;
                    setHasAttemptedSubmit(true);
                    if (!validateForm()) return;

                    setSavingBooking(true);
                    try {
                      const selectedProgramData = programs.find((p: { name: string }) => p.name === selectedProgram);
                      const selectedRoomData = roomTypes.find((r: { name: string }) => r.name === selectedRoom);
                      const selectedVisaData = visaTypes.find((v: { name: string }) => v.name === selectedVisa);

                      const res = await fetch('/api/bookings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({
                          packageSlug: planSlug,
                          packageType: 'umrah',
                          umrahType: 'collective',
                          userData: passengersData,
                          program: selectedProgramData ? { id: selectedProgramData.id, name: selectedProgram } : undefined,
                          room: selectedRoomData ? { id: selectedRoomData.id, name: selectedRoom } : undefined,
                          visa: selectedVisaData ? { id: selectedVisaData.id, name: selectedVisa } : undefined,
                        }),
                      });

                      if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.error || 'Failed to save booking');
                      }

                      const data = await res.json();
                      const bookingId = data?.booking?.id ?? null;
                      setSavedBookingId(bookingId);
                      setConfirmed(true);

                      // PDF receipt (reçu de réservation): logo + website name at top, user-entered info in body
                      await generateBookingReceiptPdf({
                        title: 'Sabil Al-Hajj',
                        subtitle: t('booking.receipt_title'),
                        logoUrl: '/sabilalhajj-removebg.png',
                        packageSlug: planSlug,
                        packageName: (packageData as { name?: string } | null)?.name,
                        programName: selectedProgram || '',
                        roomName: selectedRoom || '',
                        visaName: selectedVisa || '',
                        passengers: passengersData,
                        bookingId: bookingId ?? undefined,
                        bookingDate: new Date().toLocaleDateString(undefined, { dateStyle: 'long' }),
                        labels: {
                          receipt: t('booking.receipt_title'),
                          package: t('booking.receipt_package'),
                          program: t('booking.receipt_program'),
                          room: t('booking.receipt_room'),
                          visa: t('booking.receipt_visa'),
                          passengers: t('booking.receipt_passengers'),
                          passenger: t('booking.receipt_passenger'),
                          name: t('form.first_name'),
                          email: t('user.email'),
                          phone: t('user.phone'),
                          health: t('form.health_condition'),
                          date: t('user.booking_date'),
                          bookingId: t('booking.receipt_booking_id'),
                          thankYou: t('booking.receipt_thank_you'),
                          bookingDetails: t('booking.receipt_booking_details'),
                          infoEnteredByUser: t('booking.receipt_info_entered_by_user'),
                        },
                      });

                      // Booking is saved to DB and appended to Google Sheet (online spreadsheet) by the API
                      setToggle(true);
                    } catch (e) {
                      alert(e instanceof Error ? e.message : 'Failed to save booking');
                    } finally {
                      setSavingBooking(false);
                    }
                  }}
                  disabled={savingBooking || confirmed}
                  className={`w-full py-6 rounded-[2rem] font-black text-xl transition-all shadow-2xl flex items-center justify-center gap-3 disabled:cursor-not-allowed ${
                    confirmed
                      ? 'bg-slate-400 text-white shadow-slate-400/20 cursor-default'
                      : 'bg-[#1B3C33] text-white hover:bg-emerald-800 shadow-emerald-900/20 disabled:opacity-70'
                  }`}
                >
                  {savingBooking ? (
                    <>
                      <Clock size={24} className="animate-pulse" /> {t('common.loading')}
                    </>
                  ) : confirmed ? (
                    <>
                      <CheckCircle size={24} /> {t('booking.confirmed_we_will_reach')}
                    </>
                  ) : (
                    <>
                      <CheckCircle size={24} /> {t('booking.confirm_book_now')}
                    </>
                  )}
                </button>


              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
               <Info className="mx-auto text-slate-300 mb-4" size={40} />
               <p className="text-slate-400 font-bold max-w-xs mx-auto mb-6">{t('collective.complete_selection_message')}</p>
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
                  src="/sabilalhajj-removebg.png"
                  alt="Sabil Hajj Logo"
                  width={180}
                  height={180}
                  className="object-cover rounded-full"
                />
              </div>
            </div>

            {/* Main Message */}
            <h2 className='text-2xl font-bold text-emerald-900 mb-2'>
              {t('booking.confirmed_title')}
            </h2>

            <p className='text-emerald-700 text-sm mb-6 leading-relaxed'>
              {t('booking.confirmed_message')}
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
              {t('collective.prayer_verse_en')}
            </p>
          </div>
        </div>
      )}


      {/* 6. Medina Details */}
      {/* <div id="madinah">
        <MadinahItinerary />
      </div>

      {/* 7. Makkah Details */}
      {/* <div id="makkah">
        <MakkahItinerary />
      </div>  */}

      {/* 8. Terms & Policies - Simplified inline version */}
      {/* <div id="policies" className="w-full bg-white font-sans text-slate-800 border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-emerald-900 text-center mb-8">{t('policies.title')}</h2>
          <p className="text-slate-600 text-center mb-8">{t('policies.description')}</p>
        </div>
      </div> */}

      {/* Component Call - Only show when whole package is selected */}
      {isConfigured && (
        <StickyCTA
          selectedProgram={programs.find(p => p.name === selectedProgram) || null}
        />
      )}

   

      {/* Section Indicator */}
      {/* <SectionIndicator /> */}

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
