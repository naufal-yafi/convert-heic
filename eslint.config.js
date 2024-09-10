import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    ignores: ['node_modules/*', '.temp/src/*'],
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      indent: [
        'error',
        2,
        {
          flatTernaryExpressions: true,
          offsetTernaryExpressions: true,
          ignoredNodes: ['TemplateLiteral *'],
        },
      ],
      'no-tabs': 'error',
      'no-trailing-spaces': 'warn',
      'no-multi-spaces': 'warn',
      quotes: 'off',
      semi: ['error', 'always'],
    },
  },
];
