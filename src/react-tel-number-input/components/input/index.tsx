import * as React from "react";
import cx from "classnames";
import "./style.scss";
import { Country } from "../../../assets/country-list";
import { ChangeEvent, RefObject, useCallback } from "react";
import { OnChangeInput, Payload } from "../../index";
import { getPlaceholderValue } from "../../../services/utils/get-placeholder-value";
import { isEmpty } from "../../../services/utils/isEmpty";
import {
    CountryCode,
    parsePhoneNumberFromString,
    PhoneNumber,
} from "libphonenumber-js";
import InputMask from "react-input-mask";
import { getMask } from "../../../services/utils/get-mask";
import { getPayloadPhoneNumber } from "../../../services/utils/get-payload-phone-number";

interface Props {
    autoFocus: boolean;
    clearable: boolean;
    disableExamplePlaceholder: boolean;
    disabled: boolean;
    disabledInput: boolean;
    excludeMasks: string[];
    onChangeInput: OnChangeInput;
    phoneInputRef: RefObject<HTMLInputElement>;
    placeholder: string;
    selectedCountry: Country;
    showMask: boolean;
    value: Payload | undefined;
}

export const Input: React.FC<Props> = React.memo(
    ({
        autoFocus,
        clearable,
        disableExamplePlaceholder,
        disabled,
        disabledInput,
        excludeMasks,
        onChangeInput,
        phoneInputRef,
        placeholder,
        selectedCountry,
        showMask,
        value,
    }: Props) => {
        const [isFocus, setFocus] = React.useState<boolean>(false);
        const [currentValue, setCurrentValue] = React.useState<string>(
            value?.phoneNumber?.targetValue || "",
        );
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

        const onClearableHandler = (): void => {
            setCurrentValue("");
            setParsedValue(undefined);
            onChangeInput(undefined);
        };

        const changeInputHandler = (
            event: ChangeEvent<HTMLInputElement>,
        ): void => {
            const targetValue = event.target.value;

            setCurrentValue(targetValue);
            const parsedPhoneNumber = parsePhoneNumberFromString(
                targetValue,
                selectedCountry.alpha2 as CountryCode,
            );
            setParsedValue(parsedPhoneNumber);
            if (!Boolean(targetValue)) {
                onChangeInput(undefined);
            } else {
                onChangeInput(
                    getPayloadPhoneNumber(
                        targetValue,
                        selectedCountry.alpha2 as CountryCode,
                    ),
                );
            }
        };

        if (
            excludeMasks
                .map(mask => mask.toUpperCase())
                .includes(selectedCountry.alpha2.toUpperCase())
        ) {
            showMask = false;
        }

        const placeholderValue = getPlaceholderValue(
            selectedCountry,
            disableExamplePlaceholder,
            placeholder,
        );
        const mask = getMask(placeholderValue, showMask);

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
                <InputMask
                    mask={mask}
                    maskChar=""
                    value={currentValue}
                    type="tel"
                    className={cx("phone-input__input", {
                        "phone-input__input--is-focus": isFocus,
                    })}
                    disabled={disabled || disabledInput}
                    autoFocus={autoFocus}
                    placeholder={placeholderValue}
                    onClick={onFocusHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    onChange={changeInputHandler}
                >
                    {(inputProps): JSX.Element => (
                        <input {...inputProps} ref={phoneInputRef} />
                    )}
                </InputMask>
                {clearable && Boolean(currentValue.length) && (
                    <div
                        className={"phone-input-clear"}
                        onClick={onClearableHandler}
                    >
                        ✕
                    </div>
                )}
            </div>
        );
    },
);
