import BudgetCard from "@/app/ui/budgets/budget-card";
import Chart from "@/app/ui/budgets/chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchBudgets } from "@/lib/data";
import React from "react";

export default async function Budget() {
  const budgets = await fetchBudgets();

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
              <Chart dataProps={budgets} />
            </CardContent>
          </Card>
        </div>
        <div className="col-start-2 col-end-3">
          <BudgetCard />
        </div>
      </div>
    </>
  );
}
