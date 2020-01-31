module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testMatch: [ "**/*.test.ts" ],
  moduleNameMapper: {
    "~/(.*)$": "<rootDir>/src/$1"
  },
  testPathIgnorePatterns: [
    "<rootDir>/release/",
    "<rootDir>/node_modules/"
  ],
  moduleFileExtensions: ["js", "ts"],
  testEnvironment: "node",
  verbose: true
};
