"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import { addAmountToPot, withdrawAmountFromPot } from "@/lib/data";
import { USDollar } from "@/lib/utils";
import WithdrawMoneyModal from "./WithdrawMoneyModal";
import AddMoneyModal from "./addMoneyModal";

export default function PotCard({
  name,
  theme,
  target,
  total,
  potId,
}: Readonly<{
  name: string;
  theme: string;
  target: number;
  total: number;
  potId: string;
}>) {
  const progress = (total / target) * 100;
  const [isAddMoneyModalOpen, setAddMoneyModalOpen] = useState<boolean>(false);

  const [isWithdrawMoneyModalOpen, setWithdrawMoneyModalOpen] =
    useState<boolean>(false);

  const [potTotal, setPotTotal] = useState<number>(total);

  const handleOpenAddMoneyModal = () => {
    setAddMoneyModalOpen(true);
  };

  const handleCloseAddMoneyModal = () => {
    setAddMoneyModalOpen(false);
  };

  const handleOpenWithdrawMoneyModal = () => {
    setWithdrawMoneyModalOpen(true);
  };

  const handleCloseWithdrawMoneyModal = () => {
    setWithdrawMoneyModalOpen(false);
  };

  const handleAddMoney = async (amount: number) => {
    try {
      await addAmountToPot(potId, amount);
      setPotTotal(potTotal + amount);
      handleCloseAddMoneyModal();
    } catch (error) {
      console.error("Failed to add money to pot:", error);
    }
  };

  const handleWithdrawMoney = async (amount: number) => {
    try {
      await withdrawAmountFromPot(potId, amount);
      setPotTotal(potTotal - amount);
      handleCloseWithdrawMoneyModal();
    } catch (error) {
      console.error("Failed to withdraw money from pot:", error);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex gap-3 items-center">
        <div
          className="w-4 h-4 rounded-full flex"
          style={{ backgroundColor: `${theme}` }}
        ></div>
        <h3 className="font-bold text-xl text-grey-900 font-public-sans">
          {name}
        </h3>
      </div>
      <div className="flex justify-between">
        <div className="text-grey-300 font-bold font-public-sans">
          Total Saved
        </div>
        <div className="text-grey-900 font-bold text-3xl font-public-sans">
          {USDollar.format(total)}
        </div>
      </div>
      <Progress value={progress} indicatorColor={theme} />
      <div className="flex justify-between">
        <div className="text-grey-300 font-bold text-sm font-public-sans">
          {Math.round(progress * 100) / 100}%
        </div>
        <div className="text-grey-300 font-light text-sm font-public-sans">
          Target of {USDollar.format(target)}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <Button
          className="font-bold font-public-sans text-grey-900 bg-grey-100 flex flex-grow border-2 border-grey-100 hover:bg-white hover:text-black hover:border-2"
          onClick={handleOpenAddMoneyModal}
        >
          + Add Money
        </Button>

        <Button
          className="font-bold font-public-sans text-grey-900 bg-grey-100 border-2 border-grey-100 flex flex-grow hover:bg-white hover:text-black hover:border-2"
          onClick={handleOpenWithdrawMoneyModal}
        >
          Withdraw
        </Button>
      </div>

      {isAddMoneyModalOpen && (
        <AddMoneyModal
          onClose={handleCloseAddMoneyModal}
          hasCloseBtn={true}
          onAddMoney={handleAddMoney}
        />
      )}

      {isWithdrawMoneyModalOpen && (
        <WithdrawMoneyModal
          onClose={handleCloseWithdrawMoneyModal}
          hasCloseBtn={true}
          onWithdrawMoney={handleWithdrawMoney}
        />
      )}
    </Card>
  );
}
