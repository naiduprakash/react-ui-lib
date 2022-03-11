import React from "react";

const Dialog = React.forwardRef((props) => {
	const {
		open,
		children,
		classNames,
		disableEscapeKeyDown,
		fullScreen,
		fullWidth,
		onBackdropClick,
		onClose
	} = props;
	return <div {...props}>Sample component</div>;
});

export default Dialog;

const Portal = React.forwardRef((props, ref) => {
	const { children, container, disablePortal = false } = props;
	const [mountNode, setMountNode] = React.useState(null);
	const handleRef = React.useRef(React.isValidElement(children) ? children.ref : null, ref);

	React.useEffect(() => {
		if (!disablePortal) {
			setMountNode(getContainer(container) || document.body);
		}
	}, [container, disablePortal]);

	if (disablePortal) {
		if (React.isValidElement(children)) {
			return React.cloneElement(children, {
				ref: handleRef
			});
		}
		return children;
	}

	return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
});
