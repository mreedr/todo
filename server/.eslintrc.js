module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "space-before-function-paren": 0,
    "indent": ["error", 4],
    "eol-last": 0,
    "semi": [2, "never"]
  },
  "globals": {
    "describe": true,
    "it": true,
    "beforeEach": true,
    "expect": true
  }
}
