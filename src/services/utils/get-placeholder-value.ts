import { Country } from "../../assets/country-list";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const examples = require("libphonenumber-js/examples.mobile.json");
import { CountryCode, getExampleNumber } from "libphonenumber-js";

export const getPlaceholderValue = (
    country: Country,
    disableExamplePlaceholder: boolean,
    placeholder: string,
): string => {
    const code = country.alpha2 as CountryCode;
    const phoneNumber = code ? getExampleNumber(code, examples) : null;
    const examplePlaceholder = phoneNumber
        ? phoneNumber.formatInternational()
        : "";

    if (placeholder) {
        return placeholder;
    }
    if (disableExamplePlaceholder) {
        return "";
    }
    return examplePlaceholder.substr(examplePlaceholder.indexOf(" ") + 1);
};
