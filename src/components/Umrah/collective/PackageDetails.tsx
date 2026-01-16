import React from 'react';
import { MapPin, Star, Calendar, Info } from 'lucide-react';
import Image from 'next/image';
interface ItineraryItemProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  badge?: string;
}

const ItineraryItem = ({ title, subtitle, description, imageSrc, badge }: ItineraryItemProps) => (
  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 border-b border-gray-100 last:border-0">
    <div className="w-full lg:w-1/3">
      <div className="relative rounded-xl overflow-hidden shadow-sm ">
        <Image className="" src={imageSrc} alt={title} width={100} height={100} />
        
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
    <div className="w-full w-full mx-auto my-5 bg-white shadow-lg rounded-2xl overflow-hidden my-8 font-sans">

      {/* Medinah Itinerary */}

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
            <ItineraryItem key={index} {...item}/>
          ))}
        </div>
      </section>

      {/* Makkah Itinerary */}

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

          {/* Itinerary Section */}
          {makkahLandmarks.map((item, index) => (
            <ItineraryItem key={index} {...item}/>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MadinahItinerary;