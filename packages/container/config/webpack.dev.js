// function that allows us to merge two different webpack config objects
const { merge } = require('webpack-merge')
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
  output: {
    // used by webpack to refer to another file that has been built by webpack - prepends filename with this path
    publicPath: 'http://localhost:8080/'
  },
  plugins: [
    new ModuleFederationPlugin({
      // name is not required for host, but it's included for clarity
      name: 'container',
      // list of projects the container can search to get additional code
      remotes: {
        // key marketing: load the file at the listed URL if anything in the container has an import like "import abc from 'marketing'"
        // value marketing: related to the 'name' property in the marketing webpack.config.js file
        // value URL: URL for remoteEntry file
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8082/remoteEntry.js'
      },
      // automatically adds all dependencies here so they are shared
      // may not be a good idea if you want specific versioning between packages
      shared: packageJson.dependencies
    })
  ]
}

// devConfig should be second so it can override options if duplicated
module.exports = merge(commonConfig, devConfig)
