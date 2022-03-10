import React from "react";
import Skeleton from "@react-ui-lib/skeleton";

export default {
	title: "Skeleton",
	component: Skeleton,
	parameters: {
		controls: { hideNoControlsWarning: true }
	}
};

export const Examples = () => {
	return (
		<div className="max-w-4xl border rounded p-4 mx-auto">
			<div className="my-5">
				<p className="font-bold mb-2">Animation Pulse</p>
				<div className="flex flex-col items-start space-y-2 w-[250px]">
					<Skeleton animation="pulse" variant="text" />
					<Skeleton animation="pulse" variant="circular" className="w-10 h-10" />
					<Skeleton
						animation="pulse"
						variant="rectangular"
						className="w-full h-[118px]"
					/>
				</div>
			</div>
			<div className="my-5">
				<p className="font-bold mb-2">Animation Wave</p>
				<div className="flex flex-col items-start space-y-2 w-[250px]">
					<Skeleton animation="wave" variant="text" />
					<Skeleton animation="wave" variant="circular" className="w-10 h-10" />
					<Skeleton
						animation="wave"
						variant="rectangular"
						className="w-full h-[118px]"
					/>
				</div>
			</div>
			<div className="my-5">
				<p className="font-bold mb-2">Animation false</p>
				<div className="flex flex-col items-start space-y-2 w-[250px]">
					<Skeleton animation={false} variant="text" />
					<Skeleton animation={false} variant="circular" className="w-10 h-10" />
					<Skeleton
						animation={false}
						variant="rectangular"
						className="w-full h-[118px]"
					/>
				</div>
			</div>
		</div>
	);
};
