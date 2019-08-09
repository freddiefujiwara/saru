module.exports = {
  verbose  : true,
  transform: {
    '^.+\\.js$'  : '<rootDir>/node_modules/babel-jest'
  },
  moduleFileExtensions: ['js'],
  setupTestFrameworkScriptFile: '<rootDir>/jest-setup.js'
};
