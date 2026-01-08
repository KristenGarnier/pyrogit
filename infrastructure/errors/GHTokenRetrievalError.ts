import { TaggedError } from "./TaggedError";
export const GH_TOKEN_ERROR = Symbol("GH_TOKEN_ERROR");

export class GHTokenRetrievalError extends TaggedError {
	constructor(message: string) {
		super(GH_TOKEN_ERROR, message);
	}
}
