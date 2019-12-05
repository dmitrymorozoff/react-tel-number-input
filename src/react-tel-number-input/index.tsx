import React = require("react");
import "./style.scss";
import { CountrySelector } from "./components/country-selector";
import { Input } from "./components/input";
import { allCountries, Country } from "../assets/country-list";
import { getSortingCountries } from "../services/utils/get-sorting-countries";

interface Props {
    customAllCountries: Country[];
    defaultCountry: string;
    disabled: boolean;
    ignoredCountries: string[];
    onlyCountries: string[];
    preferredCountries: string[];
    showFlags: boolean;
    showCountryCodeInList: boolean;
    emojiFlags: boolean;
}

export const PhoneInput: React.FC<Props> = ({
    defaultCountry = "ru",
    disabled,
    ignoredCountries,
    onlyCountries,
    preferredCountries,
    showFlags = true,
    showCountryCodeInList = true,
    emojiFlags = true,
}: Props) => {
    const sortedCountries = getSortingCountries({
        allCountries,
        ignoredCountries,
        onlyCountries,
        preferredCountries,
    });

    const initialSelectedCountry =
        sortedCountries.find(
            country => country.alpha2 === defaultCountry.toUpperCase(),
        ) || sortedCountries[0];

    const [selectedCountry, setSelectedCountry] = React.useState<Country>(
        initialSelectedCountry,
    );

    return (
        <div className="react-tel-number-input">
            <div className="select-country-container">
                <CountrySelector
                    countries={sortedCountries}
                    disabled={disabled}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    showFlags={showFlags}
                    showCountryCodeInList={showCountryCodeInList}
                    emojiFlags={emojiFlags}
                />
            </div>
            <div className="phone-input-container">
                <Input selectedCountry={selectedCountry} />
            </div>
        </div>
    );
};
