import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    files: ['**/*.js'],
  },
  {
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node, // Include Node.js globals
        ...globals.browser, // Include browser globals if needed
      },
    },
  },
  pluginJs.configs.recommended,
]
