import { cx } from "../../utils/src";

const colors = (props) => {
	return {
		primary: "border-blue-500 bg-blue-500 text-white",
		secondary: "border-gray-500 bg-gray-500 text-white",
		success: "border-green-500 bg-green-500 text-white",
		info: "border-sky-500 bg-sky-500 text-white",
		warning: "border-yellow-500 bg-yellow-500 text-white",
		danger: "border-red-500 bg-red-500 text-white"
	}[props.type];
};

const positions = (props) => {
	const { position, visible } = props;
	const { vertical, horizontal } = position;

	const commonClasses = "-translate-x-1/2 ";
	const verticalClasses = {
		top: "top-0 -translate-y-1/2",
		bottom: "bottom-0 translate-y-1/2"
	}[vertical];

	const horizontalClasses = {
		left: "left-0 -translate-x-1/2",
		right: "right-0 translate-x-1/2"
	}[horizontal];
	const visibleClasses = visible ? "scale-100" : "scale-0";

	return cx(commonClasses, verticalClasses, horizontalClasses, visibleClasses);
};

const variants = (props) => {
	const { variant } = props;

	return {
		standard: "min-w-[20px] h-5 rounded-[10px] px-1.5",
		dot: "min-w-[8px] h-2 rounded p-0"
	}[variant];
};

export function useBadgeClass(props) {
	const { position, type, visible, variant, overlap } = props;
	const commonClasses = "flex flex-wrap items-center text-xs absolute ";
	const colorClasses = colors({ type });
	const positionClasses = positions({ position, overlap, visible });
	const variantClasses = variants({ variant });
	return cx(commonClasses, colorClasses, positionClasses, variantClasses, props.className);
}

export function useRootClass(props) {
	return cx("relative inline-flex align-middle shrink-0", props.className);
}
