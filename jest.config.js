module.exports = {
    globals: {
      'ts-jest': {
        tsConfig: "tsconfig.test.json"
      }
    },
    preset: "ts-jest",
    moduleFileExtensions: [ "ts", "js" ],
    testRegex: "lib/.*\\.test\\.ts$",
    testEnvironment: "node",

    collectCoverageFrom: [ 'lib/*.ts' ],
    coverageDirectory: "coverage",
    coverageReporters: [ "cobertura", "text" ],
    collectCoverage: true
};
