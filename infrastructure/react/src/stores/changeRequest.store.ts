import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ChangeRequest } from "../../../../domain/change-request";
import { createSimpleStorage } from "../utils/init-file-storage.utils";
import { zustandFileStorage } from "../utils/zustand-file-storage.utils";
import { RootLocator } from "../../../services/locator/locators";

const projectPath = new RootLocator().findDir();
const projectPathName = projectPath
	? `${projectPath.split("/")[projectPath.split("/").length - 1]}-prs.enc`
	: "unknown-prs.enc";

interface ChangeRequestStore {
	prs: ChangeRequest[];

	loading: boolean;
	error: string | null;

	setPRs(prs: ChangeRequest[]): void;
	upsertPR(pr: ChangeRequest): void;
	clearPRs(): void;

	setLoading(loading: boolean): void;
	setError(error: string | null): void;

	getPRs(): ChangeRequest[];
}

export const useChangeRequestStore = create<ChangeRequestStore>()(
	persist(
		(set, get) => ({
			prs: [],
			loading: false,
			error: null,

			setPRs: (prs) => set({ prs }),

			upsertPR: (pr) =>
				set((state) => {
					const index = state.prs.findIndex((p) => p.id === pr.id);
					if (index === -1) {
						return { prs: [...state.prs, pr] };
					}
					const next = [...state.prs];
					next[index] = pr;
					return { prs: next };
				}),

			clearPRs: () => set({ prs: [] }),

			setLoading: (loading) => set({ loading }),

			setError: (error) => set({ error }),

			getPRs: () => {
				const { prs } = get();

				return prs.filter((_pr) => {
					return true;
				});
			},
		}),
		{
			name: "pr-persistor",
			storage: createJSONStorage(
				zustandFileStorage(
					createSimpleStorage("pyrogit", "cache", projectPathName),
				),
			),
		},
	),
);
