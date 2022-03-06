import React from "react";
import { cx, __DEV__ } from "@react-ui-lib/utils";
import { useButtonClass } from "./styles";

const Button = React.forwardRef((props, ref) => {
	const {
		className = "",
		variant = "solid",
		rounded = false,
		size = "md",
		type = "blue",
		disabled = false,
		children,
		style,
		...restProps
	} = props;

	const classes = useButtonClass({
		disabled,
		variant,
		rounded,
		size,
		type
	});

	let styles = {};
	

	return (
		<button
			ref={ref}
			disabled={disabled}
			style={styles}
			className={cx(classes, className)}
			{...restProps}
		>
			{children}
		</button>
	);
});

export default Button;
