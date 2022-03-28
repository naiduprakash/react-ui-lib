import { forwardRefWithAs, render } from "../packages/utils";

let DEFAULT_VISUALLY_HIDDEN_TAG = "div";

export let VisuallyHidden = forwardRefWithAs(function VisuallyHidden(props, ref) {
	return render({
		props: {
			...props,
			ref,
			style: {
				position: "absolute",
				width: 1,
				height: 1,
				padding: 0,
				margin: -1,
				overflow: "hidden",
				clip: "rect(0, 0, 0, 0)",
				whiteSpace: "nowrap",
				borderWidth: "0"
			}
		},
		slot: {},
		defaultTag: DEFAULT_VISUALLY_HIDDEN_TAG,
		name: "VisuallyHidden"
	});
});
