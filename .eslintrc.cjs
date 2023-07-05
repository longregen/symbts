module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: true,
    jsx: true,
    lib: ["dom", "esnext"],
    target: "esnext",
    module: "esnext",
    tsconfigRootDir: __dirname,
  },
  rules: {
    'semi': ['error', 'never'],
    'indent': ['error', 2]
  },
  globals: {
    'require': 'readonly',
    'module': 'readonly',
    'indexedDB': 'readonly',
    'window': 'readonly',
    'console': 'readonly',
    'self': 'readonly',
    'caches': 'readonly',
    'crypto': 'readonly',
    'document': 'readonly',
    'fetch': 'readonly',
  }
};
