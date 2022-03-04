const { aliases } = require("../configs/aliases.config");

module.exports = (baseConfig) => {
	baseConfig.config.resolve.alias = { ...baseConfig.config.resolve.alias, ...aliases };
	return baseConfig.config;
};
