module.exports = {
  rootDir: ".",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
      diagnostics: {
        warnOnly: true
      },
    }
  },
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testMatch: [
    "<rootDir>/tests/**/*.ts"
  ],
  moduleNameMapper: {
    "~/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "node",
  verbose: true
};
