import BudgetClient from '@/app/ui/budgets/BudgetClient';
import { fetchBudgets, fetchTransactions } from '@/lib/data';
import { BudgetProps, CategoriesDataProps } from '@/lib/definitions';

export default async function BudgetPage() {
  const [budgets, categoriesData] = await Promise.all([
    fetchBudgets(),
    fetchTransactions(),
  ]);

  return (
    <BudgetClient
      budgets={budgets as unknown as BudgetProps[]}
      categories={categoriesData as unknown as CategoriesDataProps[]}
    />
  );
}
