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
	 <div>
		Hello am EmptyState!
	 </div>
  )
}

export default EmptyState
