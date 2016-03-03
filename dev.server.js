var webpack = require('webpack');
var browserSync = require('browser-sync');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var config = require('./webpack.config');
var bundler = webpack(config);

browserSync.init({
    server: 'public',
    open: false,
    ui: false,
    middleware: [
        webpackDevMiddleware(bundler, {
            publicPath: config.output.publicPath,
            stats: {
                colors: true
            }
        }),
        webpackHotMiddleware(bundler)
    ],
    files: [
        'public/*.html'
    ]
});
