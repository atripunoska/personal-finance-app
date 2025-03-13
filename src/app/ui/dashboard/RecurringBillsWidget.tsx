import { Card } from "@/components/ui/card";
import { USDollar } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function RecurringBillsWidget({
  totalAmountPaid,
  totalAmountUpcoming,
  totalAmountDue,
}: {
  totalAmountPaid: number;
  totalAmountUpcoming: number;
  totalAmountDue: number;
}) {
  return (
    <Card className="p-4 w-full">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">Recurring Bills</h3>
        <Link
          href="/recurring-bills"
          className="font-medium text-sm text-muted-foreground"
        >
          See details
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="p-3 rounded bg-beige-100 border-l-3 border-green flex justify-between mb-1">
          <span className="font-light text-muted-foreground">Paid Bills</span>
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
  );
}
