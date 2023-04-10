const path = require('path');
const {merge} = require('webpack-merge');
const {commonConfig} = require('./webpack.common');

const config = merge(
	commonConfig(
		false,
		{
			filename: 'generated_index.html',
			templateParameters: {},
			template: path.resolve(__dirname, 'templates/main.html')
		},
		'Caddy'
	),
	{
		mode: 'production',
		cache: false
	}
);

module.exports = config;
