"use client";

import { useCallback } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { UpdatedQuery } from "./interfaces/updatedQuery.interface";
import { CategoryBoxProps } from "./interfaces/categoryBox.interface";

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString()); // capturar los parámetros como un objeto de string params
    }

    const updatedQuery: UpdatedQuery = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category; // remover la categoria a si misma cuando ya ha sido obtenida anteriormente
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }, // verificar llaves nulas o inexistentes
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
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
			 ${selected ? "border-b-neutral-800" : "border-transparent"}
			 ${selected ? "text-neutral-800" : "text-neutral-500"}
		  `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
