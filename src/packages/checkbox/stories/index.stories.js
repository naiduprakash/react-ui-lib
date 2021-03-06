import { useState } from "react";
import Checkbox from "../src";

export default {
	title: "Checkbox",
	component: Checkbox,
	parameters: {
		controls: { hideNoControlsWarning: true }
	}
};

export const Example1 = () => {
	const [checked, setChecked] = useState(false);

	const handleChecked = () => {
		setChecked((p) => !p);
	};
	return (
		<div className="max-w-4xl border rounded p-4 mx-auto">
			<div className="flex space-x-4">
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Controlled</p>
					<Checkbox checked={checked} onChange={handleChecked} />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Color</p>
					<Checkbox
						checked={checked}
						onChange={handleChecked}
						classNames={{
							root: "text-red-500 hover:bg-red-50"
						}}
					/>
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Default</p>
					<Checkbox />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Checked</p>
					<Checkbox checked={true} />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Indeterminate</p>
					<Checkbox indeterminate checked={true} />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Size</p>
					<div className="flex items-center">
						<Checkbox
							checked={true}
							classNames={{ root: "p-1", icon: "text-[1rem]" }}
						/>
						<Checkbox checked={true} />
						<Checkbox checked={true} classNames={{ icon: "text-[2rem]" }} />
					</div>
				</div>
			</div>
		</div>
	);
};
