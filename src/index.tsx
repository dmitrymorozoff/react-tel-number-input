import "./assets/flags/flags.scss";
import "./react-tel-number-input/style.scss";
import "./react-tel-number-input/components/input/style.scss";
import "./react-tel-number-input/components/country-selector/style.scss";
import { PhoneInput } from "./react-tel-number-input";
import { Utils } from "./services/utils";

const { getPayloadPhoneNumber } = Utils;
export { PhoneInput, getPayloadPhoneNumber };
