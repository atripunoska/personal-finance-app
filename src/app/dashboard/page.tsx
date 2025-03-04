import {
  fetchBalance,
  fetchTransactions,
  fetchPots,
  fetchUniqueTransactions,
  fetchRecurringBills,
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

export default async function Dashboard() {
  const balance = await fetchBalance();
  const transactions = await fetchTransactions();
  const pots = await fetchPots();
  const recurringBills = await fetchUniqueTransactions();
  const uniqueArray = [...new Set(recurringBills.map((item) => item.category))];
  const rBills = await fetchRecurringBills();
  // let uniqueBills = [...new Set(rBills.map((item) => item.category))];

  let potsTotal = 0;

  console.log(rBills, "rBills");
  return (
    <main>
      <h1 className="text-xl font-bold font-public-sans">Overview</h1>
      <div className="flex gap-2 w-full">
        {balance.map((item) => {
          return (
            <div
              className="rounded p-4 justify-content flex flex-col bg-gray-900 text-white flex-1"
              key={Math.random()}
            >
              <p>{item.expenses}$</p>
              <div className="text-2xl">dsadsa</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
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
              <div className="grid grid-cols-2 mb-3 flex-1 content-between">
                {pots.map((item, index) => {
                  {
                    potsTotal += item.total;
                  }
                  if (index > 3) return;

                  return (
                    <div key={index} className="flex gap-2 mb-3 align-center ">
                      <span
                        className={`w-[5px] h-auto block rounded-b-md rounded-t-md`}
                        style={{ backgroundColor: item.theme }}
                      ></span>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          {item.name}{" "}
                        </span>
                        <div className="text-grey-900 font-bold font-public-sans ">
                          $ {item.total}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-beige-100 p-3 rounded-2xl flex flex-col w-full  flex-1">
                <span className="text-gray-400">Total savings</span>
                <span className="text-gray-900 font-extrabold font-public-sans text-4xl">
                  $ {potsTotal}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="w-[100px] font-public-sans text-black text-xl font-semibold"
                    colSpan={2}
                  >
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
                      <TableCell className="w-auto">
                        <Image
                          src={"/" + item.avatar}
                          alt={item.name}
                          className="rounded size-[40px] rounded-full"
                          width={40}
                          height={40}
                        />
                      </TableCell>
                      <TableCell className="text-left"> {item.name}</TableCell>
                      <TableCell className="text-right">
                        <div
                          className={clsx({
                            "text-gray-900": item.amount < 0,
                            "text-green-900": item.amount > 0,
                            "font-semibold": true,
                          })}
                        >
                          $ {item.amount > 0 ? "+" : ""}
                          {item.amount}
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

        {uniqueArray}
        {/* {uniqueArray.map((item, index) => {
          return <div key={item.category}>{item.category}</div>;
        })} */}
        {/* {rBills.map((item, index) => {
          return <div key={index}>{item.category}</div>;
        })} */}
      </div>
    </main>
  );
}
