import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BudgetCardButtonProps, ModalType, THEMES } from '@/lib/definitions';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteBudgetModal from './DeleteBudgetModal';
import EditBudgetModal from './EditBudgetModal';

export default function BudgetCardButton({
  category,
  initialTheme,
  maximumAmount,
  categories,
}: BudgetCardButtonProps) {
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const router = useRouter();

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(ModalType.NONE);
    router.refresh();
  };

  const handleDeleteModal = async (category: string) => {
    try {
      await fetch(`/api/budgets?category=${encodeURIComponent(category)}`, {
        method: 'DELETE',
      });
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete budget:', error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="font-bold text-grey-500 dark:text-muted-foreground cursor-pointer hover:bg-grey-100 dark:hover:bg-secondary hover:text-grey-900 dark:hover:text-foreground"
            variant="secondary"
            aria-label="Open Dropdown"
          >
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20">
          <DropdownMenuItem
            onClick={() => handleOpenModal(ModalType.EDIT)}
            className="cursor-pointer"
            role="menuitem"
          >
            Edit Budget
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleOpenModal(ModalType.DELETE)}
            className="cursor-pointer"
            role="menuitem"
          >
            Delete Budget
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {modalType === ModalType.DELETE && (
        <DeleteBudgetModal
          onClose={handleCloseModal}
          hasCloseBtn={true}
          onDeleteBudget={() => handleDeleteModal(category)}
          budgetId={category}
        />
      )}

      {modalType === ModalType.EDIT && (
        <EditBudgetModal
          onClose={handleCloseModal}
          hasCloseBtn={true}
          categoryId={category}
          initialTheme={initialTheme}
          allThemes={THEMES}
          maximumAmount={maximumAmount}
          categories={categories}
          potId={''}
        />
      )}
    </>
  );
}
