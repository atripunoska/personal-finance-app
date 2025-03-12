export const THEMES = [
  "#82C9D7",
  "#F2CDAC",
  "#277C78",
  "#626070",
  "#A020F0",
  "#FFA500",
  "#BCB88A",
  "#ff78df",
];

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

export interface SearchBillsProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SortBillsProps {
  onSortChange: (sortBy: string) => void;
}
