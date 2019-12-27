export const getMask = (value: string, showMask = true): string =>
    showMask ? value.replace(new RegExp("[0-9]", "g"), "9") : "";
