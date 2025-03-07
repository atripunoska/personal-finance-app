import React, { useState } from "react";
import { Modal } from "../modal";

const WithdrawMoneyModal: React.FC<{
  onClose: () => void;
  onWithdrawMoney: (amount: number) => void;
  hasCloseBtn: boolean;
}> = ({ onClose, onWithdrawMoney, hasCloseBtn }) => {
  const [amount, setAmount] = useState<number>(0);

  const handleWithdrawMoney = () => {
    onWithdrawMoney(amount);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Withdraw Money"
      hasCloseBtn={hasCloseBtn}
    >
      <div>
        <p>Withdraw money from your pot.</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
        <button onClick={handleWithdrawMoney}>Withdraw</button>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default WithdrawMoneyModal;
