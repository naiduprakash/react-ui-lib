import React, { createContext, useContext } from "react";

export const ModalContext = createContext(null);

ModalContext.displayName = "ModalContext";

export function useModalContext(component) {
	let context = useContext(ModalContext);
	if (context === null) {
		let err = new Error(`<${component} /> is missing a parent <Modal /> component.`);
		if (Error.captureStackTrace) Error.captureStackTrace(err, useModalContext);
		throw err;
	}
	return context;
}
export function ModalContextProvider({ children, value }) {
	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
