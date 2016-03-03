"use strict";
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const env = process.env.NODE_ENV;

const getEntries = function(env) {
    let entry = {
        app: [
            __dirname + '/src/index.js'
        ]
    };

    switch (env) {
        case 'development':
            entry.app.push('webpack/hot/dev-server');
            entry.app.push('webpack-hot-middleware/client');
            break;
    }

    return entry;  
};

const getPlugins = function(env) {
    let plugins = [
        new ExtractTextPlugin('[name].css')
    ];

    switch (env) {
        case 'production':
            plugins.push(new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }));
            plugins.push(new webpack.optimize.OccurenceOrderPlugin());
            plugins.push(new webpack.optimize.DedupePlugin());
            plugins.push(new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }));
            break;
        case 'development':
            plugins.push(new webpack.HotModuleReplacementPlugin());
            plugins.push(new webpack.NoErrorsPlugin());
            break;
    }

    return plugins;
};

// SCSS Loader
const scssLoader = env !== 'production'
    ? 'style!css!postcss!sass'
    : ExtractTextPlugin.extract('style-loader', '!css-loader!postcss-loader!sass-loader');

module.exports = {
    devtool: env === 'production' ? 'source-map' : 'eval',
    debug: !(env === 'production'),
    progress: true,
    entry: getEntries(env),
    plugins: getPlugins(env),
    output: {
        path: __dirname + '/public/assets/dist/',
        filename: 'bundle.js',
        publicPath: '/assets/dist/'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: scssLoader
            }
        ],
    },
    eslint: {
        configFile: path.join(__dirname, env === 'production' ? '.eslintrc' : '.dev.eslintrc')
    },
    postcss: [
        autoprefixer({
          browsers: ['last 2 versions']
        })
    ],
};