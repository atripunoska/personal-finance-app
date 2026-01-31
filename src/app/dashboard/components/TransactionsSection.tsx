import TransactionsTableWidget from '@/app/ui/dashboard/TransactionsTableWidget';
import { fetchTransactions } from '@/lib/data';
import { Transaction } from '@/lib/definitions';

export default async function TransactionsSection() {
  const transactions = (await fetchTransactions()) as unknown as Transaction[];

  return <TransactionsTableWidget transactions={transactions} />;
}
