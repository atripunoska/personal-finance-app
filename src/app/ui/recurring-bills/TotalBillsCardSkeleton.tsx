import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TotalBillsCardSkeleton() {
  return (
    <div className="animate-pulse p-4 border rounded-lg shadow-sm">
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-8 w-full mb-2" />
    </div>
  );
}
