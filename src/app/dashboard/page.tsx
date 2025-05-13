import React from 'react';
import BalanceSection from './components/BalanceSection';
import BudgetsSection from './components/BudgetsSection';
import PotsSection from './components/PotsSection';
import RecurringBillsSection from './components/RecurringBillsSection';
import TransactionsSection from './components/TransactionsSection';

export default function Dashboard() {
  return (
    <main>
      <h2 className="font-bold text-2xl mb-3">Overview</h2>
      <BalanceSection />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 gap-3">
          <PotsSection />
          <TransactionsSection />
        </div>
        <BudgetsSection />
        <div className="lg:col-span-2">
          <RecurringBillsSection />
        </div>
      </div>
    </main>
  );
}
