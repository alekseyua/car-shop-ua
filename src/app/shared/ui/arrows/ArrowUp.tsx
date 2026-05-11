import React from "react"

export const ArrowUp: React.FC = () => {
    return (
        <div
            className="absolute top-0 z-999 left-2 w-0 h-0
  border-l-[10px] border-l-transparent
  border-r-[10px] border-r-transparent
  border-b-[13px] border-b-red-500"
        >
            <div
                className="absolute top-[2px] left-[-8px] w-0 h-0
    border-l-[8px] border-l-transparent
    border-r-[8px] border-r-transparent
    border-b-[12px] border-b-white"
            />
        </div>
    )
}