import { SearchBillsProps } from '@/lib/definitions';
import React from 'react';

export default function SearchBills({
  placeholder,
  onChange,
}: SearchBillsProps) {
  return (
    <input
      type="search"
      placeholder={placeholder}
      onChange={onChange}
      className="border border-gray-300 rounded-md p-2 w-auto"
      id="search"
    />
  );
}
