import React = require("react");
import cx from "classnames";
import "./style.scss";
import { Country } from "../../../assets/country-list";

interface Props {
    selectedCountry: Country;
}

export const Input: React.FC<Props> = ({ selectedCountry }: Props) => {
    const [isFocus, setFocus] = React.useState<boolean>(false);

    const onFocusHandler = (): void => {
        setFocus(true);
    };

    const onBlurHandler = (): void => {
        setFocus(false);
    };

    return (
        <div
            className={cx("phone-input", {
                "phone-input--is-focus": isFocus,
            })}
            onClick={onFocusHandler}
        >
            <div
                className={"phone-input-dial-code"}
            >{`(${selectedCountry.countryCallingCodes[0]})`}</div>
            <input
                type="text"
                className={cx("phone-input__input", {
                    "phone-input__input--is-focus": isFocus,
                })}
                onClick={onFocusHandler}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
            />
        </div>
    );
};
