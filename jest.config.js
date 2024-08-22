/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["<rootDir>/**/tests/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
};
