import React, { ChangeEvent, useEffect, useState } from 'react';
import { Modal } from '../modal';
import { Button } from '@/components/ui/button';
import { closest } from 'color-2-name';
import { CategoriesDataProps } from '@/lib/definitions';
import { showToast } from 'nextjs-toast-notify';

const EditBudgetModal: React.FC<{
  onClose: () => void;
  potId: string;
  hasCloseBtn: boolean;
  maximumAmount: number;
  categoryId: string;
  initialTheme: string;
  categories: CategoriesDataProps[];
  allThemes: string[];
}> = ({
  onClose,
  hasCloseBtn,
  maximumAmount,
  categoryId,
  initialTheme,
  categories,
  allThemes,
}) => {
  const [theme, setTheme] = useState<string>(initialTheme);
  const [category, setCategory] = useState<string>(categoryId);
  const [maxAmount, setMaxAmount] = useState<number>(maximumAmount);
  const [themes, setThemes] = useState<string[]>([]);

  const allCategories = [...new Set(categories.map((item) => item.category))];

  useEffect(() => {
    async function fetchUsedThemes() {
      const response = await fetch('/api/budgets/themes');
      const usedThemes = await response.json();
      const themeNames = usedThemes.map(
        (item: { theme: string }) => item.theme
      );
      setThemes(themeNames);
    }

    fetchUsedThemes();
  }, []);

  const handleUpdateBudget = async () => {
    try {
      await fetch(`/api/budgets?category=${encodeURIComponent(categoryId)}`, {
        method: 'PUT',
        body: JSON.stringify({
          category: category,
          maximum: maxAmount,
          theme: theme,
        }),
      });
      onClose();
      showToast.success('Budget updated successfully!', {
        duration: 4000,
        position: 'bottom-right',
        transition: 'fadeIn',
        sound: false,
        progress: true,
      });
    } catch (error) {
      console.error('Failed to update budget:', error);
      showToast.error('Failed to update budget!', {
        duration: 4000,
        position: 'bottom-right',
        transition: 'fadeIn',
        sound: false,
        progress: true,
      });
    }
  };

  function handleSetTheme(event: ChangeEvent<HTMLSelectElement>): void {
    setTheme(event.target.value);
  }

  function handleSetCategory(event: ChangeEvent<HTMLSelectElement>): void {
    setCategory(event.target.value);
  }

  function handleChangeMax(event: ChangeEvent<HTMLInputElement>): void {
    setMaxAmount(Number(event.target.value));
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Edit Budget"
      hasCloseBtn={hasCloseBtn}
    >
      <p>As your budgets change, feel free to update your spending limits.</p>
      <div>
        <form className="flex flex-col gap-3 mt-4">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-grey-500 dark:text-muted-foreground"
          >
            Budget Category
          </label>
          <select
            name="categories"
            id="category"
            value={category}
            onChange={handleSetCategory}
            className="border border-gray-300 rounded-md p-2"
          >
            {allCategories?.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <label
            htmlFor="max"
            className="text-sm font-semibold text-grey-500 dark:text-muted-foreground"
          >
            Maximum Spend
          </label>
          <input
            type="number"
            id="max"
            className="border border-gray-300 rounded-md p-2"
            value={maxAmount}
            onChange={handleChangeMax}
            placeholder="Enter target amount"
          />
          <label
            htmlFor="theme"
            className="text-sm font-semibold text-grey-500 dark:text-muted-foreground"
          >
            Theme
          </label>
          <select
            name="themes"
            id="theme"
            value={theme}
            onChange={handleSetTheme}
            className="border border-gray-300 rounded-md p-2"
          >
            {allThemes.map((item) => {
              if (themes.includes(item)) {
                return (
                  <option
                    value={item}
                    key={item}
                    disabled={true}
                    className="disabled:text-gray-500 disabled:bg-gray-100 disabled:pointer-events-none italic"
                  >
                    {closest(item.toString()).name} - already has been used
                  </option>
                );
              } else {
                return (
                  <option value={item} key={item}>
                    {closest(item.toString()).name}
                  </option>
                );
              }
            })}
          </select>
          <Button
            onClick={handleUpdateBudget}
            aria-label="Save changes"
            className="cursor-pointer"
          >
            Save changes
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditBudgetModal;
