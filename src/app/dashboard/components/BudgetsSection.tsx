import React from 'react';
import { fetchBudgets, fetchTotalAmountByCategory } from '@/lib/data';
import { Card } from '@/components/ui/card';
import ChartBudget from '@/app/ui/budgets/ChartBudget';

export default async function BudgetsSection() {
  const [budgets, categories] = await Promise.all([
    fetchBudgets(),
    fetchTotalAmountByCategory(),
  ]);

  const totalAmountByCategory = categories?.reduce(
    (acc: { [key: string]: number }, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    },
    {}
  );

  return (
    <Card className="p-4 lg:row-span-2">
      <ChartBudget
        dataProps={budgets}
        totalAmountByCategory={totalAmountByCategory}
      />
    </Card>
  );
}
