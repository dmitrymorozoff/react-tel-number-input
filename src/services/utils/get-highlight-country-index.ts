import { Country } from "../../assets/country-list";

export const getHighlightCountryIndex = (
    direction: number,
    currentSelectedCountryIndex: number,
    countries: Country[],
): number => {
    const newHighlightCountryIndex = currentSelectedCountryIndex + direction;
    if (newHighlightCountryIndex <= 0) {
        return 0;
    }
    if (newHighlightCountryIndex >= countries.length - 1) {
        return countries.length - 1;
    }
    return newHighlightCountryIndex;
};
