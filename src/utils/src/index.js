import clsx from "classnames";

import { twMerge } from "tailwind-merge";

export const __DEV__ = process.env.NODE_ENV !== "production";
export const cx = (...args) => {
	return twMerge(clsx(...args));
};
