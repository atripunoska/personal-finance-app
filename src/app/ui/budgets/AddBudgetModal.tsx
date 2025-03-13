import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchThemes, fetchBudgets, addNewBudget } from "@/lib/data";
import { createPortal } from "react-dom";
import { Modal } from "../modal";
import { closest } from "color-2-name";

export default function AddBudgetModal({
  onClose,
  categories,
  allThemes,
  onAddBudget,
}) {
  const [category, setCategory] = useState("");
  const [maximum, setMaximum] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const [themes, setThemes] = useState<string[]>([]);

  const allCategories = [...new Set(categories.map((item) => item.category))];

  useEffect(() => {
    async function fetchUsedThemes() {
      let usedThemes = await fetchThemes();
      usedThemes = usedThemes.map((item) => item.theme);
      setThemes(usedThemes);
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

  const handleAddBudget = async () => {
    try {
      const newBudget = await addNewBudget(category, maximum, selectedTheme);
      if (newBudget) {
        onAddBudget(newBudget[0]); // Pass the new pot to the parent component
      }
      onClose();
    } catch (error) {
      console.error("Failed to add new pot:", error);
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
          className="block text-sm font-medium text-gray-700"
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
          className="block text-sm font-medium text-gray-700"
        >
          Maximum Amount
        </label>
        <Input
          id="maximum"
          type="number"
          value={maximum}
          onChange={(e) => setMaximum(e.target.value)}
          required
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="theme" className="text-sm font-semibold text-grey-500">
          Theme
        </label>
        <select
          name="themes"
          id="theme"
          value={selectedTheme}
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
      </div>
      <Button
        className="mr-2"
        onClick={handleAddBudget}
        aria-label="Add Budget"
      >
        Add Budget
      </Button>
    </Modal>,
    document.body
  );
}
