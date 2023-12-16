import { SafeListing, SafeReservation, SafeUser } from "@molecules/types";

export interface IListingCardsProps {
	data: SafeListing;
	reservation?: SafeReservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: SafeUser | null;
}
