module.export = {
    roots: ["<rootDir>/src"],
    transform: {
        "\\.(js|jsx|ts|tsx)?$": "babel-jest",
    },
    testMatch: ["<rootDir>/src/**/>(*.)test.{js, jsx, ts, tsx}"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testPathIgnorePatterns: ["/node_modules/", "/public/"],
    setupFilesAfterEnv: [
        "jest-dom/extend-expect",
        "@testing-library/react/cleanup-after-each",
    ],
};
