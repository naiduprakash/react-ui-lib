import { match } from "./match";
import { getOwnerDocument } from "./owner";

let focusableSelector = [
	"[contentEditable=true]",
	"[tabindex]",
	"a[href]",
	"area[href]",
	"button:not([disabled])",
	"iframe",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])"
]
	.map(
		process.env.NODE_ENV === "test"
			? (selector) => `${selector}:not([tabindex='-1']):not([style*='display: none'])`
			: (selector) => `${selector}:not([tabindex='-1'])`
	)
	.join(",");

export const Focus = {
	/** Focus the first non-disabled element */
	First: 1 << 0,

	/** Focus the previous non-disabled element */
	Previous: 1 << 1,

	/** Focus the next non-disabled element */
	Next: 1 << 2,

	/** Focus the last non-disabled element */
	Last: 1 << 3,

	/** Wrap tab around */
	WrapAround: 1 << 4,

	/** Prevent scrolling the focusable elements into view */
	NoScroll: 1 << 5
};

export const FocusResult = {
	/** Something went wrong while trying to focus. */
	Error: 0,

	/** When `Focus.WrapAround` is enabled, going from position `N` to `N+1` where `N` is the last index in the array, then we overflow. */
	Overflow: 1,

	/** Focus was successful. */
	Success: 2,

	/** When `Focus.WrapAround` is enabled, going from position `N` to `N-1` where `N` is the first index in the array, then we underflow. */
	Underflow: 3
};

export const FocusableMode = {
	/** The element itself must be focusable. */
	Strict: 0,

	/** The element should be inside of a focusable element. */
	Loose: 1
};

export function getFocusableElements(container = document.body) {
	if (container == null) return [];
	return Array.from(container.querySelectorAll(focusableSelector));
}

export function isFocusableElement(element, mode) {
	if (element === getOwnerDocument(element)?.body) return false;

	return match(mode, {
		[FocusableMode.Strict]() {
			return element.matches(focusableSelector);
		},
		[FocusableMode.Loose]() {
			let next = element;

			while (next !== null) {
				if (next.matches(focusableSelector)) return true;
				next = next.parentElement;
			}

			return false;
		}
	});
}

export function focusElement(element) {
	element?.focus({ preventScroll: true });
}

export function sortByDomNode(nodes, resolveKey = (i) => i) {
	return nodes.slice().sort((aItem, zItem) => {
		let a = resolveKey(aItem);
		let z = resolveKey(zItem);

		if (a === null || z === null) return 0;

		let position = a.compareDocumentPosition(z);

		if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
		if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
		return 0;
	});
}

export function focusIn(container, focus) {
	let ownerDocument = Array.isArray(container)
		? container.length > 0
			? container[0].ownerDocument
			: document
		: container.ownerDocument;

	let elements = Array.isArray(container)
		? sortByDomNode(container)
		: getFocusableElements(container);
	let active = ownerDocument.activeElement;

	let direction = (() => {
		if (focus & (Focus.First | Focus.Next)) return Direction.Next;
		if (focus & (Focus.Previous | Focus.Last)) return Direction.Previous;

		throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
	})();

	let startIndex = (() => {
		if (focus & Focus.First) return 0;
		if (focus & Focus.Previous) return Math.max(0, elements.indexOf(active)) - 1;
		if (focus & Focus.Next) return Math.max(0, elements.indexOf(active)) + 1;
		if (focus & Focus.Last) return elements.length - 1;

		throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
	})();

	let focusOptions = focus & Focus.NoScroll ? { preventScroll: true } : {};

	let offset = 0;
	let total = elements.length;
	let next = undefined;
	do {
		// Guard against infinite loops
		if (offset >= total || offset + total <= 0) return FocusResult.Error;

		let nextIdx = startIndex + offset;

		if (focus & Focus.WrapAround) {
			nextIdx = (nextIdx + total) % total;
		} else {
			if (nextIdx < 0) return FocusResult.Underflow;
			if (nextIdx >= total) return FocusResult.Overflow;
		}

		next = elements[nextIdx];

		// Try the focus the next element, might not work if it is "hidden" to the user.
		next?.focus(focusOptions);

		// Try the next one in line
		offset += direction;
	} while (next !== ownerDocument.activeElement);

	// This is a little weird, but let me try and explain: There are a few scenario's
	// in chrome for example where a focused `<a>` tag does not get the default focus
	// styles and sometimes they do. This highly depends on whether you started by
	// clicking or by using your keyboard. When you programmatically add focus `anchor.focus()`
	// then the active element (document.activeElement) is this anchor, which is expected.
	// However in that case the default focus styles are not applied *unless* you
	// also add this tabindex.
	if (!next.hasAttribute("tabindex")) next.setAttribute("tabindex", "0");

	return FocusResult.Success;
}
