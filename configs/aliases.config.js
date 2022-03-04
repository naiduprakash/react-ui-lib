const path = require("path");

// __dirname gives exact path where the file is, in this case: PROJECT/configs. It is needed to add ../ at the beginning of the aliases to solve correct path.

const aliases = {
	"@react-ui-lib/Button": path.resolve(__dirname, "../src/Button/src")
};

module.exports = { aliases };
