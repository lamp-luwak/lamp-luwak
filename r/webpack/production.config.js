const { cpus } = require('os')
const {
  LoaderOptionsPlugin,
  optimize: {
    ModuleConcatenationPlugin,
  },
} = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const { config } = require('./common')


module.exports = merge(config, {
  devtool: 'hidden-source-map',

  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash]-c.js',
    crossOriginLoading: 'anonymous',
  },

  plugins: [
    new LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),
    new ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      parallel: cpus().length,
      uglifyOptions: {
        output: { comments: false },
      },
    }),
  ],
})
