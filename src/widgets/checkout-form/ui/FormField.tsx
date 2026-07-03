import {
    useFormContext
}
    from "react-hook-form";
import { CheckoutFormValues } from "../model/checkout.types";


interface Props {
  name:
  | "deliveryPhone"
  | "deliveryEmail"
  | "deliveryLastname"
  | "deliveryFirstname"
  | "deliveryMiddlename"
  | "deliveryCity"
  | "deliveryComment"
  | "deliveryVin"
  | "deliveryPoint";
  label: string;
  type?: string;
  require?: object;
}

export default function FormField({
    name,
    label,
    type = "text",
    require = {}
}: Props) {
    const {
        register,
        formState:{errors}
    } = useFormContext<CheckoutFormValues>();

    return (
      <div className="relative">
        <label className=" text-gray-900 text-sm block mb-1 font-semibold">
          {label}{" "}
          {Object.keys(require).length > 0 && (
            <span className="text-red-500">*</span>
          )}
        </label>

        <input
          type={type}
          {...register(name, require)}
          className="
                      w-full
                      border
                      rounded-lg
                      px-3
                      py-2
                      text-gray-900
                      "
        />
        {errors[name] && (
          <p className="text-red-500 text-sm absolute top-full left-0">
            {errors[name].message}
          </p>
        )}
      </div>
    );

}