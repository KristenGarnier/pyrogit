export abstract class TaggedError extends Error {
	public readonly _tag: string | symbol;

	constructor(tag: string | symbol, message: string) {
		super(message);
		this._tag = tag;
		this.name = this.constructor.name;
	}
}

export function isTaggedError(error: Error | TaggedError) {
	return error instanceof TaggedError;
}
