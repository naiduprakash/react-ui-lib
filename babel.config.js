// const { aliases } = require("./configs/aliases.config");
const path = require("path");

function resolveAliasPath(relativeToBabelConf) {
	const resolvedPath = path.relative(
		process.cwd(),
		path.resolve(__dirname, relativeToBabelConf)
	);
	return `./${resolvedPath.replace("\\", "/")}`;
}

const aliases = {
	"@react-ui-lib/alert": resolveAliasPath("./src/packages/alert/src"),
	"@react-ui-lib/button": resolveAliasPath("./src/packages/button/src"),
	"@react-ui-lib/badge": resolveAliasPath("./src/packages/badge/src"),
	"@react-ui-lib/dialog": resolveAliasPath("./src/packages/dialog/src"),
	"@react-ui-lib/skeleton": resolveAliasPath("./src/packages/skeleton/src")
};

module.exports = function getBabelConfig(api) {
	const env = api.env("development");

	let presets = ["@babel/preset-env", "@babel/preset-react"];

	return {
		ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
		presets,
		plugins: [
			[
				"module-resolver",
				{
					root: ["./"],
					alias: aliases
				}
			]
		]
	};
};
