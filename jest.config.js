module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tasks/setUpTests.ts'],
  testURL: 'http://testing',
  testMatch: ['<rootDir>/src/**/__tests__/**/!(constants|types).{ts,tsx}'],
  collectCoverageFrom: ['!src/*.{ts,tsx}', '!src/store/*.ts', 'src/**/!(constants|types).{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageThreshold: {
    'src/**/*.{ts,tsx}': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
