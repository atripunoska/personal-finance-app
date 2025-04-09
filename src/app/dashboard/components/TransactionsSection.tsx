import React, { Suspense } from "react";
import { fetchTransactions } from "@/lib/data";
import TransactionsTableWidget from "@/app/ui/dashboard/TransactionsTableWidget";
import TransactionsTableSkeleton from "@/app/ui/transactions/TransactionsTableSkeleton";

export default async function TransactionsSection() {
  const transactions = await fetchTransactions();

  return (
    <Suspense fallback={<TransactionsTableSkeleton />}>
      <TransactionsTableWidget transactions={transactions} />
    </Suspense>
  );
}
