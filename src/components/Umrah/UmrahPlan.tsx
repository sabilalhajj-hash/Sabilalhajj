import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Plane, Hotel, FileText, UserCircle } from 'lucide-react';
import UmrahPackageSelection from './UmrahPackageSelection';

const UmrahPlan = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showPackageSelection, setShowPackageSelection] = useState(false);

  const plans = [
    {
      title: t('umrah_plan.collective'),
      image: "/hajj1.jpg",
      route: "/umrah/collective",
      action: () => setShowPackageSelection(true),
      features: [
        { icon: <Plane size={18} />, label: t('umrah_plan.flight') },
        { icon: <Hotel size={18} />, label: t('umrah_plan.hotels') },
        { icon: <FileText size={18} />, label: t('umrah_plan.visa') },
        { icon: <UserCircle size={18} />, label: t('umrah_plan.guide') },
      ]
    },
    {
      title: t('umrah_plan.personalized'),
      subtitle: t('umrah_plan.personalized_subtitle'),
      image: "/hajj2.jpg",
      route: "/umrah/personalized",
      
      features: [
        { icon: <Plane size={18} />, label: t('umrah_plan.reserve_flight') },
        { icon: <Hotel size={18} />, label: t('umrah_plan.reserve_hotels') },
        { icon: <FileText size={18} />, label: t('umrah_plan.reserve_visa') },
      ]
    }
  ];

  // Show package selection if collective was clicked
  if (showPackageSelection) {
    return <UmrahPackageSelection/>;
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            {t('umrah_plan.plan_title')}
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('umrah_plan.plan_subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              onClick={() => router.push(plan.route)}
              className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl"
            >
              
              {/* Background Image */}
              <Image
                src={plan.image}
                alt={plan.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />

              {/* Logo Badge */}
              <div className="absolute top-4 right-4 w-18 h-14  backdrop-blur-sm rounded-lg flex items-center justify-center p-1.5 shadow-lg border border-white/20">
                <Image
                  src="/Logo-filtred.png"
                  alt="Sabil Al Hajj"
                  width={50}
                  height={32}
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">{plan.title}</h3>
                {plan.subtitle && (
                  <p className="text-gray-200 text-sm mb-6 leading-relaxed">{plan.subtitle}</p>
                )}

                {/* Features List */}
                <div className="grid grid-cols-2 gap-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-white/90 text-sm">
                      <span className="mr-2 p-1 bg-white/20 rounded-full">{feature.icon}</span>
                      <span className="font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>

                {/* Enhanced Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    plan.action ? plan.action() : router.push(plan.route);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-green-900 to-green-400 text-white rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {t('umrah_plan.view_more')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UmrahPlan;