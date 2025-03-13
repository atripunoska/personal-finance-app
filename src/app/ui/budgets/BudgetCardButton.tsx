import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModalType, THEMES } from "@/lib/definitions";
import React, { useState } from "react";
import DeleteBudgetModal from "./DeleteBudgetModal";
import { deleteBudget } from "@/lib/data";
import EditBudgetModal from "./EditBudgetModal";

export default function BudgetCardButton({
  category,
  initialTheme,
  maximumAmount,
  categories,
}) {
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(ModalType.NONE);
  };

  const handleDeleteModal = async (category: string) => {
    try {
      await deleteBudget(category);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to add money to pot:", error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="font-bold text-grey-500"
            variant="secondary"
            aria-label="Open Dropdown"
          >
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20">
          <DropdownMenuItem onClick={() => handleOpenModal(ModalType.EDIT)}>
            Edit Budget
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleOpenModal(ModalType.DELETE)}>
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
          potId={""}
        />
      )}
    </>
  );
}
