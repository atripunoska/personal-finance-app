import { getDate } from "date-fns";

export async function calculateRecurringBillsData(
  recurringBills: {
    data: {
      name: string;
      date: string;
      amount: number;
      avatar: string;
      category: string;
      recurring: boolean;
    }[];
  },
  latestTransaction: { date: string }
) {
  let totalAmountPaid = 0;
  let totalAmountUpcoming = 0;
  let totalAmountDue = 0;

  // Filter out duplicate items with the same name
  const uniqueRecurringBills = recurringBills.data?.filter(
    (item, index, self) => index === self.findIndex((t) => t.name === item.name)
  );
  const latestTransactionDate = new Date(latestTransaction.date);
  const dueSoon = getDate(latestTransactionDate);

  // Separate paid and due soon transactions
  const paidTransactions = uniqueRecurringBills?.filter(
    (item) =>
      new Date(item.date) <= latestTransactionDate &&
      new Date(item.date) > new Date("2024-08-01")
  );

  uniqueRecurringBills?.forEach((item) => {
    const itemDate = new Date(item.date);
    if (
      itemDate <= latestTransactionDate &&
      itemDate > new Date("2024-08-01")
    ) {
      totalAmountPaid += item.amount;
    }
  });

  const upcomingTransactions = uniqueRecurringBills?.filter((item) => {
    const itemDate = new Date(item.date);
    if (getDate(itemDate) > getDate(latestTransactionDate))
      totalAmountUpcoming = totalAmountUpcoming + item.amount;
    return getDate(itemDate) > getDate(latestTransactionDate);
  });

  const dueSoonTransaction = uniqueRecurringBills?.filter((item) => {
    const itemDate = new Date(item.date);

    if (getDate(itemDate) > getDate(latestTransactionDate)) {
      if (getDate(item.date) > dueSoon && getDate(item.date) < dueSoon + 5) {
        totalAmountDue = totalAmountDue + item.amount;
      }
    }

    return getDate(item.date) > dueSoon && getDate(item.date) < dueSoon + 5;
  });

  const totalPaid = paidTransactions?.length ?? 0;
  const totalUpcoming = upcomingTransactions?.length ?? 0;
  const totalDue = dueSoonTransaction?.length ?? 0;
  const totalAmount =
    totalAmountPaid && totalAmountUpcoming && totalAmountDue
      ? totalAmountPaid + totalAmountUpcoming + totalAmountDue
      : 0;

  return {
    totalAmountPaid,
    totalAmountUpcoming,
    totalAmountDue,
    totalPaid,
    totalUpcoming,
    totalDue,
    totalAmount,
    paidTransactions,
    upcomingTransactions,
    dueSoonTransaction,
    latestTransactionDate,
  };
}
