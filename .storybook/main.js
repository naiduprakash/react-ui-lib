const { aliases } = require("../configs/aliases.config");

module.exports = {
	stories: ["../src/packages/**/*.stories.mdx", "../src/packages/**/*.stories.@(js|jsx|ts|tsx)"],
	core: {
		builder: "webpack5"
	},
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		{
			name: "@storybook/addon-postcss",
			options: {
				postcssLoaderOptions: {
					// When using postCSS 8
					implementation: require("postcss")
				}
			}
		}
	],
	framework: "@storybook/react"
};
