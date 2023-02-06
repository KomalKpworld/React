module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": '1'
    },
    
    "eslint.workingDirectories": [
      "./client", 
      "./server"
    ],
    
    "files.exclude": {
      "**/.git": false,
    }
  }
};
