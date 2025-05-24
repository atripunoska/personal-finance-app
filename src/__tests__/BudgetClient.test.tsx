/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, fireEvent } from '@testing-library/react';
import BudgetClient from '../app/ui/budgets/BudgetClient';
import { BudgetProps, CategoriesDataProps } from '../lib/definitions';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

jest.mock('../app/ui/budgets/AddBudgetModal', () => ({ onClose }: any) => (
  <div data-testid="add-budget-modal">
    <button onClick={onClose}>Close Modal</button>
  </div>
));

jest.mock('../app/ui/budgets/ChartBudget', () => () => (
  <div data-testid="chart-budget" />
));

jest.mock('../app/ui/budgets/BudgetCard', () => (props: any) => (
  <div data-testid="budget-card">{props.category}</div>
));

const mockBudgets: BudgetProps[] = [
  { category: 'Food', maximum: 300, theme: 'green' },
];

const mockCategories: CategoriesDataProps[] = [
  { category: 'Food', amount: 120 },
];

describe('BudgetClient', () => {
  it('renders header and add button', () => {
    render(<BudgetClient budgets={mockBudgets} categories={mockCategories} />);
    expect(screen.getByText('Budgets')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /\+ Add New Budgets/i })
    ).toBeInTheDocument();
  });

  it('opens and closes the modal', () => {
    render(<BudgetClient budgets={mockBudgets} categories={mockCategories} />);
    fireEvent.click(
      screen.getByRole('button', { name: /\+ Add New Budgets/i })
    );
    expect(screen.getByTestId('add-budget-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Modal'));
    expect(screen.queryByTestId('add-budget-modal')).not.toBeInTheDocument();
  });

  it('renders chart and budget cards', () => {
    render(<BudgetClient budgets={mockBudgets} categories={mockCategories} />);
    expect(screen.getByTestId('chart-budget')).toBeInTheDocument();
    expect(screen.getByTestId('budget-card')).toHaveTextContent('Food');
  });
});
