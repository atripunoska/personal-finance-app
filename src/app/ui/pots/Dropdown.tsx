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
import EditPotModal from './EditPotModal';

export default function Dropdown({
  potId,
  target,
  initialTheme,
  onPotDeleted,
}: {
  potId: string;
  target: number;
  initialTheme: string;
  onPotDeleted?: () => void;
}) {
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [themes, setThemes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(ModalType.NONE);
  };

  const handleDeleteModal = async (potId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/pots/${encodeURIComponent(potId)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete pot');
      }

      handleCloseModal();
      onPotDeleted?.(); // Or use a better state management solution
    } catch (error) {
      console.error('Failed to delete pot:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getThemes = async () => {
    try {
      const response = await fetch('/api/pots/themes');

      if (!response.ok) {
        throw new Error('Failed to fetch themes');
      }

      const themesData = await response.json();
      const potThemes = themesData.map((t: { theme: string }) => t.theme);
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
            className="font-bold text-grey-500 dark:text-muted-foreground cursor-pointer hover:bg-grey-100 dark:hover:bg-secondary hover:text-grey-900 dark:hover:text-foreground"
            variant="secondary"
            aria-label="Open Dropdown"
            disabled={isLoading}
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
