const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: [
		'./src/app.ts',
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [ 'ts-loader' ],
				exclude: /node_modules/,
			}
		],
	},
	devServer: {
		contentBase: path.resolve(__dirname, './public'),
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: './public/index.html', to: 'index.html' },
			],
		}),
	],
};
