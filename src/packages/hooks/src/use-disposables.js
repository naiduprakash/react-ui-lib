import { useState, useEffect } from "react";

import { disposables } from "../../utils/src";

export function useDisposables() {
	// Using useState instead of useRef so that we can use the initializer function.
	let [d] = useState(disposables);
	useEffect(() => () => d.dispose(), [d]);
	return d;
}
