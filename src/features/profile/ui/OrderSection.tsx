import React, { useEffect, useState } from "react";
import { useProfileStore } from "../model/profile.store";
import { ResponseMyOrder } from "../model/profile.types";
import Image from "next/image";

const OrderSection = () => {
  const { getListMyOrders, listMyOrders, isLoadingMyOrders, errorMyOrders } =
    useProfileStore();
  const [openedOrderId, setOpenedOrderId] = useState<number | null>(null);

  const toggleOrder = (id: number) => {
    setOpenedOrderId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    getListMyOrders();
  }, [getListMyOrders]);

  console.log({ listMyOrders });
  return (
    <div className="space-y-4 text-gray-900">
      {isLoadingMyOrders ? (
        <p>Загрузка заказов...</p>
      ) : errorMyOrders ? (
        <p>Ошибка при загрузке заказов: {errorMyOrders}</p>
      ) : (
        listMyOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Заказ № {order.orderNumber}</h3>

              <span className="rounded bg-yellow-100 px-2 py-1 text-sm">
                {order.status}
              </span>
            </div>

            <div className="mt-3 space-y-1 text-sm">
              <p>
                <strong>Дата:</strong>{" "}
                {new Date(order.createdAt).toLocaleString("uk-UA")}
              </p>

              <p>
                <strong>Получатель:</strong> {order.deliveryLastname}{" "}
                {order.deliveryFirstname}
              </p>

              <p>
                <strong>Город:</strong> {order.deliveryCity}
              </p>

              <p>
                <strong>Телефон:</strong> {order.deliveryPhone}
              </p>

              <p>
                <strong>Сумма:</strong> {order.totalPrice} ₴
              </p>

              <p>
                <strong>Товаров:</strong> {order.items.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggleOrder(order.id)}
              className="mt-4 text-sm font-medium text-blue-600 hover:underline"
            >
              {openedOrderId === order.id ? "Скрыть товары" : "Показать товары"}
            </button>

            {openedOrderId === order.id && (
              <div className="mt-4 space-y-3 border-t pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {item.imageUrl && (
                      <Image
                        src={"https://img2.ad.ua/imgs/" + item.imageUrl}
                        alt={item.title}
                        className="h-16 w-16 rounded object-cover"
                        width={64}
                        height={64}
                        style={{
                          width: "64px",
                          height: "64px",
                        }}
                      />
                    )}

                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>

                      <p className="text-sm text-gray-500">
                        Артикул: {item.itemNo}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.quantity} × {item.price} ₴
                      </p>
                    </div>

                    <div className="font-semibold">
                      {Number(item.price) * item.quantity} ₴
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderSection;
