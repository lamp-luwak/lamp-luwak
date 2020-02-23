module.exports = {
  presets: [
    ["@babel/preset-env", {targets: {node: "current"}}],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    ["@babel/plugin-proposal-class-properties", {"loose": true}],
    "@babel/plugin-proposal-optional-chaining",
  ]
};
