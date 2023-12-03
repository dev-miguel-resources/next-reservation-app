import { User } from "@prisma/client";
import { SafeUser } from "@atoms/types";

export interface NavbarProps {
	currentUser?: SafeUser | null;
}
