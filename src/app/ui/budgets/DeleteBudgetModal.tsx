import React from 'react';
import { Modal } from '../modal';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { showToast } from 'nextjs-toast-notify';

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
      const response = await fetch(
        `/api/budgets?category=${encodeURIComponent(budgetId)}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        onDeleteBudget();
      }

      onClose();
      showToast.success('Budget deleted successfully!', {
        duration: 4000,
        position: 'bottom-right',
        transition: 'fadeIn',
        sound: false,
        progress: true,
      });
    } catch (error) {
      console.error('Failed to delete budget:', error);
      showToast.error('Failed to delete budget!', {
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
            className="text-white font-bold bg-red cursor-pointer"
            onClick={handleDeleteBudget}
            aria-label="Confirm Deletion"
          >
            Yes, Confirm Deletion
          </Button>
          <Button
            className="text-white font-bold cursor-pointer dark:text-gray-900"
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
