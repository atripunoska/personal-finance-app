import BudgetClient from '@/app/ui/budgets/BudgetClient';
import { fetchBudgets, fetchTotalAmountByCategory } from '@/lib/data';

export default async function BudgetPage() {
  const budgets = await fetchBudgets();
  const categories = await fetchTotalAmountByCategory();

  return <BudgetClient budgets={budgets} categories={categories} />;
}
