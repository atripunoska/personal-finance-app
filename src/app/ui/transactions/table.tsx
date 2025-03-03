import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import Image from "next/image";
import clsx from "clsx";

import React from "react";
import { fetchFiltredTransactions } from "@/lib/data";

export default async function TransactionsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const transactions = await fetchFiltredTransactions(query, currentPage);
  return (
    <div>
      <Table>
        <TableBody>
          {transactions.data?.map((item) => {
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
    </div>
  );
}
