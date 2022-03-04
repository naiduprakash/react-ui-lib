import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "@react-ui-lib/Button";

export default {
	title: "Button",
	component: Button,
	parameters: {
		controls: { hideNoControlsWarning: true }
	}
};

export const outline = () => (
	<div className="flex space-x-2">
		<Button>Button</Button>
		<Button color="primary">Button</Button>
		<Button color="orange">Button</Button>
		<Button loading>Button</Button>
		<Button color="primary" loading loadingText="Loading...">
			Button
		</Button>
	</div>
);

export const solid = () => (
	<div className="flex space-x-2">
		<Button variant="solid">Button</Button>
		<Button variant="solid" color="primary">
			Button
		</Button>
		<Button variant="solid" color="orange">
			Button
		</Button>

		<Button variant="solid" loading>
			Button
		</Button>
		<Button variant="solid" color="primary" loading loadingText="Loading...">
			Button
		</Button>
	</div>
);

export const ghost = () => (
	<div className="flex space-x-2">
		<Button variant="ghost">Button</Button>
		<Button variant="ghost" color="primary">
			Button
		</Button>
		<Button variant="ghost" color="orange">
			Button
		</Button>

		<Button variant="ghost" loading>
			Button
		</Button>
		<Button variant="ghost" color="primary" loading loadingText="Loading...">
			Button
		</Button>
	</div>
);

export const light = () => (
	<div className="flex space-x-2">
		<Button variant="light">Button</Button>
		<Button variant="light" color="primary">
			Button
		</Button>
		<Button variant="light" color="orange">
			Button
		</Button>

		<Button variant="light" loading>
			Button
		</Button>
		<Button variant="light" color="primary" loading loadingText="Loading...">
			Button
		</Button>
	</div>
);

export const link = () => (
	<div className="flex space-x-2">
		<Button variant="link" color="primary">
			Button
		</Button>
		<Button variant="link" color="orange">
			Button
		</Button>

		<Button variant="link" color="primary" loading loadingText="Loading...">
			Button
		</Button>
	</div>
);

export const size = () => (
	<div className="flex space-x-2">
		<Button size="xs" variant="solid" color="primary">
			Button
		</Button>
		<Button size="sm" variant="solid" color="primary">
			Button
		</Button>
		<Button size="md" variant="solid" color="primary">
			Button
		</Button>
		<Button size="lg" variant="solid" color="primary">
			Button
		</Button>
		<Button size="xl" variant="solid" color="primary">
			Button
		</Button>
	</div>
);
