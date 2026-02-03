import { render, screen } from '@testing-library/react';
import ChartBudget from '../app/ui/budgets/ChartBudget';
import { BudgetProps, TotalAmountByCategory } from '../lib/definitions';

// Mock react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Doughnut: ({ data }: { data: { datasets: { data: number[] }[] } }) => (
    <div data-testid="doughnut-chart" data-values={JSON.stringify(data.datasets[0].data)}>
      Doughnut Chart
    </div>
  ),
}));

// Mock chart.js
jest.mock('chart.js', () => ({
  Chart: {
    register: jest.fn(),
  },
  ArcElement: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

describe('ChartBudget', () => {
  const mockDataProps: BudgetProps[] = [
    { category: 'Entertainment', maximum: 500, theme: '#FF0000' },
    { category: 'Dining Out', maximum: 300, theme: '#00FF00' },
    { category: 'Groceries', maximum: 400, theme: '#0000FF' },
  ];

  const mockTotalAmountByCategory: TotalAmountByCategory = {
    Entertainment: 250,
    'Dining Out': 150,
    Groceries: 380,
  };

  it('renders the Doughnut chart', () => {
    render(
      <ChartBudget
        dataProps={mockDataProps}
        totalAmountByCategory={mockTotalAmountByCategory}
      />
    );

    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
  });

  it('renders Spending Summary heading', () => {
    render(
      <ChartBudget
        dataProps={mockDataProps}
        totalAmountByCategory={mockTotalAmountByCategory}
      />
    );

    expect(
      screen.getByRole('heading', { name: /spending summary/i })
    ).toBeInTheDocument();
  });

  it('renders a row for each budget category', () => {
    render(
      <ChartBudget
        dataProps={mockDataProps}
        totalAmountByCategory={mockTotalAmountByCategory}
      />
    );

    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Dining Out')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  it('displays formatted total amount spent for each category', () => {
    render(
      <ChartBudget
        dataProps={mockDataProps}
        totalAmountByCategory={mockTotalAmountByCategory}
      />
    );

    // $250.00 for Entertainment
    expect(screen.getByText('$250.00')).toBeInTheDocument();
    // $150.00 for Dining Out
    expect(screen.getByText('$150.00')).toBeInTheDocument();
    // $380.00 for Groceries
    expect(screen.getByText('$380.00')).toBeInTheDocument();
  });

  it('displays formatted maximum budget for each category', () => {
    render(
      <ChartBudget
        dataProps={mockDataProps}
        totalAmountByCategory={mockTotalAmountByCategory}
      />
    );

    // $500.00 max for Entertainment
    expect(screen.getByText('$500.00')).toBeInTheDocument();
    // $300.00 max for Dining Out
    expect(screen.getByText('$300.00')).toBeInTheDocument();
    // $400.00 max for Groceries
    expect(screen.getByText('$400.00')).toBeInTheDocument();
  });

  it('displays "of" text between amount and maximum', () => {
    render(
      <ChartBudget
        dataProps={mockDataProps}
        totalAmountByCategory={mockTotalAmountByCategory}
      />
    );

    const ofTexts = screen.getAllByText('of');
    expect(ofTexts).toHaveLength(3);
  });

  it('handles missing category in totalAmountByCategory (defaults to 0)', () => {
    const dataProps: BudgetProps[] = [
      { category: 'Unknown', maximum: 200, theme: '#000' },
    ];
    const totalAmountByCategory: TotalAmountByCategory = {};

    render(
      <ChartBudget
        dataProps={dataProps}
        totalAmountByCategory={totalAmountByCategory}
      />
    );

    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
  });

  it('uses absolute value for negative amounts', () => {
    const dataProps: BudgetProps[] = [
      { category: 'Test', maximum: 100, theme: '#000' },
    ];
    const totalAmountByCategory: TotalAmountByCategory = {
      Test: -75,
    };

    render(
      <ChartBudget
        dataProps={dataProps}
        totalAmountByCategory={totalAmountByCategory}
      />
    );

    expect(screen.getByText('$75.00')).toBeInTheDocument();
  });

  it('passes correct data to Doughnut chart', () => {
    render(
      <ChartBudget
        dataProps={mockDataProps}
        totalAmountByCategory={mockTotalAmountByCategory}
      />
    );

    const chart = screen.getByTestId('doughnut-chart');
    const dataValues = JSON.parse(chart.getAttribute('data-values') || '[]');

    expect(dataValues).toEqual([500, 300, 400]);
  });

  it('renders empty state when no budgets provided', () => {
    render(
      <ChartBudget dataProps={[]} totalAmountByCategory={{}} />
    );

    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /spending summary/i })
    ).toBeInTheDocument();
  });

  it('renders color indicator with correct theme color', () => {
    const dataProps: BudgetProps[] = [
      { category: 'Colored', maximum: 100, theme: '#FF5733' },
    ];

    const { container } = render(
      <ChartBudget dataProps={dataProps} totalAmountByCategory={{ Colored: 50 }} />
    );

    const colorIndicator = container.querySelector('[style*="background-color"]');
    expect(colorIndicator).toHaveStyle({ backgroundColor: '#FF5733' });
  });
});
