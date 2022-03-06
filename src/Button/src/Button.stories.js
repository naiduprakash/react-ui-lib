import React from "react";
import Button from "@react-ui-lib/Button";

export default {
	title: "Button",
	component: Button
};

export const Playground = (props) => {
	return (
		<div className="mt-5 flex flex-col items-center">
			<p className="font-bold mb-5">Play with controls to check various options:</p>
			<Button {...props} />
		</div>
	);
};

Playground.argTypes = {
	type: {
		description: `["primary", "secondary", "success", "info", "warning", "danger"]`,
		type: { name: "string", required: false },
		defaultValue: "primary",
		control: {
			type: "select",
			options: ["primary", "secondary", "success", "info", "warning", "danger"]
		}
	},
	variant: {
		description: `["solid", "outline", "link"]`,
		type: { name: "string", required: false },
		defaultValue: "solid",
		control: {
			type: "select",
			options: ["solid", "outline", "link"]
		}
	},
	children: {
		description: `text`,
		type: { name: "string", required: true },
		defaultValue: "button",
		control: {
			type: "text"
		}
	}
};

export const Examples = () => {
	return (
		<>
			<div className="my-5">
				<p className="font-bold mb-2">Solid</p>
				<div className="flex items-start space-x-2">
					<Button type="primary">Primary</Button>
					<Button type="secondary">Secondary</Button>
					<Button type="success">Success</Button>
					<Button type="info">Info</Button>
					<Button type="warning">Warning</Button>
					<Button type="danger">Danger</Button>
				</div>
			</div>

			<div className="my-5">
				<p className="font-bold mb-2">Outline</p>
				<div className="flex items-start space-x-2">
					<Button type="primary" variant="outline">
						Primary
					</Button>
					<Button type="secondary" variant="outline">
						Secondary
					</Button>
					<Button type="success" variant="outline">
						Success
					</Button>
					<Button type="info" variant="outline">
						Info
					</Button>
					<Button type="warning" variant="outline">
						Warning
					</Button>
					<Button type="danger" variant="outline">
						Danger
					</Button>
				</div>
			</div>
			<div className="my-5">
				<p className="font-bold mb-2">Link</p>
				<div className="flex items-start space-x-2">
					<Button type="primary" variant="link">
						Primary
					</Button>
					<Button type="secondary" variant="link">
						Secondary
					</Button>
					<Button type="success" variant="link">
						Success
					</Button>
					<Button type="info" variant="link">
						Info
					</Button>
					<Button type="warning" variant="link">
						Warning
					</Button>
					<Button type="danger" variant="link">
						Danger
					</Button>
				</div>
			</div>
			<div className="my-5">
				<p className="font-bold mb-2">Rounded</p>
				<div className="flex items-start space-x-2">
					<Button type="primary" rounded>
						Primary
					</Button>
					<Button type="secondary" rounded>
						Secondary
					</Button>
					<Button type="success" rounded>
						Success
					</Button>
					<Button type="info" rounded>
						Info
					</Button>
					<Button type="warning" rounded>
						Warning
					</Button>
					<Button type="danger" rounded>
						Danger
					</Button>
				</div>
			</div>
			<div className="my-5">
				<p className="font-bold mb-2">Disabled</p>
				<div className="flex items-start space-x-2">
					<Button disabled type="primary">
						Primary
					</Button>
					<Button disabled type="secondary">
						Secondary
					</Button>
					<Button disabled type="success">
						Success
					</Button>
					<Button disabled type="info">
						Info
					</Button>
					<Button disabled type="warning">
						Warning
					</Button>
					<Button disabled type="danger">
						Danger
					</Button>
				</div>
			</div>
			<div className="my-5">
				<p className="font-bold mb-2">Sizes</p>
				<div className="flex items-start space-x-2">
					<Button type="primary" size="xs">
						button xs
					</Button>
					<Button type="secondary" size="sm">
						button sm
					</Button>
					<Button type="success" size="md">
						button md
					</Button>
					<Button type="info" size="lg">
						button lg
					</Button>
					<Button type="warning" size="xl">
						button xl
					</Button>
					<Button type="danger" size="2xl">
						button 2xl
					</Button>
				</div>
			</div>
		</>
	);
};

Examples.parameters = {
	controls: { hideNoControlsWarning: true }
};

Examples.argTypes = {};
