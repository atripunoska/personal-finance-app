"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataProps {
  category: string;
  maximum: number;
  theme: string;
  spent: number;
}

export default function Chart({ dataProps }: { dataProps: DataProps[] }) {
  const labels = dataProps.map((item) => item.category);
  const dataAmount = dataProps.map((item) => item.maximum);
  const dataColor = dataProps.map((item) => item.theme);

  const chartData = {
    labels: labels,
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
                <TableCell>
                  <span className="font-bold text-xl">$ {item.spent}</span> of
                  <span className="text-muted-foreground text-sm font-semibold ">
                    ${item.maximum}
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
