import { useState } from "react";
import Input from "../src/input";
import Button from "@react-ui-lib/button";

export default {
	title: "Input",
	component: Input,
	parameters: {
		controls: { hideNoControlsWarning: true }
	}
};

export const Example1 = () => {
	const [isError, setIsError] = useState(false);
	return (
		<div>
			<Input
				type="text"
				color="lightBlue"
				size="regular"
				outline={true}
				placeholder="Text"
				error={isError}
				helperText="Some helper text"
			/>
			<br />
			<Input
				type="password"
				color="lightBlue"
				size="regular"
				outline={true}
				placeholder="Password"
				error={isError}
				helperText="Some helper text"
			/>
			<br />
			<Input
				type="number"
				color="lightBlue"
				size="regular"
				outline={true}
				placeholder="Number"
				error={isError}
				helperText="Some helper text"
			/>

			<Button
				primary
				onClick={() => {
					setIsError((p) => !p);
				}}
			>
				Toggle error state
			</Button>
		</div>
	);
};
