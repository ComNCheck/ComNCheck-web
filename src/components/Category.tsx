import { useState } from "react";

interface CategoryItem {
  item: string;
  sort: string;
}
interface CategoryProps {
  categoryList: CategoryItem[];
  onSelect: (selectedItem: string) => void;
}
export default function Category({ categoryList, onSelect }: CategoryProps) {
  const [isSelected, setIsSelected] = useState<CategoryItem>(categoryList[0]);

  const handleClick = (item: CategoryItem) => {
    setIsSelected(item);
    onSelect(item.item);
  };
  return (
    <div className="flex gap-2">
      {categoryList.map((item, idx) => (
        <div
          key={idx}
          onClick={() => handleClick(item)}
          className={`flex items-center justify-center px-2 h-9 rounded-sm text-center cursor-pointer border-1 border-[#E3E3E3] ${
            isSelected.item === item.item
              ? "bg-[#3A3A3A] text-white"
              : "bg-white text-[#3A3A3A] hover:bg-gray-100"
          }`}
        >
          {item.item}
        </div>
      ))}
    </div>
  );
}
