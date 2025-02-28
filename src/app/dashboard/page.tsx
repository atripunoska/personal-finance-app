import { fetchBalance, fetchTransactions } from "@/lib/data";
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

export default async function Dashboard() {
  const balance = await fetchBalance();
  const transactions = await fetchTransactions();
  return (
    <main>
      <h1 className="text-xl font-bold">Overview</h1>
      <div className="flex gap-2">
        {balance.map((item) => {
          return (
            <div
              className="rounded p-4 justify-content flex flex-col bg-gray-900 text-white"
              key={Math.random()}
            >
              <p>{item.expenses}$</p>
              <div className="text-2xl">dsadsa</div>
            </div>
          );
        })}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]" colSpan={2}>
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
                <TableCell>
                  <Image
                    src={"/" + item.avatar}
                    alt={item.name}
                    className="rounded size-[50px] rounded-full"
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell> {item.name}</TableCell>
                <TableCell>
                  <div>{item.amount}</div> <div>{item.date}</div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
