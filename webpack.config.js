const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: './src/main.js', // Our main client-side JavaScript
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/scripts/main.js',
    publicPath: '', // Ensures assets are served from the root
  },
  module: {
    rules: [
       {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader', // Compiles Pug to a JS function
        options: {
          // pretty: process.env.NODE_ENV === 'development', // Optional: for readable HTML
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // Handles images imported/required in JS/CSS
        generator: {
          filename: 'assets/images/[hash][ext][query]', // Outputs images to dist/img/
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      // For webpack v5, you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/main.pug', // Use our new shell Pug template
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename:'assets/styles/main.css',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve files from the 'dist' folder
    },
    port: 4000,
    hot: true, // Enable Hot Module Replacement
    historyApiFallback: true, // Important for client-side routing
  },
  resolve: {
    alias: {
      // Alias to make imports cleaner, points to the project root
      '@components': path.resolve(__dirname, '.'),
    },
  },

};