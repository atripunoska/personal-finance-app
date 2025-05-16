'use client';

import { useState } from 'react';
import AddBudgetModal from '@/app/ui/budgets/AddBudgetModal';
import BudgetCard from '@/app/ui/budgets/BudgetCard';
import ChartBudget from '@/app/ui/budgets/ChartBudget';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BudgetProps, CategoriesDataProps, THEMES } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

type Props = {
  budgets: BudgetProps[];
  categories: CategoriesDataProps[];
};

export default function BudgetClient({ budgets, categories }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const totalAmountByCategory = categories.reduce(
    (acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    router.refresh();
  };

  return (
    <>
      <header className="flex justify-between mt-3">
        <h2 className="font-bold text-2xl mb-3">Budgets</h2>
        <Button onClick={handleOpenModal}>+ Add New Budgets</Button>
      </header>

      {isModalOpen && (
        <AddBudgetModal
          onClose={handleCloseModal}
          categories={categories}
          allThemes={THEMES}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-start-1 lg:col-end-1">
          <Card>
            <CardContent>
              <ChartBudget
                dataProps={budgets}
                totalAmountByCategory={totalAmountByCategory}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 gap-3 flex flex-col">
          {budgets.map((item) => {
            const progress =
              (totalAmountByCategory[item.category] / item.maximum) * 100;

            return (
              <BudgetCard
                key={item.category}
                maximum={item.maximum}
                theme={item.theme}
                category={item.category}
                value={progress}
                amountSpend={totalAmountByCategory[item.category]}
                categories={categories}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
