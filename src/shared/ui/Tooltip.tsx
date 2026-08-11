'use client';

import React from 'react';

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
}

const Tooltip = ({ children, content }: TooltipProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const tooltipRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            ref={tooltipRef}
            className="group relative inline-flex"
        >
            <button
                type="button"
                aria-label="Дополнительная информация"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-help"
            >
                {children}
            </button>

            <div
                className={`
                    absolute
                    left-1/2
                    top-full
                    z-50
                    mt-2
                    w-[280px]
                    max-w-[calc(100vw-32px)]
                    -translate-x-1/2
                    rounded-lg
                    bg-white
                    px-3
                    py-2
                    text-xs
                    font-normal
                    leading-5
                    text-[#555]
                    shadow-lg
                    transition-all
                    duration-200

                    opacity-0
                    pointer-events-none

                    md:group-hover:opacity-100
                    md:group-hover:pointer-events-auto

                    ${isOpen
                        ? 'opacity-100 pointer-events-auto'
                        : ''
                    }
                `}
            >
                {content}
            </div>
        </div>
    );
};

export default Tooltip;