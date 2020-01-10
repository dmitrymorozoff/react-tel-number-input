import { checkMaskExist } from "../check-mask-exist";

describe("checkMaskExist", function() {
    const country = {
        alpha2: "RU",
        alpha3: "RUS",
        countryCallingCodes: ["+7"],
        emoji: "🇷🇺",
        name: "Russian Federation",
    };

    it("should return true if mask exist", function() {
        expect(checkMaskExist(["en", "ru"], country)).toBe(true);
    });
});
