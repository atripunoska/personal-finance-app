export enum ModalType {
  ADD = "add",
  WITHDRAW = "withdraw",
  EDIT = "edit",
  DELETE = "delete",
  NONE = null,
}

export type Pages = {
  name: string;
  path: string;
  icon: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export interface Pot {
  name: string;
  theme: string;
  target: number;
  total: number;
  // Add other properties of Pot here
}

export interface Bill {
  name: string;
  avatar: string;
  date: Date;
  amount: number;
}

export interface RecurringBillsTableProps {
  paid: Bill[];
  upcoming: Bill[];
  latestTransactionDate: Date;
}
