import { fetchTransactionsPages } from "@/lib/data";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Search from "@/components/ui/search";
import Pagination from "@/app/ui/transactions/pagination";
import TransactionsTable from "@/app/ui/transactions/table";

export default async function Transactions(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTransactionsPages(query);

  return (
    <main>
      <h2 className="font-public-sans font-bold text-2xl mb-3">Transactions</h2>

      <Card>
        <CardContent>
          <div className="flex justify-between mb-3">
            <Search placeholder="Search transactions" />
          </div>
          <TransactionsTable query={query} currentPage={currentPage} />
        </CardContent>
      </Card>

      <Pagination totalPages={totalPages} />
    </main>
  );
}
