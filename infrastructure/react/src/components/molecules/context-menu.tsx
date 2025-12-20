import { useKeyboard } from "@opentui/react";
import { useScopedStore } from "../../hooks/use-scoped-store";
import { useTabFocus } from "../../stores/tab.focus.store";
import { catppuccinMochaTheme } from "../../themes/captuccin-mocha";

export type ContextMenuOption = {
	id: string;
	icon: string;
	title: string;
	onSelect: () => void;
};

type ContextMenuProps = {
	id: string;
	options: ContextMenuOption[];
};

export function ContextMenu({ id, options }: ContextMenuProps) {
	const tabFocusStore = useTabFocus();
	const itemFocusStore = useScopedStore(options[0]);

	useKeyboard((key) => {
		if (tabFocusStore.current !== id) return;
		const wantedEvents = ["up", "down", "escape", "return"];
		if (!wantedEvents.includes(key.name)) return;

		if (key.name === "escape") {
			tabFocusStore.stopCustom();
			return;
		}

		if (key.name === "return" && !key.repeated) {
			itemFocusStore.current?.data.onSelect();
			return;
		}

		itemFocusStore.next(key.name as "up" | "down", options);
	});

	return (
		<box
			position="absolute"
			top={0}
			right={0}
			flexDirection="column"
			backgroundColor={catppuccinMochaTheme.highlightBg}
		>
			{options.map((item) => (
				<box
					width={"100%"}
					{...(itemFocusStore.current?.data.id === item.id &&
						tabFocusStore.current === id && {
							backgroundColor: catppuccinMochaTheme.muted,
						})}
					flexDirection="row"
					paddingLeft={1}
					paddingRight={1}
					gap={1}
					key={item.id}
				>
					<text>{item.icon}</text>
					<text>{item.title}</text>
				</box>
			))}
		</box>
	);
}
