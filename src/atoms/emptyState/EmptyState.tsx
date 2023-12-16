"use client";

import { useRouter } from "next/navigation";

import Button from "@atoms/buttons/Button"
import Heading from "@atoms/heading/Heading";

import { EmptyStateProps } from "./interfaces/EmptySateProps.interface";

const EmptyState: React.FC<EmptyStateProps> = ({
	title = "No existen resultados",
	subtitle = "Intenta cambiando o removiendo algunos filtros.",
	showReset
}) => {

	const router = useRouter();

  return (
	 <div
	 	className="
			h-[60vh]
			flex
			flex-col
			gap-2
			justify-center
			items-center
		"
	 >
		<Heading center title={title} subtitle={subtitle} />
		<div className="w-48 mt-4">
			{showReset && <Button outline label="Elimina todos los filtros" onClick={() => router.push("/")} />}
		</div>
	 </div>
  )
}

export default EmptyState
