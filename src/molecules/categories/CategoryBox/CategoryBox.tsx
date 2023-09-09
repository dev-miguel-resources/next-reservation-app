"use client";

import { CategoryBoxProps } from "./interfaces/categoryBox.interface";

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {

  return (
    <div
      className={`
			flex
			flex-col
			items-center
			justify-center
			gap-2
			p-3
			border-b-2
			hover:text-neutral-800
			transition
			cursor-pointer
 		`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
