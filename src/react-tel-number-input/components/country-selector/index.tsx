import * as React from "react";
import cx from "classnames";
import "./style.scss";
import { useOnClickOutside } from "../../../services/hooks/use-on-click-outside";
import { Country } from "../../../assets/country-list";
import "../../../assets/flags/flags.scss";
import { ListItem } from "./list-item";
import { KeyCode } from "../../../services/variables";

interface Props {
    countries: Country[];
    selectedCountry: Country;
    setSelectedCountry: (
        value: ((prevState: Country) => Country) | Country,
    ) => void;
    disabled: boolean;
    showFlags: boolean;
    showCountryCodeInList: boolean;
}

export const CountrySelector: React.FC<Props> = React.memo(
    ({
        countries,
        selectedCountry,
        showCountryCodeInList = true,
        setSelectedCountry,
    }: Props) => {
        const countryInputRef = React.useRef<HTMLInputElement>(null);
        const countrySelectorRef = React.useRef<HTMLInputElement>(null);
        const [isFocus, setFocus] = React.useState<boolean>(false);

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
                    <div className={"country-selector__flag"}>
                        <div
                            className={`iti__flag iti__${selectedCountry.alpha2.toLowerCase()}`}
                        />
                    </div>
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
                    className={cx("country-selector-list", {
                        "country-selector-list--is-focus": isFocus,
                    })}
                >
                    {countries.map((country, index) => (
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
