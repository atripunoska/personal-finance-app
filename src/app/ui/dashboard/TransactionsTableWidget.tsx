import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionsTableWidgetProps } from "@/lib/definitions";
import { USDollar } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";

export default function TransactionsTableWidget({
  transactions,
}: TransactionsTableWidgetProps) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-black text-xl font-semibold">
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
                      alt={item.name + " avatar"}
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
                        "text-green": item.amount > 0,
                        "font-bold": true,
                      })}
                    >
                      {item.amount > 0 ? "+" : ""}
                      {USDollar.format(item.amount)}
                    </div>
                    <div className="font-light text-sm text-muted-foreground">
                      {format(item.date, "i MMM yyyy")}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
