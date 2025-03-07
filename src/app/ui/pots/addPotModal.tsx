import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../modal";
import { addNewPot, fetchPots } from "@/lib/data"; // Import the function to add a new pot

export default function AddPotModal({
  onClose,
  hasCloseBtn,
  onAddPot,
  themes,
}: {
  onClose: () => void;
  hasCloseBtn: boolean;
  onAddPot: (pot: any) => void;
  themes: string[];
}) {
  const [name, setName] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [target, setTarget] = useState<number>(0);

  const handleAddPot = async () => {
    try {
      const newPot = await addNewPot(name, theme, target);
      if (newPot) {
        onAddPot(newPot[0]); // Pass the new pot to the parent component
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
      title="Add New Pot"
      hasCloseBtn={hasCloseBtn}
    >
      <div>
        <form className="flex flex-col gap-3 mt-4">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-grey-500"
          >
            Pot Name
          </label>
          <input
            type="text"
            id="category"
            className="border border-gray-300 rounded-md p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category"
          />

          <label
            htmlFor="target"
            className="text-sm font-semibold text-grey-500"
          >
            Target
          </label>
          <input
            type="number"
            id="target"
            className="border border-gray-300 rounded-md p-2"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            placeholder="Enter target amount"
          />

          <label
            htmlFor="theme"
            className="text-sm font-semibold text-grey-500"
          >
            Theme
          </label>

          <select
            name="themes"
            id="theme"
            value={theme}
            onChange={(e) => setTheme((e.target as HTMLSelectElement).value)}
          >
            {themes.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <Button className="text-white font-bold" onClick={handleAddPot}>
            Confirm Addition
          </Button>
        </form>
      </div>
    </Modal>,
    document.body
  );
}
