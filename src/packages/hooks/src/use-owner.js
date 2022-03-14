import { useMemo } from "react";
import { getOwnerDocument } from "../../utils/src";

export function useOwnerDocument(...args) {
	return useMemo(() => getOwnerDocument(...args), [...args]);
}
