import React, { useState } from 'react';
import { Modal } from '../modal';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  moneyAmountSchema,
  getFieldErrors,
  getFieldError,
  FieldErrors,
} from '@/lib/validations';
import { z } from 'zod';

const WithdrawMoneyModal: React.FC<{
  onClose: () => void;
  onWithdrawMoney: (amount: number) => void;
  hasCloseBtn: boolean;
  maxAmount: number;
}> = ({ onClose, onWithdrawMoney, hasCloseBtn, maxAmount }) => {
  const [amount, setAmount] = useState<number>(0);
  const [errors, setErrors] = useState<
    FieldErrors<z.infer<typeof moneyAmountSchema>>
  >({});

  const handleBlur = (field: string, value: number) => {
    const error = getFieldError(moneyAmountSchema, field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleWithdrawMoney = () => {
    const result = getFieldErrors(moneyAmountSchema, { amount });
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    if (amount > maxAmount) {
      setErrors({
        amount: `Cannot withdraw more than $${maxAmount.toFixed(2)}.`,
      });
      return;
    }
    setErrors({});
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
            className="text-sm font-semibold text-grey-500 dark:text-muted-foreground"
          >
            Amount to withdraw
          </label>
          <input
            type="number"
            id="amountToWithdraw"
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => setAmount(Number(e.target.value))}
            onBlur={(e) => handleBlur('amount', Number(e.target.value))}
            placeholder="Enter amount"
          />
          {errors.amount && (
            <p className="text-red-600 dark:text-red text-sm mt-1">
              {errors.amount}
            </p>
          )}
          <Button
            type="button"
            className="text-white  font-bold cursor-pointer dark:text-gray-900"
            onClick={handleWithdrawMoney}
            aria-label="Confirm Withdrawal"
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
