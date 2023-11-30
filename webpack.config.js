const path = require('path');
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
};
