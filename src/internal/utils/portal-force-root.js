import React, { createContext, useContext } from "react";

let ForcePortalRootContext = createContext(false);

export function usePortalRoot() {
	return useContext(ForcePortalRootContext);
}

export function ForcePortalRoot(props) {
	return (
		<ForcePortalRootContext.Provider value={props.force}>
			{props.children}
		</ForcePortalRootContext.Provider>
	);
}
