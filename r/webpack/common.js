process.title = 'instaclone:webpack'

const { cpus } = require('os')
const { resolve } = require('path')
const {
  optimize: { CommonsChunkPlugin },
  // NoEmitOnErrorsPlugin,
  EnvironmentPlugin,
} = require('webpack')
const HappyPack = require('happypack')
const HtmlPlugin = require('html-webpack-plugin')


const { NODE_ENV = 'development' } = process.env
const IS_PROD = NODE_ENV === 'production'
const IS_DEV = NODE_ENV === 'development'
const IS_TEST = NODE_ENV === 'test'

const DIST = resolve(__dirname, '..', 'dist')
const SRC = resolve(__dirname, '..', 'client')

const config = {
  context: SRC,
  target: 'web',

  entry: {
    polyfill: [
      'whatwg-fetch',
    ],
    index: ['./index'],
  },

  output: {
    path: DIST,
    publicPath: '/',
  },

  resolve: {
    extensions: ['.mjs', '.js'],

    alias: {
      '~': SRC,
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          'happypack/loader',
        ],
      },
      {
        test: /\.svg$/,
        use: 'react-svg-loader',
      },
    ],
  },

  plugins: [
    // new NoEmitOnErrorsPlugin(),
    new HappyPack({
      threads: cpus().length,
      loaders: ['babel-loader'],
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['index'],
      filename: IS_DEV ? '[name].js' : '[name]-[chunkhash].js',
      minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new CommonsChunkPlugin({
      name: 'index',
      filename: IS_DEV ? '[name].js' : '[name]-[chunkhash].js',
      children: true,
      minChunks: 2,
    }),
    // new CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity,
    // }),
    new HtmlPlugin({
      title: 'Instaclone',
      template: 'index.tpl.html',
    }),
    new EnvironmentPlugin({
      NODE_ENV,
    }),
  ],

  stats: {
    colors: true,
    children: false,
  },
}

module.exports = {
  config,

  IS_DEV,
  IS_PROD,
  IS_TEST,

  DIST,
  SRC,
}
