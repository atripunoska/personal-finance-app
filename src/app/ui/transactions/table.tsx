'use client';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from '@/components/ui/table';

import Image from 'next/image';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { USDollar } from '@/lib/utils';
import Search from '@/components/ui/search';
import SelectByCategory from './selectByCategory';
import Sort from './Sort';

export default function TransactionsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOption, setSortOption] = useState('latest');
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        filtered: 'true',
        query: query,
        page: currentPage.toString(),
        category: filterCategory === 'all' ? '' : filterCategory,
        sort: sortOption,
      });

      const [transactionsResponse, categoriesResponse] = await Promise.all([
        fetch(`/api/transactions?${params.toString()}`),
        fetch('/api/categories'),
      ]);

      const transactionsData = await transactionsResponse.json();
      const categoriesData = await categoriesResponse.json();

      setTransactions(transactionsData.data || []);
      setCategories([
        ...new Set(
          categoriesData.data?.map(
            (item: { category: string }) => item.category
          ) || []
        ),
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
      if (params.category !== 'all') {
        newParams.set('category', params.category);
      } else newParams.delete('category');
    }

    if (params.sort !== undefined) {
      newParams.set('sort', params.sort);
    }

    router.replace(`?${newParams.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-between mb-3 gap-3 flex-col lg:flex-row">
        <Search placeholder="Search transactions" />
        <div className="flex gap-2 flex-col lg:flex-row">
          <Sort onSortChange={handleSortChange} />

          <SelectByCategory
            categories={categories}
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
                  <div className="flex gap-2 md:items-center flex-col md:flex-row">
                    <Image
                      src={item.avatar.substring(1)}
                      alt={item.name + ' avatar'}
                      className="rounded size-[40px] rounded-full"
                      width={40}
                      height={40}
                      loading="lazy"
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
                    {new Date(item.date).toUTCString().slice(4, 16)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={clsx({
                      'text-gray-900': item.amount < 0,
                      'text-green-900': item.amount > 0,
                      'font-semibold': true,
                    })}
                  >
                    {item.amount > 0 ? '+' : ''}
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
