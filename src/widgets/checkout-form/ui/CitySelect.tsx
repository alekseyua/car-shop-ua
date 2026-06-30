import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCheckoutStore } from "../model/checkout.store";
import { NovaPoshtaCity } from "../model/checkout.types";

export default function CitySelect() {
  const { register, setValue } = useFormContext();

  const { getListCities } = useCheckoutStore();

  const [cities, setCities] = useState<NovaPoshtaCity[]>([]);
  const [query, setQuery] = useState("");

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
    setValue("city", value);

    if (value.length < 2) {
      setCities([]);
      return;
    }

    const result = await getListCities(value);

    setCities(result);
  };

  const handleSelect = (city: NovaPoshtaCity) => {
    setQuery(city.Description);
    setValue("city", city.Description);
    setCities([]);
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 text-black">
        Виберіть своє місто
      </h2>

      <div className="relative">
        <input
          {...register("city")}
          value={query}
          onChange={handleSearch}
          placeholder="Почніть вводити місто..."
          className="w-full h-12 border rounded-lg px-4 text-gray-900 placeholder:text-black"
        />

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
