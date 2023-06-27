// eslint-disable-next-line import/no-internal-modules
const nxPreset = require('@nrwl/jest/preset');

module.exports = {
    ...nxPreset,
    testPathIgnorePatterns: ['<rootDir>/e2e/'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
    reporters: ['default', 'jest-junit'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '\\.(gif|png|jpe?g|svg)$': '../../scripts/jest/file-transformer',
        '\\.scss$': '../../scripts/jest/style-transformer',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
};
