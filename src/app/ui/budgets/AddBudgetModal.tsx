import React, { useState, useEffect, ChangeEvent } from 'react';
import { showToast } from 'nextjs-toast-notify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPortal } from 'react-dom';
import { Modal } from '../modal';
import { closest } from 'color-2-name';
import { AddBudgetModalProps } from '@/lib/definitions';
import {
  budgetSchema,
  getFieldErrors,
  getFieldError,
  FieldErrors,
} from '@/lib/validations';
import { z } from 'zod';

export default function AddBudgetModal({
  onClose,
  categories,
  allThemes,
}: AddBudgetModalProps) {
  const [category, setCategory] = useState('');
  const [maximum, setMaximum] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [errors, setErrors] = useState<
    FieldErrors<z.infer<typeof budgetSchema>>
  >({});

  const [themes, setThemes] = useState<string[]>([]);

  const allCategories = [
    ...new Set(categories.map((item: { category: string }) => item.category)),
  ];

  useEffect(() => {
    const firstAvailable = allThemes.find((item) => !themes.includes(item));
    if (firstAvailable) {
      setSelectedTheme(firstAvailable);
    }
  }, [allThemes, themes]);

  useEffect(() => {
    async function fetchUsedThemes() {
      const response = await fetch('/api/budgets/themes');
      const usedThemes = await response.json();
      const themeList = usedThemes.map((item: { theme: string }) => item.theme);
      setThemes(themeList);
    }

    fetchUsedThemes();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  function handleSetTheme(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedTheme(event.target.value);
  }
  function handleSetCategory(event: ChangeEvent<HTMLSelectElement>): void {
    setCategory(event.target.value);
  }

  const handleBlur = (field: string, value: string | number) => {
    const error = getFieldError(budgetSchema, field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleAddBudget = async () => {
    const data = {
      category,
      maximum: Number.parseFloat(maximum),
      theme: selectedTheme,
    };
    const result = getFieldErrors(budgetSchema, data);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    try {
      await fetch('/api/budgets', {
        method: 'POST',
        body: JSON.stringify({
          category,
          maximum: Number.parseFloat(maximum),
          theme: selectedTheme,
        }),
      });

      onClose();
      showToast.success('Budget added successfully!', {
        duration: 4000,
        position: 'bottom-right',
        transition: 'fadeIn',
        sound: false,
        progress: true,
      });
    } catch (error) {
      console.error('Failed to add new budget:', error);
      showToast.error('Failed to add budget!', {
        duration: 4000,
        position: 'bottom-right',
        transition: 'fadeIn',
        sound: false,
        progress: true,
      });
    }
  };

  return createPortal(
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Add New Budget"
      hasCloseBtn={true}
    >
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-grey-300"
        >
          Budget Category
        </label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={handleSetCategory}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          {allCategories.map((cat) => {
            return (
              <option value={cat} key={cat}>
                {cat}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="maximum"
          className="block text-sm font-medium text-gray-700 dark:text-grey-300"
        >
          Maximum Amount
        </label>
        <Input
          id="maximum"
          type="number"
          value={maximum}
          onChange={(e) => setMaximum(e.target.value)}
          onBlur={(e) =>
            handleBlur('maximum', Number.parseFloat(e.target.value))
          }
        />
        {errors.maximum && (
          <p className="text-red-600 dark:text-red text-sm mt-1">
            {errors.maximum}
          </p>
        )}
      </div>
      <div className="mb-4 flex flex-col">
        <label
          htmlFor="theme"
          className="text-sm font-semibold text-grey-500 dark:text-muted-foreground"
        >
          Theme
        </label>
        <select
          name="themes"
          id="theme"
          value={selectedTheme}
          onChange={handleSetTheme}
          className="border border-gray-300 rounded-md p-2"
        >
          {allThemes.map((item: string) => {
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
      </div>
      <Button
        className="mr-2 cursor-pointer"
        onClick={handleAddBudget}
        aria-label="Add Budget"
        type="button"
      >
        Add Budget
      </Button>
    </Modal>,
    document.body
  );
}
