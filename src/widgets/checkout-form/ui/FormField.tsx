import {
    useFormContext
}
    from "react-hook-form";


interface Props {

    name: string;

    label: string;

    type?: string;

}



export default function FormField({

    name,

    label,

    type = "text"

}: Props) {


    const {
        register
    } = useFormContext();



    return (

        <div>


            <label
                className="
block
mb-1
font-semibold
"
            >

                {label}

            </label>


            <input

                type={type}

                {...register(name)}

                className="
w-full
border
rounded-lg
px-3
py-2
text-gray-900
"

            />


        </div>

    )

}