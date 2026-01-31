import { calculateRecurringBillsData } from '@/lib/calculateRecurringBillsData';
import RecurringBillsWidget from '@/app/ui/dashboard/RecurringBillsWidget';
import { fetchRecurringBills, getLatestTransaction } from '@/lib/data';

type RecurringBill = {
  name: string;
  date: string;
  amount: number;
  avatar: string;
  category: string;
  recurring: boolean;
};

export default async function RecurringBillsSection() {
  const [recurringBills, latestTransactionResult] = await Promise.all([
    fetchRecurringBills() as Promise<RecurringBill[]>,
    getLatestTransaction() as Promise<{ date: string }[]>,
  ]);

  const latestTransaction = latestTransactionResult[0] || {
    date: new Date().toISOString(),
  };

  const { totalAmountPaid, totalAmountUpcoming, totalAmountDue } =
    await calculateRecurringBillsData(
      { data: recurringBills },
      latestTransaction
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
