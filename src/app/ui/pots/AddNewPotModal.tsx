import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../modal";
import { addNewPot } from "@/lib/data";
import { closest } from "color-2-name";
import { Pot } from "@/lib/definitions";

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
            className="border border-gray-300 rounded-md p-2"
          >
            {themes.map((item) => (
              <option value={item} key={(Math.random() * 25) / 2}>
                {closest(item.toString()).name}
              </option>
            ))}
          </select>
          <Button
            className="text-white font-bold cursor-pointer"
            onClick={handleAddPot}
            aria-label="Confirm addition"
          >
            Confirm Addition
          </Button>
        </form>
      </div>
    </Modal>,
    document.body,
  );
}
