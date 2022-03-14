import { useRef, useEffect, useCallback } from "react";

let Optional = Symbol();

export function optionalRef(cb, isOptional = true) {
	return Object.assign(cb, { [Optional]: isOptional });
}

export function useSyncRefs(...refs) {
	let cache = useRef(refs);

	useEffect(() => {
		cache.current = refs;
	}, [refs]);

	let syncRefs = useCallback(
		(value) => {
			for (let ref of cache.current) {
				if (ref == null) continue;
				if (typeof ref === "function") ref(value);
				else ref.current = value;
			}
		},
		[cache]
	);

	return refs.every(
		(ref) =>
			ref == null ||
			// @ts-expect-error
			ref?.[Optional]
	)
		? undefined
		: syncRefs;
}
