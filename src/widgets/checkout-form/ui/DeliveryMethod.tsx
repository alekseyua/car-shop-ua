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
    const {
      register,
      setValue,
      resetField,
      trigger,
      formState: { errors },
    } = useFormContext();
    const [addressWherehoyse, setAddressWherehouse] = useState<string>('');
    const [nameDeliveryMethods, setNameDeliveryMethods] = useState<string>("");
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

    const validateBranch = (value: string) => {
      return (
        (selectedBranch !== null && selectedBranch === value) ||
        "Виберіть відділення зі списку"
      );
    };

    const placeholder =
        deliveryMethod === "warehouse"
            ? "Введіть номер відділення"
            : "Введіть адресу або номер поштомату";

    useEffect(() => {
        void getListWherehouseType();
    }, []);

   const handleSelect = async (wherehouse: Warehouse, ref: string) => {
     setSelectedBranch(wherehouse.Description);
     setAddressWherehouse(wherehouse.Description);

     setValue("deliveryPoint", wherehouse.Description, {
       shouldValidate: false,
       shouldDirty: true,
     });

     setValue("deliveryPointRef", ref);

     resetListWherehouse();

     await trigger("deliveryPoint");
   };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setSelectedBranch(null);
      setAddressWherehouse(value);

      setValue("deliveryPoint", value, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("deliveryPointRef", "");

      getListWherehouse(value);
    };

      useEffect(() => {
        if (selectedBranch) {
          void trigger("deliveryPoint");
        }
      }, [selectedBranch, trigger]);

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
              {warehouseTypes
                .filter((item, i) => i !== 0)
                .map((item) => (
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
                        setNameDeliveryMethods(item.Description);
                        setAddressWherehouse("");
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
                {nameDeliveryMethods &&
                  "Введіть " + nameDeliveryMethods.toLocaleLowerCase()}
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("deliveryPoint", {
                    required: "вкажіть адресу",
                    validate: validateBranch,
                  })}
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
                {errors.deliveryPoint && (
                  <p className="mt-1 text-sm text-red-500">
                    {String(errors.deliveryPoint.message)}
                  </p>
                )}
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