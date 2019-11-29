import React = require("react");
import "./style.scss";
import { CountrySelector } from "./components/country-selector";
import { Input } from "./components/input";
import { allCountries, Country } from "../assets/country-list";

interface Props {
    customAllCountries: Country[];
    defaultCountry: string;
    disabled: boolean;
    ignoredCountries: string[];
    onlyCountries: string[];
    preferredCountries: string[];
    showFlags: boolean;
}

export const PhoneInput: React.FC<Props> = ({
    defaultCountry,
    disabled,
    ignoredCountries,
    onlyCountries,
    preferredCountries,
    showFlags,
}: Props) => {
    return (
        <div className="react-tel-number-input">
            <div className="select-country-container">
                <CountrySelector
                    allCountries={allCountries}
                    defaultCountry={defaultCountry}
                    disabled={disabled}
                    onlyCountries={["ru", "us"]}
                    preferredCountries={["us", "ru"]}
                    showFlags={showFlags}
                />
            </div>
            <div className="phone-input-container">
                <Input />
            </div>
        </div>
    );
};
