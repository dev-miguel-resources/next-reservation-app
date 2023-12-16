import { SafeUser } from "@molecules/types";

export interface IUseFavorite {
	listingId: string;
	currentUser?: SafeUser | null;
}
