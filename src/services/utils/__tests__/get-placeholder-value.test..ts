import { getPlaceholderValue } from "../get-placeholder-value";
// eslint-disable-next-line @typescript-eslint/no-var-requires

describe("getPlaceholderValue", function() {
    const country = {
        alpha2: "RU",
        alpha3: "RUS",
        countryCallingCodes: ["+7"],
        emoji: "🇷🇺",
        name: "Russian Federation",
    };

    it("should return placeholder with example number", function() {
        const REG_EXP_RU_PHONE = /^\d{3} \d{3} \d{2} \d{2}$/;
        const regExp = new RegExp(REG_EXP_RU_PHONE);
        const placeholder = getPlaceholderValue(country);

        expect(regExp.test(placeholder)).toBe(true);
    });

    it("should return empty string if set disableExamplePlaceholder", function() {
        const placeholder = getPlaceholderValue(country, true);

        expect(placeholder).toBe("");
    });

    it("should return placeholder string if set placeholder", function() {
        const testPlaceholder = "test";
        const placeholder = getPlaceholderValue(
            country,
            false,
            testPlaceholder,
        );

        expect(placeholder).toBe(testPlaceholder);
    });
});
