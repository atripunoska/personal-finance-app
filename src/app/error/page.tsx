'use client';

import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="bg-beige-500 flex justify-center items-center h-dvh">
      <div className="bg-white p-4 flex flex-col gap-3 w-[600px] mx-auto rounded-md">
        <h2 className="text-center font-semibold text-red text-3xl">
          Sorry, something went wrong
        </h2>
        <Link
          href="/login"
          className=" font-bold bg-black text-white p-3 rounded text-center"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
