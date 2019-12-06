import React = require("react");
import cx from "classnames";
import "./style.scss";
import { Country } from "../../../assets/country-list";
import { ChangeEvent, RefObject } from "react";
import { OnChangeInput } from "../../index";
import { getPlaceholderValue } from "../../../services/utils/get-placeholder-value";

interface Props {
    selectedCountry: Country;
    phoneInputRef: RefObject<HTMLInputElement>;
    placeholder: string;
    onChangeInput: OnChangeInput;
    disableExamplePlaceholder: boolean;
}

export const Input: React.FC<Props> = ({
    selectedCountry,
    phoneInputRef,
    placeholder,
    onChangeInput,
    disableExamplePlaceholder,
}: Props) => {
    const [isFocus, setFocus] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string>("");
    const onFocusHandler = (): void => {
        setFocus(true);
    };

    const onBlurHandler = (): void => {
        setFocus(false);
    };

    const changeInputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        const regExp = /^[0-9\b]+$/;
        const targetValue = event.target.value;

        if (targetValue === "" || regExp.test(targetValue)) {
            setValue(targetValue);
            onChangeInput(targetValue, event);
        }
    };

    const placeholderValue = getPlaceholderValue(
        selectedCountry,
        disableExamplePlaceholder,
        placeholder,
    );

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
                ref={phoneInputRef}
                type="tel"
                className={cx("phone-input__input", {
                    "phone-input__input--is-focus": isFocus,
                })}
                value={value}
                placeholder={placeholderValue}
                onClick={onFocusHandler}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onChange={changeInputHandler}
            />
        </div>
    );
};
