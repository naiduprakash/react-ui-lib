import { useRef, useEffect } from "react";

export function useLatestValue(value) {
	let cache = useRef(value);

	useEffect(() => {
		cache.current = value;
	}, [value]);

	return cache;
}
