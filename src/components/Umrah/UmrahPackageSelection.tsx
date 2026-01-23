'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Hotel,
  Plane,
  Bus,
  MapPin,
  Users,
  Eye,
  Share2,
  Check,
  Search,
  Globe,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

const UmrahPackageSelection = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // State Management
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Check if language is initialized (resolved)
  const isLanguageSetted = !!i18n.resolvedLanguage;

  // Helper function to translate country names
  const translateCountry = (countryName: string): string => {
    const translationKey = `countries.${countryName.toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '')}`;
    const translated = t(translationKey);
    // If translation exists and is different from the key, return it; otherwise return original
    return translated !== translationKey ? translated : countryName;
  };

  // Set client-side flag and load from localStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const savedCountry = localStorage.getItem('selectedCountry');
      if (savedCountry) {
        setSelectedCountry(savedCountry);
        setSearchValue(savedCountry);
        setShowModal(false);
      }
    } catch (error) {
      // Handle localStorage access errors (e.g., in private browsing mode)
      console.warn('Unable to access localStorage:', error);
    }
  }, []);

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
    country.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setShowModal(false);
    setSearchValue(country);
    // Save selected country to localStorage
    try {
      localStorage.setItem('selectedCountry', country);
    } catch (error) {
      console.warn('Unable to save to localStorage:', error);
    }
  };

  const handleChangeCountry = () => {
    setSelectedCountry('');
    setSearchValue('');
    setShowModal(true);
    // Remove from localStorage
    try {
      localStorage.removeItem('selectedCountry');
    } catch (error) {
      console.warn('Unable to remove from localStorage:', error);
    }
  };

  // Prevent rendering if language isn't ready or not on client side
  if (!isLanguageSetted || !isClient) return null;

  return (
    <>
      {/* 1. Country Selection Modal */}
      {showModal && !selectedCountry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
          <div className="relative bg-white w-full max-w-xl rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-[#064E3B] p-8 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold">{t('umrah.select_residence')}</h2>
              </div>
              <p className="text-emerald-100/80">{t('umrah.residence_subtitle')}</p>
            </div>

            <div className="p-6 flex flex-col flex-1 min-h-0">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('umrah.search_country')}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[40vh]">
                <div className="grid grid-cols-1 gap-2 pb-4">
                  {filteredCountries.map((country) => (
                    <button
                      key={country}
                      onClick={() => handleCountrySelect(country)}
                      className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
                    >
                      <span className="font-medium text-slate-700 group-hover:text-emerald-700">{translateCountry(country)}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Content (Shows only when country is selected) */}
      {selectedCountry && (
        <section className="py-16 px-4 bg-white min-h-screen">
          <div className="max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <button
                onClick={() => router.push("/umrah")}
                className="flex items-center text-gray-600 border border-emerald-100 rounded-lg px-4 py-2 hover:bg-emerald-50 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span className="text-sm">{t('umrah.back_to_umrah')}</span>
              </button>

              <button
                onClick={handleChangeCountry}
                className="flex items-center   text-gray-600 border border-blue-100 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors"
              >
                <Globe size={16} className="mr-2 m-4" />
                <span className="text-sm">{t('umrah.change_country')} ({translateCountry(selectedCountry)})</span>
              </button>
            </div>

            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-emerald-500 mb-4">
                {t('umrah.choose_package_title')}
              </h2>
              <p className="text-gray-900 font-bold max-w-3xl mx-auto">
                {t('umrah.choose_package_subtitle')} {translateCountry(selectedCountry)}
              </p>
            </div>

            {/* Package Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Card 1: Ramadan Umrah 2026 */}
              <div  onClick={() => router.push('/umrah/collective/ramadan-umrah-2026')}  className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col cursor-pointer hover:scale-95 transition-transform duration-300" >
                <div className="relative h-56">
                  <Image
                    src="/hajj1.jpg"
                    alt="Ramadan Umrah"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-amber-800/80 text-white text-[10px] px-3 py-1 rounded-md font-bold backdrop-blur-sm">
                      {t('umrah.premium')}
                    </span>
                    <span className="bg-white/80 text-gray-800 text-[10px] px-3 py-1 rounded-md font-bold backdrop-blur-sm">
                      {t('umrah.ramadan_package_title')}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 uppercase">{t('umrah.ramadan_package_title')}</h3>
                  <p className="text-emerald-600 font-bold text-sm mb-6">{t('umrah.select_program')}</p>

                  <div className="space-y-4 mb-8 text-gray-600">
                    <div className="flex items-center text-xs font-medium">
                      <Hotel className="text-emerald-500 mr-3" size={16} />
                      <span>{t('umrah.makkah_hotels')}</span>
                    </div>
                    <div className="flex items-center text-xs font-medium">
                      <Plane className="text-emerald-500 mr-3" size={16} />
                      <span>{t('umrah.direct_flights')}</span>
                    </div>
                    <div className="flex items-center text-xs font-medium">
                      <Bus className="text-emerald-500 mr-3" size={16} />
                      <span>{t('umrah.comfortable_transfers')}</span>
                    </div>
                    <div className="flex items-center text-xs font-medium">
                      <MapPin className="text-emerald-500 mr-3" size={16} />
                      <span>{t('umrah.guided_visits')}</span>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className="bg-emerald-50/50 rounded-lg py-2 flex items-center justify-center mb-4">
                    <Users size={14} className="text-gray-400 mr-2" />
                    <span className="text-[10px] text-gray-500 font-medium">
                      {t('umrah.registering_now', { count: 190 })}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push('/umrah/collective/ramadan-umrah-2026')}
                      className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all"
                    >
                      <Eye size={14} /> {t('umrah.view_details')}
                    </button>
                    <button className="bg-emerald-800 text-white p-2.5 rounded-lg hover:bg-emerald-900 transition-all">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Coming Soon */}
              {/* <div className="bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 overflow-hidden flex flex-col opacity-80 hover:scale-95 transition-transform duration-300">
                <div className="relative h-56 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">{t('umrah.coming_soon')}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center text-center">
                  <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase">{t('umrah.more_packages')}</h3>
                  <p className="text-gray-400 text-sm">{t('umrah.stay_tuned')}</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #064E3B; border-radius: 10px; }
      `}</style>
    </>
  );
};

export default UmrahPackageSelection;