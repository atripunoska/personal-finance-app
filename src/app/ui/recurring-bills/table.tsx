import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPaymentsDueSoon } from "@/lib/data";
import { USDollar } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";

export default async function RecurringBillsTable({ bills }) {
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
          {bills?.map((item) => {
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

                <TableCell>
                  <div>{item.date}</div>
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
