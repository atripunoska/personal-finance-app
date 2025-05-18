'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { login } from '../(auth)/login/actions';
import { useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      await login(formData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <form
      className="bg-white p-7 flex flex-col gap-3 w-full md:w-[600px] mx-auto
    "
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-4xl mb-4">Login</h1>
      <label htmlFor="email" className="text-sm font-semibold text-grey-500">
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="border border-gray-300 rounded-md p-2"
      />
      <label htmlFor="password" className="text-sm font-semibold text-grey-500">
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="border border-gray-300 rounded-md p-2"
      />{' '}
      {error && <div className="text-red-500">{error}</div>}
      <Button type="submit" aria-label="Log in" className="cursor-pointer">
        Log in
      </Button>
      <p className="text-center text-gray-500">
        Need to create an account?{' '}
        <Link
          href="/register"
          className="text-black underline font-bold cursor-pointer"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
