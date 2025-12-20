import type { ChangeRequest } from "../../../../domain/change-request";
import { createListFocusStore } from "./item.focus.generic.store";

export const useChangeRequestFocusStore = createListFocusStore<ChangeRequest>();
