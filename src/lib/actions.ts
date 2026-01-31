'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { getDB } from './db';
import bcrypt from 'bcryptjs';

// LOGIN ACTION
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// SIGNUP ACTION
export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validate inputs
  if (!name || !email || !password) {
    return 'All fields are required.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }

  try {
    const sql = await getDB();

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return 'Email already registered.';
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

    // Auto-login after signup
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return 'Failed to create account.';
  }
}

// LOGOUT ACTION
export async function logout() {
  await signOut({ redirectTo: '/login' });
}
