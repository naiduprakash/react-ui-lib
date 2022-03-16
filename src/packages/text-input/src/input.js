import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";
import { cx } from "src/internal/utils/class-names";
import useFocus from "src/internal/hooks/use-focus";

const TextInput = React.forwardRef((props, ref) => {
	const { id, type, label, placeholder, focused, error, helperText } = props;
	const inputRef = useRef();
	const isInputFocused = useFocus(inputRef);

	let isFocused = focused || isInputFocused || !!inputRef?.current?.value;
	let inputLabel = placeholder || label || "";

	let rootClasses = cx("flex flex-col relative rounded");
	let inputClasses = cx(
		"rounded border-0 outline-0 p-4 ring-2 ring-gray-500  rounded",
		focused ? "ring-blue-500 border-0 outline-0" : "",
		error ? "ring-red-500" : ""
	);
	let labelClasses = cx(
		"transition origin-top-left absolute pointer-events-none rounded top-0 bg-transparent left-0 bg-white scale-1 translate-x-4 translate-y-4",
		isFocused ? "translate-y-[-50%] translate-x-4 scale-[0.75]" : "",
		error && isFocused ? "text-red-500" : ""
	);

	let helperTextClasses = cx("", error ? "text-red-500" : "");

	return (
		<div ref={ref} className={rootClasses}>
			<input id={id} ref={inputRef} type={type} className={inputClasses} placeholder="" />
			<label htmlFor={id} className={labelClasses}>
				{inputLabel}
			</label>
			<p className={helperTextClasses}>{helperText}</p>
		</div>
	);
});

TextInput.defaultProps = {
	variant: "standard"
};

TextInput.propTypes = {
	variant: PropTypes.oneOf(["standard", "filled", "outlind"])
};

export default TextInput;
