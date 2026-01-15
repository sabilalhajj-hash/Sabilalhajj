'use client';

import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900">about us</h2>
      <p className="text-gray-600">
        We are a team of dedicated professionals who are passionate about helping people travel to the Holy Lands.
      </p>
   
    </div>
  );
}