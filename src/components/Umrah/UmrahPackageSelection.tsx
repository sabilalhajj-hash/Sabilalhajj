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
  Eye,
  Share2,
  Search,
  Globe,
  ChevronRight,
  Package
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface UmrahPackage {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  description: string | null;
  isActive: boolean;
}

const getValidImageUrl = (imageUrl: string | null | undefined): string => {
  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') return '/hajj1.jpg';
  const trimmed = imageUrl.trim();
  if (trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return trimmed.length > 0 ? `/${trimmed}` : '/hajj1.jpg';
};

const UmrahPackageSelection = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // State Management
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [sharedSlug, setSharedSlug] = useState<string | null>(null);

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

  // Fetch packages when country is selected (collective page: only collective packages)
  useEffect(() => {
    if (!selectedCountry) return;
    setPackagesLoading(true);
    fetch('/api/packages?type=collective')
      .then((res) => res.json())
      .then((data) => setPackages(data.packages ?? []))
      .catch(() => setPackages([]))
      .finally(() => setPackagesLoading(false));
  }, [selectedCountry]);

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

  const getPackageUrl = (slug: string) => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/umrah/collective/${slug}`;
  };

  const handleShare = async (pkg: UmrahPackage) => {
    const url = getPackageUrl(pkg.slug);
    const title = pkg.name;
    const text = pkg.description || t('umrah.share_package_text', { name: pkg.name });

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title,
          text: text.slice(0, 200),
          url,
        });
        setSharedSlug(pkg.slug);
        setTimeout(() => setSharedSlug(null), 2000);
      } else {
        await navigator.clipboard.writeText(url);
        setSharedSlug(pkg.slug);
        setTimeout(() => setSharedSlug(null), 2000);
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(url);
        setSharedSlug(pkg.slug);
        setTimeout(() => setSharedSlug(null), 2000);
      } catch {
        // fallback: open in new window so user can copy from address bar
        window.open(url, '_blank');
      }
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
                className="flex items-center text-gray-600 border border-emerald-100 rounded-full px-4 py-2 hover:bg-emerald-50 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span className="text-sm">{t('umrah.back_to_umrah')}</span>
              </button>

              <button
                onClick={handleChangeCountry}
                className="flex items-center   text-gray-600 border border-blue-100 rounded-full px-4 py-2 hover:bg-blue-50 transition-colors"
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
              {packagesLoading ? (
                <div className="col-span-full py-12 text-center text-gray-500">{t('common.loading')}</div>
              ) : packages.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">{t('umrah.no_packages')}</p>
                </div>
              ) : (
                packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col cursor-pointer hover:scale-95 transition-transform duration-300"
                  >
                    <div className="relative h-56">
                      <Image
                        src={getValidImageUrl(pkg.image)}
                        alt={pkg.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-amber-800/80 text-white text-[10px] px-3 py-1 rounded-md font-bold backdrop-blur-sm">
                          {t('umrah.premium')}
                        </span>
                        <span className="bg-white/80 text-gray-800 text-[10px] px-3 py-1 rounded-md font-bold backdrop-blur-sm line-clamp-1 max-w-[140px]">
                          {pkg.name}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 uppercase">{pkg.name}</h3>
                      <p className="text-emerald-600 font-bold text-sm mb-2">{t('umrah.select_program')}</p>
                      {pkg.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                      )}

                      {/* Static features - same for all packages */}
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

                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/umrah/collective/${pkg.slug}`)}
                          className="flex-1 bg-emerald-800 cursor-pointer text-white flex items-center justify-center gap-2 border-2 hover:border-black py-2.5 rounded-full text-xs font-bold transition-all"
                        >
                          {t('umrah.inscription')}
                        </button>
                        <button
                          onClick={() => router.push(`/umrah/collective/${pkg.slug}/details`)}
                          className="flex-1 flex cursor-pointer items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 rounded-full text-xs font-bold hover:bg-gray-50 transition-all"
                        >
                          <Eye size={14} /> {t('umrah.view_details')}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleShare(pkg); }}
                          className="bg-emerald-800 text-white p-2.5 rounded-full hover:bg-emerald-900 transition-all shrink-0"
                          title={t('umrah.share_package')}
                          aria-label={t('umrah.share_package')}
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
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