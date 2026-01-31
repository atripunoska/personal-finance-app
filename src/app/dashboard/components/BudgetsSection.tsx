import { Card } from '@/components/ui/card';
import ChartBudget from '@/app/ui/budgets/ChartBudget';
import { fetchBudgets } from '@/lib/data';
import { getDB } from '@/lib/db';
import { BudgetProps } from '@/lib/definitions';

export default async function BudgetsSection() {
  const sql = await getDB();

  const [budgets, categories] = await Promise.all([
    fetchBudgets(),
    sql`SELECT category, COALESCE(SUM(amount), 0) AS total_amount FROM transactions GROUP BY category`,
  ]);

  const categoryRows = categories as unknown as {
    category: string;
    total_amount: string;
  }[];
  const totalAmountByCategory = categoryRows?.reduce(
    (acc: { [key: string]: number }, transaction) => {
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
        dataProps={budgets as unknown as BudgetProps[]}
        totalAmountByCategory={totalAmountByCategory}
      />
    </Card>
  );
}
