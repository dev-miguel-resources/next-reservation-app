"use client";

import Image from "next/image"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import HeartButton from "@atoms/buttons/HeartButton";

import useCountries from "@custom-hooks/useCountries";
import { IListingCardsProps } from "./interfaces/ListingCardProps.interface";

const ListingCard: React.FC<IListingCardsProps> = ({
	data,
	currentUser,
	actionId= ""
}) => {
  return (
	 <div>
		Hello am ListingCard!
	 </div>
  )
}

export default ListingCard
