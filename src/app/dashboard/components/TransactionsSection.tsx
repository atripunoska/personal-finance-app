import React from 'react';
import { fetchTransactions } from '@/lib/data';
import TransactionsTableWidget from '@/app/ui/dashboard/TransactionsTableWidget';

export default async function TransactionsSection() {
  const transactions = await fetchTransactions();

  return <TransactionsTableWidget transactions={transactions} />;
}
