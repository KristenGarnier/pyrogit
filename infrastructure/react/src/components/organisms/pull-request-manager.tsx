import { useKeyboard } from "@opentui/react";
import { useChangeRequestFocusStore } from "../../stores/change-request.focus.store";
import { useChangeRequestStore } from "../../stores/changeRequest.store";
import { Tabs, useTabFocus } from "../../stores/tab.focus.store";
import { catppuccinMochaTheme } from "../../themes/captuccin-mocha";
import { calculateColumnWidths } from "../../utils/column-width-calculator";
import { PullRequestItem } from "../molecules/pull-request-item";
import { PullRequestTableHeader } from "../molecules/pull-request-table-header";

export function PullRequestManager() {
	const pullRequestStore = useChangeRequestStore();
	const tabFocusStore = useTabFocus();
	const itemFocusStore = useChangeRequestFocusStore();
	const prs = pullRequestStore.getFilteredPRs();

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

	const widths = calculateColumnWidths(prs);

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
			<PullRequestTableHeader widths={widths} />
			{prs.map((item) => (
				<PullRequestItem
					key={item.id.number}
					item={item}
					selected={itemFocusStore.current?.data.id.number === item.id.number}
					widths={widths}
				/>
			))}
		</scrollbox>
	);
}
