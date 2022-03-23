import React, { Fragment, useState } from "react";
import Transition from "../src";

export default {
	title: "Transition",
	component: Transition,
	parameters: {
		controls: { hideNoControlsWarning: true }
	}
};

export const Examples1 = () => {
	const [isShowing, setIsShowing] = useState(false);

	return (
		<>
			<button onClick={() => setIsShowing((isShowing) => !isShowing)}>Toggle</button>
			<Transition show={isShowing}>I will appear and disappear.</Transition>
		</>
	);
};

export const Examples2 = () => {
	const [isShowing, setIsShowing] = useState(false);

	return (
		<>
			<button onClick={() => setIsShowing((isShowing) => !isShowing)}>Toggle</button>
			<Transition
				show={isShowing}
				enter="transition-opacity duration-1000"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-1000"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				I will fade in and out
			</Transition>
		</>
	);
};
