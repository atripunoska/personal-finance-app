import React from 'react';
import { fetchPots } from '@/lib/data';
import PotsWidget from '@/app/ui/dashboard/PotsWidget';

export default async function PotsSection() {
  const pots = await fetchPots();

  return <PotsWidget pots={pots} />;
}
