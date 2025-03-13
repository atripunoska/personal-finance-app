import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";

interface SortProps {
  onSortChange: (sort: string) => void;
}

export default function Sort({ onSortChange }: SortProps) {
  return (
    <>
      <Label htmlFor="sort">Sort by</Label>
      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Latest" />
        </SelectTrigger>
        <SelectContent id="sort">
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="a-to-z">A to Z</SelectItem>
          <SelectItem value="z-to-a">Z to A</SelectItem>
          <SelectItem value="highest">Highest</SelectItem>
          <SelectItem value="lowest">Lowest</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
