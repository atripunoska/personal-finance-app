import React from 'react';
import BalanceCard from '@/app/ui/dashboard/BalanceCard';
import { getBaseUrl } from '@/lib/getBaseUrl';

export default async function BalanceSection() {
  const response = await fetch(`${getBaseUrl()}/api/balance`, {
    cache: 'no-store',
  });
  const balance = await response.json();

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full mb-3">
      {balance.map((item: { id: number; type: string; amount: number }) => (
        <BalanceCard
          amount={item.amount}
          type={item.type}
          id={item.id}
          key={item.id}
        />
      ))}
    </div>
  );
}
