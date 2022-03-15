import {  forwardRefWithAs, render } from "../../../internal/utils/render";
import { useSyncRefs, useId } from "../../hooks/src";

let DEFAULT_DESCRIPTION_TAG = "div";
let Description = forwardRefWithAs(function Description(props, ref) {
	let id = `reactuilib-description-${useId()}`;
	let descriptionRef = useSyncRefs(ref);

	let passThroughProps = props;
	let propsWeControl = { ref: descriptionRef, id };

	return render({
		props: { ...passThroughProps, ...propsWeControl },
		slot: {},
		defaultTag: DEFAULT_DESCRIPTION_TAG,
		name: "Description"
	});
});

export default Description;
