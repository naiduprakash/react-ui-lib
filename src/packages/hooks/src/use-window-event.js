import { useEffect } from "react";

import { useLatestValue } from "./use-latest-value";

export function useWindowEvent(type, listener, options) {
	let listenerRef = useLatestValue(listener);

	useEffect(() => {
		function handler(event) {
			listenerRef.current(event);
		}

		window.addEventListener(type, handler, options);
		return () => window.removeEventListener(type, handler, options);
	}, [type, options]);
}
