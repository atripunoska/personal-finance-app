"use client";
import AddBudgetModal from "@/app/ui/budgets/AddBudgetModal";
import BudgetCard from "@/app/ui/budgets/BudgetCard";
import Chart from "@/app/ui/budgets/Chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchBudgets, fetchTotalAmountByCategory } from "@/lib/data";
import { THEMES } from "@/lib/definitions";
import React, { useEffect, useState } from "react";

export default function Budget() {
  const [budgets, setBudgets] = useState([]);

  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const budgetsData = await fetchBudgets();
      const categoriesData = await fetchTotalAmountByCategory();
      setBudgets(budgetsData);
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  const totalAmountByCategory = categories?.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  let progress = 0;

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]);
  };

  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-bold font-public-sans text-3xl mb-3">Budgets</h3>
        <Button
          className="font-bold font-public-sans"
          onClick={handleOpenModal}
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-start-1 lg:col-end-1">
          <Card>
            <CardContent>
              <Chart
                dataProps={budgets}
                totalAmountByCategory={totalAmountByCategory}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 gap-3 flex flex-col">
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
        </div>
      </div>
    </>
  );
}
