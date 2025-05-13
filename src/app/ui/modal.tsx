'use client';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  title: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, hasCloseBtn, onClose, title, children } = props;
  const modalRef = useRef<HTMLDialogElement>(null);

  // simple useEffect to capture ESC key to close the modal
  useEffect(() => {
    // Grabbing a reference to the modal in question
    const modalElement = modalRef.current;
    if (!modalElement) return;

    // Open modal when `isOpen` changes to true
    if (isOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  return (
    <dialog
      id="modal"
      className="flex self-center justify-self-center rounded-md"
      ref={modalRef}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white p-4 w-[600px] rounded-md ">
        <div className="flex justify-between mb-4">
          {title && <div className="font-bold text-3xl">{title}</div>}
          {hasCloseBtn && (
            <button onClick={handleCloseModal} aria-label="Close Modal">
              <Image
                src="/./assets/images/icon-close-modal.svg"
                height={30}
                width={30}
                alt="Modal close icon"
                loading="lazy"
              />
            </button>
          )}
        </div>

        <div className="font-light text-muted-foreground">{children}</div>
      </div>
    </dialog>
  );
};
