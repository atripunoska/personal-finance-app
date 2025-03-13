"use client";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import Image from "next/image";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchCategories, fetchFilteredTransactions } from "@/lib/data";
import { USDollar } from "@/lib/utils";
import SortBills from "../recurring-bills/SortBills";
import Search from "@/components/ui/search";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectByCategory from "./selectByCategory";
import Sort from "./Sort";

export default function TransactionsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOption, setSortOption] = useState("latest");
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      const transactionsData = await fetchFilteredTransactions(
        query,
        currentPage,
        filterCategory === "all" ? "" : filterCategory,
        sortOption
      );
      setTransactions(transactionsData.data);

      const categoriesData = await fetchCategories();
      setCategories([
        ...new Set(categoriesData.data?.map((item) => item.category) || []),
      ]);
    };

    fetchData();
  }, [query, currentPage, filterCategory, sortOption]);

  const handleCategoryChange = (category: string) => {
    setFilterCategory(category);
    updateQueryParams({ category });
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    updateQueryParams({ sort });
  };

  const updateQueryParams = (params: { category?: string; sort?: string }) => {
    const newParams = new URLSearchParams(searchParams?.toString());

    if (params.category !== undefined) {
      if (params.category !== "all") {
        newParams.set("category", params.category);
      } else newParams.delete("category");
    }

    if (params.sort !== undefined) {
      newParams.set("sort", params.sort);
    }

    router.replace(`?${newParams.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-between mb-3 gap-3">
        <Search placeholder="Search transactions" />
        <div className="flex gap-2">
          <Sort sortOption={sortOption} onSortChange={handleSortChange} />

          <SelectByCategory
            categories={categories}
            filterCategory={filterCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recipient/Sender</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Transaction Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((item) => {
            return (
              <TableRow key={Math.random()}>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={"/" + item.avatar}
                      alt={item.name + " avatar"}
                      className="rounded size-[40px] rounded-full"
                      width={40}
                      height={40}
                    />
                    <div className="pl-2 font-semibold ">{item.name}</div>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="font-light text-muted-foreground">
                    {item.category}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="font-light text-muted-foreground">
                    {item.date}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={clsx({
                      "text-gray-900": item.amount < 0,
                      "text-green-900": item.amount > 0,
                      "font-semibold": true,
                    })}
                  >
                    {item.amount > 0 ? "+" : ""}
                    {USDollar.format(item.amount)}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
