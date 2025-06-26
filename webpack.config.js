const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const isProd = env.prod === true;

  const filename = (ext) => {
    return isProd ? `[name].[contenthash].${ext}` : `[name].${ext}`;
  };

  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${filename('js')}`,
      publicPath: '/',
      clean: true,
    },
    devtool: isProd ? false : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              targets: 'defaults',
              presets: [['@babel/preset-env']],
            },
          },
        },
        {
          test: /\.svg$/,
          type: 'asset/resource',
        },
        {
          test: /\.(jpe?g|png)$/i,
          type: 'asset/resource',
          generator: {
            filename: `./images/[name][ext]`,
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: `fonts/[name][ext]`,
          },
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/assets/icons/sprite.svg'),
            to: './images',
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './src/main.html',
        filename: `${filename('html')}`,
        minify: 'auto',
      }),
      new MiniCssExtractPlugin({
        filename: `css/${filename('css')}`,
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                quality: 100,
              },
              webp: {
                lossless: true,
              },
              png: {},
            },
          },
        },
        generator: [
          {
            preset: 'webp',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            filter: (source, sourcePath) => !/\.(svg)$/i.test(sourcePath),
            options: {
              encodeOptions: {
                webp: {
                  quality: 80,
                },
              },
            },
            filename: 'images/[name].[contenthash].webp',
          },
        ],
      }),
    ],
    devServer: {
      hot: true,
      compress: true,
      historyApiFallback: {
        index: '/main.html',
        disableDotRule: true,
      },
      port: 4000,
      liveReload: true,
      open: true,
    },
  };
};
