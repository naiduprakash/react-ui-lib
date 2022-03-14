const path = require("path");

// __dirname gives exact path where the file is, in this case: PROJECT/configs. It is needed to add ../ at the beginning of the aliases to solve correct path.

const aliases = {
	// "@react-ui-lib/alert": path.resolve(__dirname, "../src/alert/src"),
	// "@react-ui-lib/button": path.resolve(__dirname, "../src/button/src"),
	// "@react-ui-lib/badge": path.resolve(__dirname, "../src/badge/src"),
	// "@react-ui-lib/dialog": path.resolve(__dirname, "../src/dialog/src"),
	// "@react-ui-lib/skeleton": path.resolve(__dirname, "../src/skeleton/src")
};

module.exports = { aliases };
