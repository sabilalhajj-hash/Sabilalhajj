import CollectivePlanClient from './CollectivePlanClient';

// Generate static params for all available plans
export async function generateStaticParams() {
                  return [
    { plan: 'ramadan-umrah-2026' },
  ];
}

export default function CollectivePlanPage() {
  return <CollectivePlanClient />;
}
