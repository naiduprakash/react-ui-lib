const autoprefixer = require("autoprefixer");
const rules = [
	{
		test: /(\.css|\.scss|\.sass)$/,
		use: [
			"style-loader",
			{ loader: "css-loader", options: { sourceMap: true } },
			{
				loader: "postcss-loader",
				options: {
					sourceMap: true,
					ident: "postcss",
					plugins: [autoprefixer]
				}
			},
			{ loader: "sass-loader", options: { sourceMap: true } }
		]
	},
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				presets: ["@babel/preset-env", "@babel/react"]
			}
		}
	}
];

module.exports = rules;
