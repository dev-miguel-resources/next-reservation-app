import { User } from "@prisma/client";

export interface UserMenuProps {
	currentUser?: User | null;
}
