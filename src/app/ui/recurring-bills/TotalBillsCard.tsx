import { USDollar } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';

export default function TotalBillsCard({
  totalAmount,
}: {
  totalAmount: number;
}) {
  return (
    <div className="bg-grey-900 dark:bg-foreground text-white dark:text-background p-6 rounded-md flex flex-col ">
      <Image
        src="/./assets/images/icon-recurring-bills.svg"
        width={30}
        height={30}
        alt="Recurring Bills icon"
        className="mb-6"
        loading="lazy"
      />
      <div className="font-light mb-2">Total Bills</div>
      <span className="font-bold text-3xl">
        {USDollar.format(Math.abs(totalAmount))}
      </span>
    </div>
  );
}
