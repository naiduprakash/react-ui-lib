import React, { createContext, useContext } from "react";

let Context = createContext(null);
Context.displayName = "OpenClosedContext";

export const State = {
	Open: 0,
	Closed: 1
};

export function useOpenClosed() {
	return useContext(Context);
}

export function OpenClosedProvider({ value, children }) {
	return <Context.Provider value={value}>{children}</Context.Provider>;
}
