import { Modal } from '../modal';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { showToast } from 'nextjs-toast-notify';

export default function DeletePotModal({
  onClose,
  hasCloseBtn,
  onDeletePot,
  potId,
}: {
  onClose: () => void;
  hasCloseBtn: boolean;
  onDeletePot: () => void;
  potId: string;
}) {
  const handleDeletePot = async () => {
    try {
      const newPot = await fetch(`/api/pots/${potId}`, {
        method: 'DELETE',
      });
      if (newPot) {
        onDeletePot();
      }
      onClose();
      showToast.success('Pot deleted successfully!', {
        duration: 4000,
        position: 'bottom-right',
        transition: 'fadeIn',
        sound: false,
        progress: true,
      });
    } catch (error) {
      console.error('Failed to delete pot:', error);
      showToast.error('Failed to delete pot!', {
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
        Are you sure you want to delete this pot? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </p>
      <div>
        <form className="flex flex-col gap-3 mt-4">
          <Button
            className="text-white font-bold bg-red cursor-pointer"
            onClick={handleDeletePot}
            aria-label="Confirm Deletion"
          >
            Yes, Confirm Deletion
          </Button>
          <Button
            className="text-white font-bold cursor-pointer dark:text-gray-900"
            onClick={onClose}
            aria-label="Go Back"
          >
            No, go back
          </Button>
        </form>
      </div>
    </Modal>,
    document.body
  );
}
