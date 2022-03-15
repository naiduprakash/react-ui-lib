import { useCallback, useMemo } from "react";

import { forwardRefWithAs, render } from "../../../internal/utils/render";
import { useSyncRefs, useId } from "../../hooks/src";

const DialogStates = {
	Open: 0,
	Closed: 1
};

let DEFAULT_OVERLAY_TAG = "div";
let Overlay = forwardRefWithAs(function Overlay(props, ref) {
	let overlayRef = useSyncRefs(ref);

	let id = `reactuilib-dialog-overlay-${useId()}`;

	let handleClick = useCallback(
		(event) => {
			if (event.target !== event.currentTarget) return;
			if (props.onClick) {
				event.preventDefault();
				event.stopPropagation();
				props.onClick(event);
			}
		},
		[close]
	);

	let slot = useMemo(() => ({}), []);
	let propsWeControl = {
		ref: overlayRef,
		id,
		"aria-hidden": true,
		onClick: handleClick
	};
	let passthroughProps = props;
	return render({
		props: { ...passthroughProps, ...propsWeControl },
		slot,
		defaultTag: DEFAULT_OVERLAY_TAG,
		name: "Dialog.Overlay"
	});
});

export default Overlay;
