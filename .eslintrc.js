module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        "react/display-name": 0,
        "typescript-eslint/no-var-requires": 0
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
