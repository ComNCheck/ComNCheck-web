import { useState, useEffect } from "react";

interface CategoryItem {
  item: string;
  sort: string;
}
interface CategoryProps {
  categoryList: CategoryItem[];
  onSelect: (selectedItem: string) => void;
  selectedCategory?: string;
}
export default function Category({ categoryList, onSelect, selectedCategory }: CategoryProps) {
  const [isSelected, setIsSelected] = useState<CategoryItem>(categoryList[0]);

  // 외부에서 선택된 카테고리가 있으면 해당 카테고리로 설정
  useEffect(() => {
    if (selectedCategory) {
      const foundCategory = categoryList.find(cat => cat.item === selectedCategory);
      if (foundCategory) {
        setIsSelected(foundCategory);
      }
    }
  }, [selectedCategory, categoryList]);

  const handleClick = (item: CategoryItem) => {
    setIsSelected(item);
    // sort 값이 있고 유효한 영문 enum 값이면 영문을 전달, 아니면 한글 문자열 전달
    const isValidEnum = item.sort && item.sort !== item.item && !item.sort.includes("별");
    onSelect(isValidEnum ? item.sort : item.item);
  };
  return (
    <div className="flex flex-wrap gap-2">
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
