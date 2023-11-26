
// jest.config.js
module.exports = {
    extensionsToTreatAsEsm: ['.js', '.mjs'],
    testEnvironment: 'node',
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.mjs$': 'babel-jest',
    },
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
  };
  