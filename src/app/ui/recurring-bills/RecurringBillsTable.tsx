/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RecurringBillsTableProps } from '@/lib/definitions';
import { USDollar } from '@/lib/utils';
import clsx from 'clsx';
import { format, getDate } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import SearchBills from './SearchBills';
import SortBills from './SortBills';

export default function RecurringBillsTable({
  paid,
  upcoming,
  latestTransactionDate,
}: RecurringBillsTableProps) {
  const dueSoon = getDate(latestTransactionDate);

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const filteredAllBills = paid.concat(upcoming);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const sortBills = (bills: any[]) => {
    return bills.sort((a, b) => {
      if (sortBy === 'aToZ') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'zToA') {
        return b.name.localeCompare(a.name);
      } else if (sortBy === 'latest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'highest') {
        return a.amount - b.amount;
      } else if (sortBy === 'lowest') {
        return b.amount - a.amount;
      }
      return 0;
    });
  };

  const filteredBills = sortBills(
    filteredAllBills.filter((el) => el.name.toLowerCase().includes(query))
  );

  return (
    <div className="bg-white text-grey-900 p-6 rounded-md">
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4 gap-2">
        <SearchBills
          placeholder={'Search bills'}
          onChange={handleSearchChange}
        />
        <SortBills onSortChange={handleSortChange} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bill Title</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBills?.map((item) => {
            return (
              <TableRow key={item.name}>
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
                <TableCell>
                  <div
                    className={clsx({
                      ' flex items-center ': true,
                      'text-green': getDate(item.date) < dueSoon,
                      'text-red-700 ':
                        getDate(item.date) > dueSoon &&
                        getDate(item.date) < dueSoon + 5,
                    })}
                  >
                    <span className="mr-2">
                      Monthly - {format(item.date, 'do')}
                    </span>
                    {getDate(item.date) > dueSoon &&
                      getDate(item.date) < dueSoon + 5 && (
                        <Image
                          src="/./assets/images/icon-bill-due.svg"
                          alt="Icon Bill Due"
                          width={18}
                          height={18}
                          loading="lazy"
                        />
                      )}

                    {getDate(item.date) < dueSoon && (
                      <Image
                        src="/./assets/images/icon-bill-paid.svg"
                        alt="Icon Bill Paid"
                        width={18}
                        height={18}
                        loading="lazy"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-bold">
                    <div
                      className={
                        clsx({
                          ' flex justify-end ': true,
                          'text-red-700 ':
                            getDate(item.date) > dueSoon &&
                            getDate(item.date) < dueSoon + 5,
                        }) + `font-bold`
                      }
                    >
                      {USDollar.format(Math.abs(item.amount))}
                    </div>
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
