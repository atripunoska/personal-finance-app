import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChartSkeleton() {
  return (
    <div className='animate-pulse'>
      <Skeleton className='h-6 w-1/4 mb-4' />
      <Skeleton className='h-64 w-full' />
    </div>
  );
}
