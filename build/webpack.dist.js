var path = require('path')
var webpack = require('webpack')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var regexCombiner = require('regex-combiner')

var nameCache = {}

module.exports = {
    entry: {
        'star-rating': './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].min.js',
        library: 'VueStarRating',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            enforce: "pre",
            test: /\.(js|vue)$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new UglifyJSPlugin({
            test: /\.js($|\?)/i,
            cache: true,
            parallel: false,
            sourceMap: true,
            uglifyOptions: {
                ie8: false,
                mangle: {
                  properties: {
                    regex: regexCombiner([
                      /^([A-Z][A-Z0-9]*_)([A-Z0-9]+_?)*$/,
                      /^\$(style|createElement)$/
                    ])
                  }
                },
                nameCache: nameCache
            }
        })
    ],
    devtool: 'source-map'
}
