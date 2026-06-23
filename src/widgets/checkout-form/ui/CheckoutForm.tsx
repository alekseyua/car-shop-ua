'use client';

import { useState } from "react";

export default function CheckoutForm() {
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [commentEnabled, setCommentEnabled] = useState(false);
    const [vinCheck, setVinCheck] = useState(false);
    const [comment, setComment] = useState("");

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl">
            {/* Контактні дані */}
            <h2 className="text-3xl font-bold mb-6 text-black">Контактні дані</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Мобільний телефон" />
                <Field label="Електронна пошта" type="email" />
                <Field label="Прізвище" />
                <Field label="Ім'я" />
                <Field label="По батькові" />
            </div>

            <div className="border-t my-8" />

            {/* Місто */}
            <h2 className="text-3xl font-bold mb-4 text-black">Виберіть своє місто</h2>

            <select className="w-full h-12 border rounded-lg px-4 text-gray-900 rounded-lg text-base block">
                <option>Кривий Ріг (Дніпропетровська обл.)</option>
                <option>Київ</option>
                <option>Львів</option>
                <option>Одеса</option>
            </select>

            <div className="border-t my-8" />

            {/* Доставка */}
            <h2 className="text-3xl font-bold mb-4 text-black">Доставка</h2>

            <div className="space-y-3">
                <DeliveryCard
                    checked={deliveryMethod === "warehouse"}
                    label='На склад «Нової Пошти»'
                    onClick={() => setDeliveryMethod("warehouse")}
                />

                <DeliveryCard
                    checked={deliveryMethod === "locker"}
                    label='На поштомат «Нової Пошти»'
                    onClick={() => setDeliveryMethod("locker")}
                />
            </div>

            {/* Коментар */}
            <div className="mt-6 border rounded-xl p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span>✏️</span>
                        <span className="font-semibold text-gray-900">
                            Коментар до замовлення
                        </span>
                    </div>

                    <Switch
                        checked={commentEnabled}
                        onChange={setCommentEnabled}
                    />
                </div>

                {commentEnabled && (
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full mt-4 min-h-[120px] border rounded-lg p-3 text-gray-900"
                        placeholder="Ваш коментар..."
                    />
                )}
            </div>

            {/* VIN */}
            <div className="mt-4 border rounded-xl p-5 bg-[#FFF1B8]">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span>ℹ️</span>

                        <span className="font-semibold text-gray-900">
                            Перевірити правильність підбору обраних
                            запчастин за VIN?
                        </span>
                    </div>

                    <Switch
                        checked={vinCheck}
                        onChange={setVinCheck}
                    />
                </div>
            </div>

            {vinCheck && (
                <input
                    type="text"
                    placeholder="Введіть VIN-код"
                    className="w-full mt-4 h-12 border rounded-lg px-4 text-gray-900"
                />
            )}

            {/* Submit */}
            <div className="mt-8">
                <button
                    className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                >
                    Замовлення підтверджую
                </button>
            </div>
        </div>
    );
}

interface FieldProps {
    label: string;
    type?: string;
}

function Field({
    label,
    type = "text",
}: FieldProps) {
    return (
        <div>
            <label className="block text-sm font-semibold mb-1 text-gray-900">
                {label}
            </label>

            <input
                type={type}
                className="text-gray-900 rounded-lg text-base block w-full px-2.5 py-1.5 border border-gray-300 focus:z-10 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
}

interface DeliveryCardProps {
    label: string;
    checked: boolean;
    onClick: () => void;
}

function DeliveryCard({
    label,
    checked,
    onClick,
}: DeliveryCardProps) {
    return (
        <label
            className={`
        flex items-center gap-4 p-5 rounded-xl border cursor-pointer text-gray-900
        transition
        ${checked
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }
      `}
        >
            <input
                type="radio"
                checked={checked}
                onChange={onClick}
                className="w-5 h-5"
            />

            <span className="font-semibold">
                {label}
            </span>
        </label>
    );
}

interface SwitchProps {
    checked: boolean;
    onChange: (value: boolean) => void;
}

function Switch({
    checked,
    onChange,
}: SwitchProps) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`
        relative w-12 h-7 rounded-full transition
        ${checked ? "bg-red-500" : "bg-gray-300"}
      `}
        >
            <span
                className={`
          absolute top-1 left-1
          w-5 h-5 rounded-full bg-white
          transition-transform
          ${checked ? "translate-x-5" : ""}
        `}
            />
        </button>
    );
}