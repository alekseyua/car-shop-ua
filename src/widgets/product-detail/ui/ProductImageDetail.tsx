"use client";

import { useProductDetailStore } from "@/src/entities/product-detail/model/detail.store";
import { ProductDetailResponse } from "@/src/entities/product-detail/model/detail.types";
import { ProductDescription } from "@/src/shared/sanitize/ProductDescription";
import Image from "next/image";
import React, { useState } from "react";

const IMAGE_URL = "https://img2.ad.ua/imgs/";

type ProductFile = {
  comID: string;
  itemNo: string;
  sort: string;
  manual: string;
  pathName: string;
  fileName: string;
  url: string;
  fileType: string;
  fileDescript: string;
};

const getYoutubeVideoId = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    // https://youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    return null;
  } catch {
    return null;
  }
};

const ProductItemDetail = () => {
  const [currentImage, setCurrentImage] = useState<string>("");
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const {
    product,
  }: {
    product: ProductDetailResponse | null;
  } = useProductDetailStore();

  if (!product) return null;

  const files = (product.files ?? []) as ProductFile[];

  /**
   * Картинки
   *
   * fileType:
   * 1, 3, 6
   */
  const imageFiles = files.filter(
    (file) =>
      file.fileType === "1" || file.fileType === "3" || file.fileType === "6",
  );

  /**
   * Видео
   *
   * fileType === "4"
   */
  const videoFiles = files.filter((file) => file.fileType === "4" && file.url.includes('youtube'));

  /**
   * Получаем путь картинки
   */
  const getFilePath = (file: ProductFile) => {
    return `${file.pathName}/${file.fileName}`.replace(/^\/+/, "");
  };

  /**
   * firstPic
   */
  const defaultImage = product.item?.firstPic ?? "";

  /**
   * Главное изображение
   */
  const imagePath =
    currentImage ||
    (imageFiles.length > 0 ? getFilePath(imageFiles[0]) : defaultImage);

  /**
   * Выбранное видео
   */
  const activeVideoId = currentVideo ? getYoutubeVideoId(currentVideo) : null;

  return (
    <div className="flex w-full flex-col items-center gap-4 px-2 sm:px-0">
      {/* ===================================== */}
      {/* ГЛАВНЫЙ MEDIA BLOCK                    */}
      {/* ===================================== */}

      {activeVideoId ? (
        <div
          className="
            relative
            aspect-video
            w-full
            max-w-[500px]
            overflow-hidden
            rounded-lg
            bg-black
          "
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${activeVideoId}`}
            title="Відеогляд товару"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        imagePath && (
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
        )
      )}

      {/* ===================================== */}
      {/* THUMBNAILS                             */}
      {/* ===================================== */}

      {(imageFiles.length > 0 || videoFiles.length > 0) && (
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
            {/* ================================= */}
            {/* VIDEO THUMBNAIL                    */}
            {/* ================================= */}

            {videoFiles.map((file, index) => {
              const videoId = getYoutubeVideoId(file.url);

              if (!videoId) return null;

              const isActive = currentVideo === file.url;

              return (
                <button
                  key={`video-${file.url}-${index}`}
                  type="button"
                  onClick={() => {
                    setCurrentVideo(file.url);
                    setCurrentImage("");
                  }}
                  className={`
                    relative
                    h-[70px]
                    w-[70px]
                    shrink-0
                    overflow-hidden
                    rounded-md
                    border-2
                    bg-black
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "border-red-500"
                        : "border-gray-200 hover:border-gray-400"
                    }
                  `}
                >
                  {/* YouTube preview */}
                  <Image
                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                    alt={file.fileDescript || "Video"}
                    fill
                    sizes="70px"
                    className="object-cover"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-red-600
                        text-sm
                        text-white
                        shadow-md
                      "
                    >
                      ▶
                    </div>
                  </div>
                </button>
              );
            })}

            {/* ================================= */}
            {/* IMAGE THUMBNAILS                   */}
            {/* ================================= */}

            {imageFiles.map((file, index) => {
              const filePath = getFilePath(file);

              const isActive = !currentVideo && imagePath === filePath;

              return (
                <button
                  key={`${filePath}-${index}`}
                  type="button"
                  onClick={() => {
                    setCurrentVideo(null);
                    setCurrentImage(filePath);
                  }}
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
      {/* description */}
      <div>
        {product.item.longText && (
          <>
            <h2 className="text-xl font-semibold mb-2 text-black">Описание</h2>
            <ProductDescription description={product.item.longText} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItemDetail;
