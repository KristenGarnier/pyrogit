import { create } from "zustand";
import type { ChangeRequest } from "../../../../domain/change-request";

type Up = "up";
type Down = "down";
type YDirection = Up | Down;

type TabFocusState = {
	current: { index: number; data: ChangeRequest } | undefined;

	next: (direction: YDirection, items: ChangeRequest[]) => void;
	reset: () => void;
};

export const useItemFocusStore = create<TabFocusState>((set) => ({
	current: undefined,

	next: (direction, items) =>
		set((state) => ({
			current: nextItem(items, state.current, direction),
		})),

	reset: () =>
		set({
			current: undefined,
		}),
}));

function nextItem(
	items: ChangeRequest[],
	current: TabFocusState["current"],
	direction: YDirection,
): TabFocusState["current"] {
	if (!current) return { index: 0, data: items[0] as ChangeRequest };
	const index = current.index;

	switch (direction) {
		case "up":
			if (!items[index - 1])
				return {
					index: items.length - 1,
					data: items[items.length - 1] as ChangeRequest,
				};
			return { index: index - 1, data: items[index - 1] as ChangeRequest };
		case "down":
			if (!items[index + 1])
				return { index: 0, data: items[0] as ChangeRequest };
			return { index: index - 1, data: items[index - 1] as ChangeRequest };
		default:
			return current;
	}
}
