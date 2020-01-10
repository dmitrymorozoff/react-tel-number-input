import * as React from "react";
import cx from "classnames";
import { useOnClickOutside } from "../../../services/hooks/use-on-click-outside";
import { Country } from "../../../assets/country-list";
import { ListItem } from "./list-item";
import { KeyCode } from "../../../services/variables";
import { Flag } from "./flag";
import { useCallback, useEffect, useState } from "react";
import { RefObject } from "react";
import { OnChangeCountry } from "../../index";
import { Utils } from "../../../services/utils";

interface Props {
    phoneInputRef: RefObject<HTMLInputElement>;
    countries: Country[];
    selectedCountry: Country;
    setSelectedCountry: (
        value: ((prevState: Country) => Country) | Country,
    ) => void;
    disabled: boolean;
    disabledSelector: boolean;
    showFlags: boolean;
    showCountryCodeInList: boolean;
    showCountrySelectorFlag: boolean;
    showCountrySelectorAlpha: boolean;
    emojiFlags: boolean;
    onChangeCountry: OnChangeCountry;
}

export const CountrySelector: React.FC<Props> = React.memo(
    ({
        countries,
        selectedCountry,
        showCountryCodeInList = true,
        showCountrySelectorFlag,
        showCountrySelectorAlpha,
        setSelectedCountry,
        showFlags,
        emojiFlags,
        phoneInputRef,
        onChangeCountry,
        disabled,
        disabledSelector,
    }: Props) => {
        const [query, setQuery] = useState("");
        const [selectedCountryIndex, setSelectedCountryIndex] = useState(
            Utils.getSelectedCountryIndex(countries, selectedCountry),
        );
        const countryItemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
        const countryInputRef = React.useRef<HTMLInputElement>(null);
        const countryListRef = React.useRef<HTMLDivElement>(null);
        const countrySelectorRef = React.useRef<HTMLDivElement>(null);
        const [isFocus, setFocus] = React.useState<boolean>(false);

        useEffect(() => {
            if (isFocus) {
                Utils.scrollTo(
                    countryListRef,
                    countryItemRefs.current[selectedCountryIndex],
                );
            }
        }, [isFocus, selectedCountryIndex]);

        const move = (direction: -1 | 1): void => {
            const newSelectedCountryIndex = Utils.getHighlightCountryIndex(
                direction,
                selectedCountryIndex,
                countries,
            );
            setSelectedCountryIndex(newSelectedCountryIndex);
        };

        const closeListHandler = useCallback(
            (newSelectedCountry: Country): void => {
                setFocus(false);
                setSelectedCountryIndex(
                    Utils.getSelectedCountryIndex(
                        countries,
                        newSelectedCountry || selectedCountry,
                    ),
                );
                phoneInputRef.current?.focus();
            },
            [],
        );

        const updateValue = (country: Country): void => {
            countryInputRef.current?.blur();
            setSelectedCountry(country || selectedCountry);
            onChangeCountry(country);
            closeListHandler(country);
        };

        const keyDownHandler = (
            event: React.KeyboardEvent<HTMLDivElement>,
        ): void => {
            let queryTimer;
            const code = event.which;

            if (queryTimer) {
                clearTimeout(queryTimer);
            }

            if (code === KeyCode.Up) {
                move(-1);
            }
            if (code === KeyCode.Down) {
                move(1);
            }
            if (code === KeyCode.Enter) {
                const newSelectedCountry = countries[selectedCountryIndex];
                setSelectedCountry(newSelectedCountry);
                closeListHandler(newSelectedCountry);
            }
            if (
                (code >= KeyCode.A && code <= KeyCode.Z) ||
                code === KeyCode.Space
            ) {
                const newQuery = query + String.fromCharCode(code);
                setQuery(newQuery);

                const searchedCountryIndex = Utils.getSearchCountryIndex(
                    countries,
                    newQuery,
                );

                if (searchedCountryIndex) {
                    setSelectedCountryIndex(searchedCountryIndex);
                    Utils.scrollTo(
                        countryListRef,
                        countryItemRefs.current[searchedCountryIndex],
                    );
                }

                queryTimer = setTimeout(() => {
                    setQuery("");
                }, 1000);
            }
            if (code === KeyCode.Escape) {
                closeListHandler(selectedCountry);
            }
            if (code === KeyCode.Tab) {
                setFocus(false);
            }
        };

        const onFocusHandler = (): void => {
            if (disabled || disabledSelector) {
                return;
            }
            setFocus(true);
        };

        const onBlurHandler = (): void => {
            setFocus(false);
        };

        useOnClickOutside({
            ref: countrySelectorRef,
            handler: onBlurHandler,
        });

        return (
            <div
                className="country-selector-wrapper"
                ref={countrySelectorRef}
                onKeyDown={keyDownHandler}
            >
                <div
                    className={cx("country-selector", {
                        "country-selector--is-focus": isFocus,
                    })}
                    tabIndex={0}
                    onClick={onFocusHandler}
                >
                    {showFlags && showCountrySelectorFlag && (
                        <div className={"country-selector__flag"}>
                            <Flag
                                emojiFlags={emojiFlags}
                                country={selectedCountry || null}
                            />
                        </div>
                    )}
                    {showCountrySelectorAlpha && (
                        <input
                            ref={countryInputRef}
                            value={
                                !Utils.isEmpty(selectedCountry)
                                    ? selectedCountry.alpha2
                                    : undefined
                            }
                            disabled={disabled || disabledSelector}
                            type="text"
                            className={cx("country-selector__input", {
                                "country-selector__input--is-focus": isFocus,
                            })}
                            onFocus={onFocusHandler}
                            readOnly={true}
                        />
                    )}
                    <div
                        className={cx("country-selector-toggle", {
                            "country-selector-toggle--is-focus": isFocus,
                        })}
                    >
                        <div className="country-selector-toggle__arrow">▼</div>
                    </div>
                </div>
                <div
                    ref={countryListRef}
                    className={cx("country-selector-list", {
                        "country-selector-list--is-focus": isFocus,
                    })}
                >
                    {countries.map((country, index) => {
                        const isSelected = index === selectedCountryIndex;

                        return (
                            <ListItem
                                countryItemRefs={countryItemRefs}
                                country={country}
                                key={`${country.alpha2}`}
                                onClick={updateValue}
                                showCountryCodeInList={showCountryCodeInList}
                                emojiFlags={emojiFlags}
                                showFlags={showFlags}
                                isSelected={isSelected}
                            />
                        );
                    })}
                </div>
            </div>
        );
    },
);
