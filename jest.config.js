/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  testMatch: ['**/tests/**/*.(test|spec).ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json'
    }
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
}
