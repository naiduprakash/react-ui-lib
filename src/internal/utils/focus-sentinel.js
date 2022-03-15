import React, { useState, FocusEvent as ReactFocusEvent } from "react";

import { VisuallyHidden } from "./visually-hidden";

export function FocusSentinel({ onFocus }) {
	let [enabled, setEnabled] = useState(true);

	if (!enabled) return null;

	return (
		<VisuallyHidden
			as="button"
			type="button"
			onFocus={(event) => {
				event.preventDefault();
				let frame;

				let tries = 50;
				function forwardFocus() {
					// Prevent infinite loops
					if (tries-- <= 0) {
						if (frame) cancelAnimationFrame(frame);
						return;
					}

					// Try to move focus to the correct element. This depends on the implementation
					// of `onFocus` of course since it would be different for each place we use it in.
					if (onFocus()) {
						setEnabled(false);
						cancelAnimationFrame(frame);
						return;
					}

					// Retry
					frame = requestAnimationFrame(forwardFocus);
				}

				frame = requestAnimationFrame(forwardFocus);
			}}
		/>
	);
}
