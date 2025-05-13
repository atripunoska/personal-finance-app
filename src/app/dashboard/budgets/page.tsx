"use client";
import AddBudgetModal from "@/app/ui/budgets/AddBudgetModal";
import BudgetCard from "@/app/ui/budgets/BudgetCard";
import BudgetCardSkeleton from "@/app/ui/budgets/BudgetCardSkeleton";
import ChartBudget from "@/app/ui/budgets/ChartBudget";
import ChartSkeleton from "@/app/ui/dashboard/ChartSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchBudgets, fetchTotalAmountByCategory } from "@/lib/data";
import { CategoriesDataProps, THEMES, BudgetProps } from "@/lib/definitions";
import React, { Suspense, useEffect, useState } from "react";

export default function Budget() {
  const [budgets, setBudgets] = useState<BudgetProps[]>([]);

  const [categories, setCategories] = useState<CategoriesDataProps[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const budgetsData: BudgetProps[] = await fetchBudgets();
      const categoriesData = await fetchTotalAmountByCategory();
      setBudgets(budgetsData);
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  const totalAmountByCategory = categories?.reduce(
    (acc: { [key: string]: number }, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    },
    {},
  );

  let progress = 0;

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddBudget = (newBudget: BudgetProps) => {
    setBudgets([...budgets, newBudget]);
  };

  return (
    <>
      <header className="flex justify-between mt-3">
        <h2 className="font-bold text-2xl mb-3">Budgets</h2>
        <Button
          className="font-bold"
          onClick={handleOpenModal}
          aria-label="Add New Budgets"
        >
          + Add New Budgets
        </Button>
        {isModalOpen && (
          <AddBudgetModal
            onClose={handleCloseModal}
            categories={categories}
            allThemes={THEMES}
            onAddBudget={handleAddBudget}
          />
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-start-1 lg:col-end-1">
          <Card>
            <CardContent>
              <Suspense fallback={<ChartSkeleton />}>
                <ChartBudget
                  dataProps={budgets}
                  totalAmountByCategory={totalAmountByCategory}
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 gap-3 flex flex-col">
          <Suspense fallback={<BudgetCardSkeleton />}>
            {budgets.map((item) => {
              progress =
                (totalAmountByCategory[item.category] / item.maximum) * 100;
              return (
                <BudgetCard
                  maximum={item.maximum}
                  theme={item.theme}
                  category={item.category}
                  key={item.category}
                  value={progress}
                  amountSpend={totalAmountByCategory[item.category]}
                  categories={categories}
                />
              );
            })}
          </Suspense>
        </div>
      </div>
    </>
  );
}
