"use strict"
require('dotenv').config()
const path = require('path'),
    webpack = require('webpack'),   
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin'),
    buildDirectory = path.resolve(__dirname, 'build'),
    isDevelopment = process.env.NODE_ENV !== 'production'

let enableHMR = isDevelopment,
    generateReport = isDevelopment,
    WebpackAssetsManifest = require('webpack-assets-manifest'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const getEntryFiles = function () {
    let entry = new Object()
    entry.main = [path.resolve(__dirname, 'public/src/main.js')]
    entry.vendor = ['lodash.assign'],
    entry.lib = ['jquery', 'parsleyjs']
    //enableHMR && entry.main.push('webpack-hot-middleware/client')
    return entry
}


const rules = [
    {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
    },
    {
        test: /\.less$/,
        use: [
            { loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader },
            {
                loader: 'css-loader',
                options: {
                    module: false,
                    localIdentName: isDevelopment ? '[local]_[hash:base64:5]' : '[hash:base64:10]',
                    sourceMap: isDevelopment,
                    minimize: !isDevelopment
                }
            },
            { loader: 'postcss-loader', options: { sourceMap: isDevelopment } },
            { loader: 'less-loader', options: { sourceMap: isDevelopment } }
        ]
    },
    {
        test: /\.(pdf|jpe?g|png|gif|webp|mp3|ogg|woff|woff2|ttf|svg|eot)$/,
        exclude: [/node_modules/],
        use: 'file-loader?name=[path][name].[hash:8].[ext]'
    },
    {
        test: /\.(pdf|jpe?g|png|gif|webp)$/,
        include: [/node_modules/],
        use: 'file-loader?name=img/[name].[hash:8].[ext]'
    },
    { //can't use [path] for fonts inside node_modules, so copy them to build
        test: /\.(pdf|woff|woff2|ttf|svg|eot)$/,
        include: [/node_modules/],
        use: 'file-loader?name=font/[name].[hash:8].[ext]'
    }

]

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname,"views/front/partials/footer.tmpl.ejs"),
        filename: path.resolve(__dirname, "views/front/partials/footer.ejs"),
        alwaysWriteToDisk: true
    }),
    new HtmlWebpackHardDiskPlugin()
]

plugins.push(
    new WebpackAssetsManifest({
        output: path.resolve(buildDirectory, 'webpack-manifest.json'),
        writeToDisk: true
    })
)

generateReport && plugins.push(
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.resolve(__dirname, 'report.html'),
        openAnalyzer: false
    })
)

const devPlugins = enableHMR ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', "window.$": "jquery" }),
    new webpack.NamedModulesPlugin(), // This plugin will cause the relative path of the module to be displayed when HMR is enabled
    new webpack.NoEmitOnErrorsPlugin() // Skip the emitting phase whenever there are errors while compiling
] : new Array()

const buildPlugins = [
    new CleanWebpackPlugin(buildDirectory),
  new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', "window.$": "jquery", parsley: 'parsleyjs' })
]

module.exports = {
    entry: getEntryFiles(),
    output: {
        path: buildDirectory,
        publicPath:'/',
        filename: enableHMR ? 'js/[name].[hash:20].js' : 'js/[name].[chunkhash:20].js'
    },
    mode: isDevelopment ? 'development' : 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendor'
                },
                styles: {
                    name: 'main',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    module: {
        rules: rules
    },
    plugins: isDevelopment ? [].concat(plugins, devPlugins) : [].concat(plugins, buildPlugins),
    devServer: {
        host: '0.0.0.0',
        port: 8000,
        disableHostCheck: true,
        inline: true,
        historyApiFallback: true,
        hot: true,
        https:true,
        compress: true,
        proxy: {
            '*': {
                target: 'http://localhost:3000'
            }
        }

    },
    devtool: isDevelopment ? 'source-map' : false,
    stats: 'minimal',
    watchOptions: {
        ignored: /(node_modules)/
    }

}
