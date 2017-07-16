const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: './src/scripts/probe.js',
    },
    output: {
        path: path.resolve(__dirname, './wp-content/themes/snobart/scripts'),
        filename: 'probe.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            // excluding some local linked packages.
            // for normal use cases only node_modules is needed.
            exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }

        }]
        // postLoaders: [
        //     {
        //         include: '/node_modules/pixi.js',
        //         loader: 'transform?brfs'
        //     }
        // ]

    },
    plugins: [
        new UglifyJSPlugin()
    ]
}