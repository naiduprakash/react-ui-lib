import React from "react";

import "./index.css";
import useSkeletonClass from "./styles";

const Skeleton = React.forwardRef((props) => {
	const {
		animation = "pulse",
		variant = "text",
		width,
		height,
		className,
		...restProps
	} = props;

	const classes = useSkeletonClass({
		animation,
		variant,
		width,
		height,
		className
	});
	let isText = variant === "text";
	return (
		<span data-text="d " className={classes} {...restProps}>
			{isText ? <>&zwnj;</> : ""}
		</span>
	);
});

export default Skeleton;
