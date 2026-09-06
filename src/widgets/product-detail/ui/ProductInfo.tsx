import { usePdfStore } from '@/src/entities/PdfViewer/model/pdf.store';
import { useProductDetailStore } from '@/src/entities/product-detail/model/detail.store';
import { ProductItemDetail, ProductDetailResponse } from '@/src/entities/product-detail/model/detail.types';
import { ProductAvailabilityList } from '@/src/entities/product/ui/ProductAvailabilityList';
import { handleAddToCart } from '@/src/features/cart/model/cart.actions';
import useModal from '@/src/hooks/use-modal';
import { CriteriaItem } from '@/src/shared/api/dto';
import { useTranslations } from 'next-intl';
import React from 'react'

const ProductInfo = () => {
    const { product }:{ product: ProductDetailResponse | null } = useProductDetailStore();
    const t = useTranslations("catalog");
    const { setPdfFile } = usePdfStore();
    const { openModal } = useModal();
    if(!product) return null;
    const  files =
      product.files?.filter((file) => file.fileType === "2") ?? [];
  return (
    <div className="flex flex-col gap-2 p-4 border-l w-full h-full">
      <h1 className="text-2xl font-bold mb-4 text-black text-center">
        {product?.item.brand + " " + product?.item.itemNo}
      </h1>
      <h2 className="text-2xl font-bold mb-4 text-black text-center">
        {product?.item.description}
      </h2>
      {/* description product */}
      {!!product?.item.criterias.length ||
      !!product?.item?.searchDescription ? (
        <div className="flex flex-col text-black">
          {!!product?.item.criterias.length && (
            <h2 className="text-xl font-semibold mb-2 text-black">
              {t("characteristics")}
            </h2>
          )}
          {product?.item.criterias.map((desc: CriteriaItem, index: number) => (
            <div className="flex gap-4 " key={desc.itemNo + "_" + index}>
              <div className="text-zinc-500">{desc.criteria}</div>
              <div className="text-black">{desc.value}</div>
            </div>
          ))}
          {!!product?.item?.searchDescription && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-black">
                {t("add-characteristics")}
              </h2>
              <p>{product.item.searchDescription}</p>
            </>
          )}
        </div>
      ) : (
        <div className="text-lg text-start text-black">
          {t("descriptionNotLook")}
        </div>
      )}
      {/* specification */}
      {files?.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {files.map((f) => {
            const fileUrl = `${f.pathName}/${encodeURIComponent(
              f.fileName,
            )}`;

            return (
              <div
                key={`${f.pathName}/${f.fileName}`}
                className="
            flex
            items-center
            justify-between
            gap-3
            rounded-md
            border
            border-gray-200
            bg-white
            px-3
            py-2
          "
              >
                {/* Описание */}
                <p className="min-w-0 text-sm text-gray-700">
                  {f.fileDescript || f.fileName}
                </p>

                {/* Ссылка */}
                <button
                  onClick={() =>{
                    setPdfFile(fileUrl)
                    openModal({type: 'pdf'})
                  }}
                  className="
                    shrink-0
                    rounded-md
                    bg-gray-100
                    px-3
                    py-1.5
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-200
                    hover:text-black
                  "
                >
                  Відкрити
                </button>
              </div>
            );
          })}
        </div>
      )}
      {/* available and price */}
      <div className="border rounded-md p-4 mt-4 bg-yellow-50">
        <p className="text-lg text-gray-700 mb-2">
          <span> {t("price")}: </span>
          <span className="font-bold">
            {!!product?.item.price && Number(product?.item.price).toFixed(2)}
          </span>
          <span> UAH </span>
        </p>
        {product?.item?.stock.length && (
          <div className="text-lg text-gray-500 mb-2">
            {t("available")}:
            <ProductAvailabilityList
              onClick={(statusDelivery: string) =>
                handleAddToCart(
                  product?.item as ProductItemDetail,
                  statusDelivery,
                )
              }
              stock={product.item.stock}
            />
          </div>
        )}
      </div>
       {/* Additional product info can be added here */}
    </div>
  );
}

export default ProductInfo