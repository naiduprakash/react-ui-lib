import React from "react";

import { cx } from "../../../internal/utils/class-names";
import { forwardRefWithAs } from "../../../internal/utils/render";

import Modal from "./modal";
import Content from "./content";
import Overlay from "./overlay";

const Dialog = forwardRefWithAs(function Dialog(props, ref) {
	let { classNames = {}, onClose, children, ...restProps } = props;

	let modalClasses = cx(
		"fixed inset-0 z-[1000] overflow-y-auto flex items-center justify-center",
		classNames.modal
	);
	let overlayClasses = cx(
		"fixed z-[-1] inset-0 bg-[#00073433] backdrop-blur-sm",
		classNames.overlay
	);
	let contentClasses = cx("absolute rounded p-4 h-auto w-auto  bg-white", classNames.content);
	return (
		<Modal ref={ref} onClose={onClose} className={modalClasses} {...restProps}>
			<Content className={contentClasses}>{children}</Content>
			<Overlay className={overlayClasses} onClick={onClose} />
		</Modal>
	);
});

export default Dialog;
