import React from "react";

const Component = React.forwardRef((props) => {
	return <div {...props}>Sample component</div>;
});

export default Component;
