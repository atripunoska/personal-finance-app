'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import Link from 'next/link';
import Image from 'next/image';

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gray-900 dark:bg-foreground text-white dark:text-background p-2 rounded hover:bg-gray-700 dark:hover:bg-grey-300 disabled:bg-gray-400 cursor-pointer"
    >
      {pending ? 'Logging in...' : 'Log in'}
    </button>
  );
}

export default function LoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-amber-50 dark:bg-background lg:gap-2">
      <div className="lg:w-1/3 gap-3">
        <Image
          src="/assets/images/Sidebar.png"
          alt="Sidebar"
          width={1400}
          height={200}
          className="hidden lg:flex"
          loading="lazy"
        />
      </div>
      <div className="lg:w-2/3">
        <form
          action={dispatch}
          className="bg-white dark:bg-card p-7 flex flex-col gap-3 w-full md:w-[600px] mx-auto rounded-md"
        >
          {' '}
          <h1 className="font-bold text-4xl mb-4">Login</h1>
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
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-2 border rounded"
              placeholder="••••••••"
            />
          </div>
          {errorMessage && (
            <div className="text-red-600 dark:text-red text-sm">
              {errorMessage}
            </div>
          )}
          <LoginButton />
        </form>

        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-600 dark:text-blue hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
