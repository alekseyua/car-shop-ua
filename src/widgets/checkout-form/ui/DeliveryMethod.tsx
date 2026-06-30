import {
    useCheckoutStore
} from "../model/checkout.store";



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
        setDeliveryMethod
    } = useCheckoutStore();



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



            <div className="space-y-3">


                {
                    methods.map(item => (


                        <label

                            key={item.id}

                            className={`
                                flex
                                items-center
                                gap-4
                                p-5
                                rounded-xl
                                border
                                cursor-pointer
                                transition

                                ${deliveryMethod === item.id
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
                                    deliveryMethod === item.id
                                }

                                onChange={() => (
                                    setDeliveryMethod(item.id)
                                )}

                                className="
                                    w-5
                                    h-5
                                "

                            />


                            <span className="
                                font-semibold
                                text-gray-900
                            ">
                                {item.title}
                            </span>


                        </label>


                    ))
                }


            </div>


        </section>

    );
}