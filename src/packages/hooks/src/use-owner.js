import { useMemo } from "react";
import { getOwnerDocument } from "../../../internal/utils/owner";

export function useOwnerDocument(...args) {
	return useMemo(() => getOwnerDocument(...args), [...args]);
}
