'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { register } from '@/lib/actions';
import Link from 'next/link';

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gray-900 dark:bg-foreground text-white dark:text-background p-2 rounded hover:bg-gray-700 dark:hover:bg-grey-300 disabled:bg-gray-400 cursor-pointer"
    >
      {pending ? 'Creating account...' : 'Create account'}
    </button>
  );
}

export default function RegisterPage() {
  const [errorMessage, dispatch] = useActionState(register, undefined);

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-amber-50 dark:bg-background md:gap-2 px-3">
      {' '}
      <form
        className="bg-white dark:bg-card p-7 flex flex-col gap-3 w-full md:w-[600px] mx-auto align-middle rounded-md"
        action={dispatch}
      >
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 border rounded"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 border rounded"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={6}
            className="w-full p-2 border rounded"
            placeholder="••••••••"
          />
          <p className="text-xs text-gray-500 dark:text-muted-foreground mt-1">
            Must be at least 6 characters
          </p>
        </div>
        {errorMessage && (
          <div className="text-red-600 dark:text-red text-sm">
            {errorMessage}
          </div>
        )}
        <RegisterButton />{' '}
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
