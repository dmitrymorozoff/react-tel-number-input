import * as React from "react";
import cx from "classnames";
import "./style.scss";
import { useOnClickOutside } from "../../../services/hooks/use-on-click-outside";
import { Country } from "../../../assets/country-list";
import { getSortingCountries } from "../../../services/utils/sorting-countries";
import "../../../assets/flags/flags.scss";
import { ListItem } from "./list-item";

interface Props {
    allCountries: Country[];
    defaultCountry: string;
    disabled: boolean;
    ignoredCountries: string[];
    onlyCountries: string[];
    preferredCountries: string[];
    showFlags: boolean;
    showCountryCodeInList: boolean;
}

export const CountrySelector: React.FC<Props> = React.memo(
    ({
        allCountries,
        ignoredCountries,
        onlyCountries,
        preferredCountries,
        showCountryCodeInList = true,
        defaultCountry = "ru",
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

        const countrySelectorRef = React.useRef<HTMLInputElement>(null);
        const [isFocus, setFocus] = React.useState<boolean>(false);
        const [selectedCountry, setSelectedCountry] = React.useState<Country>(
            initialSelectedCountry,
        );

        const onFocusHandler = (): void => {
            setFocus(true);
        };

        const onBlurHandler = (): void => {
            setFocus(false);
        };

        useOnClickOutside({
            ref: countrySelectorRef,
            handler: () => onBlurHandler(),
        });

        const closeListHandler = (): void => {
            setFocus(false);
        };

        const updateValue = (country: Country): void => {
            closeListHandler();
            setSelectedCountry(country);
        };

        console.log("selectedCountry", selectedCountry);

        return (
            <div
                ref={countrySelectorRef}
                className={cx("country-selector", {
                    "country-selector--is-focus": isFocus,
                })}
                onClick={onFocusHandler}
            >
                <div className={"country-selector__flag"}>
                    <div
                        className={`iti__flag iti__${selectedCountry.alpha2.toLowerCase()}`}
                    />
                </div>
                <input
                    value={selectedCountry.countryCallingCodes[0]}
                    type="text"
                    className={cx("country-selector__input", {
                        "country-selector__input--is-focus": isFocus,
                    })}
                    onFocus={onFocusHandler}
                    // onBlur={onBlurHandler}
                    readOnly={true}
                ></input>
                <div
                    className={cx("country-selector-toggle", {
                        "country-selector-toggle--is-focus": isFocus,
                    })}
                >
                    <div className="country-selector-toggle__arrow">▼</div>
                </div>
                <div
                    className={cx("country-selector-list", {
                        "country-selector-list--is-focus": isFocus,
                    })}
                >
                    {sortedCountries.map((country, index) => (
                        <ListItem
                            country={country}
                            key={`${country.alpha2 + index}`}
                            onClick={updateValue}
                            showCountryCodeInList={showCountryCodeInList}
                        />
                    ))}
                </div>
            </div>
        );
    },
);
