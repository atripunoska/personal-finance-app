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

import { POST } from '../app/api/pots/[potId]/withdraw/route';

// Helper to create mock Request
function createMockRequest(body: unknown): Request {
  return {
    json: async () => body,
  } as unknown as Request;
}

// Helper to create params
function createParams(potId: string): { params: Promise<{ potId: string }> } {
  return {
    params: Promise.resolve({ potId }),
  };
}

describe('POST /api/pots/[potId]/withdraw', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('withdraws amount from pot and returns updated pot', async () => {
    const updatedPot = {
      name: 'Vacation',
      target: 2000,
      theme: '#FF0000',
      total: 500,
    };
    mockSql.mockResolvedValueOnce([updatedPot]);

    const request = createMockRequest({ amount: 250 });
    const params = createParams('Vacation');

    const response = await POST(request, params);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true, data: updatedPot });
  });

  it('withdraws a small amount successfully', async () => {
    const updatedPot = {
      name: 'Savings',
      target: 1000,
      theme: '#00FF00',
      total: 90,
    };
    mockSql.mockResolvedValueOnce([updatedPot]);

    const request = createMockRequest({ amount: 10 });
    const params = createParams('Savings');

    const response = await POST(request, params);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.total).toBe(90);
  });

  it('withdraws a large amount successfully', async () => {
    const updatedPot = {
      name: 'House',
      target: 50000,
      theme: '#0000FF',
      total: 5000,
    };
    mockSql.mockResolvedValueOnce([updatedPot]);

    const request = createMockRequest({ amount: 5000 });
    const params = createParams('House');

    const response = await POST(request, params);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('returns 500 error when database update fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockSql.mockRejectedValueOnce(new Error('Database error'));

    const request = createMockRequest({ amount: 100 });
    const params = createParams('Vacation');

    const response = await POST(request, params);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to withdraw amount from pot' });

    consoleSpy.mockRestore();
  });

  it('calls database with correct pot name and amount', async () => {
    const updatedPot = {
      name: 'TestPot',
      target: 500,
      theme: '#000',
      total: 50,
    };
    mockSql.mockResolvedValueOnce([updatedPot]);

    const request = createMockRequest({ amount: 150 });
    const params = createParams('TestPot');

    await POST(request, params);

    expect(mockSql).toHaveBeenCalled();
  });
});
