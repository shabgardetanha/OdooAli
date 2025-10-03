const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const dotenv = require('dotenv')

dotenv.config()

const sourceFolder = path.resolve(__dirname, 'frontend', 'src')
const outputFolder = path.resolve(__dirname, 'frontend', 'dist')

const baseConfig = {
    entry: path.resolve(sourceFolder, 'main.tsx'),
    output: {
        path: outputFolder,
        filename: '[name].[contenthash].js',
        clean: true, // حذف فایل‌های قبلی قبل از build
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],

    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                include: sourceFolder,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                include: sourceFolder,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|avif)$/i,
                type: 'asset/resource',
                generator: { filename: 'images/[name].[contenthash][ext]' },
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: true,
            typescript: { configFile: './tsconfig.json' },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'frontend', 'src', 'index.ejs'),
            favicon: './frontend/public/favicons/favicon.ico',
            minify: { collapseWhitespace: true },
            scriptLoading: 'defer',
        }),
        new webpack.DefinePlugin({
            __IS_DEVELOPMENT__: JSON.stringify(
                process.env.NODE_ENV !== 'production'
            ),
            __IS_PRODUCTION__: JSON.stringify(
                process.env.NODE_ENV === 'production'
            ),
            __APP_NAME__: JSON.stringify('OdooAli'),
        }),
        new webpack.ids.HashedModuleIdsPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: 'single',
    },
}

const devConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: { directory: outputFolder },
        historyApiFallback: true,
        hot: true,
        port: 3000,
        client: {
            overlay: true,
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
}

const prodConfig = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        splitChunks: { chunks: 'all' },
        runtimeChunk: 'single',
    },
}

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        return merge(baseConfig, prodConfig)
    }
    return merge(baseConfig, devConfig)
}
