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

import { GET, PATCH, DELETE } from '../app/api/pots/[potId]/route';

// Helper to create mock Request
function createMockRequest(options?: { body?: unknown }): Request {
  return {
    json: async () => options?.body,
  } as unknown as Request;
}

// Helper to create params
function createParams(potId: string): { params: Promise<{ potId: string }> } {
  return {
    params: Promise.resolve({ potId }),
  };
}

describe('GET /api/pots/[potId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a specific pot when found', async () => {
    const mockPot = { name: 'Vacation', target: 2000, theme: '#FF0000', total: 500 };
    mockSql.mockResolvedValueOnce([mockPot]);

    const request = createMockRequest();
    const params = createParams('Vacation');

    const response = await GET(request, params);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockPot);
  });

  it('returns 404 when pot is not found', async () => {
    mockSql.mockResolvedValueOnce([]);

    const request = createMockRequest();
    const params = createParams('NonExistent');

    const response = await GET(request, params);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({ error: 'Pot not found' });
  });

  it('returns 500 error when database query fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockSql.mockRejectedValueOnce(new Error('Database error'));

    const request = createMockRequest();
    const params = createParams('Vacation');

    const response = await GET(request, params);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to fetch pot' });

    consoleSpy.mockRestore();
  });
});

describe('PATCH /api/pots/[potId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates a pot and returns the updated data', async () => {
    const updatedPot = { name: 'Vacation Fund', target: 3000, theme: '#00FF00', total: 500 };
    mockSql.mockResolvedValueOnce([updatedPot]);

    const request = createMockRequest({
      body: { name: 'Vacation Fund', target: 3000, theme: '#00FF00' },
    });
    const params = createParams('Vacation');

    const response = await PATCH(request, params);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(updatedPot);
  });

  it('returns 500 error when database update fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockSql.mockRejectedValueOnce(new Error('Update failed'));

    const request = createMockRequest({
      body: { name: 'Test', target: 100, theme: '#000' },
    });
    const params = createParams('Vacation');

    const response = await PATCH(request, params);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to update pot' });

    consoleSpy.mockRestore();
  });
});

describe('DELETE /api/pots/[potId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deletes a pot and returns success', async () => {
    mockSql.mockResolvedValueOnce({ rowCount: 1 });

    const request = createMockRequest();
    const params = createParams('Vacation');

    const response = await DELETE(request, params);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true });
  });

  it('returns 500 error when database delete fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockSql.mockRejectedValueOnce(new Error('Delete failed'));

    const request = createMockRequest();
    const params = createParams('Vacation');

    const response = await DELETE(request, params);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to delete pot' });

    consoleSpy.mockRestore();
  });
});
