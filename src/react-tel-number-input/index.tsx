import React = require("react");
import "./style.scss";
import { CountrySelector } from "./components/country-selector";
import { Input } from "./components/input";

interface Props {}

export const PhoneInput: React.FC<Props> = ({}: Props) => {
    return (
        <div className="react-tel-number-input">
            <div className="select-country-container">
                <CountrySelector />
            </div>
            <div className="phone-input-container">
                <Input />
            </div>
        </div>
    );
};
