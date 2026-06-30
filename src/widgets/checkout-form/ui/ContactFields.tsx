import FormField from "./FormField";
import PhoneField from "./PhoneField";


export default function ContactFields() {

    return (
        <section>

            <h2 className="
                text-3xl
                font-bold
                mb-6
                text-black
            ">
                Контактні дані
            </h2>


            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
            ">


                <PhoneField />


                <FormField
                    name="email"
                    label="Електронна пошта"
                    type="email"
                />


                <FormField
                    name="lastname"
                    label="Прізвище"
                />


                <FormField
                    name="firstname"
                    label="Ім'я"
                />


                <FormField
                    name="middlename"
                    label="По батькові"
                />


            </div>

        </section>
    );
}