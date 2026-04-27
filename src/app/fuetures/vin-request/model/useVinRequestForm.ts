import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { VinRequestData } from "../types/vinRequest.type";

export const useVinRequestForm = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<VinRequestData>();

    const onSubmit: SubmitHandler<VinRequestData> = (data) => {
        console.log(data);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e?.target?.files?.[0] ?? null;
        if (file) {
            setValue("file", file);
            setPreview(URL.createObjectURL(file));
        }
    }
    return {
        register,
        handleSubmit,
        setValue,
        control,
        errors,
        onSubmit,
        preview,
        handleFileChange
    }
};