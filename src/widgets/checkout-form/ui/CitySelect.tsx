import {
    useFormContext
} from "react-hook-form";


const cities = [
    "Кривий Ріг (Дніпропетровська обл.)",
    "Київ",
    "Львів",
    "Одеса"
];


export default function CitySelect() {

    const {
        register
    } = useFormContext();


    return (

        <section>


            <h2 className="
                text-3xl
                font-bold
                mb-4
                text-black
            ">
                Виберіть своє місто
            </h2>



            <select

                {...register("city")}

                className="
                    w-full
                    h-12
                    border
                    rounded-lg
                    px-4
                    text-gray-900
                "

            >

                {
                    cities.map(city => (

                        <option
                            key={city}
                            value={city}
                        >
                            {city}
                        </option>

                    ))
                }


            </select>


        </section>

    );
}