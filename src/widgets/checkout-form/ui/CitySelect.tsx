import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCheckoutStore } from "../model/checkout.store";
import { CheckoutFormValues, NovaPoshtaCity } from "../model/checkout.types";

export default function CitySelect() {
  const {
    register,
    setValue,
    resetField,
    clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  const {
    getListCities,
    setDeliveryCity,
    setDeliveryCityRef,
    resetDeliveryCity,
    setDeliveryMethod,
  } = useCheckoutStore();

  const [cities, setCities] = useState<NovaPoshtaCity[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<NovaPoshtaCity | null>(null);

  const validateCity = (value: string) => {
    return (
      (selectedCity !== null && selectedCity.Description === value) ||
      "Виберіть місто зі списку"
    );
  };

  const resetForms = () => {
    resetDeliveryCity();
    resetField('deliveryPoint');
    resetField("deliveryCity");
    setDeliveryMethod("");
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
    setSelectedCity(null);
    resetForms();
    // selectedCityRef.current = null;

    setValue("deliveryCity", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setDeliveryCity("");
    setDeliveryCityRef("");
    resetField("deliveryPoint");

    if (value.length < 2) {
      setCities([]);
      return;
    }

    const result = await getListCities(value);
    setCities(result);
  };


  const handleSelect = (city: NovaPoshtaCity) => {
    setSelectedCity(city);
    setQuery(city.Description);

    setValue("deliveryCity", city.Description, {
      shouldDirty: true,
      shouldValidate: false,
    });

    setDeliveryCity(city.Description);
    setDeliveryCityRef(city.Ref);
    setCities([]);
  };

  useEffect(() => {
    if (selectedCity) {
      void trigger("deliveryCity");
    }
  }, [selectedCity, trigger]);
  
  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 text-black">
        Виберіть своє місто
      </h2>

      <div className="relative">
        <input
          {...register("deliveryCity", {
            required: "Выберите город",
            validate: validateCity,
          })}
          value={query}
          onChange={handleSearch}
          placeholder="Почніть вводити місто..."
          className="w-full h-12 border rounded-lg px-4 text-gray-900 placeholder:text-black"
        />
        {errors.deliveryCity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.deliveryCity.message}
          </p>
        )}
        {cities.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto z-50">
            {cities.map((city) => (
              <li
                key={city.Ref}
                onClick={() => handleSelect(city)}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-900"
              >
                {city.Description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
