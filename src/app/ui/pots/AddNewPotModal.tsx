import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../modal';
import { closest } from 'color-2-name';
import { Pot } from '@/lib/definitions';
import { showToast } from 'nextjs-toast-notify';
import {
  potSchema,
  getFieldErrors,
  getFieldError,
  FieldErrors,
} from '@/lib/validations';
import { z } from 'zod';

export default function AddNewPotModal({
  onClose,
  hasCloseBtn,
  onAddPot,
  themes,
}: {
  onClose: () => void;
  hasCloseBtn: boolean;
  onAddPot: (pot: Pot) => void;
  themes: string[];
}) {
  const [name, setName] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const [target, setTarget] = useState<number>(0);
  const [errors, setErrors] = useState<FieldErrors<z.infer<typeof potSchema>>>(
    {}
  );

  const handleBlur = (field: string, value: string | number) => {
    const error = getFieldError(potSchema, field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleAddPot = async () => {
    const data = { name, target, theme };
    const result = getFieldErrors(potSchema, data);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    try {
      const response = await fetch('/api/pots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, theme: theme, target: target }),
      });
      const newPot = await response.json();
      if (newPot) {
        onAddPot(newPot); // Pass the new pot to the parent component
      }
      onClose();
      showToast.success('Pot added successfully!', {
        duration: 4000,
        position: 'bottom-right',
        transition: 'fadeIn',
        sound: false,
        progress: true,
      });
    } catch (error) {
      console.error('Failed to add new pot:', error);
      showToast.error('Failed to add new pot!', {
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
      title="Add New Pot"
      hasCloseBtn={hasCloseBtn}
    >
      <div>
        <form className="flex flex-col gap-3 mt-4">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-grey-500 dark:text-muted-foreground"
          >
            Pot Name
          </label>
          <input
            type="text"
            id="category"
            className="border border-gray-300 rounded-md p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => handleBlur('name', e.target.value)}
            placeholder="Enter category"
          />
          {errors.name && (
            <p className="text-red-600 dark:text-red text-sm mt-1">
              {errors.name}
            </p>
          )}

          <label
            htmlFor="target"
            className="text-sm font-semibold text-grey-500 dark:text-muted-foreground"
          >
            Target
          </label>
          <input
            type="number"
            id="target"
            className="border border-gray-300 rounded-md p-2"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            onBlur={(e) => handleBlur('target', Number(e.target.value))}
            placeholder="Enter target amount"
          />
          {errors.target && (
            <p className="text-red-600 dark:text-red text-sm mt-1">
              {errors.target}
            </p>
          )}

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
            onChange={(e) => setTheme((e.target as HTMLSelectElement).value)}
            className="border border-gray-300 rounded-md p-2"
          >
            {[...new Set(themes)].map((item) => {
              let colorName = '';
              try {
                colorName = closest(item.toString()).name;
              } catch {
                colorName = item;
              }
              return (
                <option value={item} key={item}>
                  {colorName}
                </option>
              );
            })}
          </select>
          <Button
            className="text-white font-bold cursor-pointer dark:text-gray-900"
            onClick={handleAddPot}
            aria-label="Confirm addition"
          >
            Confirm Addition
          </Button>
        </form>
      </div>
    </Modal>,
    document.body
  );
}
