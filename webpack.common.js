const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

// configurationSource may be 'Webpack', 'Caddy', or 'Hardcoded' depending on environment

commonConfig = (devBuild, htmlWebpackOptions, configurationSource) => {
	const buildPath = path.resolve(__dirname, 'public', 'build');
	const mainPath = path.resolve(__dirname, 'src', 'index.tsx');

	const expandedConfiguration = {};

	if (configurationSource === 'Webpack') {
		// these should be defined in environment or .env file
		expandedConfiguration['CONFIGURATION_API_BASE'] = JSON.stringify(process.env.API_BASE);
		expandedConfiguration['CONFIGURATION_AUTH_CLIENT_ID'] = JSON.stringify(process.env.AUTH_CLIENT_ID);
		expandedConfiguration['CONFIGURATION_AUTH_URL'] = JSON.stringify(process.env.AUTH_URL);
		expandedConfiguration['CONFIGURATION_REDIRECT_URI'] = JSON.stringify(process.env.REDIRECT_URI);
	}

	return {
		entry: {
			mainBundle: [mainPath]
		},
		optimization: {
			moduleIds: 'deterministic',
			chunkIds: 'named',
			splitChunks: {
				maxInitialRequests: Infinity,
				minSize: 0,
				chunks: 'all',
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
							return `vendor.${packageName.replace('@', '')}`;
						}
					}
				}
			}
		},
		output: {
			crossOriginLoading: 'anonymous',
			filename: 'js/[name].[contenthash].js',
			path: buildPath,
			publicPath: '/',
			assetModuleFilename: 'assets/[hash][ext][query]'
		},
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			fallback: {
				"url": require.resolve("url"),
				"util": require.resolve("util"),
				"https": require.resolve("https-browserify"),
				"querystring": require.resolve("querystring-es3"),
				"assert": require.resolve("assert"),
				"http": require.resolve("stream-http"),
				"buffer": require.resolve("buffer"),
				"crypto": require.resolve("crypto-browserify"),
				"stream": require.resolve("stream-browserify")
			}
		},
		module: {
			rules: [
				{
					test: /\.[jt]sx?$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
							plugins: [
								'@babel/proposal-class-properties',
								'@babel/proposal-object-rest-spread',
								'@babel/plugin-proposal-nullish-coalescing-operator',
								'@babel/plugin-proposal-optional-chaining'
							].filter(Boolean)
						}
					}
				},
			]
		},
		plugins: [
			new Webpack.ProvidePlugin({
				Buffer: ['buffer', 'Buffer'],
				process: 'process/browser',
			}),
			new Webpack.DefinePlugin({
				CONFIGURATION_SOURCE: JSON.stringify(configurationSource),
				...expandedConfiguration
			}),
			new HtmlWebpackPlugin({
				chunks: ['mainBundle'],
				...htmlWebpackOptions
			})
		].filter(Boolean)
	};
};

module.exports = {commonConfig};
