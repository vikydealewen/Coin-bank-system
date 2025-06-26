import js from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginCypress from 'eslint-plugin-cypress/lib/flat';

/**@type {import('eslint).Linter.flatConfig[]}*/
export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['node_modules', 'dist'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      ...eslintConfigPrettier.rules,
      'no-var': 'error',
    },
  },
  pluginCypress.configs.recommended,
];
