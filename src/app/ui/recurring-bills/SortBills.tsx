import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortBillsProps } from "@/lib/definitions";
import React from "react";

export default function SortBills({ onSortChange }: SortBillsProps) {
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="sort">Sort</label>
      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-full lg:w-[180px]">
          <SelectValue placeholder="Latest" />
        </SelectTrigger>
        <SelectContent id="sort">
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="aToZ">A to Z</SelectItem>
          <SelectItem value="zToA">Z to A</SelectItem>
          <SelectItem value="highest">Highest</SelectItem>
          <SelectItem value="lowest">Lowest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
