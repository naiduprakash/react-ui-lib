import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "@react-ui-lib/button";

storiesOf("Button", module).add("Default", () => (
	<Button
		onClick={() => {
			alert("You are the best! =)");
		}}
	>
		Click me
	</Button>
));
