'use client';

import { useState } from 'react';

type QuantityProps = {
    initialValue?: number;
    onChange?: (value: number) => void;
};

export default function QuantitySelector({
    initialValue = 1,
    onChange,
}: QuantityProps) {
    const [count, setCount] = useState(initialValue);

    const decrease = () => {
        if (count > 1) {
            const newValue = count - 1;
            setCount(newValue);
            onChange?.(newValue);
        }
    };

    const increase = () => {
        const newValue = count + 1;
        setCount(newValue);
        onChange?.(newValue);
    };

    return (
        <div className="flex items-center border rounded-md w-full">
            <button
                type="button"
                onClick={decrease}
                className="px-3 py-1 border-r"
            >
                -
            </button>

            <span className="px-3 py-1 min-w-[40px] text-center">
                {count}
            </span>

            <button
                type="button"
                onClick={increase}
                className="px-3 py-1 border-l"
            >
                +
            </button>
        </div>
    );
}