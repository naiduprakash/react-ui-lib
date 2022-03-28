import { useState } from "react";
import Radio from "../src";

export default {
	title: "Radio",
	component: Radio,
	parameters: {
		controls: { hideNoControlsWarning: true }
	}
};

export const Example1 = () => {
	const [checkedItem, setCheckedItem] = useState("");

	const handleChecked = (item) => (e) => {
		setCheckedItem(item);
	};
	return (
		<div className="max-w-4xl border rounded p-4 mx-auto">
			<div className="flex space-x-4">
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Controlled</p>
					<Radio
						checked={checkedItem === "controlled"}
						value="controlled"
						onChange={handleChecked("controlled")}
					/>
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Color</p>
					<Radio
						checked={checkedItem === "color"}
						onChange={handleChecked("color")}
						classNames={{
							root: "text-red-500 hover:bg-red-50"
						}}
					/>
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Unchecked</p>
					<Radio />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Checked</p>
					<Radio checked={true} />
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Size</p>
					<div className="flex items-center">
						<Radio
							checked={true}
							classNames={{
								root:"p-1",
								iconOuter: "text-[1rem]",
								iconInner: "text-[1rem]"
							}}
						/>
						<Radio checked={true} />
						<Radio
							checked={true}
							classNames={{
								iconOuter: "text-[2rem]",
								iconInner: "text-[2rem]"
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
