export default {
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: ["**/tests/**/*.(test|spec).ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
