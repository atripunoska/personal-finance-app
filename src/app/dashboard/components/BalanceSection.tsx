import React from "react";
import { fetchBalance } from "@/lib/data";
import BalanceCard from "@/app/ui/dashboard/BalanceCard";

export default async function BalanceSection() {
  const balance = await fetchBalance();

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
