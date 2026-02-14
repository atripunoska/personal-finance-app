'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { USDollar } from '@/lib/utils';
import WithdrawMoneyModal from './WithdrawMoneyModal';
import AddMoneyModal from './AddMoneyModal';
import Dropdown from './Dropdown';
import { ModalType, PotCardProps } from '@/lib/definitions';
import { showToast } from 'nextjs-toast-notify';

export default function PotCard({
  name,
  theme,
  target,
  total,
  onPotDeleted,
  onPotUpdated,
}: PotCardProps) {
  const progress = (total / target) * 100;

  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [potTotal, setPotTotal] = useState<number>(total);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(ModalType.NONE);
  };

  const handleAddMoney = async (amount: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/pots/${encodeURIComponent(name)}/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add money to pot');
      }

      setPotTotal(potTotal + amount);
      onPotUpdated?.();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add money to pot:', error);
      showToast.error('Failed to add money to pot!', {
        duration: 4000,
        position: 'bottom-right',
        transition: 'fadeIn',
        sound: false,
        progress: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawMoney = async (amount: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/pots/${encodeURIComponent(name)}/withdraw`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to withdraw money from pot');
      }

      setPotTotal(potTotal - amount);
      onPotUpdated?.();
      handleCloseModal();
      showToast.success('Money withdrawn successfully!', {
        duration: 4000,
        position: 'bottom-right',
        transition: 'fadeIn',
        sound: false,
        progress: true,
      });
    } catch (error) {
      console.error('Failed to withdraw money from pot:', error);
      showToast.error('Failed to withdraw money from pot!', {
        duration: 4000,
        position: 'bottom-right',
        transition: 'fadeIn',
        sound: false,
        progress: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex gap-3 items-center">
        <div className="flex justify-between gap-2 w-full">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full flex"
              style={{ backgroundColor: `${theme}` }}
            ></div>
            <h3 className="font-bold text-xl text-grey-900 dark:text-foreground">
              {name}
            </h3>
          </div>
          <Dropdown
            potId={name}
            target={target}
            initialTheme={theme}
            onPotDeleted={onPotDeleted}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-grey-300 dark:text-muted-foreground font-bold">
          Total Saved
        </div>
        <div className="text-grey-900 dark:text-foreground font-bold text-3xl">
          {USDollar.format(potTotal)}
        </div>
      </div>
      <Progress
        value={progress}
        indicatorColor={theme}
        role="progress"
        aria-label={name + ' progress bar'}
      />
      <div className="flex justify-between">
        <div className="text-grey-300 dark:text-muted-foreground font-bold text-sm">
          {Math.round(progress * 100) / 100}%
        </div>
        <div className="text-grey-300 dark:text-muted-foreground font-light text-sm">
          Target of {USDollar.format(target)}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <Button
          className="font-bold text-grey-900 dark:text-foreground bg-grey-100 dark:bg-secondary flex flex-grow border-2 border-grey-100 dark:border-secondary hover:bg-white dark:hover:bg-accent hover:text-black dark:hover:text-foreground hover:border-2 cursor-pointer"
          onClick={() => handleOpenModal(ModalType.ADD)}
          aria-label="Open Add Modal"
          disabled={isLoading}
        >
          + Add Money
        </Button>

        <Button
          className="font-bold text-grey-900 dark:text-foreground bg-grey-100 dark:bg-secondary border-2 border-grey-100 dark:border-secondary flex flex-grow hover:bg-white dark:hover:bg-accent hover:text-black dark:hover:text-foreground hover:border-2 cursor-pointer"
          onClick={() => handleOpenModal(ModalType.WITHDRAW)}
          aria-label="Open Withdraw Modal"
          disabled={isLoading}
        >
          Withdraw
        </Button>
      </div>

      {modalType === ModalType.ADD && (
        <AddMoneyModal
          onClose={handleCloseModal}
          hasCloseBtn={true}
          onAddMoney={handleAddMoney}
        />
      )}

      {modalType === ModalType.WITHDRAW && (
        <WithdrawMoneyModal
          onClose={handleCloseModal}
          hasCloseBtn={true}
          onWithdrawMoney={handleWithdrawMoney}
          maxAmount={potTotal}
        />
      )}
    </Card>
  );
}
