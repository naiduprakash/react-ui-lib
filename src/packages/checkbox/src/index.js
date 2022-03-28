import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import CheckBoxOutlineBlankIcon from "./checkbox-outline-blank-icon";
import CheckBoxIcon from "./checkbox-icon";
import IndeterminateCheckBoxIcon from "./indeterminate-checkbox-icon";
import "./index.css";

import { cx } from "../../../internal/utils/class-names";
import useFocus from "../../../internal/hooks/use-focus";

const Checkbox = React.forwardRef((props, ref) => {
	const {
		checked = false,
		onChange,
		indeterminate = false,
		classNames = {},
		...restProps
	} = props;
	const inputRef = useRef();

	const isFocused = useFocus(inputRef);

	let SVGCheckboxIcon = null;
	if (indeterminate) {
		SVGCheckboxIcon = IndeterminateCheckBoxIcon;
	} else if (checked) {
		SVGCheckboxIcon = CheckBoxIcon;
	} else {
		SVGCheckboxIcon = CheckBoxOutlineBlankIcon;
	}

	const handleOnChange = (e) => {
		onChange && onChange(e);
	};

	let rootClasses = cx(
		"inline-flex items-center content-center relative box-border bg-transparent outline-0 border-0 m-0 cursor-pointer select-none align-middle appearance-none p-2 rounded-[50%] text-blue-500 hover:bg-blue-50 focus:bg-blue-50",
		classNames.root
	);

	let inputClasses = cx(
		"cursor-[inherit] absolute opacity-0 w-full h-full top-0 left-0 m-0 p-0 z-[1] ",
		classNames.input
	);
	let iconClasses = cx(
		"w-[1em] h-[1em] select-none inline-block fill-current shrink-0 text-[1.5rem]",
		classNames.icon
	);

	return (
		<span ref={ref} className={rootClasses} tabIndex="0">
			<input
				ref={inputRef}
				type="checkbox"
				className={inputClasses}
				checked={checked}
				onChange={handleOnChange}
				tabIndex={-1}
				{...restProps}
			/>
			<SVGCheckboxIcon className={iconClasses} />
		</span>
	);
});

export default Checkbox;
