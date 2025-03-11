import RecurringBillsTable from "@/app/ui/recurring-bills/RecurringBillsTable";
import SummaryCard from "@/app/ui/recurring-bills/SummaryCard";
import TotalBillsCard from "@/app/ui/recurring-bills/TotalBillsCard";
import { fetchRecurringBills, getLatestTransaction } from "@/lib/data";

import React from "react";
import { calculateRecurringBillsData } from "@/lib/calculateRecurringBillsData";

export default async function RecurringBills() {
  const recurringBills = await fetchRecurringBills();
  const latestTransaction = await getLatestTransaction();

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
    dueSoonTransaction,
    latestTransactionDate,
  } = await calculateRecurringBillsData(recurringBills, latestTransaction);

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
