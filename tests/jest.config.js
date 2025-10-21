module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/setup.ts'],
  collectCoverageFrom: [
    '../Tarot_museum/tarot-museum/src/**/*.{ts,tsx}',
    '!../Tarot_museum/tarot-museum/src/**/*.d.ts',
    '!../Tarot_museum/tarot-museum/src/main.tsx',
    '!../Tarot_museum/tarot-museum/src/test/**',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
  coverageDirectory: '<rootDir>/coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../Tarot_museum/tarot-museum/src/$1',
    '^@components/(.*)$': '<rootDir>/../Tarot_museum/tarot-museum/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/../Tarot_museum/tarot-museum/src/pages/$1',
    '^@services/(.*)$': '<rootDir>/../Tarot_museum/tarot-museum/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/../Tarot_museum/tarot-museum/src/utils/$1',
    '^@styles/(.*)$': '<rootDir>/../Tarot_museum/tarot-museum/src/styles/$1',
    '^@assets/(.*)$': '<rootDir>/../Tarot_museum/tarot-museum/src/assets/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    }],
  },
  testTimeout: 10000,
};
