import * as React from "react";
import { Country } from "../../../../assets/country-list";
import * as Render from "react-emoji-render";

interface Props {
    emojiFlags: boolean;
    country: Country;
}

export const Flag: React.FC<Props> = ({ country, emojiFlags }: Props) => {
    const Twemoji = Render["Twemoji"];

    return (
        <React.Fragment>
            {emojiFlags ? (
                <Twemoji text={`${country.emoji}`} className={"emoji-flag"} />
            ) : (
                <div
                    className={`iti__flag iti__${country.alpha2.toLowerCase()}`}
                />
            )}
        </React.Fragment>
    );
};
