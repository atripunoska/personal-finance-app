import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PotsWidgetSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between mb-3">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex gap-2 mb-3 align-center">
            <Skeleton className="w-[5px] h-auto block rounded-b-md rounded-t-md" />
            <div className="flex flex-col">
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-beige-100 p-3 rounded-2xl flex flex-col w-full flex-1 items-center justify-center">
        <div className="flex items-center justify-center content-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col pl-3">
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
