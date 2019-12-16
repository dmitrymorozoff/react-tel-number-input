import { allCountries } from "../../../assets/country-list";
import { getHighlightCountryIndex } from "../get-highlight-country-index";

describe("getHighlightCountryIndex", function() {
    it("should highlight prev country index", function() {
        const topDirection = -1;
        const currentIndex = 1;

        const newCountryIndex = getHighlightCountryIndex(
            topDirection,
            currentIndex,
            allCountries,
        );

        expect(newCountryIndex).toBe(0);
    });

    it("should highlight next country index", function() {
        const topDirection = 1;
        const currentIndex = 1;

        const newCountryIndex = getHighlightCountryIndex(
            topDirection,
            currentIndex,
            allCountries,
        );

        expect(newCountryIndex).toBe(2);
    });

    it("should highlight first index", function() {
        const topDirection = -1;
        const currentIndex = 0;

        const newCountryIndex = getHighlightCountryIndex(
            topDirection,
            currentIndex,
            allCountries,
        );

        expect(newCountryIndex).toBe(0);
    });

    it("should highlight last index", function() {
        const bottomDirection = 1;
        const currentIndex = allCountries.length - 1;

        const newCountryIndex = getHighlightCountryIndex(
            bottomDirection,
            currentIndex,
            allCountries,
        );

        expect(newCountryIndex).toBe(currentIndex);
    });
});
