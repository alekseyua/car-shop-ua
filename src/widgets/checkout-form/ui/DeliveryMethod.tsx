import { useForm, useFormContext } from "react-hook-form";
import {
    useCheckoutStore
} from "../model/checkout.store";
import { WherehouseType } from "../model/checkout.types";
import { useEffect } from "react";



const methods = [
    {
        id: "warehouse",
        title: "На відділення «Нової Пошти»"
    },
    {
        id: "locker",
        title: "На поштомат «Нової Пошти»"
    }
];

export default function DeliveryMethod() {
    const {
        deliveryMethod,
        warehouseTypes,
        setDeliveryMethod,
        getWherehouse,
        getListWherehouseType,
    } = useCheckoutStore();
    const { register, resetField } = useFormContext();
    console.log({ register: register('cityRef')})

    const placeholder =
        deliveryMethod === "warehouse"
            ? "Введіть номер відділення"
            : "Введіть адресу або номер поштомату";
    useEffect(() => {
        void getListWherehouseType();
    }, []);
    console.log({ warehouseTypes })
    return (
        <section>
            <h2 className="
                text-3xl
                font-bold
                mb-4
                text-black
            ">
                Доставка
            </h2>
            {warehouseTypes  && <div className="space-y-3">
                {
                    warehouseTypes.map(item => (
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
                                ${deliveryMethod === item.Ref
                                    ?
                                    "border-red-500 bg-red-50"
                                    :
                                    "border-gray-200"
                                }
                            `}
                        >
                            <input
                                type="radio"
                                checked={
                                    deliveryMethod === item.Ref
                                }
                                onChange={() => {
                                    setDeliveryMethod(item.Ref);
                                    resetField("deliveryPoint");
                                }
                                }
                                className="
                                    w-5
                                    h-5
                                "
                            />
                            <span className="
                                font-semibold
                                text-gray-900
                            ">
                                {item.Description}
                            </span>
                        </label>
                    ))
                }
            </div>}
            {deliveryMethod && (
                <div className="mt-5">
                    <label className="block mb-2 font-semibold text-gray-900">
                        {deliveryMethod === "warehouse"
                            ? "Відділення"
                            : "Поштомат"}
                    </label>

                    <input
                        type="text"
                        {...register("deliveryPoint")}
                        placeholder={placeholder}
                        className="
                w-full
                h-12
                border
                rounded-lg
                px-4
                text-gray-900
            "
                        onChange={(e) => {
                            const target = e.target;
                            console.log({target})
                            getWherehouse(target.value)
                        }}
                    />
                </div>
            )}
        </section>
    );
}