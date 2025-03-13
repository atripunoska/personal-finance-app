import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { USDollar } from "@/lib/utils";
import React from "react";

export default function SummaryCard({
  totalPaid,
  totalAmountPaid,
  totalUpcoming,
  totalAmountUpcoming,
  totalDue,
  totalAmountDue,
}: {
  totalPaid: number;
  totalAmountPaid: number;
  totalUpcoming: number;
  totalAmountUpcoming: number;
  totalDue: number;
  totalAmountDue: number;
}) {
  return (
    <div className="bg-white text-grey-900 p-6 rounded-md flex flex-col mt-3">
      <h3 className="font-bold mb-3">Summary</h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground font-light">
              Paid Bills
            </TableCell>
            <TableCell className="text-right font-bold">
              {totalPaid} ({USDollar.format(Math.abs(totalAmountPaid))})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground font-light">
              Total Upcoming
            </TableCell>
            <TableCell className="text-right font-bold">
              {totalUpcoming} ({USDollar.format(Math.abs(totalAmountUpcoming))})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-red-700 font-light">Due soon</TableCell>
            <TableCell className="text-right font-bold text-red-700">
              {totalDue} ({USDollar.format(Math.abs(totalAmountDue))})
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
