// .eslintrc.js example
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
}
