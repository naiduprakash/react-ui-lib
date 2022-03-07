import React from "react";
import { cx, __DEV__ } from "@react-ui-lib/utils";
import { useAlertClass } from "./styles";

const Alert = React.forwardRef((props) => {
	const {
		children,
		className,
		variant = "standard",
		type = "primary",
		style = {},
		...restProps
	} = props;

	const classes = useAlertClass({
		variant,
		type
	});

	let styles = { ...style };

	return (
		<div style={styles} className={cx(classes, className)} role="alert" {...restProps}>
			{children}
		</div>
	);
});

export default Alert;
