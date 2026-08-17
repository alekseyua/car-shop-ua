import React from 'react'

const ProductDetailLayoutSkeleton = () => {
  return (
    <div className="grid grid-cols-[1.1fr_0.9fr] gap-4 bg-white w-full items-stretch">
      {/* Image */}
      <div className="w-full flex justify-center items-center">
        <div className="w-120 aspect-square animate-pulse bg-neutral-200" />
      </div>

      {/* Content */}
      <div className="space-y-3 p-3">
        {/* title */}
        <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />

        {/* description */}
        <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />

        {/* price */}
        <div className="h-30 w-1/2 animate-pulse rounded bg-neutral-200" />
      </div>
    </div>
  );
}

export default ProductDetailLayoutSkeleton