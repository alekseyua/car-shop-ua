import {
    Controller,
    useFormContext
} from "react-hook-form";


import {
    IMaskInput
} from "react-imask";



export default function PhoneField() {


    const {
        control
    } = useFormContext();



    return (

        <div>


            <label className="
                block
                text-sm
                font-semibold
                mb-1
                text-gray-900
            ">
                Мобільний телефон
            </label>



            <Controller

                name="phone"

                control={control}


                render={({ field }) => (


                    <IMaskInput

                        mask="+38 (000) 000-00-00"

                        value={field.value}

                        onAccept={
                            value => field.onChange(value)
                        }

                        className="
                            w-full
                            border
                            rounded-lg
                            px-3
                            py-2
                            text-gray-900
                        "

                    />


                )}


            />


        </div>

    );

}