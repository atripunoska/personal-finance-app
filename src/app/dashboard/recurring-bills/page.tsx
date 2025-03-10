import RecurringBillsTable from "@/app/ui/recurring-bills/RecurringBillsTable";
import SummaryCard from "@/app/ui/recurring-bills/SummaryCard";
import TotalBillsCard from "@/app/ui/recurring-bills/TotalBillsCard";
import { fetchRecurringBills, getLatestTransaction } from "@/lib/data";
import { getDate } from "date-fns";
import React from "react";

export default async function RecurringBills() {
  const recurringBills = await fetchRecurringBills();
  const latestTransaction = await getLatestTransaction();

  let totalAmountPaid = 0;
  let totalAmountUpcoming = 0;
  let totalAmountDue = 0;

  // Filter out duplicate items with the same name
  const uniqueRecurringBills = recurringBills.data?.filter(
    (item, index, self) => index === self.findIndex((t) => t.name === item.name)
  );
  const latestTransactionDate = new Date(latestTransaction.date);
  const dueSoon = getDate(latestTransactionDate);
  // Separate paid and due soon transactions
  const paidTransactions = uniqueRecurringBills?.filter(
    (item) =>
      new Date(item.date) <= latestTransactionDate &&
      new Date(item.date) > new Date("2024-08-01")
  );

  uniqueRecurringBills?.forEach((item) => {
    const itemDate = new Date(item.date);
    if (
      itemDate <= latestTransactionDate &&
      itemDate > new Date("2024-08-01")
    ) {
      totalAmountPaid += item.amount;
    }
  });

  const upcomingTransactions = uniqueRecurringBills?.filter((item) => {
    const itemDate = new Date(item.date);
    if (getDate(itemDate) > getDate(latestTransactionDate))
      totalAmountUpcoming = totalAmountUpcoming + item.amount;
    return getDate(itemDate) > getDate(latestTransactionDate);
  });

  const dueSoonTransaction = uniqueRecurringBills?.filter((item) => {
    const itemDate = new Date(item.date);

    if (getDate(itemDate) > getDate(latestTransactionDate)) {
      if (getDate(item.date) > dueSoon && getDate(item.date) < dueSoon + 5) {
        totalAmountDue = totalAmountDue + item.amount;
      }
    }

    return getDate(item.date) > dueSoon && getDate(item.date) < dueSoon + 5;
  });

  const totalPaid = paidTransactions?.length ?? 0;
  const totalUpcoming = upcomingTransactions?.length ?? 0;
  const totalDue = dueSoonTransaction?.length ?? 0;
  const totalAmount =
    totalAmountPaid && totalAmountUpcoming && totalAmountDue
      ? totalAmountPaid + totalAmountUpcoming + totalAmountDue
      : 0;

  return (
    <main>
      <h2 className="font-public-sans font-bold text-2xl mb-3">
        Recurring Bills
      </h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-3 lg:col-span-1">
          <TotalBillsCard totalAmount={totalAmount} />
          <SummaryCard
            totalPaid={totalPaid}
            totalAmountPaid={totalAmountPaid}
            totalUpcoming={totalUpcoming}
            totalAmountUpcoming={totalAmountUpcoming}
            totalDue={totalDue}
            totalAmountDue={totalAmountDue}
          />
        </div>
        <div className="col-span-3 lg:col-span-2">
          <RecurringBillsTable
            paid={paidTransactions ?? []}
            upcoming={upcomingTransactions ?? []}
            latestTransactionDate={latestTransactionDate}
          />
        </div>
      </div>
    </main>
  );
}
