import * as React from "react";
import * as ReactDOM from "react-dom";
import { PhoneInput } from "../src/index";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export class App extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className="container">
                <PhoneInput />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
