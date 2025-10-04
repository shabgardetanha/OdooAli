const { join } = require('path')

module.exports = {
    testEnvironment: 'jest-environment-jsdom',

    // مسیرهایی که Jest نباید تست بزنه
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/build/',
        '/frontend/public/',
        '/coverage/',
        '/frontend/tailwind.config.js',
        '/frontend/jest.config.cjs',
    ],

    // تبدیل فایل‌ها با babel-jest
    transform: {
        '^.+\\.[tj]sx?$': [
            'babel-jest',
            { configFile: join(__dirname, 'babel.config.js') },
        ],
    },

    // فایل‌های استاتیک و CSS mock
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    },

    // فایل‌های setup قبل از هر تست
    setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],

    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

    clearMocks: true,
}
