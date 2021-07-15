// function that allows us to merge two different webpack config objects
const { merge } = require('webpack-merge')
// injects script tags into html file
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  // allows webpack-dev-server to serve this file on this port
  devServer: {
    port: 8081,
    // navigation property
    historyApiFallback: true
  },
  plugins: [
    // looks at files coming out of webpack process and adds them in script tags in public/index.html
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'marketing',
      // sets the name of the manifest file - should be remoteEntry.js unless a good reason not to be
      // manifest file contains list of files available in project and directions on how to load them
      filename: 'remoteEntry.js',
      exposes: {
        // aliases filenames
        './MarketingApp': './src/bootstrap'
      },
      // automatically adds all dependencies here so they are shared
      // may not be a good idea if you want specific versioning between packages
      shared: packageJson.dependencies
    })
  ]
}

// devConfig should be second so it can override options if duplicated
module.exports = merge(commonConfig, devConfig)
