import { execSync } from "node:child_process";
import { err, ok, type Result } from "neverthrow";
import { GHTokenRetrievalError } from "../errors/GHTokenRetrievalError";

export class GhAuthService {
	async getValidToken(): Promise<Result<string, GHTokenRetrievalError>> {
		const token = await this.getTokenFromGh();
		if (token.isOk()) {
			return ok(token.value);
		}
		return err(
			new GHTokenRetrievalError(
				"No GitHub token found. Please run 'gh auth login'.",
			),
		);
	}

	private async getTokenFromGh(): Promise<Result<string, Error>> {
		try {
			const token = execSync("gh auth token", { encoding: "utf8" }).trim();
			return ok(token);
		} catch (error) {
			const e = error instanceof Error ? error : new Error(String(error));
			return err(e);
		}
	}
}
