import { Fragment, cloneElement, createElement, forwardRef, isValidElement } from "react";
import { match } from "./match";

export const Features = {
	/** No features at all */
	None: 0,

	/**
	 * When used, this will allow us to use one of the render strategies.
	 *
	 * **The render strategies are:**
	 *    - **Unmount**   _(Will unmount the component.)_
	 *    - **Hidden**    _(Will hide the component using the [hidden] attribute.)_
	 */
	RenderStrategy: 1,

	/**
	 * When used, this will allow the user of our component to be in control. This can be used when
	 * you want to transition based on some state.
	 */
	Static: 2
};

export const RenderStrategy = {
	Unmount: 0,
	Hidden: 1
};

export function render({ props, slot, defaultTag, features, visible = true, name }) {
	// Visible always render
	if (visible) return _render(props, slot, defaultTag, name);

	let featureFlags = features ?? Features.None;

	if (featureFlags & Features.Static) {
		let { static: isStatic = false, ...rest } = props;

		// When the `static` prop is passed as `true`, then the user is in control, thus we don't care about anything else
		if (isStatic) return _render(rest, slot, defaultTag, name);
	}

	if (featureFlags & Features.RenderStrategy) {
		let { unmount = true, ...rest } = props;
		let strategy = unmount ? RenderStrategy.Unmount : RenderStrategy.Hidden;

		return match(strategy, {
			[RenderStrategy.Unmount]() {
				return null;
			},
			[RenderStrategy.Hidden]() {
				return _render(
					{ ...rest, ...{ hidden: true, style: { display: "none" } } },
					slot,
					defaultTag,
					name
				);
			}
		});
	}

	// No features enabled, just render
	return _render(props, slot, defaultTag, name);
}

function _render(props, slot, tag, name) {
	let {
		as: Component = tag,
		children,
		refName = "ref",
		...passThroughProps
	} = omit(props, ["unmount", "static"]);

	// This allows us to use `<UIComponent as={MyComponent} refName="innerRef" />`
	let refRelatedProps = props.ref !== undefined ? { [refName]: props.ref } : {};

	let resolvedChildren = typeof children === "function" ? children(slot) : children;
	// Allow for className to be a function with the slot as the contents
	if (passThroughProps.className && typeof passThroughProps.className === "function") {
		passThroughProps.className = passThroughProps.className(slot);
	}

	if (Component === Fragment) {
		if (Object.keys(compact(passThroughProps)).length > 0) {
			if (
				!isValidElement(resolvedChildren) ||
				(Array.isArray(resolvedChildren) && resolvedChildren.length > 1)
			) {
				throw new Error(
					[
						'Passing props on "Fragment"!',
						"",
						`The current component <${name} /> is rendering a "Fragment".`,
						`However we need to passthrough the following props:`,
						Object.keys(passThroughProps)
							.map((line) => `  - ${line}`)
							.join("\n"),
						"",
						"You can apply a few solutions:",
						[
							'Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',
							"Render a single element as the child so that we can forward the props onto that element."
						]
							.map((line) => `  - ${line}`)
							.join("\n")
					].join("\n")
				);
			}

			return cloneElement(
				resolvedChildren,
				Object.assign(
					{},
					// Filter out undefined values so that they don't override the existing values
					mergeEventFunctions(
						compact(omit(passThroughProps, ["ref"])),
						resolvedChildren.props,
						["onClick"]
					),
					refRelatedProps
				)
			);
		}
	}

	return createElement(
		Component,
		Object.assign(
			{},
			omit(passThroughProps, ["ref"]),
			Component !== Fragment && refRelatedProps
		),
		resolvedChildren
	);
}

/**
 * We can use this function for the following useCase:
 *
 * <Menu.Item> <button onClick={console.log} /> </Menu.Item>
 *
 * Our `Menu.Item` will have an internal `onClick`, if you passthrough an `onClick` to the actual
 * `Menu.Item` component we will call it correctly. However, when we have an `onClick` on the actual
 * first child, that one should _also_ be called (but before this implementation, it was just
 * overriding the `onClick`). But it is only when we *render* that we have access to the existing
 * props of this component.
 *
 * It's a bit hacky, and not that clean, but it is something internal and we have tests to rely on
 * so that we can refactor this later (if needed).
 */
function mergeEventFunctions(passThroughProps, existingProps, functionsToMerge) {
	let clone = Object.assign({}, passThroughProps);
	for (let func of functionsToMerge) {
		if (passThroughProps[func] !== undefined && existingProps[func] !== undefined) {
			Object.assign(clone, {
				[func](event) {
					// Props we control
					if (!event.defaultPrevented) passThroughProps[func](event);

					// Existing props on the component
					if (!event.defaultPrevented) existingProps[func](event);
				}
			});
		}
	}

	return clone;
}

/**
 * This is a hack, but basically we want to keep the full 'API' of the component, but we do want to
 * wrap it in a forwardRef so that we _can_ passthrough the ref
 */
export function forwardRefWithAs(component) {
	return Object.assign(forwardRef(component), {
		displayName: component.displayName ?? component.name
	});
}

export function compact(object){
	let clone = Object.assign({}, object);
	for (let key in clone) {
		if (clone[key] === undefined) delete clone[key];
	}
	return clone;
}

function omit(object, keysToOmit) {
	let clone = Object.assign({}, object);
	for (let key of keysToOmit) {
		if (key in clone) delete clone[key];
	}
	return clone;
}
