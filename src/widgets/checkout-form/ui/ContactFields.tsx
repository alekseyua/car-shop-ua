import FormField from "./FormField";
import PhoneField from "./PhoneField";


export default function ContactFields() {

    return (
      <section>
        <h2
          className="
                text-3xl
                font-bold
                mb-6
                text-black
            "
        >
          Контактні дані
        </h2>
        <div
          className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
            "
        >
          <PhoneField
            require={{ required: "Поле обов'язкове для заповнення" }}
          />
          <FormField name="deliveryEmail" label="Електронна пошта" type="email" />
          <FormField
            name="deliveryLastname"
            label="Прізвище"
            require={{ required: "Поле обов'язкове для заповнення" }}
          />
          <FormField
            name="deliveryFirstname"
            label="Ім'я"
            require={{ required: "Поле обов'язкове для заповнення" }}
          />
          <FormField name="deliveryMiddlename" label="По батькові" />
        </div>
      </section>
    );
}