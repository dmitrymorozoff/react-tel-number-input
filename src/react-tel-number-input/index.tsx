import React = require("react");
import "./style.scss";
import { CountrySelector } from "./components/country-selector";
import { Input } from "./components/input";
import { allCountries, Country } from "../assets/country-list";
import { getSortingCountries } from "../services/utils/get-sorting-countries";
import { ChangeEvent, useState } from "react";

export type OnChangeInput = (
    value: string,
    event: ChangeEvent<HTMLInputElement>,
) => void;

export type OnChangeCountry = (value: Country) => void;

export interface Payload {
    country: Country;
}

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
    placeholder: string;
    onChange: () => void;
    disableExamplePlaceholder: boolean;
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
    placeholder,
    onChange,
    disableExamplePlaceholder = false,
}: Props) => {
    const phoneInputRef = React.useRef<HTMLInputElement>(null);
    const sortedCountries = getSortingCountries({
        allCountries,
        ignoredCountries,
        onlyCountries,
        preferredCountries,
    });

    const [payload, setPayload] = useState<Payload>();

    const initialSelectedCountry =
        sortedCountries.find(
            country => country.alpha2 === defaultCountry.toUpperCase(),
        ) || sortedCountries[0];

    const [selectedCountry, setSelectedCountry] = React.useState<Country>(
        initialSelectedCountry,
    );

    const onChangeCountry: OnChangeCountry = value => {
        console.log("change country", value);
        setPayload({
            country: value,
        });
    };

    const onChangeInput: OnChangeInput = (value, event) => {
        console.log("change input", value, event);
    };

    console.log("payload", payload);

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
                    phoneInputRef={phoneInputRef}
                    onChangeCountry={onChangeCountry}
                />
            </div>
            <div className="phone-input-container">
                <Input
                    selectedCountry={selectedCountry}
                    phoneInputRef={phoneInputRef}
                    placeholder={placeholder}
                    onChangeInput={onChangeInput}
                    disableExamplePlaceholder={disableExamplePlaceholder}
                />
            </div>
        </div>
    );
};
