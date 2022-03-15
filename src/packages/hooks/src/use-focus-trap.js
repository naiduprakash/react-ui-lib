import { useRef, useEffect } from "react";

import { Keys } from "../../../internal/utils/keyboard";
import {
	focusElement,
	focusIn,
	Focus,
	FocusResult
} from "../../../internal/utils/focus-management";
import { useEventListener } from "./use-event-listener";
import { useIsMounted } from "./use-is-mounted";
import { useOwnerDocument } from "./use-owner";

export const Features = {
	/** No features enabled for the `useFocusTrap` hook. */
	None: 1 << 0,

	/** Ensure that we move focus initially into the container. */
	InitialFocus: 1 << 1,

	/** Ensure that pressing `Tab` and `Shift+Tab` is trapped within the container. */
	TabLock: 1 << 2,

	/** Ensure that programmatically moving focus outside of the container is disallowed. */
	FocusLock: 1 << 3,

	/** Ensure that we restore the focus when unmounting the component that uses this `useFocusTrap` hook. */
	RestoreFocus: 1 << 4
};

export function useFocusTrap(container, features, { initialFocus, containers } = {}) {
	let restoreElement = useRef(null);
	let previousActiveElement = useRef(null);
	let mounted = useIsMounted();

	let featuresRestoreFocus = Boolean(features & Features.RestoreFocus);
	let featuresInitialFocus = Boolean(features & Features.InitialFocus);

	let ownerDocument = useOwnerDocument(container);

	// Capture the currently focused element, before we enable the focus trap.
	useEffect(() => {
		if (!featuresRestoreFocus) return;

		if (!restoreElement.current) {
			restoreElement.current = ownerDocument?.activeElement;
		}
	}, [featuresRestoreFocus, ownerDocument]);

	// Restore the focus when we unmount the component.
	useEffect(() => {
		if (!featuresRestoreFocus) return;

		return () => {
			focusElement(restoreElement.current);
			restoreElement.current = null;
		};
	}, [featuresRestoreFocus]);

	// Handle initial focus
	useEffect(() => {
		if (!featuresInitialFocus) return;
		let containerElement = container.current;
		if (!containerElement) return;

		let activeElement = ownerDocument?.activeElement;

		if (initialFocus?.current) {
			if (initialFocus?.current === activeElement) {
				previousActiveElement.current = activeElement;
				return; // Initial focus ref is already the active element
			}
		} else if (containerElement.contains(activeElement)) {
			previousActiveElement.current = activeElement;
			return; // Already focused within Dialog
		}

		// Try to focus the initialFocus ref
		if (initialFocus?.current) {
			focusElement(initialFocus.current);
		} else {
			if (focusIn(containerElement, Focus.First) === FocusResult.Error) {
				console.warn("There are no focusable elements inside the <FocusTrap />");
			}
		}

		previousActiveElement.current = ownerDocument?.activeElement;
	}, [container, initialFocus, featuresInitialFocus, ownerDocument]);

	// Handle `Tab` & `Shift+Tab` keyboard events
	useEventListener(ownerDocument?.defaultView, "keydown", (event) => {
		if (!(features & Features.TabLock)) return;

		if (!container.current) return;
		if (event.key !== Keys.Tab) return;

		event.preventDefault();

		if (
			focusIn(
				container.current,
				(event.shiftKey ? Focus.Previous : Focus.Next) | Focus.WrapAround
			) === FocusResult.Success
		) {
			previousActiveElement.current = ownerDocument?.activeElement;
		}
	});

	// Prevent programmatically escaping the container
	useEventListener(
		ownerDocument?.defaultView,
		"focus",
		(event) => {
			if (!(features & Features.FocusLock)) return;

			let allContainers = new Set(containers?.current);
			allContainers.add(container);

			if (!allContainers.size) return;

			let previous = previousActiveElement.current;
			if (!previous) return;
			if (!mounted.current) return;

			let toElement = event.target;

			if (toElement && toElement instanceof HTMLElement) {
				if (!contains(allContainers, toElement)) {
					event.preventDefault();
					event.stopPropagation();
					focusElement(previous);
				} else {
					previousActiveElement.current = toElement;
					focusElement(toElement);
				}
			} else {
				focusElement(previousActiveElement.current);
			}
		},
		true
	);
}

function contains(containers, element) {
	for (let container of containers) {
		if (container.current?.contains(element)) return true;
	}

	return false;
}
