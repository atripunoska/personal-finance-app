import React from 'react';
import TransactionsTableWidget from '@/app/ui/dashboard/TransactionsTableWidget';
import { getBaseUrl } from '@/lib/getBaseUrl';

export default async function TransactionsSection() {
  const response = await fetch(`${getBaseUrl()}/api/transactions`, {
    cache: 'no-store',
  });
  const transactions = await response.json();

  return <TransactionsTableWidget transactions={transactions} />;
}
