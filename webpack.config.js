const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PAGES = ['index', 'contacts'];
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WebpackDevServer = require('webpack-dev-server');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';
    return {
        mode: "production",
        // точки входа
        entry: {
            'index': './src/js/index.js',
            'contacts': './src/js/contacts.js'
        },
        // точки выхода
        output: {
            filename: 'js/[name].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            assetModuleFilename: 'images/[name][ext]'
        },
        // настройка plugins (обычно обрабатывают файлы после создания бандла. Они более мощные и более сложные)
        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/[name].css",
            }),
            ...PAGES.map((page) => new HtmlWebpackPlugin({
                    title: page.toUpperCase(),
                    template: `src/${page}.html`,
                    filename: `${page}.html`,
                    chunks: [page],
                    inject: false,
                })
            ),
            new ImageMinimizerPlugin({
                minimizerOptions: {
                    plugins: [
                        ["imagemin-pngquant", { strip: true, quality: [0.2, 0.7]}],
                        ["imagemin-mozjpeg", { quality: 20 }]
                    ]
                },
            }),
        ],
        // настройка loaders (обрабатывают файлы до создания бандла, предоставляют только одну функцию для webpack и
        // не влияют на фактический процесс сборки)
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(sa|sc|c)ss$/i,
                    exclude: /node_modules/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ],
                },
                // загрузка изображений
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    exclude: /node_modules/,
                    type: 'asset/resource'
                },

            ]
        },
        optimization: {
            minimizer: [
                `...`,
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: {removeAll: true},
                            },
                        ],
                    },
                }),
            ],
        },
        devServer: {
            static: './dist',
            port: 9000,
            client: {
                logging: 'warn', // 'log' | 'info' | 'warn' | 'error' | 'none'
                overlay: false,
            }
        }
    }
}

