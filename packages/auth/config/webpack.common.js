// injects script tags into html file
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [
      // loader - tells webpack to process some files as we import them into project
      {
        test: /\.m?js$/, // process .mjs and .js files with babel
        exclude: /node_modules/, // don't run babel on node_modules
        use: {
          loader: 'babel-loader',
          options: {
            // @babel/preset-react - babel processes all different JSX tags
            // @babel/preset-env - babel converts everything to es5
            // @babel/plugin-transform-runtime - enables different features for our project in the browser (e.g. async await)
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    // looks at files coming out of webpack process and adds them in script tags in public/index.html
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
