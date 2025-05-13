import React, { Suspense } from 'react';
import { fetchPots } from '@/lib/data';
import PotsWidgetSkeleton from '@/app/ui/dashboard/PotsWidgetSkeleton';
import PotsWidget from '@/app/ui/dashboard/PotsWidget';

export default async function PotsSection() {
  const pots = await fetchPots();

  return (
    <Suspense fallback={<PotsWidgetSkeleton />}>
      <PotsWidget pots={pots} />
    </Suspense>
  );
}
