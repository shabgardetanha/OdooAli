import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import path from 'path'
import { fileURLToPath } from 'url'

// parsers
import babelParser from '@babel/eslint-parser'
import tsParser from '@typescript-eslint/parser'

// plugins
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactPerf from 'eslint-plugin-react-perf'
import prettier from 'eslint-plugin-prettier'
import testingLibrary from 'eslint-plugin-testing-library'
import jestDom from 'eslint-plugin-jest-dom'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

export default [
    // ⛔️ Ignore patterns
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            'frontend/public/**',
            '**/*.min.js',
            'coverage/',
            'public/',
            'tsconfig.json',
            'package.json',
            'jest.config.js',
            'babel.config.js',
            'tailwind.config.js',
            'webpack.config.js',
            'vite.config.js',
            '**/vite.config.js',
            'eslint.config.js',
        ],
    },

    // ✅ JS/JSX + React
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: {
                __IS_DEVELOPMENT__: 'readonly',
                __IS_PRODUCTION__: 'readonly',
                __API_URL__: 'readonly',
                __APP_NAME__: 'readonly',
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-perf': reactPerf,
            prettier,
            'testing-library': testingLibrary,
            'jest-dom': jestDom,
        },
        rules: {
            semi: ['error', 'never'],
            'no-console': 'error',
            'react/prop-types': 'off',
        },
    },

    // ✅ TypeScript
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
                project: './tsconfig.json',
            },
            globals: {
                __IS_DEVELOPMENT__: 'readonly',
                __IS_PRODUCTION__: 'readonly',
                __API_URL__: 'readonly',
                __APP_NAME__: 'readonly',
            },
        },

        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-extra-semi': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-magic-numbers': [
                'error',
                {
                    ignoreArrayIndexes: true,
                    ignoreDefaultValues: true,
                    ignore: [-1, 0, 1],
                },
            ],
        },
    },
]
