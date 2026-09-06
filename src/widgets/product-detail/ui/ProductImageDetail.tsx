"use client";

import { useProductDetailStore } from "@/src/entities/product-detail/model/detail.store";
import { ProductDetailResponse } from "@/src/entities/product-detail/model/detail.types";
import Image from "next/image";
import React, { useState } from "react";

const IMAGE_URL = "https://img2.ad.ua/imgs/";

const ProductItemDetail = () => {
  const [currentImage, setCurrentImage] = useState<string>("");

  const {
    product,
  }: {
    product: ProductDetailResponse | null;
  } = useProductDetailStore();

  if (!product) return null;

  /**
   * Только файлы с fileType === "3"
   */
  const imageFiles =
    product.files?.filter((file) => file.fileType === "3") ?? [];

  /**
   * Получаем полный путь к файлу
   *
   * pathName: "tcd/4686_pic"
   * fileName: "pr23010185.JPG"
   *
   * => tcd/4686_pic/pr23010185.JPG
   */
  const getFilePath = (file: { pathName: string; fileName: string }) => {
    return `${file.pathName}/${file.fileName}`;
  };

  /**
   * Картинка из firstPic
   */
  const defaultImage = product.item?.firstPic ?? "";

  /**
   * Главное изображение:
   *
   * 1. выбранная пользователем картинка
   * 2. первая картинка fileType === "3"
   * 3. firstPic
   */
  const imagePath =
    currentImage ||
    (imageFiles.length > 0 ? getFilePath(imageFiles[0]) : defaultImage);

  return (
    <div className="flex w-full flex-col items-center gap-4 px-2 sm:px-0">
      {/* ===================================== */}
      {/* ГЛАВНОЕ ИЗОБРАЖЕНИЕ                   */}
      {/* ===================================== */}

      {imagePath && (
        <div
          className="
            relative
            flex
            aspect-square
            w-full
            max-w-[500px]
            items-center
            justify-center
            overflow-hidden
          "
        >
          <Image
            src={`${IMAGE_URL}${imagePath}`}
            alt={imagePath.split("/").pop() ?? "Product Image"}
            width={500}
            height={500}
            loading="eager"
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 70vw,
              500px
            "
            className="h-full w-full object-contain"
          />
        </div>
      )}

      {/* ===================================== */}
      {/* THUMBNAILS                            */}
      {/* ===================================== */}

      {imageFiles.length > 0 && (
        <div className="w-full max-w-[500px]">
          <div
            className="
              flex
              w-full
              gap-2
              overflow-x-auto
              pb-2
              scrollbar-thin
            "
          >
            {imageFiles.map((file, index) => {
              const filePath = getFilePath(file);

              const isActive = imagePath === filePath;

              return (
                <button
                  key={`${filePath}-${index}`}
                  type="button"
                  onClick={() => setCurrentImage(filePath)}
                  className={`
                    relative
                    h-[70px]
                    w-[70px]
                    shrink-0
                    overflow-hidden
                    rounded-md
                    border-2
                    bg-white
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "border-red-500"
                        : "border-gray-200 hover:border-gray-400"
                    }
                  `}
                >
                  <Image
                    src={`${IMAGE_URL}${filePath}`}
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="70px"
                    loading="eager"
                    className="object-contain p-1"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItemDetail;
