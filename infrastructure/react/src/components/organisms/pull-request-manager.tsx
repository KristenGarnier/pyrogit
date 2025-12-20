import { useKeyboard } from "@opentui/react";
import clipboard from "clipboardy";
import open from "open";
import { useChangeRequestFocusStore } from "../../stores/change-request.focus.store";
import { useChangeRequestStore } from "../../stores/changeRequest.store";
import { useLoadingStore } from "../../stores/loading";
import { Tabs, useTabFocus } from "../../stores/tab.focus.store";
import { catppuccinMochaTheme } from "../../themes/captuccin-mocha";
import { throttle } from "../../utils/throttle";
import { ContextMenu } from "../molecules/context-menu";
import { useToastStore } from "../../stores/toast.store";

export function PullRequestManager() {
	const pullRequestStore = useChangeRequestStore();
	const loadingStore = useLoadingStore();
	const tabFocusStore = useTabFocus();
	const itemFocusStore = useChangeRequestFocusStore();
	const toastStore = useToastStore();

	useKeyboard((key) => {
		if (tabFocusStore.current !== Tabs.PULL_REQUESTS) return;
		const wantedEvents = ["up", "down", "return", "escape"];
		if (!wantedEvents.includes(key.name)) return;

		if (key.name === "return") {
			if (!itemFocusStore.current) return;
			tabFocusStore.focusCustom(String(itemFocusStore.current?.data.id.number));
			return;
		}

		itemFocusStore.next(
			key.name as "up" | "down",
			pullRequestStore.getFilteredPRs(),
		);
	});

	if (loadingStore.isLoading) return null;

	return (
		<scrollbox
			title="Pull requests"
			flexGrow={1}
			borderStyle="rounded"
			borderColor={
				tabFocusStore.current === Tabs.PULL_REQUESTS
					? catppuccinMochaTheme.focusedBorder
					: catppuccinMochaTheme.border
			}
		>
			{pullRequestStore.getFilteredPRs().map((item) => (
				<box
					flexDirection="row"
					gap={2}
					key={item.id.number}
					position="relative"
					{...(itemFocusStore.current?.data.id.number === item.id.number &&
						tabFocusStore.current === Tabs.PULL_REQUESTS && {
							backgroundColor: catppuccinMochaTheme.highlightBg,
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
					{tabFocusStore.current === String(item.id.number) && (
						<ContextMenu
							id={String(item.id.number)}
							options={[
								{
									id: "browser",
									title: "Open in browser",
									icon: "󰏌",
									onSelect: throttle(() => {
										void open(item.webUrl);
									}, 1000),
								},
								{
									id: "copy",
									title: "Copy branch name",
									icon: "",
									onSelect: throttle(() => {
										toastStore.addToast("Branch copied in the clipboard");
										void clipboard.write(item.branch);
									}, 1000),
								},
							]}
						/>
					)}
				</box>
			))}
		</scrollbox>
	);
}
