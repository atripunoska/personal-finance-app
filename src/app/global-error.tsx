'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="bg-beige-500 flex justify-center items-center h-dvh">
          <div className="bg-white p-4 flex flex-col gap-3 w-[600px] mx-auto rounded-md">
            <h2 className="text-center font-semibold text-red text-3xl">
              Sorry, something went wrong
            </h2>
            <p className="text-center text-muted-foreground">
              {error.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={reset}
              className="font-bold bg-black text-white p-3 rounded text-center cursor-pointer"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
