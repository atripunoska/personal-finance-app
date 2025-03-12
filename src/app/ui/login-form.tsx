"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form
      className="bg-white p-7 flex flex-col gap-3 w-[600px] mx-auto
    "
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
      />
      <Button formAction={login}>Log in</Button>
      <p className="text-center text-gray-500">
        Need to create an account?{" "}
        <Link href="/register" className="text-black underline font-bold">
          Sign up
        </Link>
      </p>
    </form>
  );
}
