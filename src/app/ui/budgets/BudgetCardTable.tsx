import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import Image from "next/image";
import { USDollar } from "@/lib/utils";
import { format } from "date-fns";
export default function BudgetCardTable({ transactions }) {
  return (
    <Table>
      <TableBody>
        {transactions?.data?.map((item) => {
          return (
            <TableRow key={item.name + Math.random()}>
              <TableCell>
                <div className="flex items-center">
                  <Image
                    src={"/" + item.avatar}
                    width={30}
                    height={30}
                    alt={item.name + " avatar"}
                    className="rounded-full"
                  />
                  <span className="ml-4 font-bold">{item.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col">
                  <span className="font-bold">
                    {USDollar.format(item.amount)}
                  </span>
                  <span className="font-light text-muted-foreground">
                    {format(item.date, "i MMM yyyy")}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
