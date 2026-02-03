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

import { GET, POST, DELETE, PUT } from '../app/api/budgets/route';

// Helper to create mock Request
function createMockRequest(
  url: string,
  options?: { method?: string; body?: unknown }
): Request {
  return {
    url,
    method: options?.method ?? 'GET',
    json: async () => options?.body,
  } as unknown as Request;
}

describe('GET /api/budgets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all budgets on success', async () => {
    const mockBudgets = [
      { category: 'Entertainment', maximum: 500, theme: '#FF0000' },
      { category: 'Dining Out', maximum: 300, theme: '#00FF00' },
    ];
    mockSql.mockResolvedValueOnce(mockBudgets);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockBudgets);
  });

  it('returns empty array when no budgets exist', async () => {
    mockSql.mockResolvedValueOnce([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
  });

  it('returns 500 error when database query fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockSql.mockRejectedValueOnce(new Error('Database error'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to fetch budgets' });

    consoleSpy.mockRestore();
  });
});

describe('POST /api/budgets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new budget and returns it', async () => {
    const newBudget = { category: 'Travel', maximum: 1000, theme: '#0000FF' };
    mockSql.mockResolvedValueOnce([newBudget]);

    const request = createMockRequest('http://localhost/api/budgets', {
      method: 'POST',
      body: newBudget,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(newBudget);
  });

  it('returns 500 error when database insert fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockSql.mockRejectedValueOnce(new Error('Insert failed'));

    const request = createMockRequest('http://localhost/api/budgets', {
      method: 'POST',
      body: { category: 'Test', maximum: 100, theme: '#000' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to create budget' });

    consoleSpy.mockRestore();
  });
});

describe('DELETE /api/budgets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deletes a budget by category', async () => {
    mockSql.mockResolvedValueOnce({ rowCount: 1 });

    const request = createMockRequest(
      'http://localhost/api/budgets?category=Entertainment',
      { method: 'DELETE' }
    );

    const response = await DELETE(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true, data: { rowCount: 1 } });
  });

  it('returns 400 error when category parameter is missing', async () => {
    const request = createMockRequest('http://localhost/api/budgets', {
      method: 'DELETE',
    });

    const response = await DELETE(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Category parameter is required' });
  });

  it('returns 500 error when database delete fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockSql.mockRejectedValueOnce(new Error('Delete failed'));

    const request = createMockRequest(
      'http://localhost/api/budgets?category=Test',
      { method: 'DELETE' }
    );

    const response = await DELETE(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to delete budget' });

    consoleSpy.mockRestore();
  });
});

describe('PUT /api/budgets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates a budget and returns the updated data', async () => {
    const updatedBudget = {
      category: 'Entertainment Updated',
      maximum: 600,
      theme: '#FF00FF',
    };
    mockSql.mockResolvedValueOnce([updatedBudget]);

    const request = createMockRequest(
      'http://localhost/api/budgets?category=Entertainment',
      {
        method: 'PUT',
        body: updatedBudget,
      }
    );

    const response = await PUT(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(updatedBudget);
  });

  it('returns 400 error when category parameter is missing', async () => {
    const request = createMockRequest('http://localhost/api/budgets', {
      method: 'PUT',
      body: { category: 'Test', maximum: 100, theme: '#000' },
    });

    const response = await PUT(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Category parameter is required' });
  });

  it('returns 500 error when database update fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockSql.mockRejectedValueOnce(new Error('Update failed'));

    const request = createMockRequest(
      'http://localhost/api/budgets?category=Test',
      {
        method: 'PUT',
        body: { category: 'Test', maximum: 100, theme: '#000' },
      }
    );

    const response = await PUT(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to update budget' });

    consoleSpy.mockRestore();
  });
});
