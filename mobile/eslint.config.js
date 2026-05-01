import callstackConfig from '@callstack/eslint-config/react-native.flat.js';

export default [
  {
    ignores: ['node_modules', '.expo', 'assets'],
  },
  // Filter out Jest configs since we don't have Jest installed
  ...callstackConfig.filter((config) => !config.plugins?.jest),
  {
    files: ['eslint.config.js', 'prettier.config.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    // React 17+ doesn't require React to be in scope for JSX
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];
