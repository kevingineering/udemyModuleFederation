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
    publicPath: '/marketing/latest/'
  },
  plugins: [
    // currently identical to common but could easily be different
    new ModuleFederationPlugin({
      // name is not required for host, but it's included for clarity
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

module.exports = merge(commonConfig, prodConfig)
