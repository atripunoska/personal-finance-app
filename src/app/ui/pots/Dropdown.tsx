import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ModalType } from '@/lib/definitions';
import DeletePotModal from './DeletePotModal';
import { deletePot, fetchPots } from '@/lib/data';
import EditPotModal from './EditPotModal';

export default function Dropdown({
  potId,
  target,
  initialTheme,
}: {
  potId: string;
  target: number;
  initialTheme: string;
}) {
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [themes, setThemes] = useState<string[]>([]);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(ModalType.NONE);
  };

  const handleDeleteModal = async (potId: string) => {
    try {
      await deletePot(potId);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add money to pot:', error);
    }
  };

  const getThemes = async () => {
    try {
      const pots = await fetchPots();
      const potThemes = pots.map((p) => p.theme);
      setThemes(potThemes);
    } catch (error) {
      console.log('Failed to fetch themes.', error);
    }
  };

  useEffect(() => {
    getThemes();
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="font-bold text-grey-500 cursor-pointer hover:bg-grey-100 hover:text-grey-900"
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
          >
            Edit Pot
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleOpenModal(ModalType.DELETE)}
            className="cursor-pointer"
          >
            Delete Pot
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {modalType === ModalType.DELETE && (
        <DeletePotModal
          onClose={handleCloseModal}
          hasCloseBtn={true}
          onDeletePot={() => handleDeleteModal(potId)}
          potId={potId}
        />
      )}

      {modalType === ModalType.EDIT && themes.length > 0 && (
        <EditPotModal
          onClose={handleCloseModal}
          hasCloseBtn={true}
          potId={potId}
          target={target}
          initialTheme={initialTheme}
          initialName={potId}
          themes={themes}
        />
      )}
    </>
  );
}
