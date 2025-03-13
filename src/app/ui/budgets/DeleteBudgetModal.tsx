import React from "react";
import { Modal } from "../modal";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { deleteBudget } from "@/lib/data";

export default function DeleteBudgetModal({
  onClose,
  hasCloseBtn,
  onDeleteBudget,
  budgetId,
}: {
  onClose: () => void;
  hasCloseBtn: boolean;
  onDeleteBudget: () => void;
  budgetId: string;
}) {
  const handleDeleteBudget = async () => {
    try {
      const newPot = await deleteBudget(budgetId);
      if (newPot) {
        onDeleteBudget();
      }
      onClose();
    } catch (error) {
      console.error("Failed to delete budget:", error);
    }
  };
  return createPortal(
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Delete"
      hasCloseBtn={hasCloseBtn}
    >
      <p>
        Are you sure you want to delete this budget? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </p>
      <div>
        <form className="flex flex-col gap-3 mt-4">
          <Button
            className="text-white font-bold bg-red"
            onClick={handleDeleteBudget}
            aria-label="Confirm Deletion"
          >
            Yes, Confirm Deletion
          </Button>
          <Button
            className="text-white font-bold"
            onClick={onClose}
            aria-label="Go back"
          >
            No, go back
          </Button>
        </form>
      </div>
    </Modal>,
    document.body
  );
}
