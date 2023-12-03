import { ICountrySelectValue } from "./countrySelectValue.interface";

export interface ICountryHandlerSelectProps {
	value?: ICountrySelectValue;
	onChange: (value: ICountrySelectValue) => void;
}
