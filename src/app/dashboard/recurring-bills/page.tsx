import RecurringBillsTable from '@/app/ui/recurring-bills/RecurringBillsTable';
import SummaryCard from '@/app/ui/recurring-bills/SummaryCard';
import TotalBillsCard from '@/app/ui/recurring-bills/TotalBillsCard';
import { fetchRecurringBills, getLatestTransaction } from '@/lib/data';

import React, { Suspense } from 'react';
import { calculateRecurringBillsData } from '@/lib/calculateRecurringBillsData';
import RecurringBillsTableSkeleton from '@/app/ui/recurring-bills/RecurringBillsTableSkeleton';
import SummaryCardSkeleton from '@/app/ui/recurring-bills/SummaryCardSkeleton';
import TotalBillsCardSkeleton from '@/app/ui/recurring-bills/TotalBillsCardSkeleton';

export default async function RecurringBills() {
  const recurringBillsResponse = await fetchRecurringBills();
  const latestTransaction = await getLatestTransaction();

  if (!recurringBillsResponse.data) {
    throw new Error('Failed to fetch recurring bills data');
  }

  const {
    totalAmountPaid,
    totalAmountUpcoming,
    totalAmountDue,
    totalPaid,
    totalUpcoming,
    totalDue,
    totalAmount,
    paidTransactions,
    upcomingTransactions,
    latestTransactionDate,
  } = await calculateRecurringBillsData(
    { data: recurringBillsResponse.data },
    latestTransaction
  );

  return (
    <main>
      <h2 className='font-bold text-2xl mb-3'>Recurring Bills</h2>
      <div className='grid grid-cols-3 gap-3'>
        <div className='col-span-3 lg:col-span-1'>
          <Suspense fallback={<TotalBillsCardSkeleton />}>
            <TotalBillsCard totalAmount={totalAmount} />
          </Suspense>
          <Suspense fallback={<SummaryCardSkeleton />}>
            {' '}
            <SummaryCard
              totalPaid={totalPaid}
              totalAmountPaid={totalAmountPaid}
              totalUpcoming={totalUpcoming}
              totalAmountUpcoming={totalAmountUpcoming}
              totalDue={totalDue}
              totalAmountDue={totalAmountDue}
            />
          </Suspense>
        </div>
        <div className='col-span-3 lg:col-span-2'>
          <Suspense fallback={<RecurringBillsTableSkeleton />}>
            <RecurringBillsTable
              paid={paidTransactions ?? []}
              upcoming={upcomingTransactions ?? []}
              latestTransactionDate={latestTransactionDate}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
