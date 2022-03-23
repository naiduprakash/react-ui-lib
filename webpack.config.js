const pkg = require("./package.json");

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
							configFile: "../../../babel.config.js"
						}
					}
				}
			]
		}
	};

	return config;
};
