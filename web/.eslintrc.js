module.exports = {
  extends: [ "node" ],
  rules: {
    "import/no-commonjs": false,
    "import/no-nodejs-modules": false,
    "no-sync": 0,
    "no-empty-function": "off",

    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],

    "comma-dangle": ["error", "always"],
    "no-cond-assign": ["error", "always"],
    "no-console": "off"
  }
};
