"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { USDollar } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataProps {
  category: string;
  maximum: number;
  theme: string;
  spent: number;
}

interface TotalAmountByCategory {
  [key: string]: number;
}

export default function Chart({
  dataProps,
  totalAmountByCategory,
}: {
  dataProps: DataProps[];
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
      <h4 className="font-bold font-public-sans text-xl mt-7 mb-3">
        Spending Summary
      </h4>
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
