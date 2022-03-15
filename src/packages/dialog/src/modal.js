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

import { forwardRefWithAs, render } from "../../../internal/utils/render";
import { match } from "../../../internal/utils/match";
import { getOwnerDocument } from "../../../internal/utils/owner";
import { Features } from "../../../internal/utils/render";

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
import { Keys } from "../../../internal/utils/keyboard";

import { Portal } from "../../portal/src";

import { ForcePortalRoot } from "../../../internal/utils/portal-force-root";
import { useOpenClosed, State } from "../../../internal/utils/open-closed";
import { StackProvider, StackMessage } from "../../../internal/utils/stack-context";

import { ModalContextProvider, ModalContext } from "./context";
const ModalStates = {
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

let DEFAULT_MODAL_TAG = "div";
let ModalRenderFeatures = Features.RenderStrategy;
let Modal = forwardRefWithAs(function Modal(props, ref) {
	let {
		open,
		onClose,
		disableEscapeKeyDown = false,
		initialFocus,
		__demoMode = false,
		...rest
	} = props;
	let [nestedModalCount, setNestedModalCount] = useState(0);

	let usesOpenClosedState = useOpenClosed();
	if (open === undefined && usesOpenClosedState !== null) {
		// Update the `open` prop based on the open closed state
		open = match(usesOpenClosedState, {
			[State.Open]: true,
			[State.Closed]: false
		});
	}

	let containers = useRef(new Set());
	let internalModalRef = useRef(null);
	let modalRef = useSyncRefs(internalModalRef, ref);

	let ownerDocument = useOwnerDocument(internalModalRef);

	// Validations
	let hasOpen = props.hasOwnProperty("open") || usesOpenClosedState !== null;
	let hasOnClose = props.hasOwnProperty("onClose");
	if (!hasOpen && !hasOnClose) {
		throw new Error(
			`You have to provide an \`open\` and an \`onClose\` prop to the \`Modal\` component.`
		);
	}

	if (!hasOpen) {
		throw new Error(
			`You provided an \`onClose\` prop to the \`Modal\`, but forgot an \`open\` prop.`
		);
	}

	if (!hasOnClose) {
		throw new Error(
			`You provided an \`open\` prop to the \`Modal\`, but forgot an \`onClose\` prop.`
		);
	}

	if (typeof open !== "boolean") {
		throw new Error(
			`You provided an \`open\` prop to the \`Modal\`, but the value is not a boolean. Received: ${open}`
		);
	}

	if (typeof onClose !== "function") {
		throw new Error(
			`You provided an \`onClose\` prop to the \`Modal\`, but the value is not a function. Received: ${onClose}`
		);
	}

	let modalState = open ? ModalStates.Open : ModalStates.Closed;
	let visible = (() => {
		if (usesOpenClosedState !== null) {
			return usesOpenClosedState === State.Open;
		}

		return modalState === ModalStates.Open;
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
	let enabled = ready ? (__demoMode ? false : modalState === ModalStates.Open) : false;
	let hasNestedModals = nestedModalCount > 1; // 1 is the current modal
	let hasParentModal = useContext(ModalContext) !== null;

	// If there are multiple modals, then you can be the root, the leaf or one
	// in between. We only care abou whether you are the top most one or not.
	let position = !hasNestedModals ? "leaf" : "parent";

	useFocusTrap(
		internalModalRef,
		enabled
			? match(position, {
					parent: FocusTrapFeatures.RestoreFocus,
					leaf: FocusTrapFeatures.All & ~FocusTrapFeatures.FocusLock
			  })
			: FocusTrapFeatures.None,
		{ initialFocus, containers }
	);
	useInertOthers(internalModalRef, hasNestedModals ? enabled : false);

	// Handle outside click
	useOutsideClick(internalModalRef, () => {
		if (modalState !== ModalStates.Open) return;
		if (hasNestedModals) return;

		close();
	});

	// Handle `Escape` to close
	useEventListener(ownerDocument?.defaultView, "keydown", (event) => {
		if (event.key !== Keys.Escape) return;
		if (modalState !== ModalStates.Open) return;
		if (hasNestedModals) return;
		if (disableEscapeKeyDown) return;
		event.preventDefault();
		event.stopPropagation();
		close();
	});

	// Scroll lock
	useEffect(() => {
		if (modalState !== ModalStates.Open) return;
		if (hasParentModal) return;

		let ownerDocument = getOwnerDocument(internalModalRef);
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
	}, [modalState, hasParentModal]);

	// Trigger close when the FocusTrap gets hidden
	useEffect(() => {
		if (modalState !== ModalStates.Open) return;
		if (!internalModalRef.current) return;

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

		observer.observe(internalModalRef.current);

		return () => observer.disconnect();
	}, [modalState, internalModalRef, close]);

	let id = `reactuilib-modal-${useId()}`;

	let contextBag = useMemo(
		() => [{ modalState, close, setTitleId }, state],
		[modalState, state, close, setTitleId]
	);

	let slot = useMemo(() => ({ open: modalState === ModalStates.Open }), [modalState]);

	let propsWeControl = {
		ref: modalRef,
		id,
		role: "modal",
		"aria-modal": modalState === ModalStates.Open ? true : undefined,
		"aria-labelledby": state.titleId,
		onClick(event) {
			event.stopPropagation();
		}
	};
	let passthroughProps = rest;

	return (
		<StackProvider
			type="Modal"
			element={internalModalRef}
			onUpdate={useCallback((message, type, element) => {
				if (type !== "Modal") return;

				match(message, {
					[StackMessage.Add]() {
						containers.current.add(element);
						setNestedModalCount((count) => count + 1);
					},
					[StackMessage.Remove]() {
						containers.current.add(element);
						setNestedModalCount((count) => count - 1);
					}
				});
			}, [])}
		>
			<ForcePortalRoot force={true}>
				<Portal>
					<ModalContextProvider value={contextBag}>
						<Portal.Group target={internalModalRef}>
							<ForcePortalRoot force={false}>
								{render({
									props: { ...passthroughProps, ...propsWeControl },
									slot,
									defaultTag: DEFAULT_MODAL_TAG,
									features: ModalRenderFeatures,
									visible,
									name: "Modal"
								})}
							</ForcePortalRoot>
						</Portal.Group>
					</ModalContextProvider>
				</Portal>
			</ForcePortalRoot>
		</StackProvider>
	);
});

export default Modal;
