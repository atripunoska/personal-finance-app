"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectByCategoryProps } from "@/lib/definitions";
import React from "react";

export default function SelectByCategory({
  categories,
  onCategoryChange,
}: SelectByCategoryProps) {
  return (
    <Select onValueChange={onCategoryChange}>
      <SelectTrigger className="w-full lg:w-[180px]">
        <SelectValue placeholder="Select category"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All categories</SelectItem>
        {categories?.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
