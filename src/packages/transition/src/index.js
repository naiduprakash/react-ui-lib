import React, {
	Fragment,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";

import {
	useId,
	useIsInitialRender,
	useIsMounted,
	useIsoMorphicEffect,
	useServerHandoffComplete,
	useSyncRefs,
	useLatestValue
} from "../../hooks/src";

import {
	render,
	forwardRefWithAs,
	Features,
	RenderStrategy
} from "../../../internal/utils/render";
import { match } from "../../../internal/utils/match";

import { transition, Reason } from "./utils/transition";
import { OpenClosedProvider, State, useOpenClosed } from "../../../internal/utils/open-closed";

const TreeStates = {
	Visible: "visible",
	Hidden: "hidden"
};
function useSplitClasses(classes = "") {
	return useMemo(
		() => classes.split(" ").filter((className) => className.trim().length > 1),
		[classes]
	);
}

let TransitionContext = createContext(null);
TransitionContext.displayName = "TransitionContext";

function useTransitionContext() {
	let context = useContext(TransitionContext);

	if (context === null) {
		throw new Error(
			"A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />."
		);
	}

	return context;
}

function useParentNesting() {
	let context = useContext(NestingContext);

	if (context === null) {
		throw new Error(
			"A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />."
		);
	}

	return context;
}

let NestingContext = createContext(null);
NestingContext.displayName = "NestingContext";

function hasChildren(bag) {
	if ("children" in bag) return hasChildren(bag.children);
	return bag.current.filter(({ state }) => state === TreeStates.Visible).length > 0;
}

function useNesting(done = () => {}) {
	let doneRef = useLatestValue(done);
	let transitionableChildren = useRef([]);
	let mounted = useIsMounted();

	let unregister = useLatestValue((childId, strategy = RenderStrategy.Hidden) => {
		let idx = transitionableChildren.current.findIndex(({ id }) => id === childId);
		if (idx === -1) return;

		match(strategy, {
			[RenderStrategy.Unmount]() {
				transitionableChildren.current.splice(idx, 1);
			},
			[RenderStrategy.Hidden]() {
				transitionableChildren.current[idx].state = TreeStates.Hidden;
			}
		});

		if (!hasChildren(transitionableChildren) && mounted.current) {
			doneRef.current?.();
		}
	});

	let register = useLatestValue((childId) => {
		let child = transitionableChildren.current.find(({ id }) => id === childId);
		if (!child) {
			transitionableChildren.current.push({ id: childId, state: TreeStates.Visible });
		} else if (child.state !== TreeStates.Visible) {
			child.state = TreeStates.Visible;
		}

		return () => unregister.current(childId, RenderStrategy.Unmount);
	});

	return useMemo(
		() => ({
			children: transitionableChildren,
			register,
			unregister
		}),
		[register, unregister, transitionableChildren]
	);
}

function noop() {}
let eventNames = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"];
function ensureEventHooksExist(events) {
	let result = {};
	for (let name of eventNames) {
		result[name] = events[name] ?? noop;
	}
	return result;
}

function useEvents(events) {
	let eventsRef = useRef(ensureEventHooksExist(events));

	useEffect(() => {
		eventsRef.current = ensureEventHooksExist(events);
	}, [events]);

	return eventsRef;
}

// ---

let DEFAULT_TRANSITION_CHILD_TAG = "div";
let TransitionChildRenderFeatures = Features.RenderStrategy;

let TransitionChild = forwardRefWithAs(function TransitionChild(props, ref) {
	let {
		// Event "handlers"
		beforeEnter,
		afterEnter,
		beforeLeave,
		afterLeave,

		// Class names
		enter,
		enterFrom,
		enterTo,
		entered,
		leave,
		leaveFrom,
		leaveTo,

		// @ts-expect-error
		...rest
	} = props;
	let container = useRef(null);
	let transitionRef = useSyncRefs(container, ref);
	let [state, setState] = useState(TreeStates.Visible);
	let strategy = rest.unmount ? RenderStrategy.Unmount : RenderStrategy.Hidden;

	let { show, appear, initial } = useTransitionContext();
	let { register, unregister } = useParentNesting();
	let prevShow = useRef(null);

	let id = useId();

	let isTransitioning = useRef(false);

	let nesting = useNesting(() => {
		// When all children have been unmounted we can only hide ourselves if and only if we are not
		// transitioning ourselves. Otherwise we would unmount before the transitions are finished.
		if (!isTransitioning.current) {
			setState(TreeStates.Hidden);
			unregister.current(id);
		}
	});

	useIsoMorphicEffect(() => {
		if (!id) return;
		return register.current(id);
	}, [register, id]);

	useIsoMorphicEffect(() => {
		// If we are in another mode than the Hidden mode then ignore
		if (strategy !== RenderStrategy.Hidden) return;
		if (!id) return;

		// Make sure that we are visible
		if (show && state !== TreeStates.Visible) {
			setState(TreeStates.Visible);
			return;
		}

		match(state, {
			[TreeStates.Hidden]: () => unregister.current(id),
			[TreeStates.Visible]: () => register.current(id)
		});
	}, [state, id, register, unregister, show, strategy]);

	let enterClasses = useSplitClasses(enter);
	let enterFromClasses = useSplitClasses(enterFrom);
	let enterToClasses = useSplitClasses(enterTo);

	let enteredClasses = useSplitClasses(entered);

	let leaveClasses = useSplitClasses(leave);
	let leaveFromClasses = useSplitClasses(leaveFrom);
	let leaveToClasses = useSplitClasses(leaveTo);

	let events = useEvents({ beforeEnter, afterEnter, beforeLeave, afterLeave });

	let ready = useServerHandoffComplete();

	useEffect(() => {
		if (ready && state === TreeStates.Visible && container.current === null) {
			throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
		}
	}, [container, state, ready]);

	// Skipping initial transition
	let skip = initial && !appear;

	useIsoMorphicEffect(() => {
		let node = container.current;
		if (!node) return;
		if (!ready) return;
		if (skip) return;
		if (show === prevShow.current) return;

		isTransitioning.current = true;

		if (show) events.current.beforeEnter();
		if (!show) events.current.beforeLeave();

		return show
			? transition(
					node,
					enterClasses,
					enterFromClasses,
					enterToClasses,
					enteredClasses,
					(reason) => {
						isTransitioning.current = false;
						if (reason === Reason.Finished) events.current.afterEnter();
					}
			  )
			: transition(
					node,
					leaveClasses,
					leaveFromClasses,
					leaveToClasses,
					enteredClasses,
					(reason) => {
						isTransitioning.current = false;

						if (reason !== Reason.Finished) return;

						// When we don't have children anymore we can safely unregister from the parent and hide
						// ourselves.
						if (!hasChildren(nesting)) {
							setState(TreeStates.Hidden);
							unregister.current(id);
							events.current.afterLeave();
						}
					}
			  );
	}, [events, id, isTransitioning, unregister, nesting, container, skip, show, ready, enterClasses, enterFromClasses, enterToClasses, leaveClasses, leaveFromClasses, leaveToClasses]);

	useIsoMorphicEffect(() => {
		if (!skip) return;

		if (strategy === RenderStrategy.Hidden) {
			prevShow.current = null;
		} else {
			prevShow.current = show;
		}
	}, [show, skip, state]);

	let propsWeControl = { ref: transitionRef };
	let passthroughProps = rest;

	return (
		<NestingContext.Provider value={nesting}>
			<OpenClosedProvider
				value={match(state, {
					[TreeStates.Visible]: State.Open,
					[TreeStates.Hidden]: State.Closed
				})}
			>
				{render({
					props: { ...passthroughProps, ...propsWeControl },
					defaultTag: DEFAULT_TRANSITION_CHILD_TAG,
					features: TransitionChildRenderFeatures,
					visible: state === TreeStates.Visible,
					name: "Transition.Child"
				})}
			</OpenClosedProvider>
		</NestingContext.Provider>
	);
});

let TransitionRoot = forwardRefWithAs(function Transition(props, ref) {
	// @ts-expect-error
	let { show, appear = false, unmount, ...passthroughProps } = props;
	let transitionRef = useSyncRefs(ref);

	let usesOpenClosedState = useOpenClosed();

	if (show === undefined && usesOpenClosedState !== null) {
		show = match(usesOpenClosedState, {
			[State.Open]: true,
			[State.Closed]: false
		});
	}

	if (![true, false].includes(show)) {
		throw new Error(
			"A <Transition /> is used but it is missing a `show={true | false}` prop."
		);
	}

	let [state, setState] = useState(show ? TreeStates.Visible : TreeStates.Hidden);

	let nestingBag = useNesting(() => {
		setState(TreeStates.Hidden);
	});

	let initial = useIsInitialRender();
	let transitionBag = useMemo(() => ({ show: show, appear, initial }), [show, appear, initial]);

	useEffect(() => {
		if (show) {
			setState(TreeStates.Visible);
		} else if (!hasChildren(nestingBag)) {
			setState(TreeStates.Hidden);
		}
	}, [show, nestingBag]);

	let sharedProps = { unmount };

	return (
		<NestingContext.Provider value={nestingBag}>
			<TransitionContext.Provider value={transitionBag}>
				{render({
					props: {
						...sharedProps,
						as: Fragment,
						children: (
							<TransitionChild
								ref={transitionRef}
								{...sharedProps}
								{...passthroughProps}
							/>
						)
					},
					defaultTag: Fragment,
					features: TransitionChildRenderFeatures,
					visible: state === TreeStates.Visible,
					name: "Transition"
				})}
			</TransitionContext.Provider>
		</NestingContext.Provider>
	);
});

function Child(props) {
	let hasTransitionContext = useContext(TransitionContext) !== null;
	let hasOpenClosedContext = useOpenClosed() !== null;

	return !hasTransitionContext && hasOpenClosedContext ? (
		<TransitionRoot {...props} />
	) : (
		<TransitionChild {...props} />
	);
}

export default Object.assign(TransitionRoot, { Child, Root: TransitionRoot });
