const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

// environment variable from CI/CD pipeline
const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
  // production mode minifies JS and optimizes build
  mode: 'production',
  output: {
    // ensures files use this as a naming template - name of file and hash of file contents - primarily done for caching
    filename: '[name].[contenthash].js',
    // used by webpack to refer to another file that has been built by webpack - prepends filename with this path
    publicPath: '/container/latest/'
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
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
      },
      // automatically adds all dependencies here so they are shared
      // may not be a good idea if you want specific versioning between packages
      shared: packageJson.dependencies
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)
