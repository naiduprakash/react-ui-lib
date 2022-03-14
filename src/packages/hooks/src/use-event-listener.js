import { useEffect } from "react";

import { useLatestValue } from "./use-latest-value";

export function useEventListener(element, type, listener, options) {
	let listenerRef = useLatestValue(listener);

	useEffect(() => {
		element = element ?? window;

		function handler(event) {
			listenerRef.current(event);
		}

		element.addEventListener(type, handler, options);
		return () => element.removeEventListener(type, handler, options);
	}, [element, type, options]);
}
