import React from "react";
import Button from "@react-ui-lib/Button";

import { cx } from "@react-ui-lib/utils";

const ErrorIcon = (props) => {
	return (
		<svg
			className={cx("h-6  w-6", props.className)}
			focusable="false"
			aria-hidden="true"
			viewBox="0 0 24 24"
			data-testid="ErrorOutlineIcon"
			fill="currentColor"
		>
			<path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
		</svg>
	);
};
const InfoIcon = (props) => {
	return (
		<svg
			className={cx("h-6  w-6", props.className)}
			focusable="false"
			aria-hidden="true"
			viewBox="0 0 24 24"
			data-testid="InfoOutlinedIcon"
			fill="currentColor"
		>
			<path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z" />
		</svg>
	);
};

const WarningIcon = (props) => {
	return (
		<svg
			className={cx("h-6  w-6", props.className)}
			focusable="false"
			aria-hidden="true"
			viewBox="0 0 24 24"
			data-testid="ReportProblemOutlinedIcon"
			fill="currentColor"
		>
			<path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
		</svg>
	);
};

const SuccessIcon = (props) => {
	return (
		<svg
			className={cx("h-6  w-6", props.className)}
			focusable="false"
			aria-hidden="true"
			viewBox="0 0 24 24"
			data-testid="SuccessOutlinedIcon"
			fill="currentColor"
		>
			<path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
		</svg>
	);
};

export default {
	title: "Button",
	component: Button,
	argTypes: {
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
	}
};

export const Examples = () => {
	return (
		<>
			<div className="flex ">
				<div className="w-1/2 my-5">
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

				<div className="w-1/2 my-5">
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
			</div>
			<div className="flex ">
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Solid with icon</p>
					<div className="flex items-start space-x-2">
						<Button type="success">
							<SuccessIcon className="mr-2" />
							Success
						</Button>
						<Button type="info">
							<InfoIcon className="mr-2" />
							Info
						</Button>
						<Button type="warning">
							<WarningIcon className="mr-2" />
							Warning
						</Button>
						<Button type="danger">
							<ErrorIcon className="mr-2" />
							Danger
						</Button>
					</div>
				</div>

				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Outline with icon</p>
					<div className="flex items-start space-x-2">
						<Button type="success" variant="outline">
							Success
							<SuccessIcon className="ml-2" />
						</Button>
						<Button type="info" variant="outline">
							Info
							<InfoIcon className="ml-2" />
						</Button>
						<Button type="warning" variant="outline">
							Warning
							<WarningIcon className="ml-2" />
						</Button>
						<Button type="danger" variant="outline">
							Danger
							<ErrorIcon className="ml-2" />
						</Button>
					</div>
				</div>
			</div>
			<div className="flex">
				<div className="w-1/2 my-5">
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
				<div className="w-1/2 my-5">
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
			</div>
			<div className="flex">
				<div className="w-1/2 my-5">
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
				<div className="w-1/2 my-5">
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
			</div>
		</>
	);
};

Examples.parameters = {
	controls: { hideNoControlsWarning: true }
};

Examples.argTypes = {};
