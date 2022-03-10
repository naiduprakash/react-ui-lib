import React from "react";

import "./index.css";

import { useRootClass, useBadgeClass } from "./styles";

const Badge = React.forwardRef((props, ref) => {
	const {
		position = { vertical: "top", horizontal: "right" },
		badgeContent = " ",
		children = "",
		classNames = { root: "", badge: "" },
		type = "primary",
		visible = true,
		variant = "standard",
		...restProps
	} = props;

	let rootClasses = useRootClass({
		className: classNames["root"]
	});
	let badgeClasses = useBadgeClass({
		position,
		className: classNames["badge"],
		type,
		visible,
		variant
	});

	let isDotvariant = variant === "dot";
	let badgeEle = <span className={badgeClasses}>{isDotvariant ? "" : badgeContent}</span>;

	return (
		<span ref={ref} className={rootClasses} {...restProps}>
			{children}
			{badgeEle}
		</span>
	);
});

export default Badge;
