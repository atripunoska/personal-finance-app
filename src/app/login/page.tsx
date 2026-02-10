'use client';

import { useState, useActionState, useTransition } from 'react';
import { authenticate } from '@/lib/actions';
import {
  loginSchema,
  getFieldErrors,
  getFieldError,
  FieldErrors,
} from '@/lib/validations';
import Link from 'next/link';
import Image from 'next/image';
import { z } from 'zod';

function LoginButton({ pending }: { pending: boolean }) {
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
  const [serverError, dispatch] = useActionState(authenticate, undefined);
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<z.infer<typeof loginSchema>>
  >({});
  const [isPending, startTransition] = useTransition();

  const handleBlur = (field: string, value: string) => {
    const error = getFieldError(loginSchema, field, value);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const result = getFieldErrors(loginSchema, data);
    if (!result.success) {
      setFieldErrors(result.errors);
      return;
    }

    setFieldErrors({});
    startTransition(() => {
      dispatch(formData);
    });
  };

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
          onSubmit={handleSubmit}
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
              className="w-full p-2 border rounded"
              placeholder="your@email.com"
              onBlur={(e) => handleBlur('email', e.target.value)}
            />
            {fieldErrors.email && (
              <p className="text-red-600 dark:text-red text-sm mt-1">
                {fieldErrors.email}
              </p>
            )}
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
              className="w-full p-2 border rounded"
              placeholder="••••••••"
              onBlur={(e) => handleBlur('password', e.target.value)}
            />
            {fieldErrors.password && (
              <p className="text-red-600 dark:text-red text-sm mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>
          {serverError && (
            <div className="text-red-600 dark:text-red text-sm">
              {serverError}
            </div>
          )}
          <LoginButton pending={isPending} />
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
