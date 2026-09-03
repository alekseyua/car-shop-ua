import React from 'react';
import { useSearchStore } from '../model/search.store';
import { Link } from '@/src/i18n/navigation';
import useModal from '@/src/hooks/use-modal';
import Image from 'next/image';

import iconPhotoPlaceholder from '../../../shared/assets/icons/iconPhotoPlaceholder.svg';

const SearchModal = () => {
  const {
    getListSearch,
    listSearch,
    resetListSearch,
  } = useSearchStore();

  const { closeModal } = useModal();

  return (
    <div className="flex w-full min-w-0 flex-col">
      {/* TITLE */}
      <h2
        className="
          mb-3
          pr-8
          text-center
          text-lg
          font-bold
          text-[#333]

          sm:mb-4
          sm:text-xl
        "
      >
        Search
      </h2>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search for parts..."
        className="
          mb-3
          h-11
          w-full
          min-w-0
          rounded-md
          border
          border-gray-200
          px-3
          text-sm
          text-[#333]
          outline-none

          focus:border-transparent
          focus:ring-2
          focus:ring-[#3b79d5]

          sm:mb-4
          sm:h-auto
          sm:p-2
          sm:text-base
        "
        onChange={(e) => getListSearch(e.target.value)}
      />

      {/* RESULTS TITLE */}
      {!!listSearch.length && (
        <span
          className="
            mb-2
            block
            truncate
            pl-1
            text-sm
            font-bold
            text-[#333]

            sm:mb-3
          "
        >
          Результати пошуку:
        </span>
      )}

      {/* RESULTS */}
      <div className="flex min-w-0 flex-col gap-2">
        {listSearch.map((item) => (
          <div
            key={item.itemNo}
            className="
              w-full
              min-w-0
              rounded-xl
              border
              border-gray-200
              bg-white
              px-3
              py-3
              shadow-sm
              transition

              sm:px-4
              sm:py-3

              hover:border-blue-300
              hover:shadow-md
            "
          >
            <div className="flex min-w-0 items-center gap-2">
              {/* IMAGE */}
              <Image
                src={iconPhotoPlaceholder}
                alt="photo placeholder"
                width={60}
                height={60}
                className="
                  h-14
                  w-14
                  shrink-0

                  sm:h-15
                  sm:w-15
                "
              />

              {/* INFO */}
              <div className="min-w-0 flex-1 overflow-hidden">
                <Link
                  href={`/catalog/detail/${encodeURIComponent(item.itemNo)}`}
                  onClick={() => {
                    closeModal();
                    resetListSearch();
                  }}
                  className="
                    inline-flex
                    max-w-full
                    items-center
                    gap-1
                    truncate
                    text-sm
                    font-semibold
                    text-blue-600

                    hover:text-blue-800
                    hover:underline
                  "
                >
                  <span className="truncate">
                    {item.itemNo}
                  </span>

                  <span
                    className="
                      hidden
                      text-xs
                      opacity-0
                      transition-opacity

                      sm:inline
                      sm:group-hover:opacity-100
                    "
                  >
                    →
                  </span>
                </Link>

                {/* NAME */}
                <div
                  className="
                    mt-1
                    truncate
                    text-xs
                    text-gray-700

                    sm:text-sm
                  "
                  title={item.name}
                >
                  {item.name}
                </div>

                {/* CATEGORY */}
                <div className="mt-1 truncate text-[11px] text-gray-400 sm:text-xs">
                  Код: {item.catItemNo}
                </div>
              </div>

              {/* PRICE */}
              <div className="shrink-0 text-right">
                <div
                  className="
                    text-sm
                    font-bold
                    text-gray-900
                    whitespace-nowrap

                    sm:text-base
                  "
                >
                  {item.price} ₴
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchModal;
