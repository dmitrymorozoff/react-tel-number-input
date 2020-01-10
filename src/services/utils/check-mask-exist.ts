import { Country } from "../../assets/country-list";

export const checkMaskExist = (
    excludeMasks: string[],
    selectedCountry: Country,
): boolean => {
    return excludeMasks
        .map(mask => mask.toUpperCase())
        .includes(selectedCountry.alpha2.toUpperCase());
};
