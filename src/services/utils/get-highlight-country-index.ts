import { Country } from "../../assets/country-list";

export const getHighlightCountryIndex = (
    direction: number,
    selectedCountryIndex: number,
    countries: Country[],
): number => {
    const newHighlightCountryIndex = selectedCountryIndex + direction;
    if (newHighlightCountryIndex <= 0) {
        return 0;
    }
    if (newHighlightCountryIndex >= countries.length) {
        return countries.length;
    }
    return newHighlightCountryIndex;
};
