"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { USDollar } from "@/lib/utils";
import { BudgetProps, TotalAmountByCategory } from "@/lib/definitions";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({
  dataProps,
  totalAmountByCategory,
}: {
  dataProps: BudgetProps[];
  totalAmountByCategory: TotalAmountByCategory;
}) {
  const dataAmount = dataProps.map((item) => item.maximum);
  const dataColor = dataProps.map((item) => item.theme);

  const chartData = {
    datasets: [
      {
        data: dataAmount,
        backgroundColor: dataColor,
        borderColor: dataColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Doughnut data={chartData} />
      <h3 className="font-bold text-xl mt-7 mb-3">Spending Summary</h3>
      <Table>
        <TableBody>
          {dataProps.map((item) => {
            const totalAmount = totalAmountByCategory[item.category] || 0;
            return (
              <TableRow key={Math.random()}>
                <TableCell>
                  <div className="flex ">
                    <div
                      className="h-auto w-1 rounded"
                      style={{ backgroundColor: item.theme }}
                    ></div>
                    <div className="ml-2">{item.category}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-bold text-lg">
                    {USDollar.format(Math.abs(totalAmount))}
                  </span>{" "}
                  of{" "}
                  <span className="text-muted-foreground text-sm font-semibold ">
                    {USDollar.format(item.maximum)}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
