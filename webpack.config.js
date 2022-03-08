const pkg = require("./package.json");
const { aliases } = require("./configs/aliases.config");

module.exports = (env) => {
	let config = {
		entry: "./src/index.js",
		output: {
			filename: pkg.main,
			libraryTarget: "umd",
			library: env.package || "react-ui-lib"
		},
		module: {
			rules: [
				{
					test: /(\.css|\.scss|\.sass)$/,
					use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
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
		resolve: {
			alias: aliases,
			extensions: [".js", ".jsx", ".json"],
			modules: ["node_modules"]
		}
	};

	return config;
};
