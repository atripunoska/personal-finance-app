'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { addAmountToPot, withdrawAmountFromPot } from '@/lib/data';
import { USDollar } from '@/lib/utils';
import WithdrawMoneyModal from './WithdrawMoneyModal';
import AddMoneyModal from './AddMoneyModal';
import Dropdown from './Dropdown';
import { ModalType, PotCardProps } from '@/lib/definitions';

export default function PotCard({ name, theme, target, total }: PotCardProps) {
  const progress = (total / target) * 100;

  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [potTotal, setPotTotal] = useState<number>(total);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(ModalType.NONE);
  };

  const handleAddMoney = async (amount: number) => {
    try {
      await addAmountToPot(name, amount);
      setPotTotal(potTotal + amount);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add money to pot:', error);
    }
  };

  const handleWithdrawMoney = async (amount: number) => {
    try {
      await withdrawAmountFromPot(name, amount);
      setPotTotal(potTotal - amount);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to withdraw money from pot:', error);
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
            <h3 className="font-bold text-xl text-grey-900 ">{name}</h3>
          </div>
          <Dropdown potId={name} target={target} initialTheme={theme} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-grey-300 font-bold ">Total Saved</div>
        <div className="text-grey-900 font-bold text-3xl ">
          {USDollar.format(total)}
        </div>
      </div>
      <Progress
        value={progress}
        indicatorColor={theme}
        role="progressbar"
        aria-label={name + 'progress bar'}
      />
      <div className="flex justify-between">
        <div className="text-grey-300 font-bold text-sm ">
          {Math.round(progress * 100) / 100}%
        </div>
        <div className="text-grey-300 font-light text-sm ">
          Target of {USDollar.format(target)}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <Button
          className="font-bold  text-grey-900 bg-grey-100 flex flex-grow border-2 border-grey-100 hover:bg-white hover:text-black hover:border-2 cursor-pointer"
          onClick={() => handleOpenModal(ModalType.ADD)}
          aria-label="Open Add Modal"
        >
          + Add Money
        </Button>

        <Button
          className="font-bold  text-grey-900 bg-grey-100 border-2 border-grey-100 flex flex-grow hover:bg-white hover:text-black hover:border-2 cursor-pointer"
          onClick={() => handleOpenModal(ModalType.WITHDRAW)}
          aria-label="Open Withdraw Modal"
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
        />
      )}
    </Card>
  );
}
