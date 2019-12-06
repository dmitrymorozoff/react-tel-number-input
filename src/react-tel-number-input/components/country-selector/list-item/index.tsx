import * as React from "react";
import "../style.scss";
import { Country } from "src/assets/country-list";
import { Flag } from "../flag";
import cx from "classnames";
import { MutableRefObject } from "react";

interface Props {
    country: Country;
    selectedCountryIndex: number;
    onClick: (country: Country) => void;
    showCountryCodeInList: boolean;
    showFlags: boolean;
    emojiFlags: boolean;
    countryItemRefs: MutableRefObject<(HTMLDivElement | null)[]>;
    index: number;
}

export const ListItem: React.FC<Props> = React.memo(
    ({
        country,
        selectedCountryIndex,
        onClick,
        showCountryCodeInList = true,
        showFlags,
        emojiFlags,
        countryItemRefs,
        index,
    }: Props) => {
        const onClickHandler = (): void => {
            onClick(country);
        };

        const isSelected = index === selectedCountryIndex;

        console.log("render");

        return (
            <div
                ref={(ref: HTMLDivElement) => countryItemRefs.current.push(ref)}
                className={cx("country-selector-list__item", {
                    "country-selector-list__item--selected": isSelected,
                })}
                onClick={onClickHandler}
            >
                {showFlags && (
                    <div
                        className={
                            "country-selector-list__item__flag-container"
                        }
                    >
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
    },
);
