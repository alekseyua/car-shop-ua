import React, { useEffect, useState } from "react";
import { useProfileStore } from "../model/profile.store";
import Image from "next/image";
import { CheckoutButton } from "@/src/features/checkout/ui/CheckoutButton";
import { getOrderStatusColor, getOrderStatusLabel } from "@/src/shared/libs/helpers";
import { useOrderStore } from "../../order/model/useOrderStore";

const OrderSection = () => {
  const { getListMyOrders, listMyOrders, isLoadingMyOrders, errorMyOrders } =
    useOrderStore();

  const [openedOrderId, setOpenedOrderId] = useState<number | null>(null);

  const toggleOrder = (id: number) => {
    setOpenedOrderId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    getListMyOrders();
  }, [getListMyOrders]);

  return (
    <div className="space-y-4 text-gray-900">
      {isLoadingMyOrders ? (
        <p className="text-gray-500">Завантаження замовлень...</p>
      ) : errorMyOrders ? (
        <p className="text-red-600">
          Не вдалося завантажити замовлення: {errorMyOrders}
        </p>
      ) : listMyOrders.length === 0 ? (
        <div className="rounded-lg border border-gray-200 px-4 py-10 text-center">
          <p className="text-lg font-semibold">У вас ще немає замовлень</p>
          <p className="mt-2 text-sm text-gray-500">
            Ваші замовлення з’являться тут після оформлення покупки.
          </p>
        </div>
      ) : (
        listMyOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold">
                Замовлення № {order.orderNumber}
              </h3>

              <span
                className={`rounded px-2 py-1 text-sm ${getOrderStatusColor(order.status)}`}
              >
                {getOrderStatusLabel(order.status)}
              </span>
            </div>

            <div className="mt-3 space-y-1 text-sm">
              <p>
                <strong>Дата оформлення:</strong>{" "}
                {new Date(order.createdAt).toLocaleString("uk-UA")}
              </p>

              <p>
                <strong>Отримувач:</strong> {order.deliveryLastname}{" "}
                {order.deliveryFirstname}
              </p>

              <p>
                <strong>Місто доставки:</strong> {order.deliveryCity}
              </p>

              <p>
                <strong>Телефон:</strong> {order.deliveryPhone}
              </p>

              <p>
                <strong>Загальна сума:</strong> {order.totalPrice} ₴
              </p>

              <p>
                <strong>Кількість товарів:</strong> {order.items.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggleOrder(order.id)}
              className="mt-4 text-sm font-medium text-blue-600 hover:underline"
            >
              {openedOrderId === order.id
                ? "Приховати товари"
                : "Переглянути товари"}
            </button>

            {openedOrderId === order.id && (
              <div className="mt-4 space-y-3 border-t pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {item.imageUrl && (
                      <Image
                        src={`https://img2.ad.ua/imgs/${item.imageUrl}`}
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

            {order.status === "PENDING" && (
              <div className="mt-4 flex justify-end">
                <CheckoutButton orderId={order.id} />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderSection;
