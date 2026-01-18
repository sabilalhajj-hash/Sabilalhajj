'use client';


import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, Plane, Hotel, FileText,
  UserCircle, MapPin, Search, Calendar,
  Clock, ChevronRight, Globe, CheckCircle
} from 'lucide-react';

import UmrahPackageSelection from "./../../../components/Umrah/UmrahPackageSelection"

export const dynamic = 'force-dynamic';

export default function UmrahCollective() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", 
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
    "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", 
    "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", 
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", 
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", 
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", 
    "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", 
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
    "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", 
    "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", 
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", 
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", 
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", 
    "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", 
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", 
    "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", 
    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", 
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
    "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", 
    "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", 
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
    "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", 
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const features = [
    { icon: <Plane className="w-6 h-6" />, label: t('umrah.round_trip_flights'), detail: t('umrah.round_trip_detail') },
    { icon: <Hotel className="w-6 h-6" />, label: t('umrah.luxury_stay'), detail: t('umrah.luxury_detail') },
    { icon: <FileText className="w-6 h-6" />, label: t('umrah.visa_concierge'), detail: t('umrah.visa_detail') },
    { icon: <UserCircle className="w-6 h-6" />, label: t('umrah.expert_guides'), detail: t('umrah.expert_detail') },
  ];

  const itinerary = [
    { day: t('umrah.day_1'), title: t('umrah.day1_title'), description: t('umrah.day1_desc'), type: t('umrah.type_travel') },
    { day: t('umrah.day_2_4'), title: t('umrah.day24_title'), description: t('umrah.day24_desc'), type: t('umrah.type_spiritual') },
    { day: t('umrah.day_5'), title: t('umrah.day5_title'), description: t('umrah.day5_desc'), type: t('umrah.type_travel') },
    { day: t('umrah.day_6_8'), title: t('umrah.day68_title'), description: t('umrah.day68_desc'), type: t('umrah.type_spiritual') },
    { day: t('umrah.day_9'), title: t('umrah.day9_title'), description: t('umrah.day9_desc'), type: t('umrah.type_travel') },
  ];

  return (
    <div className="h-full bg-[#F8FAFC]">
      
      
      <UmrahPackageSelection/>

      
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #064E3B;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}