import { cx, __DEV__ } from "@react-ui-lib/utils";

const colors = (props) => {
	let isOutlined = props.variant === "outline";
	return {
		primary: `
			${
				isOutlined
					? "border-blue-600 bg-transparent text-blue-600"
					: "border-blue-100 bg-blue-100 text-blue-600"
			}`,
		secondary: `
			${
				isOutlined
					? "border-gray-600 bg-transparent text-gray-600"
					: "border-gray-100 bg-gray-100 text-gray-600"
			}`,
		success: `
			${
				isOutlined
					? "border-green-600 bg-transparent text-green-600"
					: "border-green-100 bg-green-100 text-green-600"
			}`,
		info: `
			${
				isOutlined
					? "border-sky-600 bg-transparent text-sky-600"
					: "border-sky-100 bg-sky-100 text-sky-600"
			}`,
		warning: `
			${
				isOutlined
					? "border-yellow-600 bg-transparent text-yellow-600"
					: "border-yellow-100 bg-yellow-100 text-yellow-600"
			}`,
		danger: `
			${
				isOutlined
					? "border-red-600 bg-transparent text-red-600"
					: "border-red-100 bg-red-100 text-red-600"
			}`
	}[props.type];
};
export const useAlertClass = (props) => {
	let commonClasses = "border rounded flex items-start py-2 px-4";
	let colorClasses = colors(props);
	return cx(commonClasses, colorClasses);
};
