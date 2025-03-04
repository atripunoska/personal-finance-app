"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

export default function SelectByCategory({
  categories,
  filterCategory,
  setFilterCategory,
}: {
  categories: string[];
  filterCategory: string;
  setFilterCategory: (value: string) => void;
}) {
  return (
    <>
      <Label htmlFor="category">Category</Label>
      <Select onValueChange={(value) => setFilterCategory(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Transactions" />
        </SelectTrigger>
        <SelectContent id="category">
          {categories.map((category: string) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
