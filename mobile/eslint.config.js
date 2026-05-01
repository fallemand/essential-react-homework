import callstackConfigNode from '@callstack/eslint-config/node.flat.js';

export default [
  {
    ignores: ['node_modules', '.expo', 'assets'],
  },
  // Filter out Jest configs since we don't have Jest installed
  ...callstackConfigNode.filter((config) => !config.plugins?.jest),
  {
    files: ['eslint.config.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
