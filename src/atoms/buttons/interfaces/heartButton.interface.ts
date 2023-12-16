import { SafeUser } from "@molecules/types";

export interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}
