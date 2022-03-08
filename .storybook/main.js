const { aliases } = require("../configs/aliases.config");

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
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
	webpackFinal: async (config, { configType }) => {
		config.resolve.alias = { ...config.resolve.alias, ...aliases };
		return config;
	},
	framework: "@storybook/react"
};
