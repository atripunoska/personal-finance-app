import BudgetCard from "@/app/ui/budgets/BudgetCard";
import Chart from "@/app/ui/budgets/Chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchBudgets, fetchTotalAmountByCategory } from "@/lib/data";
import React from "react";

export default async function Budget() {
  const budgets = await fetchBudgets();
  const categories = await fetchTotalAmountByCategory();

  const totalAmountByCategory = categories?.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  console.log(totalAmountByCategory, "categ");
  let progress = 0;

  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-bold font-public-sans text-3xl mb-3">Budgets</h3>
        <Button className="font-bold font-public-sans">
          + Add New Budgets
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-start-1 col-end-1">
          <Card>
            <CardContent>
              <Chart
                dataProps={budgets}
                totalAmountByCategory={totalAmountByCategory}
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 gap-3 flex flex-col">
          {budgets.map((item) => {
            progress =
              (totalAmountByCategory[item.category] / item.maximum) * 100;
            return (
              <BudgetCard
                maximum={item.maximum}
                theme={item.theme}
                category={item.category}
                key={item.category}
                value={progress}
                amountSpend={totalAmountByCategory[item.category]}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
