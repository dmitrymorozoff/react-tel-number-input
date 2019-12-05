import { useEffect } from "react";
import * as React from "react";

interface Props {
    ref: React.RefObject<HTMLDivElement>;
    handler: any;
}

export const useOnClickOutside = ({ ref, handler }: Props): void => {
    useEffect(() => {
        const listener = (event: any): void => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return (): void => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};
