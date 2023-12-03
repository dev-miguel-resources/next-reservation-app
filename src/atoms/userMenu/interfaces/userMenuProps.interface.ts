import { User } from "@prisma/client";
import { SafeUser } from "@atoms/types";

export interface UserMenuProps {
	currentUser?: SafeUser | null;
}
