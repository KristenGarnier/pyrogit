import { execSync } from "child_process";
import { Result, ok, err } from "neverthrow";

export class GhAuthService {
	async login(): Promise<Result<string, Error>> {
		try {
			const existingToken = await this.getTokenFromGh();
			if (existingToken) {
				return ok(existingToken);
			}

			console.log(
				"Please run 'gh auth login' in another terminal to authenticate with GitHub.",
			);
			console.log("Then come back and try again.");
			return err(new Error("Please authenticate with 'gh auth login' first."));
		} catch (error) {
			const e = error instanceof Error ? error : new Error(String(error));
			return err(e);
		}
	}

	async getValidToken(): Promise<Result<string, Error>> {
		try {
			const token = await this.getTokenFromGh();
			if (token) {
				return ok(token);
			}
			return err(
				new Error("No GitHub token found. Please run 'gh auth login'."),
			);
		} catch (error) {
			const e = error instanceof Error ? error : new Error(String(error));
			return err(e);
		}
	}

	private async getTokenFromGh(): Promise<string | null> {
		try {
			const token = execSync("gh auth token", { encoding: "utf8" }).trim();
			return token || null;
		} catch {
			return null;
		}
	}
}
