/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Use jest-transform-stub for SVG files
    "\\.(jpg|jpeg|png|gif|svg)$": "jest-transform-stub",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

module.exports = config;
