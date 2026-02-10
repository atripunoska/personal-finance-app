'use client';

import { useState, useActionState, useTransition } from 'react';
import { register } from '@/lib/actions';
import {
  signupSchema,
  getFieldErrors,
  getFieldError,
  FieldErrors,
} from '@/lib/validations';
import Link from 'next/link';
import { z } from 'zod';

function RegisterButton({ pending }: { pending: boolean }) {
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
  const [serverError, dispatch] = useActionState(register, undefined);
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<z.infer<typeof signupSchema>>
  >({});
  const [isPending, startTransition] = useTransition();

  const handleBlur = (field: string, value: string) => {
    const error = getFieldError(signupSchema, field, value);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const result = getFieldErrors(signupSchema, data);
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
    <div className="flex flex-row items-center justify-center h-screen bg-amber-50 dark:bg-background md:gap-2 px-3">
      {' '}
      <form
        className="bg-white dark:bg-card p-7 flex flex-col gap-3 w-full md:w-[600px] mx-auto align-middle rounded-md"
        onSubmit={handleSubmit}
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
            className="w-full p-2 border rounded"
            placeholder="Your Name"
            onBlur={(e) => handleBlur('name', e.target.value)}
          />
          {fieldErrors.name && (
            <p className="text-red-600 dark:text-red text-sm mt-1">
              {fieldErrors.name}
            </p>
          )}
        </div>
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
          <label htmlFor="password" className="block text-sm font-medium mb-1">
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
          <p className="text-xs text-gray-500 dark:text-muted-foreground mt-1">
            Must be at least 6 characters
          </p>
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
        <RegisterButton pending={isPending} />{' '}
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
