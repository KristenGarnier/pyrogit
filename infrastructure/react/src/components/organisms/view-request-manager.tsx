import { Tabs, useTabFocus } from "../../stores/tab.focus.store";
import { catppuccinMochaTheme } from "../../themes/captuccin-mocha";

export function ViewRequestManager() {
	const tabFocusStore = useTabFocus();

	return (
		<scrollbox
			title="Views"
			width={"20%"}
			borderStyle="rounded"
			borderColor={
				tabFocusStore.current === Tabs.VIEWS
					? catppuccinMochaTheme.focusedBorder
					: catppuccinMochaTheme.border
			}
		>
			<text>Example view</text>
		</scrollbox>
	);
}
