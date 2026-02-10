// Mock dependencies
const mockSignIn = jest.fn();
const mockSignOut = jest.fn();
const mockSql = jest.fn();
const mockHash = jest.fn();

jest.mock('next-auth', () => {
  class AuthError extends Error {
    type: string;
    constructor(type: string) {
      super(type);
      this.type = type;
      this.name = 'AuthError';
    }
  }
  return { AuthError };
});

jest.mock('../auth', () => ({
  signIn: (...args: unknown[]) => mockSignIn(...args),
  signOut: (...args: unknown[]) => mockSignOut(...args),
}));

jest.mock('../lib/db', () => ({
  getDB: () => Promise.resolve(mockSql),
}));

jest.mock('bcryptjs', () => ({
  hash: (...args: unknown[]) => mockHash(...args),
}));

import { authenticate, register, logout } from '@/lib/actions';
import { AuthError } from 'next-auth';

// Helper to create FormData
function createFormData(data: Record<string, string>): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

describe('authenticate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls signIn with credentials and redirectTo', async () => {
    const formData = createFormData({
      email: 'test@example.com',
      password: 'password123',
    });

    await authenticate(undefined, formData);

    expect(mockSignIn).toHaveBeenCalledWith('credentials', {
      email: 'test@example.com',
      password: 'password123',
      redirectTo: '/dashboard',
    });
  });

  it('returns "Invalid credentials." for CredentialsSignin error', async () => {
    const error = new AuthError('CredentialsSignin');
    mockSignIn.mockRejectedValueOnce(error);

    const formData = createFormData({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    const result = await authenticate(undefined, formData);

    expect(result).toBe('Invalid credentials.');
  });

  it('returns "Something went wrong." for other AuthErrors', async () => {
    const error = new AuthError('AccessDenied');
    mockSignIn.mockRejectedValueOnce(error);

    const formData = createFormData({
      email: 'test@example.com',
      password: 'password123',
    });

    const result = await authenticate(undefined, formData);

    expect(result).toBe('Something went wrong.');
  });

  it('rethrows non-AuthError errors', async () => {
    const error = new Error('Network error');
    mockSignIn.mockRejectedValueOnce(error);

    const formData = createFormData({
      email: 'test@example.com',
      password: 'password123',
    });

    await expect(authenticate(undefined, formData)).rejects.toThrow(
      'Network error'
    );
  });
});

describe('register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSql.mockResolvedValue([]);
    mockHash.mockResolvedValue('hashedPassword123');
  });

  it('returns error when name is missing', async () => {
    const formData = createFormData({
      email: 'test@example.com',
      password: 'password123',
    });

    const result = await register(undefined, formData);

    expect(result).toBe('Name is required.');
  });

  it('returns error when email is missing', async () => {
    const formData = createFormData({
      name: 'Test User',
      password: 'password123',
    });

    const result = await register(undefined, formData);

    expect(result).toBe('Email is required.');
  });

  it('returns error when password is missing', async () => {
    const formData = createFormData({
      name: 'Test User',
      email: 'test@example.com',
    });

    const result = await register(undefined, formData);

    expect(result).toBe('Password must be at least 6 characters.');
  });

  it('returns error when password is too short', async () => {
    const formData = createFormData({
      name: 'Test User',
      email: 'test@example.com',
      password: '12345',
    });

    const result = await register(undefined, formData);

    expect(result).toBe('Password must be at least 6 characters.');
  });

  it('returns error when email is already registered', async () => {
    mockSql.mockResolvedValueOnce([{ id: 1, email: 'test@example.com' }]);

    const formData = createFormData({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    const result = await register(undefined, formData);

    expect(result).toBe('Email already registered.');
  });

  it('hashes password with bcrypt', async () => {
    const formData = createFormData({
      name: 'Test User',
      email: 'new@example.com',
      password: 'password123',
    });

    await register(undefined, formData);

    expect(mockHash).toHaveBeenCalledWith('password123', 10);
  });

  it('calls signIn after successful registration', async () => {
    const formData = createFormData({
      name: 'Test User',
      email: 'new@example.com',
      password: 'password123',
    });

    await register(undefined, formData);

    expect(mockSignIn).toHaveBeenCalledWith('credentials', {
      name: 'Test User',
      email: 'new@example.com',
      password: 'password123',
      redirectTo: '/dashboard',
    });
  });

  it('returns error when database operation fails', async () => {
    mockSql.mockRejectedValueOnce(new Error('Database error'));

    const formData = createFormData({
      name: 'Test User',
      email: 'new@example.com',
      password: 'password123',
    });

    const result = await register(undefined, formData);

    expect(result).toBe('Failed to create account.');
  });
});

describe('logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls signOut with redirectTo login', async () => {
    await logout();

    expect(mockSignOut).toHaveBeenCalledWith({ redirectTo: '/login' });
  });
});
