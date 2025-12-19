import { create } from "zustand";
import type { ChangeRequest } from "../../../../domain/change-request";
import { createJSONStorage, persist } from "zustand/middleware";
import { FileStorage } from "../../../services/storage/file.storage";
import { AppDirectories } from "../../../services/storage/locator.storage";
import path from "node:path";

const directory = new AppDirectories("pyrogit");
const storage = new FileStorage(
	path.join(directory.getPath("cache"), "prs.enc"),
);

interface ChangeRequestStore {
	// data
	prs: ChangeRequest[];

	// ui state
	loading: boolean;
	error: string | null;

	// actions
	setPRs(prs: ChangeRequest[]): void;
	upsertPR(pr: ChangeRequest): void;
	clearPRs(): void;

	setLoading(loading: boolean): void;
	setError(error: string | null): void;

	// selectors helpers
	getFilteredPRs(): ChangeRequest[];
}

export const useChangeRequestStore = create<ChangeRequestStore>()(
	persist(
		(set, get) => ({
			// --------------------
			// State
			// --------------------
			prs: [],
			loading: false,
			error: null,

			// --------------------
			// Actions
			// --------------------
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

			// --------------------
			// Derived data
			// --------------------
			getFilteredPRs: () => {
				const { prs } = get();

				return prs.filter((pr) => {
					return true;
				});
			},
		}),
		{
			name: "pr-persistor",
			storage: createJSONStorage(() => ({
				async getItem(name: string) {
					const [prs, error] = await storage.read();
					if (error || !prs) return "{}";

					return prs;
				},
				async setItem(name: string, value: string) {
					await storage.write(value);
				},
				async removeItem(name: string) {
					await storage.write("");
				},
			})),
		},
	),
);
