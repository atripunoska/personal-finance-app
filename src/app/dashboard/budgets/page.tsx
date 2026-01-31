import BudgetClient from '@/app/ui/budgets/BudgetClient';
import { getBaseUrl } from '@/lib/getBaseUrl';

export default async function BudgetPage() {
  const baseUrl = getBaseUrl();

  const [budgetsResponse, categoriesResponse] = await Promise.all([
    fetch(`${baseUrl}/api/budgets`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/transactions`, { cache: 'no-store' }),
  ]);

  const budgets = await budgetsResponse.json();
  const categoriesData = await categoriesResponse.json();

  return <BudgetClient budgets={budgets} categories={categoriesData} />;
}
