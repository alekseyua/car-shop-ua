import {
    Controller,
    useFormContext
} from "react-hook-form";


import {
    IMaskInput
} from "react-imask";
import { CheckoutFormValues } from "../model/checkout.types";


interface IProps {
    require?: object;
}
export default function PhoneField({require = {}}: IProps) {

    const {
      control,
      formState: { errors },
    } = useFormContext<CheckoutFormValues>();

    return (
      <div className="relative">
        <label
          className="
                block
                text-sm
                font-semibold
                mb-1
                text-gray-900
            "
        >
          Мобільний телефон{" "}
          {Object.keys(require).length > 0 && (
            <span className="text-red-500">*</span>
          )}
        </label>
        <Controller
          name="deliveryPhone"
          control={control}
          rules={{
            required: "Вкажіть номер телефону",
          }}
          render={({ field }) => (
            <IMaskInput
              mask="+38 (000) 000-00-00"
              value={field.value}
              onAccept={(value) => field.onChange(value)}
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
        {errors.deliveryPhone && (
          <p className="text-red-500 text-sm absolute top-full left-0">
            {errors.deliveryPhone.message}
          </p>
        )}
      </div>
    );
}