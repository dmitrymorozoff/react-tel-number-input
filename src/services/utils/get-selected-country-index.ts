import { Country } from "../../assets/country-list";

export const getSelectedCountryIndex = (
    countries: Country[],
    selectedCountry: Country,
): number => {
    return countries.findIndex(
        country => country.alpha2 == selectedCountry.alpha2,
    );
};
