import {
  fetchCategories,
  fetchTransactionsPages,
  fetchUniqueTransactions,
} from "@/lib/data";
import React, { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Search from "@/components/ui/search";
import Pagination from "@/app/ui/transactions/pagination";
import TransactionsTable from "@/app/ui/transactions/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import SelectByCategory from "@/app/ui/transactions/selectByCategory";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionsTableSkeleton from "@/app/ui/transactions/TransactionsTableSkeleton";

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
  const recurringBills = await fetchUniqueTransactions();

  const categories = [...new Set(recurringBills.map((item) => item.category))];
  const allCategories = await fetchCategories();

  // const [filterCategory, setFilterCategory] = useState("");
  return (
    <main>
      <h2 className="font-bold text-2xl mb-3">Transactions</h2>

      <Card>
        <CardContent>
          <div className="flex justify-between mb-3 gap-3">
            <Search placeholder="Search transactions" />
            <div className="flex gap-2">
              <div className="flex gap-2">
                <Label htmlFor="sort">Sort by</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Latest" />
                  </SelectTrigger>
                  <SelectContent id="sort">
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="a-to-z">A to Z</SelectItem>
                    <SelectItem value="z-to-a">Z to A</SelectItem>
                    <SelectItem value="highest">Highest</SelectItem>
                    <SelectItem value="lowest">Lowest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                {/* <SelectByCategory
                  //  query={query}
                  //      currentPage={currentPage}
                  categories={categories}
                  // filterCategory={filterCategory}
                  // setFilterCategory={setFilterCategory}
                /> */}
              </div>
            </div>
          </div>
          <Suspense fallback={<TransactionsTableSkeleton />}>
            <TransactionsTable
              query={query}
              currentPage={currentPage}
              //category={categories}
            />
          </Suspense>
        </CardContent>
      </Card>

      <Pagination totalPages={totalPages} />
    </main>
  );
}
