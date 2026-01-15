'use client';

import FlightSearch from '@/components/Flight/FlightSearch';
import { useTranslation } from 'react-i18next';

export default function Flights() {
  const { t } = useTranslation();

  return (
    <div className="h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <FlightSearch />  
    </div>
  );
}