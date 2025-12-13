import {
	createCliRenderer,
	InputRenderable,
	TextAttributes,
} from "@opentui/core";
import { createRoot } from "@opentui/react";
import { useCallback, useState } from "react";
import { TextRenderable, type TextareaRenderable } from "@opentui/core";
import { useKeyboard, useRenderer } from "@opentui/react";
import { useEffect, useRef } from "react";

function App() {
	const inputRef = useRef<InputRenderable>(null);
	const [value, setValue] = useState("");

	useKeyboard((key) => {
		if (key.name === "return") {
			console.log(inputRef.current?.value);
		}
	});

	return (
		<box flexDirection="row" flexGrow={1}>
			<scrollbox
				title="Views"
				style={{
					border: true,
					flexGrow: 1,
					width: "30%",
					flexDirection: "column",
					gap: 1,
				}}
			>
				<box style={{ border: true, height: 3 }}>
					<input placeholder="Enter username..." onInput={setValue} focused />
				</box>

				<box flexDirection="row">
					<text fg={"red"}>{"*"}</text>
					<text attributes={TextAttributes.DIM}>{value}</text>
				</box>
			</scrollbox>
			<scrollbox
				title="Details"
				style={{ border: true, flexGrow: 1, width: "70%" }}
			></scrollbox>
		</box>
	);
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
