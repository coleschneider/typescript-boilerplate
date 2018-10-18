/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.env.NODE_ENV === 'production'
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    vendor: [
      // Required to support async/await
      '@babel/polyfill',
    ],
    main: ['./src/index'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: isProd ? 'source-map' : 'eval',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      // 'react-hot-loader': path.resolve(path.join(__dirname,'./node_modules/react-hot-loader')),
      react: path.resolve(path.join(__dirname, './node_modules/react')),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              'react-hot-loader/babel',
            ],
          },
        },
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          isProd ? CssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: isProd,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isProd,
              plugins: () => [require('autoprefixer')]
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isProd,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      WEBPACK_BUILD_TYPE: JSON.stringify(isProd ? 'production' : 'development'),
    }),

    new CssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: 'body', // put the script files in the body,
    }),
  ],
}