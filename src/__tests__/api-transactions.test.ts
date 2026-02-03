const mockSql = jest.fn() as jest.Mock & { unsafe: jest.Mock };
mockSql.unsafe = jest.fn((str: string) => str);

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

import { GET } from '../app/api/transactions/route';

// Helper to create mock Request with URL
function createMockRequest(url: string): Request {
  return { url } as unknown as Request;
}

describe('GET /api/transactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('default - all transactions', () => {
    it('returns all transactions when no query params', async () => {
      const mockTransactions = [
        { id: 1, name: 'Grocery Store', amount: -50, category: 'Groceries' },
        { id: 2, name: 'Salary', amount: 3000, category: 'Income' },
      ];
      mockSql.mockResolvedValueOnce(mockTransactions);

      const request = createMockRequest('http://localhost/api/transactions');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTransactions);
    });
  });

  describe('recurring transactions', () => {
    it('returns recurring transactions when recurring=true', async () => {
      const mockRecurring = [
        { id: 1, name: 'Netflix', amount: -15.99, recurring: true },
        { id: 2, name: 'Spotify', amount: -9.99, recurring: true },
      ];
      mockSql.mockResolvedValueOnce(mockRecurring);

      const request = createMockRequest(
        'http://localhost/api/transactions?recurring=true'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockRecurring, error: null });
    });
  });

  describe('latest transaction', () => {
    it('returns latest transaction when latest=true', async () => {
      const mockLatest = [{ date: '2024-08-15' }];
      mockSql.mockResolvedValueOnce(mockLatest);

      const request = createMockRequest(
        'http://localhost/api/transactions?latest=true'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ date: '2024-08-15' });
    });

    it('returns current date when no transactions exist', async () => {
      mockSql.mockResolvedValueOnce([]);

      const request = createMockRequest(
        'http://localhost/api/transactions?latest=true'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('date');
    });
  });

  describe('filtered/paginated transactions', () => {
    it('returns filtered transactions with default sort', async () => {
      const mockFiltered = [
        { id: 1, name: 'Test', amount: -100, category: 'Shopping' },
      ];
      mockSql.mockResolvedValueOnce(mockFiltered);

      const request = createMockRequest(
        'http://localhost/api/transactions?filtered=true&page=1'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockFiltered, error: null });
    });

    it('filters by category when provided', async () => {
      const mockFiltered = [
        { id: 1, name: 'Restaurant', amount: -50, category: 'Dining Out' },
      ];
      mockSql.mockResolvedValueOnce(mockFiltered);

      const request = createMockRequest(
        'http://localhost/api/transactions?filtered=true&category=Dining'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockFiltered, error: null });
    });

    it('ignores category filter when set to "all"', async () => {
      const mockFiltered = [{ id: 1, name: 'Test', amount: -100 }];
      mockSql.mockResolvedValueOnce(mockFiltered);

      const request = createMockRequest(
        'http://localhost/api/transactions?filtered=true&category=all'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockFiltered, error: null });
    });

    it('supports sort by oldest', async () => {
      mockSql.mockResolvedValueOnce([]);

      const request = createMockRequest(
        'http://localhost/api/transactions?filtered=true&sort=oldest'
      );

      await GET(request);

      expect(mockSql).toHaveBeenCalled();
    });

    it('supports sort by a-to-z', async () => {
      mockSql.mockResolvedValueOnce([]);

      const request = createMockRequest(
        'http://localhost/api/transactions?filtered=true&sort=a-to-z'
      );

      await GET(request);

      expect(mockSql).toHaveBeenCalled();
    });

    it('supports sort by z-to-a', async () => {
      mockSql.mockResolvedValueOnce([]);

      const request = createMockRequest(
        'http://localhost/api/transactions?filtered=true&sort=z-to-a'
      );

      await GET(request);

      expect(mockSql).toHaveBeenCalled();
    });

    it('supports sort by highest', async () => {
      mockSql.mockResolvedValueOnce([]);

      const request = createMockRequest(
        'http://localhost/api/transactions?filtered=true&sort=highest'
      );

      await GET(request);

      expect(mockSql).toHaveBeenCalled();
    });

    it('supports sort by lowest', async () => {
      mockSql.mockResolvedValueOnce([]);

      const request = createMockRequest(
        'http://localhost/api/transactions?filtered=true&sort=lowest'
      );

      await GET(request);

      expect(mockSql).toHaveBeenCalled();
    });

    it('supports search query', async () => {
      mockSql.mockResolvedValueOnce([]);

      const request = createMockRequest(
        'http://localhost/api/transactions?filtered=true&query=grocery'
      );

      await GET(request);

      expect(mockSql).toHaveBeenCalled();
    });

    it('supports pagination', async () => {
      mockSql.mockResolvedValueOnce([]);

      const request = createMockRequest(
        'http://localhost/api/transactions?filtered=true&page=2'
      );

      await GET(request);

      expect(mockSql).toHaveBeenCalled();
    });
  });

  describe('transactions by category', () => {
    it('returns transactions for a specific category', async () => {
      const mockCategoryTransactions = [
        { id: 1, name: 'Restaurant', amount: -50, category: 'Dining Out' },
        { id: 2, name: 'Fast Food', amount: -15, category: 'Dining Out' },
      ];
      mockSql.mockResolvedValueOnce(mockCategoryTransactions);

      const request = createMockRequest(
        'http://localhost/api/transactions?category=Dining'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockCategoryTransactions, error: null });
    });
  });

  describe('error handling', () => {
    it('returns 500 error when database query fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockSql.mockRejectedValueOnce(new Error('Database error'));

      const request = createMockRequest('http://localhost/api/transactions');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ data: [], error: 'Failed to fetch transactions' });

      consoleSpy.mockRestore();
    });
  });
});
