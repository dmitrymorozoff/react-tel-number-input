module.export = {
    verbose: true,
    roots: ["<rootDir>/src"],
    transform: {
        "\\.(js|jsx|ts|tsx)?$": "babel-jest",
    },
    testMatch: ["<rootDir>/src/**/>(*.)test.{js, jsx, ts, tsx}"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "scss"],
    testPathIgnorePatterns: ["/node_modules/", "/public/"],
    moduleDirectories: ["node_modules", "shared", "src"],
    setupFilesAfterEnv: [
        "jest-dom/extend-expect",
        "@testing-library/react/cleanup-after-each",
    ],
};
