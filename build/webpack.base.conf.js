const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets:'assets/'
};

module.exports = {

    externals: {
       paths: PATHS 
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: ''
    },
    module: {
       rules: [{
           test: /\.js$/,
           loader: 'babel-loader',
           exclude: '/node_modules/'
       }, {
           test: /\.(woff|woff2|eot|ttf|otf)$/,
           use: [
            {
               loader: 'file-loader',
               options: { name: '[name].[ext]' }
           }]
       }, {
           test: /\.(png|jpg|gif|svg)$/,
           use: [
               {
                loader: 'url-loader',
                options: { limit: 50, outputPath: 'img'},
             }, {
                loader: 'file-loader',
                options: { name: '[name].[ext]' }
            }] 
       }, {
           test: /\.scss$/,
           use: [
               'style-loader',
               MiniCssExtractPlugin.loader,
               {
                   loader: 'css-loader',
                   options: { sourceMap: true }
               }, {
                   loader: 'resolve-url-loader',
                   options: { }
               }, {
                   loader: 'postcss-loader',
                   options: {
                       sourceMap: true,
                       config: { path: `${PATHS.src}/js/postcss.config.js` }
                   }
               }, {
                   loader: 'sass-loader',
                       options: {sourceMap: true}
               } 
           ]
       }, {
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, {
                   loader: 'postcss-loader',
                   options: {
                       sourceMap: true,
                       config: { path: `${PATHS.src}/js/postcss.config.js` }
                   }
               }
            ]
        }] 
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img`, to: `${PATHS.assets}img`},
            { from: `${PATHS.src}/static`, to: '' },
            { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts`}
        ]),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        })
    ],
}