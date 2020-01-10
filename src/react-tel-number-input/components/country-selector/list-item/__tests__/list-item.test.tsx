import React from "react";
import { ListItem } from "../index";
import * as ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("ListItem", function() {
    const onClick = jest.fn();

    const props = {
        country: {
            alpha2: "AE",
            alpha3: "ARE",
            countryCallingCodes: ["+971"],
            emoji: "🇦🇪",
            name: "United Arab Emirates",
        },
        countryItemRefs: null,
        showCountryCodeInList: false,
        showFlags: true,
        emojiFlags: false,
        onClick: onClick,
        isSelected: false,
    };

    it("should render without crashing", function() {
        const root = document.createElement("div");
        ReactDOM.render(<ListItem {...props} />, root);
    });

    it("should fire onClick", function() {
        const { getByTestId } = render(<ListItem {...props} />);

        fireEvent.click(getByTestId("list-item"));
        expect(props.onClick).toHaveBeenCalled();
    });

    it("should render flag", function() {
        const { getByTestId } = render(<ListItem {...props} />);

        expect(getByTestId("css-flag")).toBeDefined();
    });

    it("should render emoji flag", function() {
        const { getByTestId } = render(
            <ListItem {...props} emojiFlags={true} />,
        );

        expect(getByTestId("emoji")).toBeDefined();
    });

    it("should render country name", function() {
        const { getByTestId } = render(<ListItem {...props} />);

        expect(getByTestId("country-text")).toHaveTextContent(
            props.country.name,
        );
    });

    it("should not render country calling code", function() {
        const { getByTestId } = render(<ListItem {...props} />);

        expect(getByTestId("country-text")).not.toHaveTextContent(
            props.country.countryCallingCodes[0],
        );
    });

    it("should render country callinbg code", function() {
        const { getByTestId } = render(
            <ListItem {...props} showCountryCodeInList={true} />,
        );

        expect(getByTestId("country-text")).toHaveTextContent(
            props.country.countryCallingCodes[0],
        );
    });
});
