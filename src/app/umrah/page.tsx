'use client';

import { useTranslation } from 'react-i18next';
import UmrahPackageSelection from '../../components/Umrah/UmrahPackageSelection';
import UmrahPlan from '../../components/Umrah/UmrahPlan';

export const dynamic = 'force-dynamic';

export default function Umrah() {
  const { t } = useTranslation();

  return (
    <div className="h-full bg-gray-50">

      <UmrahPlan />

    </div>
  );
}