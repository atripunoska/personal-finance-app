import {
  fetchBalance,
  fetchTransactions,
  fetchPots,
  fetchUniqueTransactions,
  fetchRecurringBills,
  fetchBudgets,
  fetchTotalAmountByCategory,
  getLatestTransaction,
} from "@/lib/data";

import React from "react";

import { Card } from "@/components/ui/card";

import Chart from "../ui/budgets/Chart";
import { calculateRecurringBillsData } from "@/lib/calculateRecurringBillsData";
import BalanceCard from "../ui/dashboard/BalanceCard";
import { BalanceCardProps } from "@/lib/definitions";
import RecurringBillsWidget from "../ui/dashboard/RecurringBillsWidget";
import TransactionsTableWidget from "../ui/dashboard/TransactionsTableWidget";
import PotsWidget from "../ui/dashboard/PotsWidget";

export default async function Dashboard() {
  const balance = await fetchBalance();
  const transactions = await fetchTransactions();
  const pots = await fetchPots();
  const budgets = await fetchBudgets();
  const categories = await fetchTotalAmountByCategory();

  const totalAmountByCategory = categories?.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  const recurringBills = await fetchRecurringBills();
  const latestTransaction = await getLatestTransaction();

  const { totalAmountPaid, totalAmountUpcoming, totalAmountDue } =
    await calculateRecurringBillsData(recurringBills, latestTransaction);

  return (
    <main>
      <h1 className="text-xl font-bold font-public-sans">Overview</h1>
      <div className="flex flex-col md:flex-row gap-2 w-full mb-3">
        {balance.map((item: BalanceCardProps) => {
          return (
            <BalanceCard
              amount={item.amount}
              type={item.type}
              id={item.id}
              key={item.id}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 ">
        <div className="lg:col-span-2 gap-3">
          <PotsWidget pots={pots} />
          <TransactionsTableWidget transactions={transactions} />
        </div>

        <Card className="p-4 lg:row-span-2 ">
          <Chart
            dataProps={budgets}
            totalAmountByCategory={totalAmountByCategory}
          />
        </Card>
        <div className="lg:col-span-2">
          <RecurringBillsWidget
            totalAmountPaid={totalAmountPaid}
            totalAmountUpcoming={totalAmountUpcoming}
            totalAmountDue={totalAmountDue}
          />
        </div>
      </div>
    </main>
  );
}
