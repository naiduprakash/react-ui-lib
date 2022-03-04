import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "@react-ui-lib/Button";

storiesOf("Button", module).add("Default", () => (
	<Button
		onClick={() => {
			alert("You are best !=)");
		}}
	>
		Click me
	</Button>
));
