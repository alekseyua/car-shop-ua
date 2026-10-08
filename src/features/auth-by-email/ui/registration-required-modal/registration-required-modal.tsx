"use client";

import useModal from "@/src/hooks/use-modal";
import { useRouter } from "@/src/i18n/navigation";

export const RegistrationRequiredModal = () => {
  const router = useRouter();
  const closeModal = useModal((s) => s.closeModal);

  const handleAuth = () => {
    closeModal();
    router.push("/login");
  };

  return (
    <div className="w-full rounded-2xl p-6">
      <div className="flex flex-col w-full items-center justify-center text-center max-w-xl m-[0_auto]">
        {/* Icon */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-700"
          >
            <path
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M4.5 20C5.3 16.7 8.1 14.5 12 14.5C15.9 14.5 18.7 16.7 19.5 20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold leading-6 text-gray-900">
          Необхідна авторизація
        </h2>

        {/* Description */}
        <p className="mt-3 max-w-[340px] text-sm leading-5 text-gray-500">
          Для виконання цієї дії необхідно увійти в обліковий запис.
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={handleAuth}
          className="
            mt-6
            w-full
            rounded-xl
            bg-black
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-gray-800
            active:scale-[0.98]
            focus:outline-none
            focus:ring-2
            focus:ring-gray-300
            cursor-pointer
          "
        >
          Увійти
        </button>

        {/* Cancel */}
        <button
          type="button"
          onClick={closeModal}
          className="
            mt-3
            text-sm
            font-medium
            text-gray-500
            transition
            hover:text-gray-900
            cursor-pointer

          "
        >
          Скасувати
        </button>
      </div>
    </div>
  );
};
