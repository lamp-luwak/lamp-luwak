module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
		"project": "tsconfig.json",
		"tsconfigRootDir": ".",
	},
  "plugins": ["@typescript-eslint"],
  "rules": {
    "quotes": ["error", "double"],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/unbound-method": 0
  },
};
