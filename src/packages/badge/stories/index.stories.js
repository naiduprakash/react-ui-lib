import React, { useState } from "react";
import Badge from "../../badge/src";
import Button from "../../button/src";
import { cx } from "../../utils/src";

export default {
	title: "Badge",
	component: Badge,
	parameters: {
		controls: { hideNoControlsWarning: true }
	}
};

const WarningIcon = (props) => {
	return (
		<svg
			className={cx("h-4  w-4", props.className)}
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

export const Examples = () => {
	const [count, setCount] = useState(1);
	const [position, setPosition] = useState({
		vertical: "top",
		horizontal: "right"
	});

	const incrementCount = () => {
		setCount((c) => c + 1);
	};
	const decrementCount = () => {
		setCount((c) => c - 1);
	};

	const changePosition = (updatedPosition) => () => {
		setPosition((prev) => ({
			...prev,
			...updatedPosition
		}));
	};

	let visible = count > 0;

	return (
		<div className="max-w-4xl border rounded p-4 mx-auto">
			<div className="flex space-x-5">
				<div className="flex flex-col">
					Vertical
					<label>
						<input
							type="radio"
							checked={position.vertical === "top"}
							onClick={changePosition({ vertical: "top" })}
						/>
						top
					</label>
					<label>
						<input
							type="radio"
							checked={position.vertical === "bottom"}
							onClick={changePosition({ vertical: "bottom" })}
						/>
						bottom
					</label>
				</div>
				<div className="flex flex-col">
					Horizontal
					<label>
						<input
							type="radio"
							checked={position.horizontal === "left"}
							onClick={changePosition({ horizontal: "left" })}
						/>
						left
					</label>
					<label>
						<input
							type="radio"
							checked={position.horizontal === "right"}
							onClick={changePosition({ horizontal: "right" })}
						/>
						right
					</label>
				</div>
			</div>
			<div className="my-5">
				<p className="font-bold mb-2">Primary</p>
				<div className="flex items-start space-x-5">
					<Badge position={position} variant="dot" type="primary" badgeContent="9">
						<Button type="default">dot</Button>
					</Badge>
					<Badge position={position} type="primary" badgeContent="99+">
						<Button type="default">badge content</Button>
					</Badge>
					<Badge position={position} type="primary" badgeContent={<WarningIcon />}>
						<Button type="default">badge content</Button>
					</Badge>
					<Badge
						position={position}
						type="primary"
						visible={visible}
						badgeContent={count}
					>
						<Button type="default" onClick={incrementCount}>
							+
						</Button>
						<Button type="default" onClick={decrementCount}>
							-
						</Button>
					</Badge>
				</div>
			</div>

			<div className="my-5">
				<p className="font-bold mb-2">Secondary</p>
				<div className="flex items-start space-x-5">
					<Badge position={position} variant="dot" type="secondary" badgeContent="9">
						<Button type="default">dot</Button>
					</Badge>
					<Badge position={position} type="secondary" badgeContent="99+">
						<Button type="default">badge content</Button>
					</Badge>
					<Badge position={position} type="secondary" badgeContent={<WarningIcon />}>
						<Button type="default">badge content</Button>
					</Badge>
					<Badge
						position={position}
						type="secondary"
						visible={visible}
						badgeContent={count}
					>
						<Button type="default" onClick={incrementCount}>
							+
						</Button>
						<Button type="default" onClick={decrementCount}>
							-
						</Button>
					</Badge>
				</div>
			</div>

			<div className="my-5">
				<p className="font-bold mb-2">Success</p>
				<div className="flex items-start space-x-5">
					<Badge position={position} variant="dot" type="success" badgeContent="9">
						<Button type="default">dot</Button>
					</Badge>
					<Badge position={position} type="success" badgeContent="99+">
						<Button type="default">badge content</Button>
					</Badge>
					<Badge position={position} type="success" badgeContent={<WarningIcon />}>
						<Button type="default">badge content</Button>
					</Badge>
					<Badge
						position={position}
						type="success"
						visible={visible}
						badgeContent={count}
					>
						<Button type="default" onClick={incrementCount}>
							+
						</Button>
						<Button type="default" onClick={decrementCount}>
							-
						</Button>
					</Badge>
				</div>
			</div>

			<div className="my-5">
				<p className="font-bold mb-2">Info</p>
				<div className="flex items-start space-x-5">
					<Badge position={position} variant="dot" type="info" badgeContent="9">
						<Button type="default">dot</Button>
					</Badge>
					<Badge position={position} type="info" badgeContent="99+">
						<Button type="default">badge content</Button>
					</Badge>
					<Badge position={position} type="info" badgeContent={<WarningIcon />}>
						<Button type="default">badge content</Button>
					</Badge>
					<Badge position={position} type="info" visible={visible} badgeContent={count}>
						<Button type="default" onClick={incrementCount}>
							+
						</Button>
						<Button type="default" onClick={decrementCount}>
							-
						</Button>
					</Badge>
				</div>
			</div>

			<div className="my-5">
				<p className="font-bold mb-2">Warning</p>
				<div className="flex items-start space-x-5">
					<Badge position={position} variant="dot" type="warning" badgeContent="9">
						<Button type="default">dot</Button>
					</Badge>
					<Badge position={position} type="warning" badgeContent="99+">
						<Button type="default">badge content</Button>
					</Badge>
					<Badge position={position} type="warning" badgeContent={<WarningIcon />}>
						<Button type="default">badge content</Button>
					</Badge>
					<Badge
						position={position}
						type="warning"
						visible={visible}
						badgeContent={count}
					>
						<Button type="default" onClick={incrementCount}>
							+
						</Button>
						<Button type="default" onClick={decrementCount}>
							-
						</Button>
					</Badge>
				</div>
			</div>

			<div className="my-5">
				<p className="font-bold mb-2">Danger</p>
				<div className="flex items-start space-x-5">
					<Badge position={position} variant="dot" type="danger" badgeContent="9">
						<Button type="default">dot</Button>
					</Badge>
					<Badge position={position} type="danger" badgeContent="99+">
						<Button type="default">badge content</Button>
					</Badge>
					<Badge position={position} type="danger" badgeContent={<WarningIcon />}>
						<Button type="default">badge content</Button>
					</Badge>
					<Badge
						position={position}
						type="danger"
						visible={visible}
						badgeContent={count}
					>
						<Button type="default" onClick={incrementCount}>
							+
						</Button>
						<Button type="default" onClick={decrementCount}>
							-
						</Button>
					</Badge>
				</div>
			</div>
		</div>
	);
};
