import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import { useEffect, useState } from "react";
import { Pyrogit } from "./services/pyrogit";
import { LoadingScreen } from "./components/atoms/loading";
import { useLoadingStore } from "./stores/loading";
import { useChangeRequestStore } from "./stores/changeRequest.store";
import { Tabs, useTabFocus } from "./stores/tab.focus.store";
import { useItemFocusStore } from "./stores/items.focus.store";

const Pyro = new Pyrogit();

function App() {
	const loadingStore = useLoadingStore();
	const prStore = useChangeRequestStore();
	const tabFocusStore = useTabFocus();
	const renderer = useRenderer();

	useEffect(() => {
		renderer.console.show();
		console.log("Hello, from the console!");
	}, [renderer.console.show]);

	console.log(tabFocusStore.current);

	useEffect(() => {
		loadingStore.start("Loading the app");
		Pyro.init()
			.then(([instance, error]) => {
				if (error) {
					loadingStore.stop();
				}
				loadingStore.stop();

				return instance?.list({});
			})
			.then((requests) => {
				if (!requests) return;
				prStore.setPRs(requests);
			})
			.finally(loadingStore.stop);
	}, [loadingStore.stop, loadingStore.start, prStore.setPRs]);

	useKeyboard((key) => {
		if (key.name === "tab") {
			tabFocusStore.cycle();
		}
	});

	return (
		<>
			<LoadManager />
			{!loadingStore.isLoading && (
				<box flexDirection="row">
					<ViewRequestManager />
					<PullRequestManager />
				</box>
			)}
		</>
	);
}

function ViewRequestManager() {
	const tabFocusStore = useTabFocus();

	return (
		<scrollbox
			title="Views"
			width={"20%"}
			borderStyle="rounded"
			borderColor={tabFocusStore.current === Tabs.VIEWS ? "teal" : "white"}
		>
			<text>Yeah</text>
		</scrollbox>
	);
}

function PullRequestManager() {
	const pullRequestStore = useChangeRequestStore();
	const loadingStore = useLoadingStore();
	const tabFocusStore = useTabFocus();
	const itemFocusStore = useItemFocusStore();

	useKeyboard((key) => {
		if (tabFocusStore.current !== Tabs.PULL_REQUESTS) return;
		if (key.name === "up") {
			console.log("up");
			itemFocusStore.next(key.name, pullRequestStore.getFilteredPRs());
		}
		if (key.name === "down") {
			console.log("down");
			itemFocusStore.next(key.name, pullRequestStore.getFilteredPRs());
		}
	});

	if (loadingStore.isLoading) return null;

	return (
		<scrollbox
			title="Pull requests"
			flexGrow={1}
			borderStyle="rounded"
			borderColor={
				tabFocusStore.current === Tabs.PULL_REQUESTS ? "teal" : "white"
			}
		>
			{pullRequestStore.getFilteredPRs().map((item) => (
				<box
					flexDirection="row"
					gap={2}
					key={item.id.number}
					{...(itemFocusStore.current?.data.id.number === item.id.number &&
						tabFocusStore.current === Tabs.PULL_REQUESTS && {
							backgroundColor: "black",
						})}
				>
					<box flexDirection="row">
						<text fg={"red"}>*</text>
						<text>{item.id.number}</text>
					</box>
					<text fg={item.state === "open" ? "cyan" : "red"}>
						{item.state === "open" ? "" : ""}
					</text>
					<text>{item.title}</text>
					<text>{item.author.login}</text>
					<text>{item.taget}</text>
					<text fg={"orange"}>
						{item.review.hasAnyReviewActivity ? "" : "󰚭"}
					</text>
					<text fg={"yellow"}>{item.review.myStatus.kind}</text>
				</box>
			))}
		</scrollbox>
	);
}

function LoadManager() {
	const loadingStore = useLoadingStore();

	if (!loadingStore.isLoading) return null;

	return (
		<>
			<LoadingScreen />
		</>
	);
}

// function App() {
// 	const [value, setValue] = useState("");
// 	const [loading, setLoading] = useState(false);
// 	const [needToken, setNeedToken] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const [success, setSuccess] = useState(false);
//
// 	useEffect(() => {
// 		setLoading(true);
// 		Pyro.init().then(([_, error]) => {
// 			if (error) {
// 				setLoading(false);
// 				setNeedToken(true);
// 				return;
// 			}
//
// 			setLoading(false);
// 		});
// 	}, []);
//
// 	async function submitToken() {
// 		setLoading(true);
// 		setError(null);
// 		const [instance, error] = await Pyro.init(value);
// 		if (error) {
// 			setLoading(false);
// 			return setError(error.message);
// 		}
//
// 		setSuccess(true);
// 		setLoading(false);
// 		setNeedToken(false);
// 	}
//
// 	return (
// 		<>
// 			{loading && <LoadingScreen title="Loading infos" />}
// 			<box flexGrow={1}>
// 				<box
// 					style={{
// 						flexGrow: 1,
// 					}}
//
// 					{needToken && (
// 						<box style={{ border: true, height: 3 }} title="Github token">
// 							<input
// 								placeholder="Enter token..."
// 								value={value}
// 								onInput={setValue}
// 								onSubmit={submitToken}
// 								onPaste={(event) => setValue(event.text)}
// 								focused
// 							/>
// 						</box>
// 					)}
//
// 					<box flexDirection="row">
// 						{loading && (
// 							<text attributes={TextAttributes.DIM}>Verifying token...</text>
// 						)}
// 						{error && <text fg={"red"}>{error}</text>}
// 						{success && <text fg={"green"}>Token valide !</text>}
// 					</box>
// 				</box>
// 			</box>
// 		</>
// 	);
// }

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
