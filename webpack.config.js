const webpack = require('webpack');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const html = require('html-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PORT = process.env.PORT || 3030;

module.exports = (env, args) => {
  const isProduction = args && args['mode'] === 'production';

  console.log(isProduction ? 'PRODUCTION BUILD' : 'DEVELOPMENT BUILD');

  const config = {
    entry: {
      'scripts/main': path.resolve('./src/main.js'),
    },
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
    },
    target: 'web',
    devtool: isProduction ? false : 'source-map',
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'scripts/vendor',
            chunks: 'initial',
            enforce: true,
          },
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.html', '.txt'],
      alias: {
        react: 'preact',
      },
    },
    module: {
      rules: [
        {
          test: /\.js|jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                  [
                    '@babel/plugin-transform-react-jsx',
                    {
                      pragma: 'h',
                      pragmaFrag: 'Fragment',
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    watchOptions: {
      aggregateTimeout: 100,
      ignored: /node_modules/,
      poll: 300,
    },

    devServer: {
      contentBase: './dist',
      publicPath: '/',
      compress: false,
      port: PORT,
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'normal',
      clientLogLevel: 'error',
      writeToDisk: true,
    },

    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: isProduction ? 'production' : 'development',
        DEBUG: !isProduction,
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        chunks: ['main'],
      }),
      require('autoprefixer'),
    ],
  };

  if (isProduction) {
    config.optimization.minimize = true;
    config.optimization.minimizer = [
      new TerserPlugin({ extractComments: false }),
    ];
  }

  return config;
};
