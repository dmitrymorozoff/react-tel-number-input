import { RefObject } from "react";

export const scrollTo = (
    containerRef: RefObject<HTMLDivElement>,
    countryRef: RefObject<HTMLDivElement>,
    middle?: boolean,
): void => {
    if (!containerRef) {
        return;
    }

    if (!countryRef) {
        return;
    }

    const container = containerRef.current;
    if (!container || !document.body) return;

    const containerHeight = container.offsetHeight;
    const containerOffset = container.getBoundingClientRect();
    const containerTop = containerOffset.top + document.body.scrollTop;
    const containerBottom = containerTop + containerHeight;

    const country = countryRef.current;
    if (!country) {
        return;
    }

    const countryOffset = country.getBoundingClientRect();
    const countryHeight = country.offsetHeight;
    const countryTop = countryOffset.top + document.body.scrollTop;
    const countryBottom = countryTop + countryHeight;

    let newScrollTop = countryTop - containerTop + container.scrollTop;
    const middleOffset = containerHeight / 2 - countryHeight / 2;

    if (countryTop < containerTop + 32) {
        // scroll top
        if (middle) {
            newScrollTop -= middleOffset;
        }
        container.scrollTop = newScrollTop - 10;
    } else if (countryBottom > containerBottom) {
        // scroll bottom
        if (middle) {
            newScrollTop += middleOffset;
        }
        const heightDifference = containerHeight - countryHeight;
        container.scrollTop = newScrollTop - heightDifference + 10;
    }
};
