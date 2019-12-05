import * as React from "react";
import "../style.scss";
import { Country } from "src/assets/country-list";
import { Flag } from "../flag";
import cx from "classnames";
import { RefObject } from "react";
// eslint-disable-next-line @typescript-eslint/no-var-requires

interface Props {
    country: Country;
    selectedCountry: Country;
    onClick: (country: Country) => void;
    showCountryCodeInList: boolean;
    showFlags: boolean;
    emojiFlags: boolean;
    selectedCountryRef: RefObject<HTMLDivElement>;
}

export const ListItem: React.FC<Props> = ({
    country,
    selectedCountry,
    onClick,
    showCountryCodeInList = true,
    showFlags,
    emojiFlags,
    selectedCountryRef,
}: Props) => {
    const onClickHandler = (): void => {
        onClick(country);
    };

    const isSelected = country.alpha2 === selectedCountry.alpha2;

    return (
        <div
            ref={isSelected ? selectedCountryRef : null}
            className={cx("country-selector-list__item", {
                "country-selector-list__item--selected": isSelected,
            })}
            onClick={onClickHandler}
        >
            {showFlags && (
                <div className={"country-selector-list__item__flag-container"}>
                    <Flag emojiFlags={emojiFlags} country={country} />
                </div>
            )}
            <div className={"country-selector-text"}>
                {country.name}
                {showCountryCodeInList && (
                    <div className={"country-selector-code"}>
                        {`(${country.countryCallingCodes[0]})`}
                    </div>
                )}
            </div>
        </div>
    );
};
