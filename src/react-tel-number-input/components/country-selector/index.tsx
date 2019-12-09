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
import { useCallback, useEffect, useState } from "react";
import { RefObject } from "react";
import { OnChangeCountry } from "../../index";
import { getSelectedCountryIndex } from "../../../services/utils/get-selected-country-index";
import { getHighlightCountryIndex } from "../../../services/utils/get-highlight-country-index";
import { isEmpty } from "../../../services/utils/isEmpty";

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
        disabled,
        disabledSelector,
    }: Props) => {
        const [selectedCountryIndex, setSelectedCountryIndex] = useState(
            getSelectedCountryIndex(countries, selectedCountry),
        );
        const countryItemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
        const countryInputRef = React.useRef<HTMLInputElement>(null);
        const countryListRef = React.useRef<HTMLDivElement>(null);
        const countrySelectorRef = React.useRef<HTMLDivElement>(null);
        const [isFocus, setFocus] = React.useState<boolean>(false);

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

        const closeListHandler = useCallback((): void => {
            setFocus(false);
            setSelectedCountryIndex(
                getSelectedCountryIndex(countries, selectedCountry),
            );
            console.log("focus", phoneInputRef);
            phoneInputRef.current?.focus();
        }, []);

        const updateValue = useCallback((country: Country): void => {
            countryInputRef.current?.blur();
            setSelectedCountry(country);
            onChangeCountry(country);
            closeListHandler();
            setSelectedCountryIndex(
                getSelectedCountryIndex(countries, country),
            );
        }, []);

        const keyDownHandler = (
            event: React.KeyboardEvent<HTMLDivElement>,
        ): void => {
            const code = event.which;

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
                setFocus(false);
            }
        };

        const closeHandler = useCallback(() => closeListHandler(), []);

        useOnClickOutside({
            ref: countrySelectorRef,
            handler: closeHandler,
        });

        const onFocusHandler = (): void => {
            if (disabled || disabledSelector) {
                return;
            }
            setFocus(true);
        };

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
                                country={selectedCountry || null}
                            />
                        </div>
                    )}
                    <input
                        ref={countryInputRef}
                        value={
                            !isEmpty(selectedCountry)
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
