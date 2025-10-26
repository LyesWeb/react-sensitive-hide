module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    settings: { react: { version: 'detect' } },
    rules: {}
};