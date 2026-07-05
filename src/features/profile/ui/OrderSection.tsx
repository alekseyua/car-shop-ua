import React, { useEffect } from 'react'
import { useProfileStore } from '../model/profile.store'
import { ResponseMyOrder } from '../model/profile.types';

const OrderSection = () => {

    const { getListMyOrders, listMyOrders } = useProfileStore();

    useEffect(() => {
        getListMyOrders();
    }, [getListMyOrders]);

    console.log({ listMyOrders })
  return (
          <div className="space-y-4 text-gray-900">
              {listMyOrders.length === 0 ? (
                  <p>У вас пока нет заказов.</p>
              ) : (
                  listMyOrders.map((order) => (
                      <div
                          key={order.id}
                          className="rounded-lg border border-gray-200 p-4 shadow-sm"
                      >
                          <div className="flex items-center justify-between">
                              <h3 className="font-semibold">
                                  Заказ № {order.orderNumber}
                              </h3>

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
                                  <strong>Получатель:</strong>{" "}
                                  {order.deliveryLastname} {order.deliveryFirstname}
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
                      </div>
                  ))
              )}
          </div>
  )
}

export default OrderSection