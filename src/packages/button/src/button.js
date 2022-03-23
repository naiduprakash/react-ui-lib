import React from "react";

import { cx } from "../../../internal/utils/class-names";
import { useButtonClass } from "./styles";

import "./index.css";

const Button = React.forwardRef((props, ref) => {
	const {
		className = "",
		variant = "solid",
		rounded = false,
		size = "md",
		color = "blue",
		disabled = false,
		children,
		style = {},
		...restProps
	} = props;
	const classes = useButtonClass({
		disabled,
		variant,
		rounded,
		size,
		color
	});
	let styles = { ...style };

	return (
		<button
			ref={ref}
			disabled={disabled}
			style={styles}
			className={cx(classes, className)}
			role="button"
			{...restProps}
		>
			{children}
		</button>
	);
});

export default Button;
