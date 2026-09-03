"use client";
import { useMemo } from "react";
interface PaginationProps {
  page: number;
  total: number;
  totalPages: number;
  isLoading?: boolean;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  showMore?: () => Promise<void>;
}
type PaginationItem = number | "dots"; export function Pagination({
  page,
  total,
  totalPages,
  isLoading = false,
  nextPage,
  prevPage,
  goToPage,
  showMore,
}: PaginationProps) {
  const pages = useMemo(
    () => getPaginationPages(page, totalPages),
    [page, totalPages],
  );
  // Если товаров нет или всего одна страница
  if (total === 0 || totalPages <= 1) {
    return null;
  }
  const canGoPrev = page > 1 && !isLoading;
  const canGoNext = page < totalPages && !isLoading;
  const canShowMore = !!showMore && page < totalPages && !isLoading;

  console.log({ canGoNext, page, totalPages });
  return (
    <div className="w-full">
      {/* Показать еще */}
      {showMore && page < totalPages && (
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            onClick={showMore}
            disabled={!canShowMore}
            className="
              rounded-lg
              bg-neutral-800
              px-8
              py-4
              text-base
              font-medium
              text-white
              transition
              hover:bg-neutral-700
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            Показать еще
          </button>
        </div>
      )}
    <nav
      aria-label="Pagination"
      className="flex w-full items-center justify-center"
    >
      {" "}
      <div className="flex items-center">
        {" "}
        {/* Previous */}{" "}
        <button
          type="button"
          onClick={prevPage}
          disabled={!canGoPrev}
          aria-label="Previous page"
          className=" flex h-20 w-8 items-center justify-center text-3xl text-neutral-400 transition hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-30 "
        >
          {" "}
          ←{" "}
        </button>{" "}
        {/* Pages */}{" "}
        {pages.map((item, index) => {
          if (item === "dots") {
            return (
              <span
                key={`dots-${index}`}
                className=" flex h-20 w-8 items-center justify-center text-xl text-neutral-500 "
              >
                {" "}
                ...{" "}
              </span>
            );
          }
          const isActive = item === page;
          return (
            <button
              key={item}
              type="button"
              disabled={isLoading || isActive}
              onClick={() => goToPage(item)}
              aria-current={isActive ? "page" : undefined}
              className={` flex h-20 w-8 items-center justify-center text-xl transition ${isActive ? ` border-t-2 border-neutral-800 bg-neutral-50 text-neutral-900 ` : ` text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 `} disabled:cursor-default `}
            >
              {" "}
              {item}{" "}
            </button>
          );
        })}{" "}
        {/* Next */}{" "}
        <button
          type="button"
          onClick={nextPage}
          disabled={!canGoNext}
          aria-label="Next page"
          className=" ml-8 flex h-20 w-8 items-center justify-center text-3xl text-neutral-400 transition hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-30 "
        >
          {" "}
          →{" "}
        </button>{" "}
      </div>{" "}
    </nav>
    </div>
  );
}

function getPaginationPages( currentPage: number, totalPages: number, ): PaginationItem[] {
  // До 7 страниц показываем всё
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  // Начало:
  // 1 2 3 4 5 ... 84
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "dots", totalPages];
  }
  // Конец:
  //  1 ... 80 81 82 83 84

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "dots",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  // Середина:
  //  1 ... 9 10 11 ... 84
  return [
    1,
    "dots",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "dots",
    totalPages,
  ];
}