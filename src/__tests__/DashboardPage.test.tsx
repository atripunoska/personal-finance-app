import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Dashboard from '../app/dashboard/page';

// Mock all section components and skeletons
jest.mock('../app/dashboard/components/BalanceSection', () => () => (
  <div>BalanceSection</div>
));
jest.mock('../app/dashboard/components/BudgetsSection', () => () => (
  <div>BudgetsSection</div>
));
jest.mock('../app/dashboard/components/PotsSection', () => () => (
  <div>PotsSection</div>
));
jest.mock('../app/dashboard/components/RecurringBillsSection', () => () => (
  <div>RecurringBillsSection</div>
));
jest.mock('../app/dashboard/components/TransactionsSection', () => () => (
  <div>TransactionsSection</div>
));
jest.mock('../app/ui/dashboard/PotsWidgetSkeleton', () => () => (
  <div>PotsWidgetSkeleton</div>
));
jest.mock('../app/ui/transactions/TransactionsTableSkeleton', () => () => (
  <div>TransactionsTableSkeleton</div>
));
jest.mock('../app/ui/dashboard/ChartSkeleton', () => () => (
  <div>ChartSkeleton</div>
));
jest.mock('../app/ui/dashboard/RecurringBillsWidgetSkeleton', () => () => (
  <div>RecurringBillsWidgetSkeleton</div>
));

describe('Dashboard', () => {
  it('renders a heading', () => {
    render(<Dashboard />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('renders all main dashboard sections', () => {
    render(<Dashboard />);
    expect(screen.getByText('BalanceSection')).toBeInTheDocument();
    expect(screen.getByText('BudgetsSection')).toBeInTheDocument();
    expect(screen.getByText('PotsSection')).toBeInTheDocument();
    expect(screen.getByText('RecurringBillsSection')).toBeInTheDocument();
    expect(screen.getByText('TransactionsSection')).toBeInTheDocument();
  });
});
