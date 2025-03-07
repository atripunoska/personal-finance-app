import React, { useState } from "react";
import { Modal } from "../modal";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

const WithdrawMoneyModal: React.FC<{
  onClose: () => void;
  onWithdrawMoney: (amount: number) => void;
  hasCloseBtn: boolean;
}> = ({ onClose, onWithdrawMoney, hasCloseBtn }) => {
  const [amount, setAmount] = useState<number>(0);

  const handleWithdrawMoney = () => {
    onWithdrawMoney(amount);
  };

  return createPortal(
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Withdraw Money"
      hasCloseBtn={hasCloseBtn}
    >
      {/* Modal content */}
      <div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero,
          quisquam fugiat quis facere saepe sapiente amet praesentium iure?
          Consectetur, maxime tempora eos ad ipsum aliquid harum sapiente
          mollitia odit adipisci.
        </p>
        <form action="" className="flex flex-col gap-3 mt-4">
          <label
            htmlFor="amountToWithdraw"
            className="text-sm font-semibold text-grey-500"
          >
            Amount to withdraw
          </label>
          <input
            type="number"
            id="amountToWithdraw"
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
          <Button
            className="text-white  font-bold"
            onClick={handleWithdrawMoney}
          >
            Confirm Withdrawal
          </Button>
        </form>
      </div>
    </Modal>,
    document.body
  );
};

export default WithdrawMoneyModal;
