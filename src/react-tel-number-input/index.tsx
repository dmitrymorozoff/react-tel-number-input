import * as React from "react";
import "./style.scss";
import { CountrySelector } from "./components/country-selector";
import { Input } from "./components/input";
import { allCountries, Country } from "../assets/country-list";
import { getSortingCountries } from "../services/utils/get-sorting-countries";
import { useCallback, useState, useEffect } from "react";
import { isEmpty } from "../services/utils/isEmpty";
import {
    CountryCallingCode,
    E164Number,
    NationalNumber,
} from "libphonenumber-js";

export interface PhoneNumber {
    targetValue: string;
    countryCallingCode?: CountryCallingCode;
    formattedNumber?: E164Number;
    nationalNumber?: NationalNumber;
    isValid?: boolean;
    formatInternational?: string;
    formatNational?: string;
    uri?: string;
    e164?: string;
}

export type OnChangeInput = (value: PhoneNumber | undefined) => void;

export type OnChangeCountry = (value: Country) => void;

export interface Payload {
    country: Country | undefined;
    phoneNumber: PhoneNumber | undefined;
}

interface Props {
    autoFocus?: boolean;
    customAllCountries?: Country[];
    defaultCountry?: string;
    disableExamplePlaceholder?: boolean;
    disabled?: boolean;
    disabledInput?: boolean;
    disabledSelector?: boolean;
    emojiFlags?: boolean;
    excludeMasks?: string[];
    ignoredCountries?: string[];
    onChange?: (value: Payload) => void;
    onPhoneInputChange?: (value: Payload) => void;
    onSelectCountry?: (value: Payload) => void;
    onlyCountries?: string[];
    placeholder?: string;
    preferredCountries?: string[];
    showCountryCodeInList?: boolean;
    showFlags?: boolean;
    showCountrySelectorFlag?: boolean;
    showCountrySelectorAlpha?: boolean;
    showMask?: boolean;
    clearable?: boolean;
    value?: Payload;
}

export const PhoneInput: React.FC<Props> = ({
    autoFocus = false,
    customAllCountries,
    defaultCountry = "ru",
    disableExamplePlaceholder = false,
    disabled = false,
    disabledInput = false,
    disabledSelector = false,
    emojiFlags = false,
    excludeMasks = [],
    ignoredCountries = [],
    onChange,
    onPhoneInputChange,
    onSelectCountry,
    onlyCountries = [],
    placeholder = "",
    preferredCountries = [],
    showCountryCodeInList = true,
    showFlags = true,
    showMask = true,
    showCountrySelectorFlag = true,
    showCountrySelectorAlpha = true,
    clearable = true,
    value,
}: Props) => {
    const phoneInputRef = React.useRef<HTMLInputElement>(null);
    const sortedCountries = getSortingCountries({
        allCountries: isEmpty(customAllCountries)
            ? allCountries
            : (customAllCountries as Country[]),
        ignoredCountries,
        onlyCountries,
        preferredCountries,
    });

    const initialSelectedCountry =
        value?.country ||
        sortedCountries.find(
            country => country.alpha2 === defaultCountry.toUpperCase(),
        ) ||
        sortedCountries[0];

    const [selectedCountry, setSelectedCountry] = React.useState<Country>(
        initialSelectedCountry,
    );

    const [payload, setPayload] = useState<Payload>({
        country: selectedCountry,
        phoneNumber: value?.phoneNumber || undefined,
    });

    const onChangeCountry: OnChangeCountry = value => {
        setSelectedCountry(value);
        setPayload(prev => {
            const newPayload = {
                ...prev,
                country: value,
            };
            if (onSelectCountry) {
                onSelectCountry(newPayload);
            }
            return newPayload;
        });
    };

    const onChangeInput: OnChangeInput = useCallback(
        value => {
            setPayload(prev => {
                const newPayload = {
                    ...prev,
                    phoneNumber: value,
                };
                if (onPhoneInputChange) {
                    onPhoneInputChange(newPayload);
                }
                return newPayload;
            });
        },
        [payload],
    );

    useEffect(() => {
        if (onChange) {
            onChange(payload);
        }
    }, [payload]);

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
                    showCountrySelectorFlag={showCountrySelectorFlag}
                    showCountrySelectorAlpha={showCountrySelectorAlpha}
                />
            </div>
            <div className="phone-input-container">
                <Input
                    excludeMasks={excludeMasks}
                    showMask={showMask}
                    autoFocus={autoFocus}
                    selectedCountry={selectedCountry}
                    phoneInputRef={phoneInputRef}
                    placeholder={placeholder}
                    onChangeInput={onChangeInput}
                    disableExamplePlaceholder={disableExamplePlaceholder}
                    disabled={disabled}
                    disabledInput={disabledInput}
                    value={value}
                    clearable={clearable}
                />
            </div>
        </div>
    );
};
