const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: [
            './js/app.js',
            './scss/style.scss'
        ],
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../'
    },
    // devServer: {
    //     contentBase: path.resolve(__dirname, 'app'),
    //     compress: true,
    //     port: 9080
    // },

    // DEVELOPMENT VERSION:
    devtool: 'inline-source-map',

    // PRODUCTION VERSION:
    //devtool: '',


    module: {
        rules: [
            //SCSS
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true}
                        },
                    ],
                    fallback: 'style-loader',

                })
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                loader: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    },
                    'img-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                    
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader'
            }
        ]
    },
   plugins: [
        new webpack.ProvidePlugin ({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery'
        }),
        new ExtractTextPlugin (
            './css/[name].css'
        ),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin(
            [
               { from: './img', to: 'img' } 
            ],
            {
                ignore: [
                    { glob: 'svg/*'}
                ]
            }
        ),

        // PRODUCTION VERSION:

        // new UglifyJsPlugin({
        //     sourceMap: true
        // }),
        // new ImageminWebpackPlugin({
        //     test: /\.(png|jpe?g|gif|svg)$/i
        // }),
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true
        // })
    ],
};

