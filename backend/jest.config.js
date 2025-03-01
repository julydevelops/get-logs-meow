module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Collect coverage while running tests
  collectCoverage: true,
  // Specify which files to include in coverage
  collectCoverageFrom: [
    'src/**/*.ts',      // or wherever your source files live
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  // Output coverage files to a specific directory
  coverageDirectory: 'coverage'
};