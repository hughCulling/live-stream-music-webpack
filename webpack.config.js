const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/scripts/app.js',
        broadcast: './src/scripts/broadcast.js',
        player: './src/scripts/player.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test:/\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    devServer: {
        client: {
            overlay: true
        },
        hot: true,
        watchFiles: ['src/*', 'index.html']
    },
    plugins: [
        // new CopyWebpackPlugin({
        //     patterns: ['index.html']
        // }),
        new webpack.HotModuleReplacementPlugin(),
        // This generates an index.html file and automatically adds bundles.
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/templates/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'broadcast.html',
            template: 'src/templates/broadcast.html',
            chunks: ['index', 'broadcast'],
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            filename: 'player.html',
            template: 'src/templates/player.html',
            chunks: ['index', 'player'],
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            filename: 'sign-up.html',
            template: 'src/templates/sign-up.html',
            chunks: ['index'],
        })
    ]
};