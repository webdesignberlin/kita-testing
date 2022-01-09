module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,vue}',
  ],
  globals: {
    diagnostics: {
      //ignore "cannot use import.meta" TS error b/c it will be transformed by babel-preset-vite
      ignoreCodes: [1343,317],
    },
  }
};
