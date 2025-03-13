"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
interface SelectByCategoryProps {
  categories: string[];
  filterCategory: string;
  onCategoryChange: (category: string) => void;
}
export default function SelectByCategory({
  categories,
  filterCategory,
  onCategoryChange,
}: SelectByCategoryProps) {
  return (
    <Select onValueChange={onCategoryChange}>
      <SelectTrigger className="w-[180px]">
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
