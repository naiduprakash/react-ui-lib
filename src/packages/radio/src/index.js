import React from "react";
import { cx } from "../../../internal/utils/class-names";

import RadioIconOuter from "./radio-icon-outer";
import RadioIconInner from "./radio-icon-inner";

function useRadioClasses(props) {
	const { classNames, checked } = props;
	const rootClasses = cx(
		"inline-flex items-center content-center relative box-border bg-transparent outline-0 border-0 m-0 cursor-pointer select-none align-middle appearance-none p-1.5 rounded-[50%] text-blue-500 hover:bg-blue-50 focus:bg-blue-50",
		classNames.root
	);
	let inputClasses = cx(
		"cursor-[inherit] absolute opacity-0 w-full h-full top-0 left-0 m-0 p-0 z-[1] ",
		classNames.input
	);
	const iconWrapperClasses = cx("relative flex", classNames.iconWrapper);
	const iconOuterClasses = cx(
		"select-none w-[1em] h-[1em] inline-block fill-current shrink-0 text-[1.5rem] scale-100",
		classNames.iconOuter
	);
	const iconInnerClasses = cx(
		"select-none w-[1em] h-[1em] inline-block fill-current shrink-0 text-[1.5rem] scale-100 absolute left-0",
		classNames.iconInner,
		checked ? "scale-100" : "scale-0"
	);
	return { rootClasses, inputClasses, iconWrapperClasses, iconInnerClasses, iconOuterClasses };
}

function Radio(props, ref) {
	const { checked = false, onChange, classNames = {}, ...restProps } = props;

	const { rootClasses, inputClasses, iconWrapperClasses, iconInnerClasses, iconOuterClasses } =
		useRadioClasses({ classNames, checked });

	const handleOnChange = (e) => {
		onChange && onChange(e);
	};

	return (
		<span ref={ref} className={rootClasses}>
			<input
				type="radio"
				className={inputClasses}
				checked={checked}
				onChange={handleOnChange}
				tabIndex={-1}
				{...restProps}
			/>
			<span className={iconWrapperClasses}>
				<RadioIconOuter className={iconOuterClasses} />
				<RadioIconInner className={iconInnerClasses} />
			</span>
		</span>
	);
}

export default React.forwardRef(Radio);
