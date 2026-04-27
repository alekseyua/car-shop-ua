import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useVinRequestForm } from "../model/useVinRequestForm";
import { useTranslations } from "next-intl";


export default function VinRequestForm() {
  const {
    register,
    handleSubmit,
    control,
    errors,
    preview,
    handleFileChange,
    onSubmit,
  } = useVinRequestForm();
  const t = useTranslations('Header');
  return (
    // todo сделать перевод на i18n
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 space-y-6"
    >
      {/* 1 */}
      <div className="flex gap-3">
        <div className="min-w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 font-bold">
          1
        </div>

        <div className="flex gap-4">
          <div>
            <label className="font-semibold text-gray-800">
              {t("vinRequest.modal.form.vin.label")}
            </label>

            <input
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none text-[#33333f]"
              placeholder={t("vinRequest.modal.form.vin.placeholder")}
              {...register("vin", { minLength: 17 })}
            />
            {errors.vin && (
              <p className="text-red-500 text-sm mt-1">
                {t("vinRequest.modal.form.vin.error")}
              </p>
            )}
          </div>
          <div>
            <span className="block text-sm text-gray-500 my-1">
              {t("vinRequest.modal.form.plate.label")}
            </span>

            <input
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none text-[#33333f]"
              placeholder={t("vinRequest.modal.form.plate.placeholder")}
              {...register("plate")}
              />
          </div>
        </div>
      </div>

      {/* 2 */}
      <div className="flex gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 font-bold">
          2
        </div>

        <div className="flex-1">
          <label className="font-semibold text-gray-800">
            {t("vinRequest.modal.form.phone.label")}
          </label>
{/* todo доделать валидацію */}
          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="+{38} (000) 000-00-00"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none text-[#33333f]"
                placeholder={t("vinRequest.modal.form.phone.placeholder")}

              />
            )}
          />
          
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {t("vinRequest.modal.form.phone.error")}
            </p>
          )}
        </div>
      </div>

      {/* 3 */}
      <div className="flex gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 font-bold">
          3
        </div>

        <div className="flex-1">
          <label className="font-semibold text-gray-800">
            {t("vinRequest.modal.form.suggestions.label")}
          </label>

          <textarea
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none min-h-[80px] text-[#33333f]"
            placeholder={t("vinRequest.modal.form.suggestions.placeholder")}
            {...register("parts", { required: true })}
          />
          {errors.parts && (
            <p className="text-red-500 text-sm mt-1">
              {t("vinRequest.modal.form.suggestions.error")}
            </p>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 block w-full text-sm text-black cursor-pointer"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 rounded-lg max-h-40 object-cover"
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-pink-500 active:scale-95 hover:bg-pink-600 text-white py-2 rounded-md transition"
      >
        {t("vinRequest.modal.form.submitButton.title")}
      </button>
    </form>
  );
}