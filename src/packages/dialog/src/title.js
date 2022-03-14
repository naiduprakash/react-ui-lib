import { useDialogContext } from "./context";
import { useEffect, useMemo } from "react";

import { forwardRefWithAs, render } from "../../utils/src";
import { useSyncRefs, useId } from "../../hooks/src";

const DialogStates = {
	Open: 0,
	Closed: 1
};

let DEFAULT_TITLE_TAG = "h2";
let Title = forwardRefWithAs(function Title(props, ref) {
	let [{ dialogState, setTitleId }] = useDialogContext("Dialog.Title");

	let id = `reactuilib-dialog-title-${useId()}`;
	let titleRef = useSyncRefs(ref);

	useEffect(() => {
		setTitleId(id);
		return () => setTitleId(null);
	}, [id, setTitleId]);

	let slot = useMemo(() => ({ open: dialogState === DialogStates.Open }), [dialogState]);
	let propsWeControl = { id };
	let passthroughProps = props;

	return render({
		props: { ref: titleRef, ...passthroughProps, ...propsWeControl },
		slot,
		defaultTag: DEFAULT_TITLE_TAG,
		name: "Dialog.Title"
	});
});

export default Title;
