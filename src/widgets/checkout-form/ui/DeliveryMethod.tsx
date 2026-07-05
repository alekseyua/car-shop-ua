import { useFormContext } from "react-hook-form";
import {
    useCheckoutStore
} from "../model/checkout.store";
import { useEffect, useState } from "react";
import { Warehouse } from "../model/checkout.types";


export default function DeliveryMethod() {
    const {
        deliveryMethod,
        deliveryCity,
        warehouseTypes,
        listWherehouse,
        resetListWherehouse,
        setDeliveryMethod,
        getListWherehouse,
        getListWherehouseType,
    } = useCheckoutStore();
    const { register, setValue, resetField } = useFormContext();
    const [addressWherehoyse, setAddressWherehouse] = useState<string>('');

    const placeholder =
        deliveryMethod === "warehouse"
            ? "Введіть номер відділення"
            : "Введіть адресу або номер поштомату";

    useEffect(() => {
        void getListWherehouseType();
    }, []);

    const handleSelect = (wherehouse: Warehouse, ref: string) => {
        setAddressWherehouse(wherehouse.Description);
        resetListWherehouse();
        setValue("deliveryPoint", wherehouse.Description);
        setValue("deliveryPointRef", ref);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        getListWherehouse(target.value);
        setAddressWherehouse(target.value);
        resetField("deliveryPointRef");
        resetField("deliveryPoint");
    };

    if (!deliveryCity) return null;
      return (
        <section>
          <h2
            className="
                text-3xl
                font-bold
                mb-4
                text-black
            "
          >
            Доставка
          </h2>
          {warehouseTypes && (
            <div className="space-y-3">
              {warehouseTypes.map((item) => (
                <label
                  key={item.Ref}
                  className={`
                                flex
                                items-center
                                gap-4
                                p-5
                                rounded-xl
                                border
                                cursor-pointer
                                transition
                                ${
                                  deliveryMethod === item.Ref
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200"
                                }
                            `}
                >
                  <input
                    type="radio"
                    checked={deliveryMethod === item.Ref}
                    onChange={() => {
                      setDeliveryMethod(item.Ref);
                      setAddressWherehouse('');
                      resetField("deliveryPoint");
                    }}
                    className="
                                    w-5
                                    h-5
                                "
                  />
                  <span
                    className="
                                font-semibold
                                text-gray-900
                            "
                  >
                    {item.Description}
                  </span>
                </label>
              ))}
            </div>
          )}
          {deliveryMethod && (
            <div className="mt-5">
              <label className="block mb-2 font-semibold text-gray-900">
                {deliveryMethod === "warehouse" ? "Відділення" : "Поштомат"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("deliveryPoint")}
                  placeholder={placeholder}
                  value={addressWherehoyse}
                  className="
                        w-full
                        h-12
                        border
                        rounded-lg
                        px-4
                        text-gray-900
                    "
                  onChange={handleSearch}
                />
                {listWherehouse.length > 0 && (
                  <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                    {listWherehouse.map((wherehouse) => (
                      <li
                        key={wherehouse.Ref}
                        onClick={() => handleSelect(wherehouse, wherehouse.Ref)}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-900"
                      >
                        {wherehouse.Description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </section>
      );
}