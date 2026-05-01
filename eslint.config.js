import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'warn',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/build-babel/**',
      '**/build-tsc/**',
      '**/.expo/**',
    ],
  },
];
