module.exports = {
  extends: '@cutting/eslint-config/node',
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': ['error', { allowArgumentsExplicitlyTypedAsAny: true }],
  },
};
