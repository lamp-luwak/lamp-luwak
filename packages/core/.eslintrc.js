module.exports = {
  extends: ["airbnb"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    "import/no-unresolved": 0,
    // note you must disable the base rule as it can report incorrect errors
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false
    }],
    "quotes": ["error", "double"],
    "import/extensions": ["error", "never"],
  }
};
