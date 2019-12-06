import * as React from "react";
import cx from "classnames";
import "./style.scss";
import { useOnClickOutside } from "../../../services/hooks/use-on-click-outside";
import { Country } from "../../../assets/country-list";
import "../../../assets/flags/flags.scss";
import { ListItem } from "./list-item";
import { KeyCode } from "../../../services/variables";
import { Flag } from "./flag";
import { scrollTo } from "../../../services/utils/scroll-to";
import { useEffect, useState } from "react";
import { RefObject } from "react";
import { OnChangeCountry } from "../../index";
import { getSelectedCountryIndex } from "../../../services/utils/get-selected-country-index";
import { getHighlightCountryIndex } from "../../../services/utils/get-highlight-country-index";

interface Props {
    phoneInputRef: RefObject<HTMLInputElement>;
    countries: Country[];
    selectedCountry: Country;
    setSelectedCountry: (
        value: ((prevState: Country) => Country) | Country,
    ) => void;
    disabled: boolean;
    showFlags: boolean;
    showCountryCodeInList: boolean;
    emojiFlags: boolean;
    onChangeCountry: OnChangeCountry;
}

export const CountrySelector: React.FC<Props> = React.memo(
    ({
        countries,
        selectedCountry,
        showCountryCodeInList = true,
        setSelectedCountry,
        showFlags,
        emojiFlags,
        phoneInputRef,
        onChangeCountry,
    }: Props) => {
        const [selectedCountryIndex, setSelectedCountryIndex] = useState(
            getSelectedCountryIndex(countries, selectedCountry),
        );
        const countryItemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
        const countryInputRef = React.useRef<HTMLInputElement>(null);
        const countryListRef = React.useRef<HTMLDivElement>(null);
        const countrySelectorRef = React.useRef<HTMLDivElement>(null);
        const [isFocus, setFocus] = React.useState<boolean>(false);

        const onFocusHandler = (): void => {
            setFocus(true);
        };

        useEffect(() => {
            if (isFocus) {
                scrollTo(
                    countryListRef,
                    countryItemRefs.current[selectedCountryIndex],
                );
            }
        }, [isFocus, selectedCountryIndex]);

        const move = (direction: -1 | 1): void => {
            const newSelectedCountryIndex = getHighlightCountryIndex(
                direction,
                selectedCountryIndex,
                countries,
            );
            setSelectedCountryIndex(newSelectedCountryIndex);
        };

        const closeListHandler = (): void => {
            setFocus(false);
            setSelectedCountryIndex(
                getSelectedCountryIndex(countries, selectedCountry),
            );
            // phoneInputRef.current?.focus();
        };

        const updateValue = (country: Country): void => {
            countryInputRef.current?.blur();
            setSelectedCountry(country);
            onChangeCountry(country);
            closeListHandler();
            setSelectedCountryIndex(
                getSelectedCountryIndex(countries, country),
            );
        };

        const keyDownHandler = (
            event: React.KeyboardEvent<HTMLDivElement>,
        ): void => {
            const code = event.which;
            event.preventDefault();
            
            if (code === KeyCode.Up) {
                move(-1);
            }
            if (code === KeyCode.Down) {
                move(1);
            }
            if (code === KeyCode.Escape) {
                closeListHandler();
            }
            if (code === KeyCode.Tab) {
                if (isFocus) {
                    closeListHandler();
                }
            }
        };

        useOnClickOutside({
            ref: countrySelectorRef,
            handler: () => closeListHandler(),
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
                    {showFlags && (
                        <div className={"country-selector__flag"}>
                            <Flag
                                emojiFlags={emojiFlags}
                                country={selectedCountry}
                            />
                        </div>
                    )}
                    <input
                        ref={countryInputRef}
                        value={selectedCountry.alpha2}
                        type="text"
                        className={cx("country-selector__input", {
                            "country-selector__input--is-focus": isFocus,
                        })}
                        onFocus={onFocusHandler}
                        readOnly={true}
                    />
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
                    {countries.map((country, index) => (
                        <ListItem
                            countryItemRefs={countryItemRefs}
                            country={country}
                            key={`${country.alpha2 + index}`}
                            onClick={updateValue}
                            showCountryCodeInList={showCountryCodeInList}
                            emojiFlags={emojiFlags}
                            showFlags={showFlags}
                            selectedCountryIndex={selectedCountryIndex}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        );
    },
);
