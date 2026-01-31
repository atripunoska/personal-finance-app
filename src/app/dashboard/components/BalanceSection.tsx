import BalanceCard from '@/app/ui/dashboard/BalanceCard';
import { fetchBalance } from '@/lib/data';
import { BalanceCardProps } from '@/lib/definitions';

export default async function BalanceSection() {
  const balance = (await fetchBalance()) as unknown as BalanceCardProps[];

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full mb-3">
      {balance.map((item) => (
        <BalanceCard
          amount={item.amount}
          type={item.type}
          id={item.id}
          key={item.id}
        />
      ))}
    </div>
  );
}
