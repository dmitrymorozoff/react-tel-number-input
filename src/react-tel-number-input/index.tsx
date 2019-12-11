import React = require("react");
import "./style.scss";
import { CountrySelector } from "./components/country-selector";
import { Input } from "./components/input";
import { allCountries, Country } from "../assets/country-list";
import { getSortingCountries } from "../services/utils/get-sorting-countries";
import { ChangeEvent, useCallback, useState } from "react";
import { isEmpty } from "../services/utils/isEmpty";
import { PhoneNumber } from "libphonenumber-js";

type InputPhoneNumber = {
    parsedPhoneNumber: PhoneNumber | undefined;
    targetValue: string;
};

export type OnChangeInput = (
    value: InputPhoneNumber,
    event: ChangeEvent<HTMLInputElement>,
) => void;

export type OnChangeCountry = (value: Country) => void;

export interface Payload {
    country: Country | undefined;
    phoneNumber: InputPhoneNumber | undefined;
}

interface Props {
    customAllCountries: Country[];
    defaultCountry: string;
    disabled: boolean;
    disabledSelector: boolean;
    disabledInput: boolean;
    ignoredCountries: string[];
    onlyCountries: string[];
    preferredCountries: string[];
    showFlags: boolean;
    showCountryCodeInList: boolean;
    emojiFlags: boolean;
    placeholder: string;
    onChange: () => void;
    disableExamplePlaceholder: boolean;
    autoFocus: boolean;
}

export const PhoneInput: React.FC<Props> = ({
    customAllCountries,
    defaultCountry = "ru",
    disabled = false,
    disabledSelector = false,
    disabledInput = false,
    ignoredCountries = [],
    onlyCountries = [],
    preferredCountries = [],
    showFlags = true,
    showCountryCodeInList = true,
    emojiFlags = true,
    placeholder = "",
    onChange,
    disableExamplePlaceholder = false,
    autoFocus = false,
}: Props) => {
    const phoneInputRef = React.useRef<HTMLInputElement>(null);
    const sortedCountries = getSortingCountries({
        allCountries: isEmpty(customAllCountries)
            ? allCountries
            : customAllCountries,
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

    const [payload, setPayload] = useState<Payload>({
        country: selectedCountry,
        phoneNumber: undefined,
    });

    const onChangeCountry: OnChangeCountry = value => {
        setSelectedCountry(value);
        setPayload({
            ...payload,
            country: value,
        });
    };

    const onChangeInput: OnChangeInput = useCallback(
        (value, event) => {
            setPayload({
                ...payload,
                phoneNumber: value,
            });
        },
        [payload],
    );

    console.log("payload", payload);

    return (
        <div className="react-tel-number-input">
            <div className="select-country-container">
                <CountrySelector
                    countries={sortedCountries}
                    disabled={disabled}
                    disabledSelector={disabledSelector}
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
                    autoFocus={autoFocus}
                    selectedCountry={selectedCountry}
                    phoneInputRef={phoneInputRef}
                    placeholder={placeholder}
                    onChangeInput={onChangeInput}
                    disableExamplePlaceholder={disableExamplePlaceholder}
                    disabled={disabled}
                    disabledInput={disabledInput}
                />
            </div>
        </div>
    );
};
