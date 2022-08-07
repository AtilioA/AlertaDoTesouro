module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:prettier/recommended" // This comes last
  ],
  parserOptions: {
    project: require("path").join(__dirname, 'tsconfig.json')
  },
  plugins: [
    "prettier",
    "@typescript-eslint",
    "jest",
  ],
  settings: {
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "camelcase": "off",
    "prettier/prettier": "error",
    "consistent-return": "off",
    "no-unused-vars": "off",
    "no-console": "off",
    "jest/no-disabled-tests": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {

        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        ignoreRestSiblings: true
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        format: [
          "camelCase",
          "snake_case",
          "PascalCase",
          "UPPER_CASE"],
        selector: "default",
        leadingUnderscore: "allow"
      }
    ],
    "import/no-extraneous-dependencies":
      ["error", {
        devDependencies: [
          "**/*.test.js",
          "**/*.test.ts",
          "**/*.spec.js",
          "**/*.spec.ts",
        ]
      }],
    "import/extensions":
      [
        "error",
        "ignorePackages",
        {
          ts: "never",
        }
      ],
  }
}
