import React from 'react';
import { calculateRecurringBillsData } from '@/lib/calculateRecurringBillsData';
import RecurringBillsWidget from '@/app/ui/dashboard/RecurringBillsWidget';
import { getBaseUrl } from '@/lib/getBaseUrl';

export default async function RecurringBillsSection() {
  const baseUrl = getBaseUrl();

  const [recurringResponse, latestResponse] = await Promise.all([
    fetch(`${baseUrl}/api/transactions?recurring=true`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/transactions?latest=true`, { cache: 'no-store' }),
  ]);

  const recurringBillsResponse = await recurringResponse.json();
  const latestTransaction = await latestResponse.json();

  const recurringBills = { data: recurringBillsResponse.data || [] };
  const { totalAmountPaid, totalAmountUpcoming, totalAmountDue } =
    await calculateRecurringBillsData(
      recurringBills,
      latestTransaction || { date: new Date().toISOString() }
    );

  return (
    <RecurringBillsWidget
      totalAmountPaid={Number.isNaN(totalAmountPaid) ? 0 : totalAmountPaid}
      totalAmountUpcoming={
        Number.isNaN(totalAmountUpcoming) ? 0 : totalAmountUpcoming
      }
      totalAmountDue={Number.isNaN(totalAmountDue) ? 0 : totalAmountDue}
    />
  );
}
