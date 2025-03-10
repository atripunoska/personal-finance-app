import RecurringBillsTable from "@/app/ui/recurring-bills/RecurringBillsTable";
import {
  fetchRecurringBills,
  fetchTotalBills,
  getLatestTransaction,
} from "@/lib/data";
import { USDollar } from "@/lib/utils";
import { getDate } from "date-fns";
import Image from "next/image";
import React from "react";

export default async function RecurringBills() {
  const recurringBills = await fetchRecurringBills();
  const latestTransaction = await getLatestTransaction();

  let totalAmount = 0;
  let totalAmountPaid = 0;
  let totalAmountUpcoming = 0;

  if (recurringBills.data) {
    totalAmount = recurringBills.data.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
  } else {
    console.error("Failed to fetch total bills:", recurringBills.error);
  }

  // Filter out duplicate items with the same name
  const uniqueRecurringBills = recurringBills.data?.filter(
    (item, index, self) => index === self.findIndex((t) => t.name === item.name)
  );
  const latestTransactionDate = new Date(latestTransaction.date);

  // Separate paid and due soon transactions
  const paidTransactions = uniqueRecurringBills?.filter(
    (item) =>
      new Date(item.date) <= latestTransactionDate &&
      new Date(item.date) > new Date("2024-08-01")
  );

  const paidTransactionsTotalAmount = uniqueRecurringBills?.filter((item) => {
    const itemDate = new Date(item.date);
    if (
      itemDate <= latestTransactionDate &&
      itemDate > new Date("2024-08-01")
    ) {
      totalAmountPaid += item.amount;
      return true;
    }
    return false;
  });
  const upcomingTransactions = uniqueRecurringBills?.filter((item) => {
    const itemDate = new Date(item.date);
    totalAmountUpcoming = totalAmountUpcoming + item.amount;
    return getDate(itemDate) > getDate(latestTransactionDate);
  });

  const totalPaid = paidTransactions?.length;
  const totalUpcoming = upcomingTransactions?.length;
  console.log(totalAmountPaid, "totalAmountPaid");

  return (
    <main>
      <h2 className="font-public-sans font-bold text-2xl mb-3">
        Recurring Bills
      </h2>
      <div className="bg-grey-900 text-white p-4 rounded-md flex flex-col gap-3">
        <Image
          src="/./assets/images/icon-recurring-bills.svg"
          width={30}
          height={30}
          alt="Recurring Bills icon"
          className="mb-6"
        />
        <div className="font-light mb-3">Total Bills</div>
        <span className="font-bold text-2xl">
          {USDollar.format(Math.abs(totalAmount))}
        </span>
      </div>
      <div className="bg-white text-grey-900 p-4 rounded-md flex flex-col mt-3">
        <h4>Summary</h4>
        <div className="flex justify-between">
          <div>Paid Bills</div>{" "}
          <div>
            {totalPaid} ({USDollar.format(Math.abs(totalAmountPaid))})
          </div>
          <div>Total Upcoming</div>{" "}
          <div>
            {totalUpcoming} ({USDollar.format(Math.abs(totalAmountUpcoming))})
          </div>
          <div>Due soon</div> <div>{totalUpcoming}</div>
        </div>
      </div>
      <RecurringBillsTable
        paid={paidTransactions}
        upcoming={upcomingTransactions}
        latestTransactionDate={latestTransactionDate}
      />
    </main>
  );
}
