const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  test: path.join(__dirname, 'test')
};

const commonConfig = {
  entry: PATHS.app,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
        include: [PATHS.app, PATHS.test]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      title: 'Kanban app',
      appMountId: 'app',
      inject: false
    })
  ]
};

const developmentConfig = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,

    // display only errors to reduce the amount of output
    stats: 'errors-only',

    // parse host and port from env so this is easy
    // to customize
    host: process.env.HOST,
    port: process.env.PORT
  },
  module: {
    loaders: [
      // Define development specific CSS setup
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

const productionConfig = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      // Extract CSS during build
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new Clean([PATHS.build]),
    // Output extracted CSS to a file
    new ExtractTextPlugin('styles.[contenthash].css'),
    // Extract vendor and manifest files
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    // Setting DefinePlugin affects React library size!
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

const testConfig = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: 'null-loader'
      }
    ]
  }
};

module.exports = (env) => {
  process.env.BABEL_ENV = env;

  if (env === 'development') {
    return merge(commonConfig, developmentConfig);
  }

  if (env === 'test') {
    return merge(commonConfig, testConfig);
  }

  return merge(commonConfig, productionConfig);
};
