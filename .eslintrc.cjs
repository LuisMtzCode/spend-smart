module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jquery: true,
  },
  extends: ["eslint:recommended", "jquery", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
  },
};
