import * as React from "react";
import { Country } from "../../../../assets/country-list";
import * as Render from "react-emoji-render";
const Twemoji = Render["Twemoji"];

interface Props {
    emojiFlags: boolean;
    country: Country;
}

export const Flag: React.FC<Props> = React.memo(
    ({ country, emojiFlags }: Props) => {
        return (
            <React.Fragment>
                {emojiFlags ? (
                    <Twemoji
                        data-testid="emoji"
                        text={`${country ? country.emoji : ""}`}
                        className={"emoji-flag"}
                    />
                ) : (
                    <div
                        data-testid="css-flag"
                        className={`iti__flag iti__${country.alpha2.toLowerCase()}`}
                    />
                )}
            </React.Fragment>
        );
    },
);
