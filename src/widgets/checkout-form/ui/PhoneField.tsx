import {
    Controller,
    useFormContext
} from "react-hook-form";


import {
    IMaskInput
} from "react-imask";


interface IProps {
    require?: boolean
}
export default function PhoneField({require}: IProps) {

    const {
        control
    } = useFormContext();

    return (
      <div>
        <label
          className="
                block
                text-sm
                font-semibold
                mb-1
                text-gray-900
            "
        >
          Мобільний телефон {require && <span className="text-red-500">*</span>}
        </label>
        <Controller
          name="phone"
          control={control}
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
      </div>
    );
}