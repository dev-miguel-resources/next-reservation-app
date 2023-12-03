"use client";

import Select from "react-select";
import useCountries from "@custom-hooks/useCountries";
import { ICountrySelectValue } from "@atoms/inputs/interfaces/countrySelectValue.interface";
import { ICountryHandlerSelectProps } from "./interfaces/countryHandlerSelectProps.interface";

const CountrySelect: React.FC<ICountryHandlerSelectProps> = ({ value, onChange }) => {
  const { getAllCountries } = useCountries();

  return (
	<div>
	  <Select
		 placeholder="En cualquier lugar"
		 isClearable
		 options={getAllCountries()}
		 value={value}
		 onChange={value => onChange(value as ICountrySelectValue)}
		 formatOptionLabel={(option: any) => (
			<div
			  className="
			flex flex-row items-center gap-3"
			>
			  <div>{option.flag}</div>
			  <div>
				 {option.label},<span className="text-neutral-500 ml-1">{option.region}</span>
			  </div>
			</div>
		 )}
		 classNames={{
			control: () => "p-3 border-2",
			input: () => "text-lg",
			option: () => "text-lg",
		 }}
		 theme={theme => ({
			...theme,
			borderRadius: 6,
			colors: {
			  ...theme.colors,
			  primary: "black",
			  primary25: "#ffe4e6",
			},
		 })}
	  />
	</div>
 );
};

export default CountrySelect;
