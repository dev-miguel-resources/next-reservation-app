import { IconType } from "react-icons"

export interface CategoryInputProps {
	icon: IconType;
	label: string;
	selected?: boolean;
	onClick: (value: string) => void;
}
