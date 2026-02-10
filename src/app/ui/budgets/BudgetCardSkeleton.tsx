import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BudgetCardSkeleton() {
  return (
    <div className=" p-4 border rounded-lg shadow-sm">
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-3/4 mb-2" />
    </div>
  );
}
