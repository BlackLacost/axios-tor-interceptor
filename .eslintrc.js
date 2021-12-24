module.exports = {
  env: {
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname, // tsconfigRootDir: __dirname, ???
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'jest', 'import'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'jest/no-identical-title': 'error',
  },
}
