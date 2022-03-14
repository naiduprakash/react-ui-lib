import { useRef, useEffect } from "react";
import { useIsoMorphicEffect } from "./use-iso-morphic-effect";
import { getOwnerDocument } from "../../utils/src";

export function useTreeWalker({ container, accept, walk, enabled = true }) {
	let acceptRef = useRef(accept);
	let walkRef = useRef(walk);

	useEffect(() => {
		acceptRef.current = accept;
		walkRef.current = walk;
	}, [accept, walk]);

	useIsoMorphicEffect(() => {
		if (!container) return;
		if (!enabled) return;
		let ownerDocument = getOwnerDocument(container);
		if (!ownerDocument) return;

		let accept = acceptRef.current;
		let walk = walkRef.current;

		let acceptNode = Object.assign((node) => accept(node), { acceptNode: accept });
		let walker = ownerDocument.createTreeWalker(
			container,
			NodeFilter.SHOW_ELEMENT,
			acceptNode,
			// @ts-expect-error This `false` is a simple small fix for older browsers
			false
		);

		while (walker.nextNode()) walk(walker.currentNode);
	}, [container, enabled, acceptRef, walkRef]);
}
