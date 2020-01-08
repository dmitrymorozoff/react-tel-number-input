import React from "react";
import { Flag } from "../index";
import * as ReactDOM from "react-dom";
import { render } from "@testing-library/react";

describe("Flag", function() {
    const props = {
        emojiFlags: false,
        country: {
            alpha2: "AE",
            alpha3: "ARE",
            countryCallingCodes: ["+971"],
            emoji: "🇦🇪",
            name: "United Arab Emirates",
        },
    };

    it("should render without crashing", function() {
        const root = document.createElement("div");
        ReactDOM.render(<Flag {...props} />, root);
    });

    it("should render correctly if emojiFlags is false", function() {
        const { getByTestId } = render(<Flag {...props} />);

        expect(getByTestId("css-flag").classList).toContain("iti__flag");
    });

    it("should render correctly if emojiFlags is true", function() {
        const { getByTestId } = render(<Flag {...props} emojiFlags={true} />);

        expect(getByTestId("emoji").classList).toContain("emoji-flag");
    });

    it("should render correctly country if emojiFlags is true", function() {
        const { getAllByAltText } = render(
            <Flag {...props} emojiFlags={true} />,
        );

        expect(getAllByAltText(props.country.emoji)).toBeDefined();
    });

    it("should render correctly country if emojiFlags is false", function() {
        const { getByTestId } = render(<Flag {...props} />);

        expect(getByTestId("css-flag").classList).toContain(
            `iti__${props.country.alpha2.toLowerCase()}`,
        );
    });
});
