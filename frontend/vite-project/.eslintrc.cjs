module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Use @typescript-eslint/parser for TypeScript
  extends: [
    'eslint:recommended', // Recommended ESLint rules
    'plugin:react/recommended', // Recommended React rules
    'plugin:@typescript-eslint/recommended', // Recommended TypeScript rules
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  plugins: [
    'react', // React specific linting rules
    '@typescript-eslint', // TypeScript specific linting rules
    'prettier', // Enables Prettier plugin
  ],
  env: {
    browser: true, // Enables browser global variables
    es6: true, // Enables ES6 features
    node: true, // Enables Node.js global variables
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  parserOptions: {
    ecmaVersion: 2020, // Allows parsing of modern ECMAScript features
    sourceType: 'module', // Allows the use of imports
    ecmaFeatures: {
      jsx: true, // Enable JSX
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        semi: true,
      },
    ],
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }, // Ignore unused variables prefixed with an underscore
    ],
    'react/react-in-jsx-scope': 'off', // Not required for React 17+
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable rule for explicit return types
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Apply rules only for TypeScript files
      rules: {
        // Override/add rules settings for TypeScript files
      },
    },
  ],
};
