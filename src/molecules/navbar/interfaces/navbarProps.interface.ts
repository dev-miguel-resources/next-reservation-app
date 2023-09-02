import { User } from "@prisma/client";

export interface NavbarProps {
	currentUser?: User | null;
}
