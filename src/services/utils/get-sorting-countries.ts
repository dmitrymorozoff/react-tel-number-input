import { Country } from "../../assets/country-list";

interface Props {
    allCountries: Country[];
    ignoredCountries: string[];
    onlyCountries: string[];
    preferredCountries: string[];
}

const toUpperCase = (arr: string[]): string[] => {
    return arr.map(ic => ic.toUpperCase());
};

const getCountriesWithout = (
    countries: Country[],
    filteredCountries: string[],
): Country[] => {
    const ucFilteredCountries = toUpperCase(filteredCountries);
    return countries.filter(
        country => !ucFilteredCountries.includes(country.alpha2),
    );
};

const getCountriesIncludes = (
    countries: Country[],
    filteredCountries: string[],
): Country[] => {
    const ucFilteredCountries = toUpperCase(filteredCountries);
    return countries.filter(country =>
        ucFilteredCountries.includes(country.alpha2),
    );
};

const getPreferredCountries = (
    countries: Country[],
    filteredCountries: string[],
): Country[] => {
    const countires: Country[] = [];

    filteredCountries.forEach(country => {
        const findedCountry = countries.find(item =>
            item.alpha2.includes(country.toUpperCase()),
        );
        if (findedCountry) {
            countires.push(findedCountry);
        }
    });
    return countires;
};

const preferCountries = (
    countries: Country[],
    preferredCountries: string[],
): Country[] => {
    const countiresWithoutPreffered = getCountriesWithout(
        countries,
        preferredCountries,
    );
    const selfPrefferedCountries = getPreferredCountries(
        countries,
        preferredCountries,
    );
    return [...selfPrefferedCountries, ...countiresWithoutPreffered];
};

export const getSortingCountries = ({
    allCountries,
    ignoredCountries = [],
    onlyCountries = [],
    preferredCountries = [],
}: Props): Country[] => {
    allCountries.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    const countries = getCountriesWithout(allCountries, ignoredCountries);
    if (!preferredCountries && !onlyCountries) {
        return countries;
    }

    if (preferredCountries.length !== 0) {
        if (onlyCountries.length !== 0) {
            const finalCountries = getCountriesIncludes(
                countries,
                onlyCountries,
            );
            return preferCountries(finalCountries, preferredCountries);
        }
        return preferCountries(countries, preferredCountries);
    } else if (onlyCountries.length !== 0) {
        return getCountriesIncludes(countries, onlyCountries);
    } else {
        return countries;
    }
};
