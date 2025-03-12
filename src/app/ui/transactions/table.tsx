import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import Image from "next/image";
import clsx from "clsx";

import React from "react";
import { fetchFilteredTransactions } from "@/lib/data";
import { USDollar } from "@/lib/utils";
import SortBills from "../recurring-bills/SortBills";

export default async function TransactionsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const transactions = await fetchFilteredTransactions(
    query,
    currentPage
    //category
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recipient/Sender</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Transaction Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.data?.map((item) => {
            return (
              <TableRow key={Math.random()}>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={"/" + item.avatar}
                      alt={item.name}
                      className="rounded size-[40px] rounded-full"
                      width={40}
                      height={40}
                    />
                    <div className="pl-2 font-semibold font-public-sans">
                      {item.name}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="font-light text-muted-foreground">
                    {item.category}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="font-light text-muted-foreground">
                    {item.date}
                  </div>
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
