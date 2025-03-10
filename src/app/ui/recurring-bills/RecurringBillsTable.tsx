import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { USDollar } from "@/lib/utils";
import clsx from "clsx";
import { format, getDate } from "date-fns";
import Image from "next/image";

export default function RecurringBillsTable({
  paid,
  upcoming,
  latestTransactionDate,
}) {
  const dueSoon = getDate(latestTransactionDate);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bill Title</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paid?.map((item) => {
            return (
              <TableRow key={item.id}>
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
                <TableCell>
                  <div className="text-green-600">
                    Monthly - {format(item.date, "do")}
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
                    {USDollar.format(Math.abs(item.amount))}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}

          {upcoming?.map((item) => {
            return (
              <TableRow key={item.id}>
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
                <TableCell>
                  {getDate(item.date) > dueSoon &&
                  getDate(item.date) < dueSoon + 5 ? (
                    <div className="text-red-600">
                      Monthly - {format(item.date, "do")}
                    </div>
                  ) : (
                    <div className="text-grey-600">
                      Monthly - {format(item.date, "do")}
                    </div>
                  )}
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
                    {USDollar.format(Math.abs(item.amount))}
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
