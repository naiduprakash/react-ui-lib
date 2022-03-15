const __DEV__ = process.env.NODE_ENV !== "production";

let _warning = function () {};

if (__DEV__) {
	let printWarning = function printWarning(format, args) {
		let len = arguments.length;
		args = new Array(len > 1 ? len - 1 : 0);
		for (let key = 1; key < len; key++) {
			args[key - 1] = arguments[key];
		}
		let argIndex = 0;
		let message =
			"Warning: " +
			format.replace(/%s/g, function () {
				return args[argIndex++];
			});
		if (typeof console !== "undefined") {
			console.error(message);
		}
		try {
			// --- Welcome to debugging React ---
			// This error was thrown as a convenience so that you can use this stack
			// to find the callsite that caused this warning to fire.
			throw new Error(message);
		} catch (x) {}
	};

	_warning = function (condition, format, args) {
		let len = arguments.length;
		args = new Array(len > 2 ? len - 2 : 0);
		for (let key = 2; key < len; key++) {
			args[key - 2] = arguments[key];
		}
		if (format === undefined) {
			throw new Error(
				"`warning(condition, format, ...args)` requires a warning " + "message argument"
			);
		}
		if (!condition) {
			printWarning.apply(null, [format].concat(args));
		}
	};
}

export const warning = _warning;
