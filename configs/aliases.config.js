const path = require("path");

// __dirname gives exact path where the file is, in this case: PROJECT/configs. It is needed to add ../ at the beginning of the aliases to solve correct path.

const aliases = {
	"@react-ui-lib/Button": path.resolve(__dirname, "../src/Button/src"),
	"@react-ui-lib/Alert": path.resolve(__dirname, "../src/Alert/src"),
	"@react-ui-lib/utils": path.resolve(__dirname, "../src/utils/src")
};

module.exports = { aliases };
