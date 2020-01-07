import * as React from "react";
import * as ReactDOM from "react-dom";
import { PhoneInput, getPayloadPhoneNumber } from "../src/index";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export class App extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    onChange = value => {
        console.log("onChange =>", value);
    };

    onPhoneInputChange = value => {
        console.log("onPhoneInputChange =>", value);
    };

    onSelectCountry = value => {
        console.log("onSelectCountry =>", value);
    };

    public render(): JSX.Element {
        return (
            <div className="container">
                <PhoneInput
                    onChange={this.onChange}
                    onPhoneInputChange={this.onPhoneInputChange}
                    onSelectCountry={this.onSelectCountry}
                    value={{
                        country: {
                            alpha2: "AE",
                            alpha3: "ARE",
                            countryCallingCodes: ["+971"],
                            emoji: "🇦🇪",
                            name: "United Arab Emirates",
                        },
                        phoneNumber: getPayloadPhoneNumber("7548", "AE"),
                    }}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
