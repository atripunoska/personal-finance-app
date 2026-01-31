import React from 'react';
import { Card } from '@/components/ui/card';
import ChartBudget from '@/app/ui/budgets/ChartBudget';
import { getBaseUrl } from '@/lib/getBaseUrl';

export default async function BudgetsSection() {
  const baseUrl = getBaseUrl();

  const [budgetsResponse, categoriesResponse] = await Promise.all([
    fetch(`${baseUrl}/api/budgets`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/categories/totals`, { cache: 'no-store' }),
  ]);

  const budgets = await budgetsResponse.json();
  const categories = await categoriesResponse.json();

  const totalAmountByCategory = categories?.reduce(
    (
      acc: { [key: string]: number },
      transaction: { category: string; total_amount: number }
    ) => {
      const { category, total_amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(Number(total_amount));
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
