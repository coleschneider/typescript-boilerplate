const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

//PLUGINS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

//CONSTANTS
const buildDir = 'dist';
const NODE_ENV = process.env.NODE_ENV || 'dev';
const isProd = NODE_ENV === 'prod';

module.exports = {

    entry: {
    app: ['react-hot-loader/patch', './src/index.tsx']
  },
  output: {
    path: `${__dirname}/${buildDir}`,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
  },
  target: 'web',
  devtool: isProd ? 'source-map' : 'eval',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
    optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: !isProd,
            experimentalWatchApi: true,
          },
        }, ],
        exclude: /node_modules/,
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
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(gif|ico|jpg|png|svg)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                full: true,
                plugins: [{
                    removeTitle: true
                  }, //@ADA compliance (DSP-16035)
                  {
                    removeDesc: true
                  }, //@ADA compliance (DSP-16035)
                ],
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

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

    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: 'body', // put the script files in the body,
      APP_NAME: require('./package.json').name,
      VERSION: require('./package.json').version,
    }),

    new ForkTsCheckerWebpackPlugin()
  ],

  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: `${buildDir}/`,
    stats: 'minimal',
    clientLogLevel: 'warning'
  },
};