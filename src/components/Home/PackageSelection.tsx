import React, { useMemo } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Building2,
  Plane,
  Hotel,
  FileText,
  UserCircle,
  Clock,
  MapPin
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PackageSelection() {
  const { t } = useTranslation();
  const router = useRouter();

  const categories = useMemo(() => [
    { name: t('packages.umrah_packages'), icon: <Calendar className="w-6 h-6" /> },
    { name: t('packages.hajj'), icon: <Building2 className="w-6 h-6" /> },
    { name: t('packages.flight_booking'), icon: <Plane className="w-6 h-6" /> },
    { name: t('packages.hotel_booking'), icon: <Hotel className="w-6 h-6" /> },
    { name: t('packages.visa_services'), icon: <FileText className="w-6 h-6" /> },
    { name: t('packages.personalized_umrah'), icon: <UserCircle className="w-6 h-6" /> },
  ], [t]);

  const packages = useMemo(() => [
    {
      title: t('packages.hajj'),
      image: "/hajj1.jpg",
      features: [t('packages.flight'), t('packages.hotels'), t('packages.visa'), t('packages.guide')],
      path: "/hajj"
    },
    {
      title: t('packages.umrah_packages'),
      image: "/hajj2.jpg",
      features: [t('packages.flight'), t('packages.hotels'), t('packages.visa'), t('packages.guide')],
      path: "/umrah"
    },
    {
      title: t('packages.personalized_umrah'),
      subtitle: t('packages.personalized_subtitle'),
      image: "/hajj3.jpg",
      features: [t('packages.flight'), t('packages.hotels'), t('packages.visa'), t('packages.guide')],
      path: "/hajj"
    }
  ], [t]);
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Category Icons */}
        {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center w-32 h-28 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="text-emerald-700 mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 text-center px-2">
                {cat.name}
              </span>
            </div>
          ))}
        </div> */}

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('packages.choose_package')}</h2>
          <p className="text-gray-500">
            {t('packages.explore_packages')}
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className="relative h-[450px]  rounded-2xl overflow-hidden group shadow-xl"
              onClick={() => router.push(pkg.path)}
            >
              {/* Background Image */}
              <Image
                src={pkg.image}
                alt={pkg.title}
                fill={true}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Logo in corner */}
              <div className="absolute top-4 right-4 w-16 h-12  border-1  bg-gray/80 backdrop-blur-sm  rounded-lg flex items-center justify-center p-1">
                 <div className="relative w-full h-full">
                    <Image src="/Logo-filtred.png" alt="Logo" fill className="object-contain" sizes="64px" />
                 </div>
              </div>

              {/* Card Content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1 uppercase">{pkg.title}</h3>
                {pkg.subtitle && (
                  <p className="text-gray-300 text-xs mb-4">{pkg.subtitle}</p>
                )}

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-white text-sm">
                      <span className="mr-2">
                        {feature === "Flight" && <Plane size={14} />}
                        {feature === "Hotels" && <Hotel size={14} />}
                        {feature === "Visa" && <FileText size={14} />}
                        {feature === "Guide" && <UserCircle size={14} />}
                      </span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button  className="w-full py-2.5 border border-amber-400/50 text-white rounded-full text-sm font-semibold hover:bg-amber-400/20 transition-colors backdrop-blur-sm">
                  {t('packages.view_more')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}