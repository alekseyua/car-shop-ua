import {
    useFormContext
} from "react-hook-form";


import {
    useCheckoutStore
} from "../model/checkout.store";


import Switch from "./Switch";



export default function VinCheck() {


    const {
        register
    } = useFormContext();



    const {
        vinCheck,
        setVinCheck
    } = useCheckoutStore();



    return (

        <div className="
            mt-4
            border
            rounded-xl
            p-5
            bg-[#FFF1B8]
        ">


            <div className="
                flex
                items-center
                justify-between
                gap-4
            ">


                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <span>
                        ℹ️
                    </span>


                    <span className="
                        font-semibold
                        text-gray-900
                    ">
                        Перевірити правильність підбору
                        обраних запчастин за VIN?
                    </span>


                </div>



                <Switch

                    checked={vinCheck}

                    onChange={setVinCheck}

                />


            </div>



            {
                vinCheck &&


                <input

                    {...register("deliveryVin")}

                    placeholder="
                        Введіть VIN-код
                    "

                    className="
                        w-full
                        mt-4
                        h-12
                        border
                        rounded-lg
                        px-4
                        text-gray-900
                    "

                />

            }



        </div>

    );
}