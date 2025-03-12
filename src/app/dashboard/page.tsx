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
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import Chart from "../ui/budgets/Chart";
import { USDollar } from "@/lib/utils";
import { calculateRecurringBillsData } from "@/lib/calculateRecurringBillsData";
import BalanceCard from "../ui/BalanceCard";
import { BalanceCardProps } from "@/lib/definitions";

export default async function Dashboard() {
  const balance = await fetchBalance();
  const transactions = await fetchTransactions();
  const pots = await fetchPots();
  const uniqueTransactions = await fetchUniqueTransactions();
  const uniqueArray = [
    ...new Set(uniqueTransactions.map((item) => item.category)),
  ];
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

  let potsTotal = 0;

  const recurringBills = await fetchRecurringBills();
  const latestTransaction = await getLatestTransaction();

  const { totalAmountPaid, totalAmountUpcoming, totalAmountDue } =
    await calculateRecurringBillsData(recurringBills, latestTransaction);

  return (
    <main>
      <h1 className="text-xl font-bold font-public-sans">Overview</h1>
      <div className="flex gap-2 w-full mb-3">
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

      <div className="grid grid-cols-3 gap-3 ">
        <div className="col-span-2 gap-3">
          <Card className="mb-3">
            <CardContent>
              <div className="flex justify-between mb-3">
                <h2 className="text-xl text-grey-900 font-semibold font-public-sans">
                  Pots
                </h2>
                <Link
                  href="/dashboard/pots"
                  className="text-muted-foreground text-sm font-public-sans font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="flex justify-between flex-row gap-4 flex-row-reverse content-between">
                <div className="grid grid-cols-2 mb-3 flex-1 content-between ">
                  {pots.map((item, index) => {
                    {
                      potsTotal += item.total;
                    }
                    if (index > 3) return;

                    return (
                      <div
                        key={index}
                        className="flex gap-2 mb-3 align-center "
                      >
                        <span
                          className={`w-[5px] h-auto block rounded-b-md rounded-t-md`}
                          style={{ backgroundColor: item.theme }}
                        ></span>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            {item.name}{" "}
                          </span>
                          <div className="text-grey-900 font-bold font-public-sans ">
                            {USDollar.format(item.total)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-beige-100 p-3 rounded-2xl flex flex-col w-full  flex-1 items-center justify-center">
                  <div className="flex items-center justify-center content-center gap-3">
                    <Image
                      src="./assets/images/icon-pot.svg"
                      alt={"Total saved icon"}
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col pl-3">
                      <span className="text-gray-400 mb-3">Total savings</span>
                      <span className="text-gray-900 font-extrabold font-public-sans text-4xl">
                        $ {potsTotal}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] font-public-sans text-black text-xl font-semibold">
                      Transactions
                    </TableHead>

                    <TableHead className="text-right">
                      <Link href="/dashboard/transactions">View all</Link>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((item, index) => {
                    if (index > 4) return;
                    return (
                      <TableRow key={Math.random()}>
                        <TableCell className="w-auto flex items-center">
                          <Image
                            src={"/" + item.avatar}
                            alt={item.name}
                            className="rounded size-[40px] rounded-full"
                            width={40}
                            height={40}
                          />
                          <span className="pl-2">{item.name}</span>
                        </TableCell>

                        <TableCell className="text-right">
                          <div
                            className={clsx({
                              "text-gray-900": item.amount < 0,
                              "text-green-900": item.amount > 0,
                              "font-semibold": true,
                            })}
                          >
                            {item.amount > 0 ? "+" : ""}
                            {USDollar.format(item.amount)}
                          </div>
                          <div>{item.date}</div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="p-4 row-span-2 ">
          <Chart
            dataProps={budgets}
            totalAmountByCategory={totalAmountByCategory}
          />
        </Card>

        <Card className="p-4">
          <div className="flex justify-between">
            <h4 className="font-bold text-lg">Recurring Bills</h4>
            <Link href="/recurring-bills">See details</Link>
          </div>
          <div className="flex flex-col">
            <div className="p-3 rounded bg-beige-100 border-l-3 border-green flex justify-between mb-1">
              <span className="font-light text-muted-foreground">
                Paid Bills
              </span>
              <span className="font-bold">
                {USDollar.format(Math.abs(totalAmountPaid))}
              </span>
            </div>
            <div className="p-3 rounded bg-beige-100 border-l-3 border-yellow flex justify-between mb-1">
              <span className="font-light text-muted-foreground">
                Total Upcoming
              </span>
              <span className="font-bold">
                {USDollar.format(Math.abs(totalAmountUpcoming))}
              </span>
            </div>
            <div className="p-3 rounded bg-beige-100 border-l-3 border-blue flex justify-between mb-1">
              <span className="font-light text-muted-foreground">Due Soon</span>
              <span className="font-bold">
                {USDollar.format(Math.abs(totalAmountDue))}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
