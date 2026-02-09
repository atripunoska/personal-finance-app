import { fetchTransactionsPages } from '@/lib/data';
import React, { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Pagination from '@/app/ui/transactions/pagination';
import TransactionsTable from '@/app/ui/transactions/table';
import TransactionsTableSkeleton from '@/app/ui/transactions/TransactionsTableSkeleton';

async function PaginationWrapper({ query }: { query: string }) {
  const totalPages = await fetchTransactionsPages(query);
  return <Pagination totalPages={totalPages} />;
}

export default async function Transactions(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main>
      <h2 className="font-bold text-2xl mb-3">Transactions</h2>

      <Card>
        <CardContent>
          <Suspense
            fallback={<TransactionsTableSkeleton />}
            key={`${query}-${currentPage}`}
          >
            <TransactionsTable query={query} currentPage={currentPage} />
          </Suspense>
        </CardContent>
      </Card>
      <Suspense
        fallback={
          <div className="mt-4 h-10 animate-pulse bg-gray-200 dark:bg-secondary rounded" />
        }
      >
        <PaginationWrapper query={query} />
      </Suspense>
    </main>
  );
}
