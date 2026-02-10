'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { getDB } from './db';
import bcrypt from 'bcryptjs';
import { signupSchema } from './validations';

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
  const raw = {
    name: (formData.get('name') ?? '') as string,
    email: (formData.get('email') ?? '') as string,
    password: (formData.get('password') ?? '') as string,
  };

  const parsed = signupSchema.safeParse(raw);
  if (!parsed.success) {
    return parsed.error.issues[0].message;
  }

  const { name, email, password } = parsed.data;

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
