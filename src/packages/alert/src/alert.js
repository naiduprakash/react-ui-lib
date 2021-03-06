import React from "react";

import { cx } from "../../../internal/utils/class-names";
import { useAlertClass } from "./styles";

import "./index.css";

const Alert = React.forwardRef((props,ref) => {
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
		<div ref={ref} style={styles} className={cx(classes, className)} role="alert" {...restProps}>
			{children}
		</div>
	);
});

export default Alert;
