'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { USDollar } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import BudgetCardTable from './BudgetCardTable';
import { fetchTransactionsByCategory } from '@/lib/data';
import BudgetCardButton from './BudgetCardButton';
import { BudgetCardProps, Transaction } from '@/lib/definitions';

export default function BudgetCard({
  category,
  theme,
  maximum,
  value,
  amountSpend,
  categories,
}: BudgetCardProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchTransactionsByCategory(category);
      if (response.error) {
        console.error(response.error);
        setTransactions([]);
      } else {
        setTransactions(response.data);
      }
    }

    fetchData();
  }, [category]);

  return (
    <Card className="bg-white p-3">
      <CardContent>
        <div className="flex justify-between">
          <div className="flex items-center">
            <span
              className="rounded-full h-4 w-4 mr-3 flex"
              style={{ backgroundColor: theme }}
            ></span>{' '}
            <h3 className="font-bold text-lg">{category}</h3>
          </div>
          <BudgetCardButton
            category={category}
            initialTheme={theme}
            maximumAmount={maximum}
            categories={categories}
          />
        </div>
        <p className="text-muted-foreground text-sm mt-4 mb-3">
          Maximum of {USDollar.format(maximum)}
        </p>
        <Progress
          value={Math.abs(value)}
          indicatorColor={theme}
          max={maximum}
          role="progressbar"
          aria-label={'Maximum of ' + USDollar.format(maximum)}
        />
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex">
            <div
              className="w-1 rounded-md"
              style={{ backgroundColor: theme }}
            ></div>
            <div className="flex flex-col py-2 ml-2">
              <span className="text-muted-foreground mb-3 text-sm">Spent</span>
              <span className="font-bold text-md">
                {USDollar.format(Math.abs(amountSpend))}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="w-1 rounded-md bg-grey-300"></div>
            <div className="flex flex-col py-2 ml-2">
              <span className="text-muted-foreground mb-3 text-sm">
                Remaining
              </span>
              <span className="font-bold text-md">
                {Math.abs(maximum) - Math.abs(amountSpend) >= 0
                  ? USDollar.format(Math.abs(maximum) - Math.abs(amountSpend))
                  : USDollar.format(0)}
              </span>
            </div>
          </div>
          <div className="bg-beige-100 p-4 col-span-2 rounded-md mt-4">
            <h4 className="font-bold text-lg mb-3">Latest spending</h4>
            <BudgetCardTable transactions={transactions} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
