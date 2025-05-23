import RecurringBillsTable from '@/app/ui/recurring-bills/RecurringBillsTable';
import SummaryCard from '@/app/ui/recurring-bills/SummaryCard';
import TotalBillsCard from '@/app/ui/recurring-bills/TotalBillsCard';
import { fetchRecurringBills, getLatestTransaction } from '@/lib/data';
import React, { Suspense } from 'react';
import { calculateRecurringBillsData } from '@/lib/calculateRecurringBillsData';
import RecurringBillsTableSkeleton from '@/app/ui/recurring-bills/RecurringBillsTableSkeleton';
import SummaryCardSkeleton from '@/app/ui/recurring-bills/SummaryCardSkeleton';
import TotalBillsCardSkeleton from '@/app/ui/recurring-bills/TotalBillsCardSkeleton';

async function TotalBillsWrapper() {
  const recurringBillsResponse = await fetchRecurringBills();
  const { totalAmount } = await calculateRecurringBillsData(
    { data: recurringBillsResponse.data ?? [] },
    { date: new Date().toISOString() }
  );
  return <TotalBillsCard totalAmount={totalAmount} />;
}

async function SummaryWrapper() {
  const recurringBillsResponse = await fetchRecurringBills();
  const latestTransaction = await getLatestTransaction();
  const {
    totalAmountPaid,
    totalAmountUpcoming,
    totalAmountDue,
    totalPaid,
    totalUpcoming,
    totalDue,
  } = await calculateRecurringBillsData(
    { data: recurringBillsResponse.data ?? [] },
    latestTransaction
  );

  return (
    <SummaryCard
      totalPaid={totalPaid}
      totalAmountPaid={totalAmountPaid}
      totalUpcoming={totalUpcoming}
      totalAmountUpcoming={totalAmountUpcoming}
      totalDue={totalDue}
      totalAmountDue={totalAmountDue}
    />
  );
}

async function TableWrapper() {
  const recurringBillsResponse = await fetchRecurringBills();
  const latestTransaction = await getLatestTransaction();
  const { paidTransactions, upcomingTransactions, latestTransactionDate } =
    await calculateRecurringBillsData(
      { data: recurringBillsResponse.data ?? [] },
      latestTransaction
    );

  return (
    <RecurringBillsTable
      paid={paidTransactions ?? []}
      upcoming={upcomingTransactions ?? []}
      latestTransactionDate={latestTransactionDate}
    />
  );
}

export default async function RecurringBills() {
  return (
    <main>
      <h2 className="font-bold text-2xl mb-3">Recurring Bills</h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-3 lg:col-span-1">
          <Suspense fallback={<TotalBillsCardSkeleton />}>
            <TotalBillsWrapper />
          </Suspense>
          <Suspense fallback={<SummaryCardSkeleton />}>
            <SummaryWrapper />
          </Suspense>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <Suspense fallback={<RecurringBillsTableSkeleton />}>
            <TableWrapper />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
