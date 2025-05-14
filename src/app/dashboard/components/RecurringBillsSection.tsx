import React from 'react';
import { fetchRecurringBills, getLatestTransaction } from '@/lib/data';
import { calculateRecurringBillsData } from '@/lib/calculateRecurringBillsData';
import RecurringBillsWidget from '@/app/ui/dashboard/RecurringBillsWidget';

export default async function RecurringBillsSection() {
  const [recurringBillsResponse, latestTransaction] = await Promise.all([
    fetchRecurringBills(),
    getLatestTransaction(),
  ]);

  const recurringBills = { data: recurringBillsResponse.data || [] };
  const { totalAmountPaid, totalAmountUpcoming, totalAmountDue } =
    await calculateRecurringBillsData(recurringBills, latestTransaction);

  return (
    <RecurringBillsWidget
      totalAmountPaid={totalAmountPaid}
      totalAmountUpcoming={totalAmountUpcoming}
      totalAmountDue={totalAmountDue}
    />
  );
}
