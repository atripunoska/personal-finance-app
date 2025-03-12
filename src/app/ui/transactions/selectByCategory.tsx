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
  setFilterCategory: (category: string) => void;
}
export default function SelectByCategory({
  categories,
  filterCategory,
  setFilterCategory,
}: SelectByCategoryProps) {
  return (
    <Select onValueChange={setFilterCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
