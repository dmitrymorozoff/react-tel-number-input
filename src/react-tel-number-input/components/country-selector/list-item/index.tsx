import * as React from "react";
import "../style.scss";
import { Country } from "src/assets/country-list";

interface Props {
    country: Country;
    onClick: (country: Country) => void;
    showCountryCodeInList: boolean;
}

export const ListItem: React.FC<Props> = ({
    country,
    onClick,
    showCountryCodeInList = true,
}: Props) => {
    const onClickHandler = (): void => {
        onClick(country);
    };

    return (
        <div className={"country-selector-list__item"} onClick={onClickHandler}>
            <div className={"country-selector-list__item__flag-container"}>
                <div
                    className={`iti__flag iti__${country.alpha2.toLowerCase()}`}
                />
            </div>
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
