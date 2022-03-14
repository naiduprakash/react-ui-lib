import React, { createContext, useContext } from "react";

export const DialogContext = createContext(null);

DialogContext.displayName = "DialogContext";

export function useDialogContext(component) {
	let context = useContext(DialogContext);
	if (context === null) {
		let err = new Error(`<${component} /> is missing a parent <Dialog /> component.`);
		if (Error.captureStackTrace) Error.captureStackTrace(err, useDialogContext);
		throw err;
	}
	return context;
}
export function DialogContextProvider({ children, value }) {
	return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}
