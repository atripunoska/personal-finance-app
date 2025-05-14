import React, { Suspense } from 'react';
import BalanceSection from './components/BalanceSection';
import BudgetsSection from './components/BudgetsSection';
import PotsSection from './components/PotsSection';
import RecurringBillsSection from './components/RecurringBillsSection';
import TransactionsSection from './components/TransactionsSection';

// Import skeletons
import PotsWidgetSkeleton from '@/app/ui/dashboard/PotsWidgetSkeleton';
import TransactionsTableSkeleton from '../ui/transactions/TransactionsTableSkeleton';
import ChartSkeleton from '../ui/dashboard/ChartSkeleton';
import RecurringBillsWidgetSkeleton from '../ui/dashboard/RecurringBillsWidgetSkeleton';

export default function Dashboard() {
  return (
    <main>
      <h2 className="font-bold text-2xl mb-3">Overview</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <BalanceSection />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 gap-3">
          <Suspense fallback={<PotsWidgetSkeleton />}>
            <PotsSection />
          </Suspense>

          <Suspense fallback={<TransactionsTableSkeleton />}>
            <TransactionsSection />
          </Suspense>
        </div>
        <Suspense fallback={<ChartSkeleton />}>
          <BudgetsSection />
        </Suspense>
        <div className="lg:col-span-2">
          <Suspense fallback={<RecurringBillsWidgetSkeleton />}>
            <RecurringBillsSection />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
