import RecurringBillsTable from '@/app/ui/recurring-bills/RecurringBillsTable';
import SummaryCard from '@/app/ui/recurring-bills/SummaryCard';
import TotalBillsCard from '@/app/ui/recurring-bills/TotalBillsCard';
import React, { Suspense } from 'react';
import { calculateRecurringBillsData } from '@/lib/calculateRecurringBillsData';
import RecurringBillsTableSkeleton from '@/app/ui/recurring-bills/RecurringBillsTableSkeleton';
import SummaryCardSkeleton from '@/app/ui/recurring-bills/SummaryCardSkeleton';
import TotalBillsCardSkeleton from '@/app/ui/recurring-bills/TotalBillsCardSkeleton';
import { fetchRecurringBills, getLatestTransaction } from '@/lib/data';

type RecurringBill = {
  name: string;
  date: string;
  amount: number;
  avatar: string;
  category: string;
  recurring: boolean;
};

async function TotalBillsWrapper() {
  const recurringBills =
    (await fetchRecurringBills()) as unknown as RecurringBill[];
  const { totalAmount } = await calculateRecurringBillsData(
    { data: recurringBills },
    { date: new Date().toISOString() }
  );
  return <TotalBillsCard totalAmount={totalAmount} />;
}

async function SummaryWrapper() {
  const [recurringBills, latestTransactionResult] = await Promise.all([
    fetchRecurringBills() as Promise<RecurringBill[]>,
    getLatestTransaction() as Promise<{ date: string }[]>,
  ]);

  const latestTransaction = latestTransactionResult[0] || {
    date: new Date().toISOString(),
  };

  const {
    totalAmountPaid,
    totalAmountUpcoming,
    totalAmountDue,
    totalPaid,
    totalUpcoming,
    totalDue,
  } = await calculateRecurringBillsData(
    { data: recurringBills },
    latestTransaction
  );

  return (
    <SummaryCard
      totalPaid={totalPaid}
      totalAmountPaid={Number.isNaN(totalAmountPaid) ? 0 : totalAmountPaid}
      totalUpcoming={totalUpcoming}
      totalAmountUpcoming={
        Number.isNaN(totalAmountUpcoming) ? 0 : totalAmountUpcoming
      }
      totalDue={totalDue}
      totalAmountDue={Number.isNaN(totalAmountDue) ? 0 : totalAmountDue}
    />
  );
}

async function TableWrapper() {
  const [recurringBills, latestTransactionResult] = await Promise.all([
    fetchRecurringBills() as Promise<RecurringBill[]>,
    getLatestTransaction() as Promise<{ date: string }[]>,
  ]);

  const latestTransaction = latestTransactionResult[0] || {
    date: new Date().toISOString(),
  };

  const { paidTransactions, upcomingTransactions, latestTransactionDate } =
    await calculateRecurringBillsData(
      { data: recurringBills },
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
