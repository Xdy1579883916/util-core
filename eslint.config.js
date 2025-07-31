// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    pnpm: true,
    rules: {
      'no-console': 'off',
      'no-proto': 'off',
      'no-restricted-properties': 'off',
      'node/prefer-global/process': 'off',
      'eqeqeq': 'off',
      'new-cap': 'off',
      'unused-imports/no-unused-vars': 'off',
      'ts/no-unsafe-function-type': 'off',
      'prefer-promise-reject-errors': 'off',
      'ts/explicit-function-return-type': 'off',
      'symbol-description': 'off',
      'jsdoc/check-param-names': 'off',
      'jsdoc/require-returns-description': 'off',
      'no-new-func': 'off',
      'no-sequences': 'off',
      'no-unused-expressions': 'off',
    },
  },
)
