import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";
import { PhoneNumber } from "../../react-tel-number-input";

export const getPayloadPhoneNumber = (
    phone: string,
    alpha2: CountryCode,
): PhoneNumber => {
    const parsedPhoneNumber = parsePhoneNumberFromString(
        phone,
        alpha2 as CountryCode,
    );

    return {
        targetValue: phone,
        countryCallingCode: parsedPhoneNumber?.countryCallingCode,
        formattedNumber: parsedPhoneNumber?.number,
        nationalNumber: parsedPhoneNumber?.nationalNumber,
        isValid: parsedPhoneNumber?.isValid(),
        formatInternational: parsedPhoneNumber?.formatInternational(),
        formatNational: parsedPhoneNumber?.formatNational(),
        uri: parsedPhoneNumber?.getURI(),
        e164: parsedPhoneNumber?.format("E.164"),
    };
};
