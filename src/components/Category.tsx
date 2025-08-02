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
  const [isSelected, setIsSelected] = useState<CategoryItem | "전체">("전체");
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
          className={`w-auto h-9 rounded-sm py-1 px-6 border-1 border-[#E3E3E3] ${
            isSelected !== "전체" && isSelected.item === item.item
              ? "bg-[#3A3A3A] text-white"
              : "bg-white text-[#3A3A3A]"
          }`}
        >
          {item.item}
        </div>
      ))}
    </div>
  );
}
