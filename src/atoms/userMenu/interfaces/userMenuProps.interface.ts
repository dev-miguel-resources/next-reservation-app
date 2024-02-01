import { User } from "@prisma/client";
import { SafeUser } from "@molecules/types";

export interface UserMenuProps {
	currentUser?: SafeUser | null;
}
