module.exports = {
  rootDir: ".",
  setupFiles: ["<rootDir>/jest.setup-once.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup-after-each.ts"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
      diagnostics: {
        warnOnly: true
      },
    }
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: [
    "<rootDir>/tests/**/*.ts*"
  ],
  moduleNameMapper: {
    "~/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "node",
  verbose: true
};
