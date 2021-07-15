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
    port: 8080,
    // navigation property
    historyApiFallback: true
  },
  plugins: [
    // looks at files coming out of webpack process and adds them in script tags in public/index.html
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      // name is not used, but it's included for clarity
      name: 'container',
      // list of projects the container can search to get additional code
      remotes: {
        // key marketing: load the file at the listed URL if anything in the container has an import like "import abc from 'marketing'"
        // value marketing: related to the 'name' property in the marketing webpack.config.js file
        // value URL: URL for remoteEntry file
        marketing: 'marketing@http://localhost:8081/remoteEntry.js'
      },
      // automatically adds all dependencies here so they are shared
      // may not be a good idea if you want specific versioning between packages
      shared: packageJson.dependencies
    })
  ]
}

// devConfig should be second so it can override options if duplicated
module.exports = merge(commonConfig, devConfig)
