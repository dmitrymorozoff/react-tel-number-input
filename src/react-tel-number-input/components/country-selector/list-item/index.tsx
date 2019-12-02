import * as React from "react";
import "../style.scss";

interface Props {
    showCountryCodeInList: boolean;
    alpha2: string;
    name: string;
    countryCallingCodes: string[];
}

export const ListItem: React.FC<Props> = ({
    showCountryCodeInList = true,
    alpha2,
    name,
    countryCallingCodes,
}: Props) => {
    return (
        <div className={"country-selector-list__item"}>
            <div className={"country-selector-list__item__flag-container"}>
                <div className={`iti__flag iti__${alpha2.toLowerCase()}`} />
            </div>
            <div className={"country-selector-text"}>
                {name}
                {showCountryCodeInList && (
                    <div className={"country-selector-code"}>
                        {`(${countryCallingCodes[0]})`}
                    </div>
                )}
            </div>
        </div>
    );
};
