import { calculateRecurringBillsData } from '@/lib/calculateRecurringBillsData';

// Helper to create a bill
function createBill(
  name: string,
  date: string,
  amount: number,
  avatar = '/avatar.png',
  category = 'Bills',
  recurring = true
) {
  return { name, date, amount, avatar, category, recurring };
}

describe('calculateRecurringBillsData', () => {
  describe('filtering duplicates', () => {
    it('removes duplicate bills with the same name', async () => {
      const recurringBills = {
        data: [
          createBill('Netflix', '2024-08-01', -15.99),
          createBill('Netflix', '2024-07-01', -15.99),
          createBill('Spotify', '2024-08-05', -9.99),
        ],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      // Should have 2 unique bills (Netflix + Spotify)
      const totalBills =
        (result.paidTransactions?.length ?? 0) +
        (result.upcomingTransactions?.length ?? 0);
      expect(totalBills).toBeLessThanOrEqual(2);
    });
  });

  describe('paid transactions', () => {
    it('categorizes bills as paid when date <= latest transaction date', async () => {
      const recurringBills = {
        data: [
          createBill('Netflix', '2024-08-05', -15.99),
          createBill('Spotify', '2024-08-10', -9.99),
        ],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.paidTransactions).toHaveLength(2);
      expect(result.totalPaid).toBe(2);
    });

    it('calculates total amount paid correctly', async () => {
      const recurringBills = {
        data: [
          createBill('Netflix', '2024-08-05', -15.99),
          createBill('Spotify', '2024-08-08', -9.99),
        ],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.totalAmountPaid).toBeCloseTo(25.98, 2);
    });

    it('uses absolute value for negative amounts', async () => {
      const recurringBills = {
        data: [createBill('Netflix', '2024-08-05', -20)],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.totalAmountPaid).toBe(20);
    });
  });

  describe('upcoming transactions', () => {
    it('categorizes bills as upcoming when date > latest transaction date', async () => {
      const recurringBills = {
        data: [
          createBill('Netflix', '2024-08-15', -15.99),
          createBill('Spotify', '2024-08-20', -9.99),
        ],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.upcomingTransactions).toHaveLength(2);
      expect(result.totalUpcoming).toBe(2);
    });

    it('calculates total amount upcoming correctly', async () => {
      const recurringBills = {
        data: [
          createBill('Netflix', '2024-08-15', -15.99),
          createBill('Spotify', '2024-08-20', -9.99),
        ],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.totalAmountUpcoming).toBeCloseTo(25.98, 2);
    });
  });

  describe('due soon transactions', () => {
    it('categorizes bills as due soon when within 5 days of latest transaction', async () => {
      const recurringBills = {
        data: [
          createBill('Netflix', '2024-08-12', -15.99), // 2 days after the 10th
          createBill('Spotify', '2024-08-14', -9.99), // 4 days after the 10th
        ],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.dueSoonTransaction).toHaveLength(2);
      expect(result.totalDue).toBe(2);
    });

    it('calculates total amount due soon correctly', async () => {
      const recurringBills = {
        data: [
          createBill('Netflix', '2024-08-12', -15.99),
          createBill('Spotify', '2024-08-13', -9.99),
        ],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.totalAmountDue).toBeCloseTo(25.98, 2);
    });

    it('does not include bills beyond 5 days as due soon', async () => {
      const recurringBills = {
        data: [
          createBill('Netflix', '2024-08-20', -15.99), // 10 days after the 10th
        ],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.dueSoonTransaction).toHaveLength(0);
      expect(result.totalDue).toBe(0);
    });
  });

  describe('mixed transactions', () => {
    it('correctly categorizes a mix of paid, upcoming, and due soon', async () => {
      const recurringBills = {
        data: [
          createBill('Paid Bill', '2024-08-05', -50), // paid
          createBill('Due Soon Bill', '2024-08-12', -30), // due soon (within 5 days)
          createBill('Upcoming Bill', '2024-08-25', -20), // upcoming (beyond 5 days)
        ],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.totalPaid).toBe(1);
      expect(result.totalUpcoming).toBe(2); // includes due soon
      expect(result.totalDue).toBe(1);
      expect(result.totalAmountPaid).toBe(50);
    });
  });

  describe('edge cases', () => {
    it('handles empty data array', async () => {
      const recurringBills = { data: [] };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.totalPaid).toBe(0);
      expect(result.totalUpcoming).toBe(0);
      expect(result.totalDue).toBe(0);
      expect(result.totalAmountPaid).toBe(0);
      expect(result.totalAmountUpcoming).toBe(0);
      expect(result.totalAmountDue).toBe(0);
    });

    it('returns the latest transaction date', async () => {
      const recurringBills = { data: [] };
      const latestTransaction = { date: '2024-08-15' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.latestTransactionDate).toEqual(new Date('2024-08-15'));
    });

    it('calculates total amount as sum of paid, upcoming, and due', async () => {
      const recurringBills = {
        data: [
          createBill('Paid', '2024-08-05', -10),
          createBill('Upcoming', '2024-08-20', -20),
        ],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.totalAmount).toBe(
        result.totalAmountPaid +
          result.totalAmountUpcoming +
          result.totalAmountDue
      );
    });

    it('handles bills on the same day as latest transaction as paid', async () => {
      const recurringBills = {
        data: [createBill('Same Day Bill', '2024-08-10', -25)],
      };
      const latestTransaction = { date: '2024-08-10' };

      const result = await calculateRecurringBillsData(
        recurringBills,
        latestTransaction
      );

      expect(result.paidTransactions).toHaveLength(1);
      expect(result.totalAmountPaid).toBe(25);
    });
  });
});
