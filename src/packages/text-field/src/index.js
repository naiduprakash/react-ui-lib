import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./index.css";

import { cx } from "../../../internal/utils/class-names";
import useFocus from "../../../internal/hooks/use-focus";

const TextField = React.forwardRef((props, ref) => {
	const { id, type, label, placeholder, focused, error, helperText, variant, ...restProps } =
		props;
	const inputRef = useRef();
	const isInputFocused = useFocus(inputRef);
	const [isFocused, setIsFocused] = useState(false);

	let inputLabel = placeholder || label || "";

	console.log("focused", focused);
	console.log("isInputFocused", isInputFocused);
	console.log("inputRef?.current?.value", inputRef?.current?.value);
	console.log("isFocused", isFocused);
	useEffect(() => {
		let _isFocused = focused || isInputFocused || !!inputRef?.current?.value;
		setIsFocused(_isFocused);
	}, [focused, isInputFocused, inputRef?.current?.value]);

	let rootClasses = cx("flex flex-col relative rounded");
	let inputClasses = cx(
		"rounded border-0 outline-0 p-4 ring-2 ring-gray-500  rounded",
		isFocused ? "ring-blue-500 border-0 outline-0" : "",
		error ? "ring-red-500" : ""
	);
	let labelClasses = cx(
		"transition origin-top-left absolute pointer-events-none rounded top-0 bg-transparent left-0 bg-white scale-1 translate-x-4 translate-y-4",
		isFocused ? "translate-y-[-50%] text-blue-500 translate-x-4 scale-[0.75]" : "",
		error && isFocused ? "text-red-500" : ""
	);

	let helperTextClasses = cx("", error ? "text-red-500" : "");

	return (
		<div ref={ref} className={rootClasses}>
			<input
				id={id}
				ref={inputRef}
				type={type}
				className={inputClasses}
				placeholder=""
				{...restProps}
			/>
			<label htmlFor={id} className={labelClasses}>
				{inputLabel}
			</label>
			{helperText && <p className={helperTextClasses}>{helperText}</p>}
		</div>
	);
});

TextField.defaultProps = {
	variant: "outlind",
	type: "text"
};

TextField.propTypes = {
	variant: PropTypes.oneOf(["standard", "filled", "outlind"]),
	type: PropTypes.oneOf(["email", "number", "password", "search", "tel", "text", "url"])
};

export default TextField;
