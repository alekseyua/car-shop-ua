import { useState } from "react";
import { CategoryAccessories } from "../model/accessories.type";
import { scrollToTop } from "@/src/shared/libs/helpers";

interface IProps {
  item: CategoryAccessories;
  handleFetchDataAccessories: (id: number) => void;
}
export const CardAccessories = ({ item, handleFetchDataAccessories }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.childElements?.length > 0;

  return (
    <div>
      {/* search accessories */}

      {/* catalog */}
      <div className="flex items-center gap-2 py-2">
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-6 w-6 items-center justify-center"
            aria-label={isOpen ? "Свернуть" : "Развернуть"}
          >
            <span
              className={`transition-transform hover:cursor-pointer hover:text-gray-500 ${isOpen ? "rotate-90" : ""}`}
            >
              ▶
            </span>
          </button>
        ) : (
          <span className="h-6 w-6" />
        )}

        {/* {item.img && (
          <Image
            src={"https://img2.ad.ua/imgs/" + item.img}
            alt=""
            className="h-8 w-8 rounded object-cover w-[15px] h-[15px]"
            width={15}
            height={15}
          />
        )} */}
        <button onClick={() => {
          if(hasChildren){
            setIsOpen((prev) => !prev)
          } else {
            handleFetchDataAccessories(item.id);
            scrollToTop();
          } 
        }}>
          <span
            className={`text-sm block text-start hover:cursor-pointer hover:text-gray-500`}
          >
            {item.title}
          </span>
        </button>
      </div>
      {hasChildren && isOpen && (
        <div className="ml-6 border-l pl-3">
          {item.childElements.map((child) => (
            <CardAccessories key={child.id} item={child} handleFetchDataAccessories={handleFetchDataAccessories} />
          ))}
        </div>
      )}
    </div>
  );
}
