/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PotsPage from '../app/dashboard/pots/page';
import { fetchPotsClient } from '../lib/data';

import { Pot } from '../lib/definitions';

jest.mock('../lib/data', () => ({
  fetchPotsClient: jest.fn(),
}));

jest.mock('../app/ui/pots/PotCard', () => ({ name, potId }: Pot) => (
  <div data-testid="pot-card">
    {name} ({potId})
  </div>
));

jest.mock('../app/ui/pots/AddNewPotModal', () => (props: any) => (
  <div data-testid="modal">
    <button onClick={() => props.onAddPot({ name: 'New Pot', theme: 'blue' })}>
      Confirm Add
    </button>
    <button onClick={props.onClose}>Close</button>
  </div>
));

describe('PotsPage', () => {
  const mockPots: Pot[] = [
    {
      name: 'Emergency Fund',
      theme: 'green',
      target: 0,
      total: 0,
    },
    {
      name: 'Vacation',
      theme: 'orange',
      target: 0,
      total: 0,
    },
  ];

  beforeEach(() => {
    (fetchPotsClient as jest.Mock).mockResolvedValue(mockPots);
  });

  it('renders header and loads pots', async () => {
    render(<PotsPage />);

    expect(screen.getByText('Pots')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add new pot/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId('pot-card')).toHaveLength(mockPots.length);
    });
  });

  it('opens modal when button is clicked', async () => {
    render(<PotsPage />);

    fireEvent.click(screen.getByRole('button', { name: /add new pot/i }));

    expect(await screen.findByTestId('modal')).toBeInTheDocument();
  });

  it('adds a new pot through modal', async () => {
    render(<PotsPage />);
    fireEvent.click(screen.getByRole('button', { name: /add new pot/i }));

    const confirmBtn = await screen.findByText('Confirm Add');
    fireEvent.click(confirmBtn);

    const potCards = await screen.findAllByTestId('pot-card');
    expect(potCards).toHaveLength(mockPots.length + 1);
  });

  it('closes the modal', async () => {
    render(<PotsPage />);
    fireEvent.click(screen.getByRole('button', { name: /add new pot/i }));

    const closeBtn = await screen.findByText('Close');
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });
});
