import { fetchBalance, fetchTransactions } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

      <table className="table-auto">
        <thead>
          <tr>
            <th colSpan={2}>Transactions</th>

            <th>
              <Link href="/dashboard/transactions">View all</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => {
            if (index > 4) return;
            return (
              <tr key={Math.random()}>
                <td>
                  <Image
                    src={"/" + item.avatar}
                    alt={item.name}
                    className="rounded size-[50px] rounded-full"
                    width={50}
                    height={50}
                  />
                </td>
                <td> {item.name}</td>
                <td>
                  <div>{item.amount}</div> <div>{item.date}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
