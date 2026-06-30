import {
    useFormContext
}
    from "react-hook-form";


interface Props {
    name: string;
    label: string;
    type?: string;
require?: boolean
}

export default function FormField({
    name,
    label,
    type = "text",
    require
}: Props) {
    const {
        register
    } = useFormContext();

    return (
      <div>
        <label
          className=" text-gray-900 text-sm block mb-1 font-semibold"
        >
          {label} {require && <span className="text-red-500">*</span>}
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
    );

}