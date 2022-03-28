import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./index.css";

import { cx } from "../../../internal/utils/class-names";
import useFocus from "../../../internal/hooks/use-focus";

const TextField = React.forwardRef((props, ref) => {
	const {
		id,
		type,
		label,
		placeholder,
		focused,
		error,
		helperText,
		variant,
		classNames = {},
		...restProps
	} = props;
	const inputRef = useRef();
	const isInputFocused = useFocus(inputRef);
	const [isFocused, setIsFocused] = useState(false);

	let inputLabel = placeholder || label || "";

	useEffect(() => {
		let _isFocused = focused || isInputFocused || !!inputRef?.current?.value;
		setIsFocused(_isFocused);
	}, [focused, isInputFocused, inputRef?.current?.value]);

	let rootClasses = cx(classNames.root, "flex flex-col relative rounded");
	let inputClasses = cx(
		classNames.input,
		"rounded border-0 outline-0 p-2 ring-1 ring-gray-500  rounded",
		isFocused ? "ring-blue-500 border-0 outline-0" : "",
		error ? "ring-red-500" : ""
	);
	let labelClasses = cx(
		classNames.label,
		"transition origin-top-left absolute pointer-events-none rounded top-0 bg-transparent left-0 bg-white scale-1 translate-x-2 translate-y-2",
		isFocused ? "translate-y-[-50%] text-blue-500 translate-x-2 scale-[0.75]" : "",
		error && isFocused ? "text-red-500" : ""
	);

	let helperTextClasses = cx(classNames.helperText, error ? "text-red-500" : "");

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
