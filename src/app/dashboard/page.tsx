import {
  fetchBalance,
  fetchTransactions,
  fetchPots,
  fetchRecurringBills,
  fetchBudgets,
  fetchTotalAmountByCategory,
  getLatestTransaction,
} from "@/lib/data";

import React, { Suspense } from "react";

import { Card } from "@/components/ui/card";

import Chart from "../ui/budgets/Chart";
import { calculateRecurringBillsData } from "@/lib/calculateRecurringBillsData";
import BalanceCard from "../ui/dashboard/BalanceCard";
import { BalanceCardProps } from "@/lib/definitions";
import RecurringBillsWidget from "../ui/dashboard/RecurringBillsWidget";
import TransactionsTableWidget from "../ui/dashboard/TransactionsTableWidget";
import PotsWidget from "../ui/dashboard/PotsWidget";

import ChartSkeleton from "../ui/dashboard/ChartSkeleton";
import PotsWidgetSkeleton from "../ui/dashboard/PotsWidgetSkeleton";
import TransactionsTableSkeleton from "../ui/transactions/TransactionsTableSkeleton";
import RecurringBillsWidgetSkeleton from "../ui/dashboard/RecurringBillsWidgetSkeleton";

export default async function Dashboard() {
  const balance = await fetchBalance();
  const transactions = await fetchTransactions();
  const pots = await fetchPots();
  const budgets = await fetchBudgets();
  const categories = await fetchTotalAmountByCategory();

  const totalAmountByCategory = categories?.reduce(
    (acc: { [key: string]: number }, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const recurringBillsResponse = await fetchRecurringBills();
  const recurringBills = { data: recurringBillsResponse.data || [] };
  const latestTransaction = await getLatestTransaction();

  const { totalAmountPaid, totalAmountUpcoming, totalAmountDue } =
    await calculateRecurringBillsData(recurringBills, latestTransaction);

  return (
    <main>
      <h1 className="text-xl font-bold">Overview</h1>
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
          <Suspense fallback={<PotsWidgetSkeleton />}>
            <PotsWidget pots={pots} />
          </Suspense>
          <Suspense fallback={<TransactionsTableSkeleton />}>
            <TransactionsTableWidget transactions={transactions} />
          </Suspense>
        </div>

        <Card className="p-4 lg:row-span-2 ">
          <Suspense fallback={<ChartSkeleton />}>
            <Chart
              dataProps={budgets}
              totalAmountByCategory={totalAmountByCategory}
            />
          </Suspense>
        </Card>

        <div className="lg:col-span-2">
          <Suspense fallback={<RecurringBillsWidgetSkeleton />}>
            <RecurringBillsWidget
              totalAmountPaid={totalAmountPaid}
              totalAmountUpcoming={totalAmountUpcoming}
              totalAmountDue={totalAmountDue}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
