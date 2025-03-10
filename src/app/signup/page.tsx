import { Button } from "@/components/ui/button";
import { signup } from "@/lib/actions";
import React from "react";

export default function SignUp() {
  return (
    <form
      className="bg-white p-7 flex flex-col gap-3 w-[600px] mx-auto align-middle
"
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
      <Button formAction={signup}>Create an account</Button>
    </form>
  );
}
