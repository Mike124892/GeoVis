const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    context: __dirname,
    mode: isProduction ? 'production' : 'development',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        sourcePrefix: '',
        publicPath: '/',
        clean: true,
    },
    amd: {
        toUrlUndefined: true,
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: ['file-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
                { from: 'src/data', to: 'data' }, // Copy all data files
            ]
        }),
        new webpack.DefinePlugin({
            CESIUM_BASE_URL: JSON.stringify('')
        }),
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|json|svg|xml)$/
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
        runtimeChunk: 'single',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
    },
    resolve: {
        alias: {
            cesium: path.resolve(__dirname, cesiumSource),
        },
    },
};
