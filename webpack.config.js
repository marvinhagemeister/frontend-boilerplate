var webpack = require('webpack');
var path = require('path');

var env = process.env.NODE_ENV;

var getEntries = function(env) {
    var entry = {
        scripts: [
            __dirname + '/src/index.js'
        ]
    };

    switch (env) {
        case 'development':
            entry.scripts.push('webpack/hot/dev-server');
            entry.scripts.push('webpack-hot-middleware/client');
            break;
    }

    return entry;  
};

var getPlugins = function(env) {
    var plugins = [];

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

module.exports = {
    devtool: env === 'production' ? 'source-map' : 'eval',
    debug: !(env === 'production'),
    progress: true,
    entry: getEntries(env),
    plugins: getPlugins(env),
    output: {
        path: __dirname + '/dist/assets/js',
        filename: 'bundle.js',
        publicPath: '/assets/js/'
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
            }
        ],
    },
    eslint: {
        configFile: path.join(__dirname, env === 'production' ? '.eslintrc' : '.dev.eslintrc')
    }
};