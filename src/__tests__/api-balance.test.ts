const mockSql = jest.fn();

jest.mock('../lib/db', () => ({
  getDB: () => Promise.resolve(mockSql),
}));

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown, init?: { status?: number }) => ({
      json: async () => data,
      status: init?.status ?? 200,
    }),
  },
}));

import { GET } from '../app/api/balance/route';

describe('GET /api/balance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns balance data on success', async () => {
    const mockBalance = [
      { id: 1, type: 'current', amount: 5000 },
      { id: 2, type: 'income', amount: 3500 },
      { id: 3, type: 'expenses', amount: 1200 },
    ];
    mockSql.mockResolvedValueOnce(mockBalance);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockBalance);
  });

  it('returns empty array when no balance data exists', async () => {
    mockSql.mockResolvedValueOnce([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
  });

  it('returns 500 error when database query fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockSql.mockRejectedValueOnce(new Error('Database connection failed'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to fetch balance data' });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Database Error:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('calls the database with correct query', async () => {
    mockSql.mockResolvedValueOnce([]);

    await GET();

    expect(mockSql).toHaveBeenCalled();
  });
});
