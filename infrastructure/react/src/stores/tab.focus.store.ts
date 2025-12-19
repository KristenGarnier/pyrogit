import { create } from "zustand";

type TabFocusState = {
	current: TabValue;

	cycle: () => void;
	reset: () => void;
};

export const Tabs = {
	PULL_REQUESTS: "pull_requests",
	VIEWS: "views",
} as const;

export type TabValue = (typeof Tabs)[keyof typeof Tabs];

const TAB_VALUES = [Tabs.PULL_REQUESTS, Tabs.VIEWS];

const initalFocus = Tabs.PULL_REQUESTS;

export const useTabFocus = create<TabFocusState>((set) => ({
	current: initalFocus,

	cycle: () =>
		set((state) => ({
			current: getNextTab(state.current, initalFocus),
		})),

	reset: () =>
		set({
			current: undefined,
		}),
}));

export function getNextTab(
	current: TabValue,
	defaultFocus: TabValue,
): TabValue {
	const index = TAB_VALUES.indexOf(current);
	const nextIndex = (index + 1) % TAB_VALUES.length;
	if (TAB_VALUES[nextIndex]) return TAB_VALUES[nextIndex];

	return defaultFocus;
}
