const pkg = require("./package.json");
const { aliases } = require("./configs/aliases.config");
const rules = require("./configs/rules.config");

module.exports = () => {
	let config = {
		module: {
			rules: rules
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

	console.log(config);
	return config;
};
