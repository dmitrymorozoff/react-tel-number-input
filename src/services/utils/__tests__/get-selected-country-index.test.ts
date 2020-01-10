import { getSelectedCountryIndex } from "../get-selected-country-index";

describe("getSelectedCountryIndex", function() {
    const countries = [
        {
            alpha2: "RU",
            alpha3: "RUS",
            countryCallingCodes: ["+7"],
            emoji: "🇷🇺",
            name: "Russian Federation",
        },
    ];

    const country = {
        alpha2: "RU",
        alpha3: "RUS",
        countryCallingCodes: ["+7"],
        emoji: "🇷🇺",
        name: "Russian Federation",
    };

    it("should find index", function() {
        expect(getSelectedCountryIndex(countries, country)).toBe(0);
    });
});
