import React from "react";

import Alert from "../../alert/src";
import Button from "../../button/src";
import { cx } from "../../utils/src";

const ErrorIcon = (props) => {
	return (
		<svg
			className={cx("h-6 mr-2 w-6", props.className)}
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
			className={cx("h-6 mr-2 w-6", props.className)}
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
			className={cx("h-6 mr-2 w-6", props.className)}
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
			className={cx("h-6 mr-2 w-6", props.className)}
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
	title: "Alert",
	component: Alert,
	parameters: {
		controls: { hideNoControlsWarning: true }
	}
};
export const Examples = () => {
	return (
		<>
			<div className="flex space-x-4">
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Standard</p>
					<div className="space-y-2">
						<Alert type="primary">Primary</Alert>
						<Alert type="secondary">Secondary</Alert>
						<Alert type="success">Success</Alert>
						<Alert type="info">Info</Alert>
						<Alert type="warning">Warning</Alert>
						<Alert type="danger">Danger</Alert>
					</div>
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Outline</p>
					<div className="space-y-2">
						<Alert variant="outline" type="primary">
							Primary
						</Alert>
						<Alert variant="outline" type="secondary">
							Secondary
						</Alert>
						<Alert variant="outline" type="success">
							Success
						</Alert>
						<Alert variant="outline" type="info">
							Info
						</Alert>
						<Alert variant="outline" type="warning">
							Warning
						</Alert>
						<Alert variant="outline" type="danger">
							Danger
						</Alert>
					</div>
				</div>
			</div>
			<div className="flex space-x-4">
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Standard with icon</p>
					<div className="space-y-2">
						<Alert type="success">
							<SuccessIcon />
							<span className="flex-1">Success</span>
							<Button type="success" size="xs" className="text-xs">
								UNDO
							</Button>
						</Alert>
						<Alert type="info">
							<InfoIcon />
							Info
						</Alert>
						<Alert type="warning">
							<WarningIcon />
							Warning
						</Alert>
						<Alert type="danger">
							<ErrorIcon />
							Danger
						</Alert>
					</div>
				</div>
				<div className="w-1/2 my-5">
					<p className="font-bold mb-2">Outline with icon</p>
					<div className="space-y-2">
						<Alert variant="outline" type="success">
							<SuccessIcon />
							<span className="flex-1">Success</span>
							<Button type="success" size="xs" variant="outline" className="text-xs">
								UNDO
							</Button>
						</Alert>
						<Alert variant="outline" type="info">
							<InfoIcon />
							Info
						</Alert>
						<Alert variant="outline" type="warning">
							<WarningIcon />
							Warning
						</Alert>
						<Alert variant="outline" type="danger">
							<ErrorIcon />
							Danger
						</Alert>
					</div>
				</div>
			</div>
		</>
	);
};
