import React = require("react");
import cx from "classnames";
import "./style.scss";

interface Props {}

export const Input: React.FC<Props> = ({}: Props) => {
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
            <input
                type="text"
                className={cx("phone-input__input", {
                    "phone-input__input--is-focus": isFocus,
                })}
                onClick={onFocusHandler}
                onBlur={onBlurHandler}
            />
        </div>
    );
};
