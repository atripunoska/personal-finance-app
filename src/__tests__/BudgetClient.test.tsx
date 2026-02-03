/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, fireEvent } from '@testing-library/react';
import BudgetClient from '../app/ui/budgets/BudgetClient';
import { BudgetProps, CategoriesDataProps } from '../lib/definitions';
import '@testing-library/jest-dom';

const mockRefresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
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

jest.mock(
  '../app/ui/budgets/BudgetCard',
  () =>
    ({ category, maximum, amountSpend, value }: any) => (
      <div data-testid={`budget-card-${category}`}>
        <span data-testid="category">{category}</span>
        <span data-testid="maximum">{maximum}</span>
        <span data-testid="amount-spend">{amountSpend}</span>
        <span data-testid="progress">{value}</span>
      </div>
    )
);

const mockBudgets: BudgetProps[] = [
  { category: 'Food', maximum: 300, theme: 'green' },
  { category: 'Entertainment', maximum: 500, theme: 'blue' },
];

const mockCategories: CategoriesDataProps[] = [
  { category: 'Food', amount: 120 },
  { category: 'Food', amount: 80 },
  { category: 'Entertainment', amount: 150 },
];

describe('BudgetClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('calls router.refresh when modal is closed', () => {
    render(<BudgetClient budgets={mockBudgets} categories={mockCategories} />);
    fireEvent.click(
      screen.getByRole('button', { name: /\+ Add New Budgets/i })
    );
    fireEvent.click(screen.getByText('Close Modal'));

    expect(mockRefresh).toHaveBeenCalled();
  });

  it('renders chart and budget cards', () => {
    render(<BudgetClient budgets={mockBudgets} categories={mockCategories} />);
    expect(screen.getByTestId('chart-budget')).toBeInTheDocument();
    expect(screen.getByTestId('budget-card-Food')).toBeInTheDocument();
    expect(screen.getByTestId('budget-card-Entertainment')).toBeInTheDocument();
  });

  it('calculates totalAmountByCategory correctly', () => {
    render(<BudgetClient budgets={mockBudgets} categories={mockCategories} />);

    // Food: 120 + 80 = 200
    const foodCard = screen.getByTestId('budget-card-Food');
    expect(
      foodCard.querySelector('[data-testid="amount-spend"]')
    ).toHaveTextContent('200');

    // Entertainment: 150
    const entertainmentCard = screen.getByTestId('budget-card-Entertainment');
    expect(
      entertainmentCard.querySelector('[data-testid="amount-spend"]')
    ).toHaveTextContent('150');
  });

  it('calculates progress percentage correctly', () => {
    const budgets: BudgetProps[] = [
      { category: 'Test', maximum: 200, theme: '#000' },
    ];
    const categories: CategoriesDataProps[] = [
      { category: 'Test', amount: 100 },
    ];

    render(<BudgetClient budgets={budgets} categories={categories} />);

    // Progress = (100 / 200) * 100 = 50%
    const card = screen.getByTestId('budget-card-Test');
    expect(card.querySelector('[data-testid="progress"]')).toHaveTextContent(
      '50'
    );
  });

  it('handles zero maximum gracefully (progress = 0)', () => {
    const budgets: BudgetProps[] = [
      { category: 'ZeroMax', maximum: 0, theme: '#000' },
    ];
    const categories: CategoriesDataProps[] = [
      { category: 'ZeroMax', amount: 100 },
    ];

    render(<BudgetClient budgets={budgets} categories={categories} />);

    const card = screen.getByTestId('budget-card-ZeroMax');
    expect(card.querySelector('[data-testid="progress"]')).toHaveTextContent(
      '0'
    );
  });

  it('handles categories with no spending', () => {
    const budgets: BudgetProps[] = [
      { category: 'NoSpending', maximum: 500, theme: '#000' },
    ];
    const categories: CategoriesDataProps[] = [];

    render(<BudgetClient budgets={budgets} categories={categories} />);

    const card = screen.getByTestId('budget-card-NoSpending');
    expect(
      card.querySelector('[data-testid="amount-spend"]')
    ).toHaveTextContent('0');
    expect(card.querySelector('[data-testid="progress"]')).toHaveTextContent(
      '0'
    );
  });

  it('uses absolute value for negative amounts', () => {
    const budgets: BudgetProps[] = [
      { category: 'Negative', maximum: 100, theme: '#000' },
    ];
    const categories: CategoriesDataProps[] = [
      { category: 'Negative', amount: -50 },
    ];

    render(<BudgetClient budgets={budgets} categories={categories} />);

    const card = screen.getByTestId('budget-card-Negative');
    expect(
      card.querySelector('[data-testid="amount-spend"]')
    ).toHaveTextContent('50');
  });

  it('renders empty state when no budgets provided', () => {
    render(<BudgetClient budgets={[]} categories={mockCategories} />);

    expect(screen.getByText('Budgets')).toBeInTheDocument();
    expect(screen.getByTestId('chart-budget')).toBeInTheDocument();
    expect(screen.queryByTestId(/budget-card/)).not.toBeInTheDocument();
  });

  it('does not show modal by default', () => {
    render(<BudgetClient budgets={mockBudgets} categories={mockCategories} />);
    expect(screen.queryByTestId('add-budget-modal')).not.toBeInTheDocument();
  });

  it('renders a BudgetCard for each budget', () => {
    render(<BudgetClient budgets={mockBudgets} categories={mockCategories} />);

    const budgetCards = screen.getAllByTestId(/budget-card-/);
    expect(budgetCards).toHaveLength(2);
  });

  it('passes correct maximum value to BudgetCard', () => {
    render(<BudgetClient budgets={mockBudgets} categories={mockCategories} />);

    const foodCard = screen.getByTestId('budget-card-Food');
    expect(foodCard.querySelector('[data-testid="maximum"]')).toHaveTextContent(
      '300'
    );

    const entertainmentCard = screen.getByTestId('budget-card-Entertainment');
    expect(
      entertainmentCard.querySelector('[data-testid="maximum"]')
    ).toHaveTextContent('500');
  });
});
