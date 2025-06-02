'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { signup } from '../login/actions';

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      await signup(formData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let message = 'Signup failed. Please try again.';
      if (err?.message) {
        const msg = err.message.toLowerCase();
        if (msg.includes('email')) {
          message = 'Please enter a valid and unique email address.';
        } else if (msg.includes('password')) {
          message = 'Password must meet the required criteria.';
        } else if (msg.includes('network')) {
          message =
            'Network error. Please check your connection and try again.';
        } else if (
          msg.includes('user already registered') ||
          msg.includes('duplicate')
        ) {
          message = 'An account with this email already exists.';
        }
      }
      setError(message);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-amber-50 md:gap-2 px-3">
      <form
        className="bg-white p-7 flex flex-col gap-3 w-full md:w-[600px] mx-auto align-middle"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-4xl mb-4">Sign up</h1>
        <label htmlFor="name" className="text-sm font-semibold text-grey-500">
          Name:
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="border border-gray-300 rounded-md p-2"
        />
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
        <label
          htmlFor="password"
          className="text-sm font-semibold text-grey-500"
        >
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
        <Button
          type="submit"
          aria-label="Create an account"
          className="cursor-pointer"
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}
