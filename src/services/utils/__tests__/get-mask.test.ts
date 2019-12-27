import { getMask } from "../get-mask";

describe("getMask", () => {
    it("should return mask 999 999 99 99", () => {
        const phoneNumber = "912 345 67 89";
        const mask = getMask(phoneNumber);

        expect(mask).toBe("999 999 99 99");
    });

    it("should return empty string if showMask is false", () => {
        const phoneNumber = "912 345 67 89";
        const mask = getMask(phoneNumber, false);

        expect(mask).toBe("");
    });
});
