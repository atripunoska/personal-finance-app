'use client';

export default function RecurringBillsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="bg-white dark:bg-card p-4 flex flex-col gap-3 w-[600px] mx-auto rounded-md">
        <h2 className="text-center font-semibold text-red text-3xl">
          Sorry, something went wrong
        </h2>
        <p className="text-center text-muted-foreground">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={reset}
          className="font-bold bg-black dark:bg-foreground text-white dark:text-background p-3 rounded text-center cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
