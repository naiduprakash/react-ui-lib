import { useCallback, useMemo } from "react";

import { forwardRefWithAs, render } from "../../utils/src";
import { useSyncRefs, useId } from "../../hooks/src";
import { useDialogContext } from "./context";

const DialogStates = {
	Open: 0,
	Closed: 1
};

let DEFAULT_OVERLAY_TAG = "div";
let Overlay = forwardRefWithAs(function Overlay(props, ref) {
	let [{ dialogState, close }] = useDialogContext("Dialog.Overlay");
	let overlayRef = useSyncRefs(ref);

	let id = `reactuilib-dialog-overlay-${useId()}`;

	let handleClick = useCallback(
		(event) => {
			if (event.target !== event.currentTarget) return;

			event.preventDefault();
			event.stopPropagation();
			close();
		},
		[close]
	);

	let slot = useMemo(() => ({ open: dialogState === DialogStates.Open }), [dialogState]);
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
