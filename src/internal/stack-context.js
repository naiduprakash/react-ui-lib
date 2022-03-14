import React, { createContext, useCallback, useContext } from "react";
import { useIsoMorphicEffect } from "../packages/hooks/src";

let StackContext = createContext(() => {});
StackContext.displayName = "StackContext";

export const StackMessage = {
	Add: 0,
	Remove: 1
};
export function useStackContext() {
	return useContext(StackContext);
}

export function StackProvider({ children, onUpdate, type, element }) {
	let parentUpdate = useStackContext();

	let notify = useCallback(
		(...args) => {
			// Notify our layer
			onUpdate?.(...args);

			// Notify the parent
			parentUpdate(...args);
		},
		[parentUpdate, onUpdate]
	);

	useIsoMorphicEffect(() => {
		notify(StackMessage.Add, type, element);
		return () => notify(StackMessage.Remove, type, element);
	}, [notify, type, element]);

	return <StackContext.Provider value={notify}>{children}</StackContext.Provider>;
}
