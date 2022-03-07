const pkg = require("./package.json");
const { aliases } = require("./configs/aliases.config");

module.exports = () => {
	return {
		module: {
			rules: [
				{
					exclude: /node_modules/,
					test: /\.(sa|sc|c)ss$/,
					use: ["style-loader", "css-loader", "sass-loader"]
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
			]
		},
		entry: "./src/index.js",
		output: {
			filename: pkg.main
		},
		resolve: {
			alias: aliases,
			extensions: [".js", ".jsx", ".json"],
			modules: ["node_modules"]
		}
	};
};
