import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecurringBillsTableProps } from "@/lib/definitions";
import { USDollar } from "@/lib/utils";
import clsx from "clsx";
import { format, getDate } from "date-fns";
import Image from "next/image";

export default function RecurringBillsTable({
  paid,
  upcoming,
  latestTransactionDate,
}: RecurringBillsTableProps) {
  const dueSoon = getDate(latestTransactionDate);
  return (
    <div className="bg-white text-grey-900 p-6 rounded-md flex">
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
              <TableRow key={item.name}>
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
                  <div className="text-green flex items-center ">
                    <span className="mr-2">
                      Monthly - {format(item.date, "do")}
                    </span>
                    <Image
                      src="/./assets/images/icon-bill-paid.svg"
                      alt="Icon Bill Paid"
                      width={18}
                      height={18}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-bold">
                    {USDollar.format(Math.abs(item.amount))}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}

          {upcoming?.map((item) => {
            return (
              <TableRow key={item.name}>
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
                    <div className="flex items-center">
                      <span className="mr-2">
                        Monthly - {format(item.date, "do")}{" "}
                      </span>
                      <Image
                        src="/./assets/images/icon-bill-due.svg"
                        alt="Icon Bill Due"
                        width={18}
                        height={18}
                      />
                    </div>
                  ) : (
                    <div className="text-grey-600">
                      Monthly - {format(item.date, "do")}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={
                      clsx({
                        "text-red-700 ":
                          getDate(item.date) > dueSoon &&
                          getDate(item.date) < dueSoon + 5,
                      }) + `font-bold`
                    }
                  >
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
