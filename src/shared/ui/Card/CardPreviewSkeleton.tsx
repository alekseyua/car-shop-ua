import React from "react";

const CardPreviewSkeleton = () => {
  return (
    <div
      className="
        w-full
        max-w-[380px]
        overflow-hidden
        rounded-lg
        bg-white
        shadow-[0_2px_8px_rgba(0,0,0,0.12)]
      "
    >
      {/* Image */}
      <div className="flex h-[160px] items-center justify-center">
        <div
          className="
            h-[130px]
            w-[130px]
            animate-pulse
            rounded-md
            bg-gray-200
          "
        />
      </div>

      {/* Content */}
      <div className="px-3 pb-3">
        {/* Item number */}
        <div className="mb-2 h-6 w-2/3 animate-pulse rounded bg-gray-200" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-3">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Availability + cart */}
        <div className="mt-5 flex items-center justify-between">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />

          <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default CardPreviewSkeleton;
