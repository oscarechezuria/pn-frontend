import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

export default function Skeleton_table() {
    return (
      <div className="w-full h-full p-2 flex items-center justify-center ">
      <div className="rounded-lg border border-gray-200 w-full h-full p-2">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-200">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="p-4">
              <div className="grid grid-cols-4 gap-4 items-center">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
}
