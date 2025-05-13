import React, { ChangeEvent, useState } from 'react';
import { Modal } from '../modal';
import { updatePot } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { closest } from 'color-2-name';

const EditPotModal: React.FC<{
  onClose: () => void;
  potId: string;
  hasCloseBtn: boolean;
  target: number;
  initialTheme: string;
  initialName: string;
  themes: string[];
}> = ({
  onClose,
  potId,
  hasCloseBtn,
  target,
  initialTheme,
  themes,
  initialName,
}) => {
  const [name, setName] = useState<string>(initialName);
  const [theme, setTheme] = useState<string>(initialTheme);
  const [targetAmount, setTargetAmount] = useState<number>(target);

  const handleUpdatePot = async () => {
    try {
      await updatePot(potId, { name, target, theme });
      onClose();
    } catch (error) {
      console.error('Failed to update pot:', error);
    }
  };

  function handleSetName(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleSetTarget(event: ChangeEvent<HTMLInputElement>): void {
    setTargetAmount(Number(event.target.value));
  }

  function handleSetTheme(event: ChangeEvent<HTMLSelectElement>): void {
    setTheme(event.target.value);
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title='Edit Pot'
      hasCloseBtn={hasCloseBtn}
    >
      <p>If your saving targets change, feel free to update your pots.</p>
      <div>
        <form className='flex flex-col gap-3 mt-4'>
          <label htmlFor='name' className='text-sm font-semibold text-grey-500'>
            Pot Name
          </label>
          <input
            type='text'
            id='name'
            className='border border-gray-300 rounded-md p-2'
            value={name}
            onChange={handleSetName}
            placeholder='Enter pot name'
          />
          <label
            htmlFor='target'
            className='text-sm font-semibold text-grey-500'
          >
            Target Amount
          </label>
          <input
            type='number'
            id='target'
            className='border border-gray-300 rounded-md p-2'
            value={targetAmount}
            onChange={handleSetTarget}
            placeholder='Enter target amount'
          />
          <label
            htmlFor='theme'
            className='text-sm font-semibold text-grey-500'
          >
            Theme
          </label>
          <select
            name='themes'
            id='theme'
            value={theme}
            onChange={handleSetTheme}
            className='border border-gray-300 rounded-md p-2'
          >
            {themes.map((item) => (
              <option value={item} key={(Math.random() * 25) / 2}>
                {closest(item.toString()).name}
              </option>
            ))}
          </select>
          <Button
            onClick={handleUpdatePot}
            aria-label='Save Changes'
            className='cursor-pointer'
          >
            Save changes
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditPotModal;
