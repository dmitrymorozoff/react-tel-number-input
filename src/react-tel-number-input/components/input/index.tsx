import React = require("react");
import cx from "classnames";
import "./style.scss";
import { Country } from "../../../assets/country-list";
import { ChangeEvent, RefObject, useCallback } from "react";
import { OnChangeInput } from "../../index";
import { getPlaceholderValue } from "../../../services/utils/get-placeholder-value";
import { isEmpty } from "../../../services/utils/isEmpty";
import {
    CountryCode,
    parsePhoneNumberFromString,
    PhoneNumber,
} from "libphonenumber-js";

interface Props {
    selectedCountry: Country;
    phoneInputRef: RefObject<HTMLInputElement>;
    placeholder: string;
    onChangeInput: OnChangeInput;
    disableExamplePlaceholder: boolean;
    autoFocus: boolean;
    disabled: boolean;
    disabledInput: boolean;
}

export const Input: React.FC<Props> = React.memo(
    ({
        selectedCountry,
        phoneInputRef,
        placeholder,
        onChangeInput,
        disableExamplePlaceholder,
        autoFocus,
        disabled,
        disabledInput,
    }: Props) => {
        const [isFocus, setFocus] = React.useState<boolean>(false);
        const [value, setValue] = React.useState<string>("");
        const [parsedValue, setParsedValue] = React.useState<
            PhoneNumber | undefined
        >(undefined);
        const onFocusHandler = useCallback((): void => {
            if (disabled || disabledInput) {
                return;
            }
            setFocus(true);
        }, []);

        const onBlurHandler = useCallback((): void => {
            setFocus(false);
        }, []);

        const changeInputHandler = (
            event: ChangeEvent<HTMLInputElement>,
        ): void => {
            const regExp = /^[0-9\b]+$/;
            const targetValue = event.target.value;

            if (targetValue === "" || regExp.test(targetValue)) {
                setValue(targetValue);
                const parsedPhoneNumber = parsePhoneNumberFromString(
                    targetValue,
                    selectedCountry.alpha2 as CountryCode,
                );
                setParsedValue(parsedPhoneNumber);
                onChangeInput({ targetValue, parsedPhoneNumber }, event);
            }
        };

        const placeholderValue = selectedCountry
            ? getPlaceholderValue(
                  selectedCountry,
                  disableExamplePlaceholder,
                  placeholder,
              )
            : "";

        return (
            <div
                className={cx("phone-input", {
                    "phone-input--is-focus": isFocus,
                    "phone-input--is-valid": parsedValue?.isValid(),
                })}
                onClick={onFocusHandler}
            >
                {!isEmpty(selectedCountry) && (
                    <div
                        className={"phone-input-dial-code"}
                    >{`(${selectedCountry.countryCallingCodes[0]})`}</div>
                )}
                <input
                    ref={phoneInputRef}
                    type="tel"
                    className={cx("phone-input__input", {
                        "phone-input__input--is-focus": isFocus,
                    })}
                    value={value}
                    disabled={disabled || disabledInput}
                    autoFocus={autoFocus}
                    placeholder={placeholderValue}
                    onClick={onFocusHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    onChange={changeInputHandler}
                />
            </div>
        );
    },
);
