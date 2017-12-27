'use strict';

// NOTE: to set environment, enter on the command line:
// export NODE_ENV=development
// (with 'development', 'production', 'testing', etc...)

// Node native modules
const glob = require('glob')
const path = require('path')

// To access native Webpack plugins
const webpack = require('webpack')

// webpack plugins
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

// Paths
const paths = {
	source: {
		main: path.resolve(__dirname, '_src'),
		img: path.resolve(__dirname, '_src', 'img'),
		css: path.resolve(__dirname, '_src', 'css'),
		js: path.resolve(__dirname, '_src', 'js'),
		jsdev: path.resolve(__dirname, '_src', 'jsdev'),
	},
	build: {
		main: path.resolve(__dirname),
		img: path.resolve(__dirname, 'img'),
		css: path.resolve(__dirname, 'css'),
		js: path.resolve(__dirname, 'js'),
		jsdev: path.resolve(__dirname, 'jsdev'),
	},
}

console.log(process.env.NODE_ENV);

module.exports = {
	module: {
		rules: [
			{
				test: /\.js/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'env',
							'react'
						]
					}
				}
			},
			{
				test: /\.(scss|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: false,
								minimize: true,
								importLoaders: 2,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [
									require('autoprefixer')(),
									require('css-mqpacker'),
									require('cssnano'),
								],
								sourceMap: false,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								outputStyle: 'expanded',
								sourceMap: false,
							}
						},
					],
				}),
			},
		], // :rules
	},
	context: paths.source.main,
	entry: {
		main: [
			'webfontloader',
			'magnific-popup',
			'jquery',
			'./js/main.js',
		],
		reactInit: [
			'./js/appConfig.js',
			'./js/Header.js',
			'./js/Navigation.js',
			'./js/reactInit.js',
		],
		/**
		 * Note: Styles JavaScript file is made but not used as the CSS is exported.
		 */
		styles: [
			'./scss/reset.css',
			'magnific-popup/dist/magnific-popup.css',
			'./scss/wee-grid.css',
			'./scss/main.scss',
		],
	},
	output: {
		path: paths.build.js,
		publicPath: paths.build.js,
		filename: '[name].js',
	},
	externals: {
		'react': 'React',
		'reactDOM' : 'reactDOM',
	},
	watch: process.env.NODE_ENV === 'development',
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(
			[
				paths.build.js,
				paths.build.css,
				paths.build.img,
				paths.build.jsdev
			],
		{}),
		new ExtractTextPlugin('../css/main.css'),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
		new CopyWebpackPlugin([{
			from: paths.source.img,
			to: paths.build.img,
		},
		{
			from: paths.source.jsdev,
			to: paths.build.jsdev,
		}]),
		new ImageminPlugin({
			disable: process.env.NODE_ENV !== 'prduction',
			test: /\.(jpe?g|png|gif|svg)$/i,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		/*
		new webpack.optimize.UglifyJsPlugin(),
			options: {
				warnings: true,
				ecma: 6,
			}
		}
		*/
	],
};
