import * as React from "react";
import { Country } from "src/assets/country-list";
import { Flag } from "../flag";
import cx from "classnames";
import { MutableRefObject, useCallback } from "react";

interface Props {
    country: Country;
    isSelected: boolean;
    onClick: (country: Country) => void;
    showCountryCodeInList: boolean;
    showFlags: boolean;
    emojiFlags: boolean;
    countryItemRefs: MutableRefObject<(HTMLDivElement | null)[]> | null;
}

export const ListItem: React.FC<Props> = React.memo(
    ({
        country,
        onClick,
        showCountryCodeInList,
        showFlags,
        emojiFlags,
        countryItemRefs,
        isSelected,
    }: Props) => {
        const onClickHandler = useCallback((): void => {
            onClick(country);
        }, []);

        const setCountryItemsRefs = useCallback((ref: HTMLDivElement): void => {
            if (countryItemRefs) {
                countryItemRefs.current.push(ref);
            }
        }, []);

        return (
            <div
                data-testid="list-item"
                ref={setCountryItemsRefs}
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
                <div
                    className={"country-selector-text"}
                    data-testid="country-text"
                >
                    {country.name}
                    {showCountryCodeInList && (
                        <div
                            className={"country-selector-code"}
                            data-testid="country-code"
                        >
                            {`(${country.countryCallingCodes[0]})`}
                        </div>
                    )}
                </div>
            </div>
        );
    },
);
