"use client";

import Image from "next/image";

import Heading from "@atoms/heading/Heading";
import HeartButton from "@atoms/buttons/HeartButton";

import useCountries from "@custom-hooks/useCountries";
import { SafeUser } from "@molecules/types";

interface ListingHeadProps {
	title: string;
	locationValue: string;
	imageSrc: string;
	id: string;
	currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, locationValue, imageSrc, id, currentUser }) => {

	const { getCountryByValue } = useCountries();

	const location = getCountryByValue(locationValue);

	return (
	 <>
	 	<Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
		<div
			className="
				w-full
				h-[60vh]
				overflow-hidden
				rounded-xl
				relative
			"
		>
			<Image src={imageSrc} fill className="object-cover w-full" alt="Image" />
			<div
				className="
					absolute
					top-5
					right-5
				"
			>

				<HeartButton listingId={id} currentUser={currentUser} />
			</div>
		</div>
	 </>
  )
}

export default ListingHead
