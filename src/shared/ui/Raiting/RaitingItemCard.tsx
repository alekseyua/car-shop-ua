import React from 'react';

interface RaitingItemCardProps {
  count: number;
}

const RaitingItemCard: React.FC<RaitingItemCardProps> = ({count}) => {

  return (
    <div className="flex items-center justify-center text-lg">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={index < count ? 'text-yellow-400' : 'text-gray-400'}
        >
          {index < count ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}

export default RaitingItemCard