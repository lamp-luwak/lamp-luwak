module.exports = {
  rootDir: ".",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
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
  testEnvironment: "node",
  verbose: true
};
