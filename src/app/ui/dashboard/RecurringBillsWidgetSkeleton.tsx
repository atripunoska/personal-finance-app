import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecurringBillsWidgetSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between mb-3">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>
      <div className="grid grid-cols-1 gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 border-b border-gray-200"
          >
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
