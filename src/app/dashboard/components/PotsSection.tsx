import React from 'react';
import PotsWidget from '@/app/ui/dashboard/PotsWidget';
import { getBaseUrl } from '@/lib/getBaseUrl';

export default async function PotsSection() {
  const response = await fetch(`${getBaseUrl()}/api/pots`, {
    cache: 'no-store',
  });
  const pots = await response.json();

  return <PotsWidget pots={pots} />;
}
