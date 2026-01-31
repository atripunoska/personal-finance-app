export const THEMES = [
  '#82C9D7',
  '#F2CDAC',
  '#277C78',
  '#626070',
  '#A020F0',
  '#FFA500',
  '#BCB88A',
  '#ff78df',
];

export enum ModalType {
  ADD = 'add',
  WITHDRAW = 'withdraw',
  EDIT = 'edit',
  DELETE = 'delete',
  NONE = 'none',
}

export interface LinkType {
  name: string;
  path: string;
  icon: string;
}

export interface BalanceCardProps {
  type: string;
  id: number;
  amount: number;
}

export interface TransactionsTableWidgetProps {
  transactions: Transaction[];
}

export interface PotsWidgetProps {
  pots: Pot[];
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
}

export interface Bill {
  name: string;
  avatar?: string;
  date: string;
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

export interface BudgetProps {
  category: string;
  maximum: number;
  theme: string;
}

export interface BudgetCardProps {
  category: string;
  theme: string;
  maximum: number;
  value: number;
  amountSpend: number;
  categories: CategoriesDataProps[];
}

export interface BudgetCardButtonProps {
  category: string;
  initialTheme: string;
  maximumAmount: number;
  categories: CategoriesDataProps[];
}

export interface CategoriesDataProps {
  category: string;
  amount: number;
}
export interface TotalAmountByCategory {
  [key: string]: number;
}

export interface PotCardProps {
  name: string;
  theme: string;
  target: number;
  total: number;
  potId: string;
  onPotDeleted?: () => void;
  onPotUpdated?: () => void;
}

export interface SelectByCategoryProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
}

export interface Transaction {
  name: string;
  avatar: string;
  amount: number;
  date: Date;
}
export interface BudgetCardTableProps {
  readonly transactions: Transaction[];
}

export interface theme {
  theme: string;
}

export interface SortProps {
  onSortChange: (sort: string) => void;
}

export interface AddBudgetModalProps {
  onClose: () => void;
  categories: { category: string }[];
  allThemes: string[];
}

export interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  title: string;
  children?: React.ReactNode;
}
