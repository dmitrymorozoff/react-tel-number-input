import * as React from "react";
import cx from "classnames";
import "./style.scss";
import { useOnClickOutside } from "../../../hooks/use-on-click-outside";

interface Props {}

export const CountrySelector: React.FC<Props> = ({}: Props) => {
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

    return (
        <div
            ref={countrySelectorRef}
            className={cx("country-selector", {
                "country-selector--is-focus": isFocus,
            })}
            onClick={onFocusHandler}
        >
            <input
                type="text"
                className={cx("country-selector__input", {
                    "country-selector__input--is-focus": isFocus,
                })}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                readOnly={true}
            ></input>
            <div
                className={cx("country-selector-toggle", {
                    "country-selector-toggle--is-focus": isFocus,
                })}
            >
                <div className="country-selector-toggle__arrow">▼</div>
            </div>
            <div
                className={cx("country-selector-list", {
                    "country-selector-list--is-focus": isFocus,
                })}
            >
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
                <div className={cx("country-selector-list__item")}>1</div>
            </div>
        </div>
    );
};
