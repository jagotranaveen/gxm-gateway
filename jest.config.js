
export default {
  rootDir: "./",
  coverageDirectory: "‹rootDir>/coverage",
  collectCoverageFrom: [
    "<rootDir>/src/**/*. js",
    "!<rootDir>/syc/**/constant.js",
  ],
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx'],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  coverageReporters: ["json", "html"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|jsx|js)$",
};
