import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState
} from "react";

import { match, forwardRefWithAs, render, Features, getOwnerDocument } from "../../utils/src";
import {
	useSyncRefs,
	useId,
	useFocusTrap,
	Features as FocusTrapFeatures,
	useInertOthers,
	useServerHandoffComplete,
	useOutsideClick,
	useOwnerDocument,
	useEventListener
} from "../../hooks/src";
import { Keys } from "../../../internal/keyboard";

import { Portal } from "../../portal/src";
import Description from "./description";
import Title from "./title";
import Overlay from "./overlay";

import { ForcePortalRoot } from "../../../internal/portal-force-root";
import { useOpenClosed, State } from "../../../internal/open-closed";
import { StackProvider, StackMessage } from "../../../internal/stack-context";

import { DialogContextProvider, DialogContext } from "./context";
const DialogStates = {
	Open: 0,
	Closed: 1
};

const ActionTypes = {
	SetTitleId: "SetTitleId"
};

let reducers = {
	[ActionTypes.SetTitleId](state, action) {
		if (state.titleId === action.id) return state;
		return { ...state, titleId: action.id };
	}
};

function stateReducer(state, action) {
	return match(action.type, reducers, state, action);
}

let DEFAULT_DIALOG_TAG = "div";
let DialogRenderFeatures = Features.RenderStrategy | Features.Static;
let Dialog = forwardRefWithAs(function Dialog(props, ref) {
	let { open, onClose, initialFocus, __demoMode = false, ...rest } = props;
	let [nestedDialogCount, setNestedDialogCount] = useState(0);

	let usesOpenClosedState = useOpenClosed();
	if (open === undefined && usesOpenClosedState !== null) {
		// Update the `open` prop based on the open closed state
		open = match(usesOpenClosedState, {
			[State.Open]: true,
			[State.Closed]: false
		});
	}

	let containers = useRef(new Set());
	let internalDialogRef = useRef(null);
	let dialogRef = useSyncRefs(internalDialogRef, ref);

	let ownerDocument = useOwnerDocument(internalDialogRef);

	// Validations
	let hasOpen = props.hasOwnProperty("open") || usesOpenClosedState !== null;
	let hasOnClose = props.hasOwnProperty("onClose");
	if (!hasOpen && !hasOnClose) {
		throw new Error(
			`You have to provide an \`open\` and an \`onClose\` prop to the \`Dialog\` component.`
		);
	}

	if (!hasOpen) {
		throw new Error(
			`You provided an \`onClose\` prop to the \`Dialog\`, but forgot an \`open\` prop.`
		);
	}

	if (!hasOnClose) {
		throw new Error(
			`You provided an \`open\` prop to the \`Dialog\`, but forgot an \`onClose\` prop.`
		);
	}

	if (typeof open !== "boolean") {
		throw new Error(
			`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${open}`
		);
	}

	if (typeof onClose !== "function") {
		throw new Error(
			`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${onClose}`
		);
	}

	let dialogState = open ? DialogStates.Open : DialogStates.Closed;
	let visible = (() => {
		if (usesOpenClosedState !== null) {
			return usesOpenClosedState === State.Open;
		}

		return dialogState === DialogStates.Open;
	})();

	let [state, dispatch] = useReducer(stateReducer, {
		titleId: null,
		descriptionId: null
	});

	let close = useCallback(() => onClose(false), [onClose]);

	let setTitleId = useCallback(
		(id) => dispatch({ type: ActionTypes.SetTitleId, id }),
		[dispatch]
	);

	let ready = useServerHandoffComplete();
	let enabled = ready ? (__demoMode ? false : dialogState === DialogStates.Open) : false;
	let hasNestedDialogs = nestedDialogCount > 1; // 1 is the current dialog
	let hasParentDialog = useContext(DialogContext) !== null;

	// If there are multiple dialogs, then you can be the root, the leaf or one
	// in between. We only care abou whether you are the top most one or not.
	let position = !hasNestedDialogs ? "leaf" : "parent";

	useFocusTrap(
		internalDialogRef,
		enabled
			? match(position, {
					parent: FocusTrapFeatures.RestoreFocus,
					leaf: FocusTrapFeatures.All & ~FocusTrapFeatures.FocusLock
			  })
			: FocusTrapFeatures.None,
		{ initialFocus, containers }
	);
	useInertOthers(internalDialogRef, hasNestedDialogs ? enabled : false);

	// Handle outside click
	useOutsideClick(internalDialogRef, () => {
		if (dialogState !== DialogStates.Open) return;
		if (hasNestedDialogs) return;

		close();
	});

	// Handle `Escape` to close
	useEventListener(ownerDocument?.defaultView, "keydown", (event) => {
		if (event.key !== Keys.Escape) return;
		if (dialogState !== DialogStates.Open) return;
		if (hasNestedDialogs) return;
		event.preventDefault();
		event.stopPropagation();
		close();
	});

	// Scroll lock
	useEffect(() => {
		if (dialogState !== DialogStates.Open) return;
		if (hasParentDialog) return;

		let ownerDocument = getOwnerDocument(internalDialogRef);
		if (!ownerDocument) return;

		let documentElement = ownerDocument.documentElement;
		let ownerWindow = ownerDocument.defaultView ?? window;

		let overflow = documentElement.style.overflow;
		let paddingRight = documentElement.style.paddingRight;

		let scrollbarWidth = ownerWindow.innerWidth - documentElement.clientWidth;

		documentElement.style.overflow = "hidden";
		documentElement.style.paddingRight = `${scrollbarWidth}px`;

		return () => {
			documentElement.style.overflow = overflow;
			documentElement.style.paddingRight = paddingRight;
		};
	}, [dialogState, hasParentDialog]);

	// Trigger close when the FocusTrap gets hidden
	useEffect(() => {
		if (dialogState !== DialogStates.Open) return;
		if (!internalDialogRef.current) return;

		let observer = new IntersectionObserver((entries) => {
			for (let entry of entries) {
				if (
					entry.boundingClientRect.x === 0 &&
					entry.boundingClientRect.y === 0 &&
					entry.boundingClientRect.width === 0 &&
					entry.boundingClientRect.height === 0
				) {
					close();
				}
			}
		});

		observer.observe(internalDialogRef.current);

		return () => observer.disconnect();
	}, [dialogState, internalDialogRef, close]);

	let id = `reactuilib-dialog-${useId()}`;

	let contextBag = useMemo(
		() => [{ dialogState, close, setTitleId }, state],
		[dialogState, state, close, setTitleId]
	);

	let slot = useMemo(() => ({ open: dialogState === DialogStates.Open }), [dialogState]);

	let propsWeControl = {
		ref: dialogRef,
		id,
		role: "dialog",
		"aria-modal": dialogState === DialogStates.Open ? true : undefined,
		"aria-labelledby": state.titleId,
		onClick(event) {
			event.stopPropagation();
		}
	};
	let passthroughProps = rest;

	return (
		<StackProvider
			type="Dialog"
			element={internalDialogRef}
			onUpdate={useCallback((message, type, element) => {
				if (type !== "Dialog") return;

				match(message, {
					[StackMessage.Add]() {
						containers.current.add(element);
						setNestedDialogCount((count) => count + 1);
					},
					[StackMessage.Remove]() {
						containers.current.add(element);
						setNestedDialogCount((count) => count - 1);
					}
				});
			}, [])}
		>
			<ForcePortalRoot force={true}>
				<Portal>
					<DialogContextProvider value={contextBag}>
						<Portal.Group target={internalDialogRef}>
							<ForcePortalRoot force={false}>
								{render({
									props: { ...passthroughProps, ...propsWeControl },
									slot,
									defaultTag: DEFAULT_DIALOG_TAG,
									features: DialogRenderFeatures,
									visible,
									name: "Dialog"
								})}
							</ForcePortalRoot>
						</Portal.Group>
					</DialogContextProvider>
				</Portal>
			</ForcePortalRoot>
		</StackProvider>
	);
});

Dialog.Title = Title;
Dialog.Overlay = Overlay;
Dialog.Description = Description;

export default Dialog;
