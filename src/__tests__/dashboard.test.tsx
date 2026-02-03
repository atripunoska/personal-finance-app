import { render, screen } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';

// Mock child components
jest.mock('../app/dashboard/components/BalanceSection', () => {
  const MockBalanceSection = () => (
    <div data-testid="balance-section">Balance Section</div>
  );
  MockBalanceSection.displayName = 'MockBalanceSection';
  return MockBalanceSection;
});

jest.mock('../app/dashboard/components/BudgetsSection', () => {
  const MockBudgetsSection = () => (
    <div data-testid="budgets-section">Budgets Section</div>
  );
  MockBudgetsSection.displayName = 'MockBudgetsSection';
  return MockBudgetsSection;
});

jest.mock('../app/dashboard/components/PotsSection', () => {
  const MockPotsSection = () => (
    <div data-testid="pots-section">Pots Section</div>
  );
  MockPotsSection.displayName = 'MockPotsSection';
  return MockPotsSection;
});

jest.mock('../app/dashboard/components/RecurringBillsSection', () => {
  const MockRecurringBillsSection = () => (
    <div data-testid="recurring-bills-section">Recurring Bills Section</div>
  );
  MockRecurringBillsSection.displayName = 'MockRecurringBillsSection';
  return MockRecurringBillsSection;
});

jest.mock('../app/dashboard/components/TransactionsSection', () => {
  const MockTransactionsSection = () => (
    <div data-testid="transactions-section">Transactions Section</div>
  );
  MockTransactionsSection.displayName = 'MockTransactionsSection';
  return MockTransactionsSection;
});

// Mock skeleton components
jest.mock('../app/ui/dashboard/PotsWidgetSkeleton', () => {
  const MockPotsWidgetSkeleton = () => <div>Pots Loading...</div>;
  MockPotsWidgetSkeleton.displayName = 'MockPotsWidgetSkeleton';
  return MockPotsWidgetSkeleton;
});

jest.mock('../app/ui/transactions/TransactionsTableSkeleton', () => {
  const MockTransactionsTableSkeleton = () => (
    <div>Transactions Loading...</div>
  );
  MockTransactionsTableSkeleton.displayName = 'MockTransactionsTableSkeleton';
  return MockTransactionsTableSkeleton;
});

jest.mock('../app/ui/dashboard/ChartSkeleton', () => {
  const MockChartSkeleton = () => <div>Chart Loading...</div>;
  MockChartSkeleton.displayName = 'MockChartSkeleton';
  return MockChartSkeleton;
});

jest.mock('../app/ui/dashboard/RecurringBillsWidgetSkeleton', () => {
  const MockRecurringBillsWidgetSkeleton = () => (
    <div>Recurring Bills Loading...</div>
  );
  MockRecurringBillsWidgetSkeleton.displayName =
    'MockRecurringBillsWidgetSkeleton';
  return MockRecurringBillsWidgetSkeleton;
});

describe('Dashboard', () => {
  it('renders the Overview heading', () => {
    render(<Dashboard />);
    expect(
      screen.getByRole('heading', { name: /overview/i })
    ).toBeInTheDocument();
  });

  it('renders the BalanceSection', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('balance-section')).toBeInTheDocument();
  });

  it('renders the PotsSection', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('pots-section')).toBeInTheDocument();
  });

  it('renders the TransactionsSection', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('transactions-section')).toBeInTheDocument();
  });

  it('renders the BudgetsSection', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('budgets-section')).toBeInTheDocument();
  });

  it('renders the RecurringBillsSection', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('recurring-bills-section')).toBeInTheDocument();
  });

  it('renders main element as container', () => {
    render(<Dashboard />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
