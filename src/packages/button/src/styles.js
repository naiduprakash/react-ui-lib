import { cx } from "../../utils/src";

const colors = (props) => {
	let isOutlined = props.variant === "outline";
	let isLinked = props.variant === "link";
	let isDisabled = props.disabled;
	return {
		default: `
    border-gray-200 
    bg-white text-black-500
    active:bg-gray-400 hover:bg-gray-200`,
		primary: `
    border-blue-500 
    ${isOutlined ? "bg-transparent text-blue-500 hover:text-white" : "bg-blue-500 text-white"} 
    ${isLinked ? "text-blue-500 active:text-blue-600 hover:text-blue-400 border-0" : ""} 
    ${isDisabled || isLinked ? "" : "active:bg-blue-600 hover:bg-blue-400"}`,
		secondary: `
    border-gray-500 
    ${isOutlined ? "bg-transparent text-gray-500 hover:text-white" : "bg-gray-500 text-white"}
    ${isLinked ? "text-gray-500 active:text-gray-600 hover:text-gray-400 border-0" : ""} 
    ${isDisabled || isLinked ? "" : "active:bg-gray-600 hover:bg-gray-400"}`,
		success: `
    border-green-500
    ${isOutlined ? "bg-transparent text-green-500 hover:text-white" : "bg-green-500 text-white"}
    ${isLinked ? "text-green-500 active:text-green-600 hover:text-green-400 border-0" : ""} 
    ${isDisabled || isLinked ? "" : "active:bg-green-600 hover:bg-green-400"}`,
		info: `
    border-sky-500
    ${isOutlined ? "bg-transparent text-sky-500 hover:text-white" : "bg-sky-500 text-white"}
    ${isLinked ? "text-sky-500 active:text-sky-600 hover:text-sky-400 border-0" : ""} 
    ${isDisabled || isLinked ? "" : "active:bg-sky-600 hover:bg-sky-400"}`,
		warning: `
    border-yellow-500
    ${isOutlined ? "bg-transparent text-yellow-500 hover:text-white" : "bg-yellow-500 text-white"}
    ${isLinked ? "text-yellow-500 active:text-yellow-600 hover:text-yellow-400 border-0" : ""} 
    ${isDisabled || isLinked ? "" : "active:bg-yellow-600 hover:bg-yellow-400"}`,
		danger: `
    border-red-500
    ${isOutlined ? "bg-transparent text-red-500 hover:text-white" : "bg-red-500 text-white"}
    ${isLinked ? "text-red-500 active:text-red-600 hover:text-red-400 border-0" : ""} 
    ${isDisabled || isLinked ? "" : "active:bg-red-600 hover:bg-red-400"}`
	}[props.type];
};

const sizes = {
	xs: "px-2 py-1",
	sm: "px-3 py-1.5",
	md: "px-4 py-2",
	lg: "px-5 py-2.5",
	xl: "px-6 py-3",
	"2xl": "px-7 py-3.5"
};

export const useButtonClass = (props) => {
	let commonClasses =
		"flex border transition ease-in-out duration-300 shadow-sm rounded whitespace-nowrap";
	let sizeClasses = sizes[props.size];

	let roundedClasses = props.rounded && "rounded-full";
	let disabledClasses = props.disabled && "opacity-60 cursor-not-allowed ";
	let linkedClasses =
		props.variant === "link" &&
		"border-0 bg-transparent underline  hover:border-0 active:border:0";
	let colorClass = colors(props);

	return cx(
		commonClasses,
		sizeClasses,
		roundedClasses,
		colorClass,
		disabledClasses,
		linkedClasses
	);
};
