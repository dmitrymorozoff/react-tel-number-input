import { Country } from "../../assets/country-list";

export const getSearchCountryIndex = (
    countries: Country[],
    query: string,
): number | undefined => {
    let countryIndex = undefined;
    countries.forEach((country, index) => {
        if (country.name.toLowerCase().startsWith(query.toLowerCase())) {
            countryIndex = index;
            console.log("country", country);
        }
    });
    return countryIndex;
};
