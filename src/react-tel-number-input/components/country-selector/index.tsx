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
import { useEffect } from "react";

interface Props {
    countries: Country[];
    selectedCountry: Country;
    setSelectedCountry: (
        value: ((prevState: Country) => Country) | Country,
    ) => void;
    disabled: boolean;
    showFlags: boolean;
    showCountryCodeInList: boolean;
    emojiFlags: boolean;
}

export const CountrySelector: React.FC<Props> = React.memo(
    ({
        countries,
        selectedCountry,
        showCountryCodeInList = true,
        setSelectedCountry,
        showFlags,
        emojiFlags,
    }: Props) => {
        const selectedCountryRef = React.useRef<HTMLDivElement>(null);
        const countryInputRef = React.useRef<HTMLInputElement>(null);
        const countryListRef = React.useRef<HTMLDivElement>(null);
        const countrySelectorRef = React.useRef<HTMLDivElement>(null);
        const [isFocus, setFocus] = React.useState<boolean>(false);

        const onFocusHandler = (): void => {
            setFocus(true);
        };

        useEffect(() => {
            if (isFocus) {
                scrollTo(countryListRef, selectedCountryRef);
            }
        }, [isFocus]);

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
            countryInputRef.current?.blur();
            closeListHandler();
            setSelectedCountry(country);
        };

        const keyDownHandler = (
            event: React.KeyboardEvent<HTMLDivElement>,
        ): void => {
            const code = event.keyCode;
            if (code === KeyCode.Escape) {
                closeListHandler();
            }
            if (code === KeyCode.Tab) {
                if (isFocus) {
                    closeListHandler();
                }
            }
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
                            selectedCountryRef={selectedCountryRef}
                            country={country}
                            key={`${country.alpha2 + index}`}
                            onClick={updateValue}
                            showCountryCodeInList={showCountryCodeInList}
                            emojiFlags={emojiFlags}
                            showFlags={showFlags}
                            selectedCountry={selectedCountry}
                        />
                    ))}
                </div>
            </div>
        );
    },
);
