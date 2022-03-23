import { useState } from "react";
import TextField from "../src";

export default {
	title: "TextField",
	component: TextField,
	parameters: {
		controls: { hideNoControlsWarning: true }
	}
};

export const Example1 = () => {
	let [value, setValue] = useState("some error");
	return (
		<div className="max-w-4xl border rounded p-4 mx-auto">
			<div className="flex space-x-4">
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Email</p>
					<TextField type="email" size="regular" placeholder="Email" />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Number</p>
					<TextField type="number" size="regular" placeholder="Number" />
				</div>
			</div>
			<div className="flex space-x-4">
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Password</p>
					<TextField type="password" size="regular" placeholder="Password" />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Search</p>
					<TextField type="search" size="regular" placeholder="Search" />
				</div>
			</div>
			<div className="flex space-x-4">
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Tel</p>
					<TextField type="tel" size="regular" placeholder="Tel" />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Text</p>
					<TextField type="text" size="regular" placeholder="Text" />
				</div>
			</div>
			<div className="flex space-x-4">
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">URL</p>
					<TextField type="url" size="regular" placeholder="url" />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">With Focused</p>
					<TextField
						type="text"
						size="regular"
						placeholder="With Focused"
						focused={true}
					/>
				</div>
			</div>
			<div className="flex space-x-4">
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">With Error</p>
					<TextField type="url" size="regular" placeholder="With Error" error={true} />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">With Error and helperText</p>
					<TextField
						type="text"
						size="regular"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="With Error and helperText"
						helperText="Some helperText to describe the error"
						error={true}
					/>
				</div>
			</div>
		</div>
	);
};
